# Understand Anything

## Project Overview
An open-source tool combining LLM intelligence + static analysis to produce interactive dashboards for understanding codebases.

## Architecture
- **Monorepo** with pnpm workspaces
- **understand-anything-plugin/** — Claude Code plugin containing all source code:
  - **understand-anything-plugin/packages/core** — Shared analysis engine (types, persistence, tree-sitter plugin, LLM prompt templates)
  - **understand-anything-plugin/packages/dashboard** — React + TypeScript web dashboard (React Flow, Monaco Editor, Zustand, TailwindCSS)
  - **understand-anything-plugin/src** — Skill TypeScript source for `/understand-chat`, `/understand-diff`, `/understand-explain`, `/understand-onboard`
  - **understand-anything-plugin/skills** — Skill definitions
  - **understand-anything-plugin/agents** — Agent definitions

## Key Commands
- `pnpm install` — Install all dependencies
- `pnpm --filter @understand-anything/core build` — Build the core package
- `pnpm --filter @understand-anything/core test` — Run core tests
- `pnpm dev:dashboard` — Start dashboard dev server

## Key Commands (plugin)
- `pnpm --filter @understand-anything/skill build` — Build the plugin package
- `pnpm --filter @understand-anything/skill test` — Run plugin tests

## Phase 2 Features
- Fuzzy search via Fuse.js (SearchEngine in core)
- Zod schema validation on graph loading
- Staleness detection + incremental graph merging
- Layer auto-detection (heuristic + LLM prompt)
- `/understand-chat` skill command
- Dashboard chat panel (Claude API integration)
- Dagre auto-layout for graph visualization
- Layer visualization with grouping and legend

## Conventions
- TypeScript strict mode everywhere
- Vitest for testing
- ESM modules (`"type": "module"`)
- Knowledge graph JSON lives in `.understand-anything/` directory of analyzed projects
