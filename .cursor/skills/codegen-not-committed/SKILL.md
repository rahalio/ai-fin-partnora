---
name: codegen-not-committed
description: >-
  Enforce that .codegen (zero-codegen tool) is never committed or pushed to
  GitHub for Partnora. Use when staging, committing, pushing, or restoring
  codegen tooling after clone.
---

# Never commit `.codegen`

## Rule

`.codegen/` holds the local `zero-codegen` Python tool and absolute-path merged config. It must **never** be committed or pushed to GitHub.

## Safeguards

- `.gitignore` includes `.codegen/`, `codegen/`, and `**/zero_codegen/`
- Cursor rule: `.cursor/rules/codegen-not-committed.mdc` (alwaysApply)

## After clone

```bash
rsync -a --exclude '.git' --exclude 'node_modules' \
  /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
pnpm codegen:paths
```

## Agent checklist

Before `git add` / commit: confirm `.codegen` is not staged. If it appears in `git status`, unstage and leave ignored.
