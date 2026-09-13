# Code standards

Keep Z-Depth CSS dependency-free, direct, and legible: flat files, native browser
ES modules, small functions, and explanations over framework abstractions. Preserve
the static HTTP path for module loading; do not add a bundler, package boilerplate,
or a sibling dependency. [CONTRIBUTING](../CONTRIBUTING.md) and
[SECURITY](../SECURITY.md) are the detailed standards.

For product changes, the maintained local commands are `npm test`, `npm run verify`,
and `npm run validate`; browser smoke requires a local server. Documentation-only
work must not claim those product suites as fresh unless it actually runs them.
Use `git diff --check`, local-link checks, and the named static copy guard when
they cover the documentation delta.

Never commit secrets, credentials, browser profiles, cookies, generated builds,
caches, or local runtime state. Report scan findings by path/type only. Update the
relevant detailed source document whenever a real contract, data-flow, hygiene, or
public guidance change requires it.
