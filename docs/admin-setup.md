# MValue Admin Setup

## 1) Environment variables

Copy `.env.example` to `.env.local` and fill values:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRON_SECRET`
- `MERCADOLIVRE_SITE_ID` (example: `MLB`)
- `AMAZON_PAAPI_*` (stub for future connector)
- `SHOPEE_*` (stub for future connector)
- `MAGALU_*` (stub for future connector)

## 2) Run SQL migration on Supabase

In Supabase SQL Editor, run:

`supabase/migrations/20260216_admin_panel.sql`

This creates:

- auth profile mapping (`profiles`)
- providers/rules/products/overrides/runs/settings tables
- RLS policies (admin-only CRUD)
- `public_products` view for public read
- base providers seed

## 3) Promote your user to admin

After creating your user in Supabase Auth, run this SQL:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_USER_UUID';
```

You can get `YOUR_USER_UUID` in Auth > Users.

## 4) Local run

```bash
npm install
npm run dev
```

Admin login:

- `http://localhost:3000/admin/login`

Public API example page:

- `http://localhost:3000/products`

## 5) Vercel cron

`vercel.json` already contains:

- `*/15 * * * *` -> `/api/cron/import`

Security:

- set `CRON_SECRET` in Vercel Environment Variables
- endpoint validates `Authorization: Bearer <CRON_SECRET>` and `x-cron-secret`

## 6) Manual import fallback

If cron is disabled, use Admin > Rules > `Rodar agora`.
