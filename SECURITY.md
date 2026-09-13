# Security and Repository Hygiene

This repository is intended to stay small, static, and safe to retain in version
control. The current readiness posture is local/private reference state; no public
release, hosting, or credential-backed service is implied.

## Secrets Policy

Do not commit:

- `.env` files or environment-specific configuration
- API keys, tokens, passwords, or service credentials
- OAuth client secrets
- SSH keys, private keys, certificates, or signing material
- browser profiles, session stores, cookies, or local runtime state

If an example value is needed, use a clearly fake placeholder and prefer an ignored local file plus a committed `.env.example`.

## Local-Only Material

Keep generated or machine-local material out of Git unless there is a deliberate reason to version it.

Examples that should normally remain untracked:

- dependency folders such as `node_modules/`
- build outputs such as `dist/`, `build/`, and `out/`
- caches such as `.cache/`, `.vite/`, and `.parcel-cache/`
- logs, temporary files, archives, and local backups
- OS and editor files such as `.DS_Store`

## Secret Scanning

If `gitleaks` is installed, run:

```sh
gitleaks detect --redact --source .
```

Only report finding paths and finding types. Never paste secret values into issues, commits, pull requests, or chat.

## Current Tracked Content

The intended tracked content is source and documentation:

- static demo files
- the bridge proof of concept
- documentation
- social preview artwork
- repository metadata such as `.gitignore` and `LICENSE`

Dependency caches, generated builds, runtime data, and credential material do not belong in the repository.
