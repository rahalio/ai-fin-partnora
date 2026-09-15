# Partnora

India banking partnership OS — OpenAPI-first DDD monorepo for structuring, governing, and measuring coopetition deals under RBI postures.

Product specs: [`PRODUCT.md`](PRODUCT.md) · [`USER_STORIES.md`](USER_STORIES.md) · [`WEBAPP.md`](WEBAPP.md)

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  →  SPA (generated skeleton, then product UI)
```

Package scope: **`@partnora/*`**

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: partnora_demo_local_dev_key

# Web app (separate terminal)
pnpm dev:web
# http://127.0.0.1:5173
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=partnora-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen (local tool — never commit)

The `zero-codegen` tool lives under **`.codegen/`**. That directory is **gitignored** and must **never** be committed or pushed to GitHub.

After a fresh clone, restore it from the scaffold:

```bash
rsync -a --exclude '.git' --exclude 'node_modules' \
  /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
pnpm codegen:paths
```

Config: `.codegen/.zero-codegen-merged.json` (paths rewritten by `pnpm codegen:paths`).

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
