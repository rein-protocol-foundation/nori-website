# Development instructions

- This is the standalone public website repository for Nori-Agent, maintained by Rein Protocol Foundation.
- The v0.4 UI direction is accepted. Current work is content and design; wait for explicit implementation authorization before developing the website or selecting a framework.
- Preserve the separation between the public website, agent implementation, and restricted administrative dashboard.
- Never commit credentials, live organizational records, personal data, or runtime memory.
- Describe capabilities accurately: distinguish implemented and verified behavior from planned capabilities.
- Hosting is planned for Vercel at `nori.rein-protocol.org`. The existing dashboard must migrate to an agreed replacement subdomain before cutover.
- Do not send messages, publish, deploy, or modify live domains without user authorization for that action.
- Keep changes focused and reversible; verify relevant changes and explicitly report skipped or pending checks.

## Cost-aware Codex delegation

This policy applies to the public website repository. Higher-priority instructions and explicit
user requests take precedence. Delegation does not authorize website implementation or deployment.

- Keep the primary orchestrator on **GPT-6 Astra High** for content strategy, ambiguous requirements,
  visual direction, future architecture decisions, complex debugging, and final critical review.
- Prefer **routine** (GPT-6.1 Sol Low) for scoped copy edits, Markdown, asset inventories, reference
  checks, and simple fixes. Prefer **implementation** (GPT-6.1 Sol High) for UI implementation,
  accessibility, responsive behavior, integrations, and tests once implementation is authorized.
  Other spawned agents default to **GPT-6.1 Sol Medium**, not the primary Astra model.
- Do small, self-contained edits directly when delegation would add more overhead than it saves.
  Default to one subagent at a time; use two only for independent work with explicit file ownership.
- Ground assignments in the existing `docs/design/website-content-v0.4.md` and
  `docs/design/ui-design-v0.4.md`. Preserve accepted Nori identity, badges, case priorities, and
  interaction specifications. Historical concepts are references, not equally approved alternatives.
- Give workers concise task-specific context (`fork_turns="none"` when available): objective,
  owned files, relevant content sections or design images, accepted constraints, and verification
  criteria. Tell them they share the checkout, must preserve others' changes, and must not invent
  product capabilities or present illustrative scenarios as real organizational results.
- Reuse the same agent for related follow-ups. Avoid repeated repository exploration and unnecessary
  image regeneration; reuse accepted assets and limit revisions to the requested sections.
- Count failures across follow-ups. After two failures on the same problem, or immediately on an
  architectural blocker, return the attempted fixes, evidence, and unresolved decision to the
  Astra orchestrator. Do not spawn a fresh agent to reset the count.
- This repository has no local agent routing configuration. Use roles available in the current
  session; verify resolved model and reasoning effort through runtime metadata before delegation.
  A role name, agent self-report, or configuration text alone is not proof. If custom roles are
  unavailable, use explicit `model="gpt-6.1-sol"`, `reasoning_effort="high"` or `"low"`, and
  `fork_turns="none"` with the corresponding instructions, and verify that fallback too.
  If routing cannot be enforced, report the limitation and stop delegated work; do not silently
  substitute Astra or add configuration files merely to satisfy this policy.
- Record content/design decisions in the relevant existing document under `docs/design/`.
  Use `docs/setup-and-handoff.md` for repository setup or hosting handoff changes. Put task scope,
  checks/results, remaining limitations, and next steps in the PR description; do not create a
  roadmap, acceptance matrix, deployment log, or translated duplicate for routine documentation work.
- Match verification to the change: check document links, asset availability, prompt JSON, and
  image/content consistency for design work. State that build and interaction tests are not applicable
  while no application exists. Once implementation is authorized, use the actual framework and
  project checks selected then; never claim an interactive behavior from a static image alone.
- Keep publishing, deployment, DNS changes, and dashboard migration within explicit authorization.
  Documentation or routing changes do not demonstrate product capability or deployment readiness.
