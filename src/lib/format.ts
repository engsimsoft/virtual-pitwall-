// Numeric formatters for the operating-tool views. Russian convention:
// thin no-break space (U+202F) between digit groups, regular no-break space
// (U+00A0) between number and unit so the pair never wraps.

const THIN_NBSP = ' '
const NBSP = ' '

function groupDigits(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, THIN_NBSP)
}

export function formatRpm(rpm: number, withUnit = false): string {
  const formatted = groupDigits(rpm)
  return withUnit ? `${formatted}${NBSP}об/мин` : formatted
}

// Lap time as M:SS.mmm (e.g. 1:32.456). Negative input clamped to zero.
export function formatLapTime(ms: number): string {
  const total = Math.max(0, Math.round(ms))
  const minutes = Math.floor(total / 60_000)
  const seconds = Math.floor((total % 60_000) / 1000)
  const millis = total % 1000
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`
}
