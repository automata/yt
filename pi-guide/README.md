# Pi Agent Guide

    - What Pi is and what it isn't
    - Installation
    - Providers authentication
    - Useful keystrokes and commands
    - Important directories
    - Sessions management
    - Context engineering
    - Queuing
    - Extensions
    - Installing Pi packages
    - Themes
    - Integrating Pi in your app
    - Forks of Pi

## What Pi is and what it isn't

- Minimalist, only 4 tools, minimal system prompt, self-modifiable (hot reload), hackable
  - Stripped away extra features, minimal extensible core
- No MCP
- No sub-agents
- No permission blocks
  - YOLO by default
- No plan mode or todo mode
- No background bash
- Pi vs Claude Code

## Installation

- npm...
- Point to other video

## Providers, Authentication and models

```
# ~/.pi/agent/models.json
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

- Useful keystrokes `Shift-Enter Esc Enter Alt-Enter`
- Useful commands `/login /model /compact`

## Directories 

```
~/.pi/agent/
├── extensions/     # Global extensions (auto-loaded)
├── skills/         # Global skills
├── prompts/        # Prompt templates
├── themes/         # Custom themes
├── sessions/       # Session history (JSONL)
├── models.json     # Custom provider config
├── settings.json   # Settings
└── SYSTEM.md       # Custom system prompt
```

## Sessions

Sessions and `/new /tree /fork /share /export /session`
- pi -c

## Context Engineering

        - `AGENTS.md`
        ~/.pi/agent/AGENTS.md     # Global context (loaded everywhere)
        ./AGENTS.md                # Project context (loaded in this directory)
        ./.pi/AGENTS.md            # Alternative project context location
        - `SYSTEM.md`
        pi --system-prompt "You are a security auditor. Only look for
        vulnerabilities."
        - `APPEND_SYSTEM.md`
        pi --append-system-prompt "Always write tests first"
        - Compaction
        - Skills
          Capability packages loaded on demand
        - Prompt templates
          Reusable markdown prompts with argument support
        <!-- ~/.pi/agent/prompts/review.md -->
        Review the recent changes in this project.
        Focus on: {{focus}}
        Check for bugs, security issues, and unnecessary complexity.
        - Dynamic context → Extensions

## Extensions: how to use, cool ones (marketplace?), creating yours

TypeScript modules
Pi is based on hot reloading
- Tools, commands, shortcuts, events, compaction, custom providers, fully
  custom TUI
Pi Packages: Bundle extensions and share via npm or git

## Themes



## Integrating Pi in your app

    - Integrating Pi
        - Interactive
        - Print/JSON
pi -p "What files are in this directory?"
cat error.log | pi -p "What's wrong here?"
pi --mode json "List files"
        - RPC
        - SDK
 
## Forks

- Forks Oh My Pi, Pi Rust and others??

## CtA

- Contribute your sessions on OSS?? 
  https://github.com/badlogic/pi-share-hf
