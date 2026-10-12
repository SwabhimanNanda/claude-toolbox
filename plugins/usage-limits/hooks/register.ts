import type { Register, SessionRateLimit } from 'claude-code'

const LABELS: Record<string, string> = {
  five_hour: '5h',
  seven_day: '7d',
  seven_day_opus: '7d opus',
  seven_day_sonnet: '7d sonnet',
}

// five_hour first, then the weekly windows, then anything else (spend_limit...)
const rank = (kind: string) => (kind === 'five_hour' ? 0 : kind.startsWith('seven_day') ? 1 : 2)

const label = (kind: string) => LABELS[kind] ?? kind.replace(/_/g, ' ')

const until = (resetsAt: string | undefined, now: number) => {
  const at = resetsAt ? Date.parse(resetsAt) : NaN

  if (Number.isNaN(at)) {
    return ''
  }

  const minutes = Math.max(0, Math.round((at - now) / 60000))
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const mins = minutes % 60

  return ` (${days > 0 ? `${days}d${hours}h` : hours > 0 ? `${hours}h${mins}m` : `${mins}m`})`
}

const line = (limits: readonly SessionRateLimit[], now: number) =>
  limits.length === 0
    ? undefined
    : [...limits]
        .sort((a, b) => rank(a.kind) - rank(b.kind))
        .map(l => `${label(l.kind)} ${Math.round(l.percentUsed)}%${until(l.resetsAt, now)}`)
        .join(' · ')

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const usage = await $.session.usage()
    $.ui.status(line(usage.rateLimits, await $.clock.now()))

    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    if (e.changed.includes('rateLimits')) {
      $.ui.status(line(e.rateLimits, await $.clock.now()))
    }

    return next(e)
  })
}
