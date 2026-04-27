# Pi Agent Guide

## What Pi is (and what it isn't)

- Minimalist
-> Stripped away extra features, minimal extensible core
-> Only 4 tools (read, write, edit, bash)
-> ~1k tokens system prompt
-> Self-modifiable with hot reload, hackable
- No MCP
-> MCPs burn your context window
-> Too verbose, ~10k tokens per server
-> Use pi-mcp-adapter or mcporter
-> Build CLI tools with README (Skills)
- No sub-agents
-> Tell pi to spawn other pi instances if needed
-> Plan ahead!
-> Build your own as extension or install a package
- No permission blocks
-> YOLO by default
- No plan mode or todo mode
-> Create your own extension or use PLAN.md / TODO.md
- No background bash
-> Tell pi to use tmux + dev server, debugger or whatever else you need

## Installation

- `npm install -g @mariozechner/pi-coding-agent`

## Providers, Authentication and models

- Different from Claude Code or Codex, you are free to choose!
- Type `/login` and go through the flow
- Create an OpenRouter account and set OPENROUTER_API_KEY
  or edit `~/.pi/agent/auth.json`
- Select between models with `/model`
- For local models, edit `~/.pi/agent/models.json`:

```json
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434/v1",
      "apiKey": "ollama",
      "api": "openai-chat-completions",
      "models": [
        { "id": "qwen2.5-coder:32b", "contextWindow": 32768 }
      ]
    }
  }
}
```

## Useful keystrokes and commands

- Useful keystrokes
  - Ctrl-c Ctrl-c       -> Exit
  - Ctrl-c              -> Interrupt
  - Shift-Enter         -> Multiline prompts
  - Esc Esc             -> /tree
  - Enter               -> Queue next prompt
  - Alt-Enter           -> Steer current prompt
  - Ctrl-l              -> Select a model

- Useful commands
  - /login              -> Login into a provider
  - /model              -> Select a model
  - /compact            -> Compact context
  - /tree               -> Navigate session
  - /fork               -> Fork a session branch
  - /new                -> New session

- Arguments
  -> pi -h

## Directories 

Global:

    ~/.pi/agent/
    ├── extensions/     -> Global extensions
    ├── skills/         -> Global skills
    ├── prompts/        -> Prompt templates
    ├── themes/         -> Custom themes
    ├── sessions/       -> Session history
    ├── models.json     -> Custom provider config
    ├── settings.json   -> Settings
    └── SYSTEM.md       -> Custom system prompt

Project-wise:

    AGENTS.md
    .pi/AGENTS.md

## Sessions

-> Stored in `~/.pi/agent/sessions` as JSONL files
-> Navigate with `/new /tree /fork /share /export /session`
-> Continue a session with `pi -c` or `pi -r`

## Context Engineering

- AGENTS.md
-> It's where you guide your agent
  - Tech guidelines, pointers to important files, arch, tools to run and test
  - `~/.pi/agent/AGENTS.md`
  - `AGENTS.md` or `.pi/AGENTS.md`

- SYSTEM.md
-> Completely replace pi's system prompt!
-> `pi --system-prompt "You are a code reviewer." --tools read,grep,find,ls`

- APPEND_SYSTEM.md
-> Append to original system prompt, without replacing it
-> `pi --append-system-prompt "Start by writing a test and make sure it runs in the end"`

- Compaction
-> Pi has auto-compact but you can force it with `/compact`
-> Remember that compaction is a lossy operation (full history remains in the
   session JSONL file)

- Skills
-> Capability packages loaded on demand stored in `~/.pi/agent/skills`
-> Example: `~/.pi/agent/skills/SKILL.md`

       # My Skill
       Use this skill when the user asks about X.

- Prompt templates
-> Reusable markdown prompts with argument support stored in `~/.pi/agent/prompts`
-> Example: `~/.pi/agent/prompts/review.md`

        Review this code for bugs, security issues, complexity and performance
        problems.
        Focus on: {{focus}}

        - Dynamic context → Extensions
- Tip: keep all that under version control, skills and prompt templates can be
  on its own repos and shared with your peers

## Extensions

- Extensions TypeScript modules stored in `~/.pi/agent/extensions`
- Pi can build extensions for you and hot reload thanks to jiti
- You can create new
  - Tools
  - Commands
  - Shortcuts
  - Events
  - Compaction
  - Custom providers
  - Fully custom TUI
- Pi Packages: Bundle extensions and share via npm or git
- Great examples:
  - `https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/examples`

## Installing Pi packages

- `pi install npm:@foo/pi-tools`
- `pi install git:github.com/user/repo`
- `pi list`
- `pi update`
- `pi remove npm:@foo/pi-tools`
- `pi config`

Packages install in `~/.pi/agent/git` or global npm.
Use `pi install -l` to install locally in `.pi/git` or `.pi/npm`.

## Themes

- JSON files stored in `~/.pi/agent/themes`
- Switch between themes using `/settings`
- Ask Pi to build your own!

## Integrating Pi in your app

- Interactive

- Print
  -> Just prints the response and exit
  -> Useful for pipe commands
  -> `pi -p "What files are in this directory?"`
  -> `cat error.log | pi -p "What's wrong here?"`

- JSON Event Stream Mode
  -> Outputs all session events as JSON lines to stdout
  -> Useful for integrating pi into other tools or custom UIs
  -> `pi --mode json "List files"`

- RPC
  -> Outputs all session events in LF-delimited JSONL framing
  -> Useful for integrating in non-Node.js apps
  -> Python example

- SDK
  -> Exposes the whole Pi to your JS/TS app

## Documentation

-> Available as markdown files, so good for you and your agents to read
  - `https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/docs`
-> Lots of extensions and sdk examples in 
  - `https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/examples`

## Setup script, forks and other flavors

- LazyPi: https://lazypi.org/
- Oh My Pi: https://github.com/can1357/oh-my-pi
- Pi Rust: https://github.com/Dicklesworthstone/pi_agent_rust
- Modex: https://github.com/automata/modex
