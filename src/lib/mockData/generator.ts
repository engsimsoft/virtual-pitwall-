import type {
  TelemetrySample,
  SignedBlock,
  TrackId,
  EngineId,
} from './types'

// Internal synthesis for telemetry streams and signed-block chains.
// Sample rate: 5 Hz uniform — types.ts mentions 25 Hz as the device-side
// design figure, but for a UI prototype we keep the bundle light. 5 Hz still
// produces smooth-looking traces in charts. Per-session duration is short
// (3 min completed / 2 min live) so totals stay bounded: ~7k samples across
// the whole mock corpus.

export const SAMPLE_RATE_HZ = 5
export const SAMPLE_INTERVAL_MS = 1000 / SAMPLE_RATE_HZ
const LAP_DURATION_MS = 90_000
const BLOCK_DURATION_MS = 60_000

// Approximate centroid coordinates of each circuit. Used as anchor for the
// synthetic GPS trace; not intended as accurate track geometry.
const TRACK_CENTROIDS: Record<TrackId, { lat: number; lon: number; altM: number }> = {
  'TRK-01': { lat: 56.060, lon: 35.815, altM: 200 },
  'TRK-02': { lat: 55.780, lon: 49.180, altM: 80 },
  'TRK-03': { lat: 43.405, lon: 39.957, altM: 8 },
  'TRK-04': { lat: 60.658, lon: 30.182, altM: 90 },
  'TRK-05': { lat: 55.587, lon: 37.992, altM: 130 },
}

// Parametric track shape per circuit, t in [0, 2π], returns normalized (x, y)
// roughly in [-1.2, 1.2]. Hand-tuned harmonics give each track a distinct
// silhouette — oval с шиканой, длинный круг, технический S-комбинат. Это всё
// ещё синтетика «в духе»: не реальная топология автодрома, но визуально
// читается как гоночная трасса вместо овала. Замкнутость гарантируется
// 2π-периодичностью гармоник.
function trackShape(trackId: TrackId, t: number): { x: number; y: number } {
  switch (trackId) {
    case 'TRK-01':
      // Москва Рейсинг: вытянутый овал с одной шиканой
      return {
        x: Math.cos(t) + 0.18 * Math.cos(3 * t),
        y: 0.7 * Math.sin(t) + 0.1 * Math.sin(4 * t),
      }
    case 'TRK-02':
      // Казань-ринг: технический трек с S-связкой
      return {
        x: 0.95 * Math.cos(t) + 0.22 * Math.sin(2 * t),
        y: 0.6 * Math.sin(t) - 0.18 * Math.cos(3 * t),
      }
    case 'TRK-03':
      // Сочи: длинный овал с медленным разворотом
      return {
        x: 1.1 * Math.cos(t),
        y: 0.55 * Math.sin(t) + 0.14 * Math.sin(3 * t),
      }
    case 'TRK-04':
      // Игора Драйв: северная техничка с двумя шиканами
      return {
        x: Math.cos(t) + 0.15 * Math.sin(2 * t),
        y: 0.65 * Math.sin(t) + 0.22 * Math.cos(2 * t) - 0.1 * Math.sin(4 * t),
      }
    case 'TRK-05':
      // ADM Raceway: овал со встречной шиканой на короткой прямой
      return {
        x: Math.cos(t) - 0.12 * Math.cos(2 * t),
        y: 0.7 * Math.sin(t) + 0.15 * Math.sin(2 * t),
      }
    default:
      return { x: Math.cos(t), y: 0.7 * Math.sin(t) }
  }
}

// Deterministic PRNG so the same session ID always produces the same trace.
function seedFromString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619) >>> 0
  }
  return h
}

function mulberry32(state: { v: number }): number {
  state.v = (state.v + 0x6D2B79F5) >>> 0
  let t = state.v
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function fakeHash(seed: string): string {
  const r = { v: seedFromString(seed) }
  let out = ''
  for (let i = 0; i < 64; i++) {
    out += Math.floor(mulberry32(r) * 16).toString(16)
  }
  return out
}

// Per-lap RPM shape: baseline sine + four corner dips.
function lapRpmShape(phase: number): number {
  const corners = [0.15, 0.40, 0.65, 0.85]
  let dip = 0
  for (const c of corners) {
    const d = Math.abs(phase - c)
    const wrap = Math.min(d, 1 - d)
    dip += Math.exp(-Math.pow(wrap / 0.05, 2))
  }
  const sine = Math.sin(phase * Math.PI * 2 - Math.PI / 4) * 600
  return 7000 + sine - dip * 2200
}

export type ViolationKind = 'rpm-mismatch' | 'boost-mismatch' | 'launch-control'

export interface ViolationWindow {
  kind: ViolationKind
  startMs: number
  endMs: number
  intensity: number
}

export interface SynthSpec {
  sessionId: string
  engineId: EngineId
  trackId: TrackId
  durationMs: number
  violations: ViolationWindow[]
}

export function synthesizeSamples(spec: SynthSpec): TelemetrySample[] {
  const centroid = TRACK_CENTROIDS[spec.trackId]
  const r = { v: seedFromString(spec.sessionId) }
  const samples: TelemetrySample[] = []
  const sampleCount = Math.floor(spec.durationMs / SAMPLE_INTERVAL_MS)

  for (let i = 0; i < sampleCount; i++) {
    const tMs = i * SAMPLE_INTERVAL_MS
    const lapPhase = (tMs % LAP_DURATION_MS) / LAP_DURATION_MS
    const baseRpm = lapRpmShape(lapPhase)

    let rpmCan = baseRpm + (mulberry32(r) - 0.5) * 60
    let rpmGen = baseRpm + (mulberry32(r) - 0.5) * 60
    let throttlePct = Math.max(
      0,
      Math.min(
        100,
        40 + 50 * Math.sin(lapPhase * Math.PI * 2) + (mulberry32(r) - 0.5) * 10
      )
    )
    let boostBarCan =
      (rpmCan / 8000) * (throttlePct / 100) * 1.6 + (mulberry32(r) - 0.5) * 0.05
    let vGpsKmh = Math.max(
      20,
      ((rpmCan - 2000) / 6000) * 220 + (mulberry32(r) - 0.5) * 15
    )

    // Violation overrides — applied last so the scenario lines up with the
    // incident summary (e.g. "CAN 7500 vs Gen 9200 at WOT on the straight"),
    // independent of where in the lap shape the window happens to fall.
    const rpmViol = spec.violations.find(
      (v) => v.kind === 'rpm-mismatch' && tMs >= v.startMs && tMs <= v.endMs
    )
    if (rpmViol) {
      rpmCan = 7500 + (mulberry32(r) - 0.5) * 200
      rpmGen = rpmCan + 300 + rpmViol.intensity * 1400
      throttlePct = 95 + (mulberry32(r) - 0.5) * 5
      vGpsKmh = 220 + (mulberry32(r) - 0.5) * 15
      boostBarCan = (rpmCan / 8000) * (throttlePct / 100) * 1.6 + (mulberry32(r) - 0.5) * 0.05
    }

    const boostViol = spec.violations.find(
      (v) => v.kind === 'boost-mismatch' && tMs >= v.startMs && tMs <= v.endMs
    )
    if (boostViol) {
      rpmCan = 7000 + (mulberry32(r) - 0.5) * 200
      rpmGen = rpmCan + (mulberry32(r) - 0.5) * 60
      throttlePct = 95 + (mulberry32(r) - 0.5) * 5
      vGpsKmh = 200 + (mulberry32(r) - 0.5) * 15
      // Declared boost stays around 1.4 bar; UI will compute the dyno-implied
      // figure (~1.95 bar) and flag the gap.
      boostBarCan = 1.4 + (mulberry32(r) - 0.5) * 0.05
    }

    const launchViol = spec.violations.find(
      (v) => v.kind === 'launch-control' && tMs >= v.startMs && tMs <= v.endMs
    )
    if (launchViol) {
      rpmCan = 5500 + (mulberry32(r) - 0.5) * 100
      rpmGen = rpmCan + (mulberry32(r) - 0.5) * 60
      throttlePct = 100
      boostBarCan = 1.0 + launchViol.intensity * 0.3
      vGpsKmh = 15 + mulberry32(r) * 10
    }

    const lapTheta = lapPhase * Math.PI * 2
    const shape = trackShape(spec.trackId, lapTheta)
    // 0.006° широты ≈ 670 м; 0.010° долготы на 55-60° широты ≈ 560 м. Это
    // даёт трассу ~1.2 × 1.3 км, разумный масштаб для русских автодромов.
    const lat = centroid.lat + 0.006 * shape.y
    const lon = centroid.lon + 0.010 * shape.x
    const altM = centroid.altM + 5 * Math.sin(lapPhase * Math.PI * 4)

    const accLongG = ((throttlePct - 50) / 50) * 0.6 + (mulberry32(r) - 0.5) * 0.1
    const accLatG = Math.cos(lapPhase * Math.PI * 8) * 0.8 + (mulberry32(r) - 0.5) * 0.15
    const accVertG = 1.0 + (mulberry32(r) - 0.5) * 0.1
    const yawRateDegS = Math.sin(lapPhase * Math.PI * 8) * 25 + (mulberry32(r) - 0.5) * 5
    const pitchDeg = (mulberry32(r) - 0.5) * 3
    const rollDeg = Math.sin(lapPhase * Math.PI * 8) * 4

    const warmup = Math.min(1, tMs / 60_000)
    const coolantC = 65 + warmup * 30 + Math.sin(tMs / 10_000) * 2
    const oilC = 70 + warmup * 35 + Math.sin(tMs / 12_000) * 3
    const intakeC = 28 + warmup * 12 + (mulberry32(r) - 0.5) * 2
    const lambda = 0.88 + (mulberry32(r) - 0.5) * 0.04

    samples.push({
      tMs,
      rpmCan: Math.round(rpmCan),
      boostBarCan: Math.round(boostBarCan * 100) / 100,
      throttlePct: Math.round(throttlePct),
      coolantC: Math.round(coolantC),
      oilC: Math.round(oilC),
      intakeC: Math.round(intakeC),
      lambda: Math.round(lambda * 100) / 100,
      rpmGen: Math.round(rpmGen),
      vGpsKmh: Math.round(vGpsKmh),
      lat: Math.round(lat * 1e6) / 1e6,
      lon: Math.round(lon * 1e6) / 1e6,
      altM: Math.round(altM),
      accLongG: Math.round(accLongG * 100) / 100,
      accLatG: Math.round(accLatG * 100) / 100,
      accVertG: Math.round(accVertG * 100) / 100,
      yawRateDegS: Math.round(yawRateDegS * 10) / 10,
      pitchDeg: Math.round(pitchDeg * 10) / 10,
      rollDeg: Math.round(rollDeg * 10) / 10,
    })
  }

  return samples
}

export function synthesizeSignedBlocks(
  sessionId: string,
  durationMs: number
): SignedBlock[] {
  const blockCount = Math.ceil(durationMs / BLOCK_DURATION_MS)
  const blocks: SignedBlock[] = []
  let prevHash = '0'.repeat(64)
  for (let i = 0; i < blockCount; i++) {
    const startMs = i * BLOCK_DURATION_MS
    const endMs = Math.min((i + 1) * BLOCK_DURATION_MS, durationMs)
    const hash = fakeHash(`${sessionId}-${i}-${prevHash.slice(0, 8)}`)
    blocks.push({ index: i, startMs, endMs, prevHash, hash })
    prevHash = hash
  }
  return blocks
}
