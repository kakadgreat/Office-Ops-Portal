# PMG Office Ops Portal

Internal ops dashboard generated 2025-08-21 from the Executive Coordinator Guide.

## Local Development

```bash
npm install
npm run dev
```

## Build & Deploy (Netlify)

1. Push this folder to a new GitHub repo.
2. In Netlify: "New site from Git" → connect repo → deploy.
3. Use the included `netlify.toml` for SPA routing.
4. (Optional) Protect the site with Netlify Identity or Password Protection for internal-only access.

## Data

Sanitized JSON files live in `public/data`. Do **not** store credentials here.
For sensitive values (logins, passwords), store them outside the app (e.g., shared password manager) or protected serverless functions.

## Structure

- Dashboard: quick links, meetings this month, open tasks
- Pages: Offices, Protocols, Departments/Areas, Events, Advertising, Contacts, Vendors, Tools
