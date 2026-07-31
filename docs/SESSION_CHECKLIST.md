@'
# Session Checklist

## Before Every Work Session

- [ ] Confirm the latest repository or ZIP version.
- [ ] Read docs/PROJECT_STATE.md.
- [ ] Read docs/ROADMAP.md.
- [ ] Read docs/DECISIONS.md.
- [ ] Run tools/project-audit.ps1.
- [ ] Review git status.
- [ ] Confirm the exact task before editing files.
- [ ] Inspect every file related to the task.
- [ ] Do not guess missing repository details.

## During the Session

- [ ] Change only files required by the current task.
- [ ] Keep TypeScript strict.
- [ ] Avoid duplicate constants, types and components.
- [ ] Do not edit legacy.
- [ ] Do not introduce placeholder data as production data.
- [ ] Keep the task small enough to test completely.

## Before Commit

- [ ] npm run lint
- [ ] npm run build
- [ ] Review git diff
- [ ] Confirm no unrelated files changed
- [ ] Update PROJECT_STATE.md if project state changed
- [ ] Update ROADMAP.md if a milestone changed
- [ ] Update DECISIONS.md if an architecture decision changed

## Commit

Use a clear Conventional Commit message.

Examples:

- chore: remove unused product type
- docs: establish project governance files
- refactor: normalize product taxonomy
- feat: add typed Siemens product card
'@ | Set-Content -Encoding UTF8 "docs/SESSION_CHECKLIST.md"