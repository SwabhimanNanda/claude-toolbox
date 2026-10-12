# claude-toolbox

An open-source toolbox for [Claude Code](https://claude.com/claude-code): mods, skills and other add-ons that change how it looks and behaves.

## Install

In a terminal, add the marketplace once:

```bash
claude plugin marketplace add SwabhimanNanda/claude-toolbox
```

then install anything from the list below:

```bash
claude plugin install <name>@claude-toolbox --scope user
```

Or, from inside a Claude Code terminal session: `/plugin install <name> --marketplace SwabhimanNanda/claude-toolbox`.

`--scope user` makes it load in every session you start. Start a new session after installing.

## What's inside

| Name | Kind | What it does |
| --- | --- | --- |
| [usage-limits](plugins/usage-limits) | mod | Shows your 5-hour and weekly usage limits in one line under the prompt. |

## Adding something

Everything lives in its own folder under `plugins/<name>/`, and is listed in `.claude-plugin/marketplace.json`. A plugin can hold any mix of:

- **mods** (hooks): `hooks/hooks.json` + `hooks/register.ts`, with tests in `hooks/register.test.ts`
- **skills**: `skills/<skill-name>/SKILL.md`
- anything else Claude Code plugins support (commands, agents, MCP servers)

Each plugin needs `.claude-plugin/plugin.json` with a name, version and one-line description. Then check it:

```bash
claude plugin validate .
claude plugin test plugins/<name>
```

## License

[MIT](LICENSE)
