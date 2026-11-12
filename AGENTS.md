# Development instructions

- This is the standalone public website repository for Nori-Agent, maintained by Rein Protocol Foundation.
- Initial scope is repository setup only. Wait for the user's concept and content discussion before developing the website or selecting a framework.
- Preserve the separation between the public website, agent implementation, and restricted administrative dashboard.
- Never commit credentials, live organizational records, personal data, or runtime memory.
- Describe capabilities accurately: distinguish implemented and verified behavior from planned capabilities.
- Hosting is planned for Vercel at `nori.rein-protocol.org`. The existing dashboard must migrate to an agreed replacement subdomain before cutover.
- Do not send messages, publish, deploy, or modify live domains without user authorization for that action.
- Keep changes focused and reversible; verify relevant changes and explicitly report skipped or pending checks.

## Cost-aware Codex delegation

This policy supersedes earlier project delegation guidance. Higher-priority instructions and
explicit user requests still apply. It governs repository development, not Nori's runtime agents.

- Keep the primary orchestrator on **GPT-6 Astra High** for planning, architecture, ambiguous
  requirements, complex reasoning/debugging, critical decisions, and final review of critical changes.
- Prefer **implementation** (GPT-6.1 Sol High) for routine features, API integration, UI,
  refactoring, and tests; prefer **routine** (GPT-6.1 Sol Low) for documentation, focused
  exploration, simple fixes, formatting, and other low-complexity work.
- Other spawned agents default to **GPT-6.1 Sol Medium**, not the primary Astra model.
  When repository-local agent configuration is added, keep role definitions in `.codex/agents/`
  and routing defaults in `.codex/config.toml`. Do not assume those files or custom roles already exist.
- Use a fresh, concise task-specific context (`fork_turns="none"` when available): objective,
  owned files, relevant PRD/AC identifiers, constraints, verification criteria, and essential
  findings. Do not copy the entire parent conversation. Tell workers they share the checkout
  and must preserve others' changes.
- Reuse the same agent session for related follow-ups to preserve affinity and prompt-cache
  reuse. Avoid frequent model switching, repeated expensive reasoning, and duplicate searches.
  Default to one subagent at a time; use two only for independent work with clear ownership.
- Count failed attempts on the same problem across follow-ups. After two failures, or immediately
  on an architectural blocker, stop retries and escalate to Astra High with attempted fixes,
  verification evidence, and the unresolved decision. Do not spawn a fresh agent to reset the count.
- Verify resolved model and reasoning effort through runtime metadata before entrusting work to
  a new routing path. An agent's self-report or a parsed TOML file alone is not proof.
  If custom roles are unavailable in a running session, use explicit
  `model="gpt-6.1-sol"`, `reasoning_effort="high"` or `"low"`, and `fork_turns="none"`
  with the corresponding role instructions. Verify that fallback too. If model selection cannot
  be enforced, report the limitation and stop delegated work; never silently substitute Astra.
- During content and design work, track decisions, acceptance evidence, and dated verification/handoff
  notes in the relevant documents under `docs/design/`. When website implementation begins, establish
  `docs/roadmap.md`, an acceptance matrix appropriate to the website milestones, and
  `docs/implementation-and-deployment.md`; maintain Chinese counterparts when present.
  Record task/PRD ID, status, owner, checks and results, blockers, and next step.
  Configuration-only work does not advance product milestones.
- Never claim completion without relevant verification. State failed, skipped, and pending checks
  explicitly. Keep external sends, publishing, and deployment within explicit user authorization.
