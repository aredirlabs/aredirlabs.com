# AREDIR-WORKSPACE-001 — Workspace Foundation Verification

Manual checks to validate workspace authentication, database seeding, and basic UX.

## Prerequisites

- `.env.local` configured with valid Neon dev database URL and auth secret
- Database pushed: `npm run db:push`
- Database seeded: `npm run db:seed`
- Dev server running: `npm run dev`

---

## 1. Public pages still load

Open each route and confirm no errors:

| Route | Expected |
|-------|----------|
| `/` | Home page renders with hero, projects preview, contact CTA |
| `/about` | Company mission and approach |
| `/projects` | Product portfolio listing |
| `/projects/alignfit` | AlignFit detail page |
| `/projects/classforge` | ClassForge detail page |
| `/projects/leagueos` | LeagueOS detail page |
| `/contact` | Contact page |

## 2. Sign up works

1. Navigate to `/sign-up`
2. Page shows "Aredir Labs" branding and "Create an account" heading
3. Fill in name, email, and password (≥8 characters)
4. Click **Create account**
5. Redirected to `/workspace` dashboard
6. Dashboard shows "Dashboard" heading with project count

## 3. Sign in works

1. Sign out from the workspace (sidebar "Sign Out" button)
2. Redirected to `/sign-in`
3. Page shows "Aredir Labs" branding and "Sign in to Workspace" heading
4. Enter the email and password from step 2
5. Click **Sign In**
6. Redirected to `/workspace` dashboard

## 4. Sign out works

1. While authenticated on any workspace page
2. Click **Sign Out** in the sidebar
3. Redirected to `/sign-in`

## 5. Workspace redirects when unauthenticated

1. Sign out (if signed in)
2. Navigate directly to `/workspace`
3. Redirected to `/sign-in`
4. Try `/workspace/projects`, `/workspace/docs`, `/workspace/settings`
5. All redirect to `/sign-in`

## 6. Workspace dashboard loads when authenticated

1. Sign in
2. Navigate to `/workspace`
3. Dashboard shows:
   - "Internal Workspace" eyebrow
   - "Dashboard" heading
   - Correct project count
   - Project cards with name, status badge, description

## 7. Seeded projects display

Check that the 4 seeded projects appear:

| Name | Slug | Status |
|------|------|--------|
| AlignFit | alignfit | Active Build |
| ClassForge | classforge | In Development |
| LeagueOS | leagueos | Concept |
| AredirLabs.com | aredirlabs-com | Active Build |

### On the workspace dashboard

- `/workspace` shows all 4 project cards with status and description

### In the project registry

- `/workspace/projects` shows all 4 projects in a table
- Table columns: Name, Status (badge), Category, Repo URL

## 8. Empty state (no projects)

1. Truncate the `workspace_projects` table (or use a fresh database)
2. Navigate to `/workspace` and `/workspace/projects`
3. Both pages show "No projects found" empty state

## 9. Error state (database unavailable)

1. Set `DATABASE_URL` to an invalid connection string
2. Restart the dev server
3. Sign in
4. Navigate to `/workspace` and `/workspace/projects`
5. Both pages show an error state indicating the database is unavailable

---

## Automated checks

```bash
npm run lint
npm run build
```

Both must pass without errors or warnings.

## Seed idempotency

```bash
# Run seed twice and verify no duplicates
npm run db:seed
npm run db:seed
# Expected output each time: 4 projects "skipped" via onConflictDoNothing
# The projects table should still have exactly 4 rows
```

---

## Sign-off

- [ ] Public pages load (step 1)
- [ ] Sign up works (step 2)
- [ ] Sign in works (step 3)
- [ ] Sign out works (step 4)
- [ ] Workspace redirects when unauthenticated (step 5)
- [ ] Dashboard loads when authenticated (step 6)
- [ ] Seeded projects display (step 7)
- [ ] Empty state renders (step 8)
- [ ] Error state renders (step 9)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Seed is idempotent
