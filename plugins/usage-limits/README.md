# usage-limits

Shows your Claude usage limits in one line under the prompt:

```
5h 24% (2h13m) · 7d 41% (3d4h)
```

- `5h`: the 5-hour window. `7d`: the weekly window (a per-model weekly window such as `7d opus` is listed after it when your account reports one).
- The percentage is how much of that window you have used.
- The time in brackets is how long until that window resets.
- It updates whenever a window moves a whole percentage point, and stays hidden until Claude has a reading (it is empty off a subscription).

## Install

```bash
claude plugin marketplace add SwabhimanNanda/claude-toolbox
claude plugin install usage-limits@claude-toolbox --scope user
```

## Notes

- Claude Code puts the mod's name in front of a pinned status line, so you will see `usage-limits` to the left of the figures. That label is added by the app, not this mod.
- Uses only the rate-limit readings Claude Code already has. It makes no network requests and stores nothing.

## Develop

```bash
claude plugin validate .
claude plugin test .
```
