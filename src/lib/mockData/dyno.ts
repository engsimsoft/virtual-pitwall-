import type { DynoCurve } from './types'
import { ENGINES } from './engines'

// Synthetic dyno curves, one per engine, generated from per-model templates.
// Power(kW) = Torque(Nm) × RPM / 9549 — the textbook conversion that the
// anti-cheat boost cross-check uses as its reference.
//
// Curve shape: torque rises parabolically from ~55% of peak at idle to peak
// at peakTorqueRpm, then drops roughly linearly toward redline. Calibrated so
// peak power lands ~7500-8000 rpm per the M1 design rules.

interface CurveSpec {
  rpms: number[]
  peakTorqueRpm: number
  peakTorqueNm: number
  rolloffNm: number
}

const SPECS: Record<string, CurveSpec> = {
  'TMS-RX20T': {
    rpms: [2000, 3000, 4000, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000],
    peakTorqueRpm: 5500,
    peakTorqueNm: 380,
    rolloffNm: 135,
  },
  'TMS-RX24T': {
    rpms: [2000, 3000, 4000, 5000, 5300, 6000, 6500, 7000, 7500, 8000, 8500],
    peakTorqueRpm: 5300,
    peakTorqueNm: 440,
    rolloffNm: 150,
  },
  'TMS-RX18T': {
    rpms: [2000, 3000, 4000, 5000, 5200, 6000, 6500, 7000, 7500, 8000, 9000, 9500],
    peakTorqueRpm: 5200,
    peakTorqueNm: 340,
    rolloffNm: 120,
  },
}

function buildSamples(spec: CurveSpec) {
  const rpmStart = spec.rpms[0]
  const rpmEnd = spec.rpms[spec.rpms.length - 1]
  return spec.rpms.map((rpm) => {
    let torque: number
    if (rpm <= spec.peakTorqueRpm) {
      const t = (rpm - rpmStart) / (spec.peakTorqueRpm - rpmStart)
      torque = spec.peakTorqueNm * (0.55 + 0.45 * t * (2 - t))
    } else {
      const t = (rpm - spec.peakTorqueRpm) / (rpmEnd - spec.peakTorqueRpm)
      torque = spec.peakTorqueNm - spec.rolloffNm * t
    }
    const torqueNm = Math.round(torque)
    const powerKw = Math.round((torqueNm * rpm) / 9549 * 10) / 10
    return { rpm, torqueNm, powerKw }
  })
}

export const DYNO_CURVES: DynoCurve[] = ENGINES.map((engine) => ({
  engineId: engine.id,
  measuredAt: engine.bornAt,
  samples: buildSamples(SPECS[engine.model]),
}))
