import { expect, mock, test } from 'claude-code/testing'

const NOW = Date.parse('2026-10-12T10:00:00Z')

test('pins the 5h window before the weekly one, with time to reset', async ($, on) => {
  mock.clock(on, { now: NOW })

  const lines: (string | undefined)[] = []
  on('ui.status', (_$, e) => {
    lines.push(e.text)

    return { value: undefined }
  })
  on('session.measure', (_$, e) => ({ changed: e.changed }))

  await $.session.measure({
    context: { window: 200000 } as never,
    rateLimits: [
      { kind: 'seven_day', percentUsed: 41, resetsAt: '2026-10-15T14:00:00Z' },
      { kind: 'five_hour', percentUsed: 23.5, resetsAt: '2026-10-12T12:13:00Z' },
    ],
    changed: ['rateLimits'],
  })

  expect(lines[lines.length - 1]).toBe('5h 24% (2h13m) · 7d 41% (3d4h)')
})
