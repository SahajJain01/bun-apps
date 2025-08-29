# bun-apps

## CI & Deploy

- What: GitHub Actions builds changed apps and triggers deploy sync.
- Trigger: Pushes to `main` that touch `apps/**` and manual runs.
- Build: For each changed `apps/<name>`, runs `bun install` and, if `package.json` has a `build` script, runs `bun run build`.
- Deploy: On successful build, posts to the NixOS sync webhook once:
  - URL: `https://deploy.sahajjain.com/sync`
  - Auth header: `x-webhook-token: ${{ secrets.BUN_SYNC_TOKEN }}`
- Secret: Add a repo secret named `BUN_SYNC_TOKEN` matching the server token.
- Manual: Use Actions → “Monorepo CI & Deploy” → “Run workflow”. Optional input lets you only test the webhook.

Workflow file: `.github/workflows/monorepo.yml`
