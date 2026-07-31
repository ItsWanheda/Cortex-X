# Security Policy

## Supported Versions

This is a demo-scale project without formal version support. Security fixes,
if any are needed, will be applied to the latest version on the default
branch.

| Version | Supported |
|---------|-----------|
| latest  | ✅        |
| older   | ❌        |

## Reporting a Vulnerability

This project has no backend and no user data storage — all state is
in-memory on the client and resets on refresh, so the realistic attack
surface is limited to front-end dependency vulnerabilities (e.g. via `npm
audit`).

If you find a security issue (for example, in a dependency, or in how user
input is handled/rendered):

1. Do **not** open a public issue.
2. Contact the maintainer privately (e.g. via the repository's private
   security advisory feature on GitHub, or the contact listed on the
   maintainer's profile).
3. Include steps to reproduce and, if possible, a suggested fix or affected
   package/version.

You can expect an initial response within a few days. Once confirmed, a fix
will be prioritized based on severity.

## Dependency Hygiene

Run this periodically to check for known vulnerabilities in dependencies:

```bash
npm audit
```
