# MValue Admin Setup

## 1) Environment variables

Copy `.env.example` to `.env.local` and fill values:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRON_SECRET`
- `MERCADOLIVRE_SITE_ID` (example: `MLB`)
- `AMAZON_PAAPI_*`
- `AMAZON_PAAPI_HOST` (default: `webservices.amazon.com.br`)
- `AMAZON_PAAPI_REGION` (default: `us-east-1`)
- `AMAZON_PAAPI_MARKETPLACE` (default: `www.amazon.com.br`)
- `SHOPEE_PARTNER_ID` (or `SHOPEE_API_KEY`)
- `SHOPEE_PARTNER_KEY` (or `SHOPEE_API_SECRET`)
- `SHOPEE_SHOP_ID`
- `SHOPEE_ACCESS_TOKEN`
- `SHOPEE_HOST` (default: `partner.shopeemobile.com`)
- `SHOPEE_STOREFRONT_URL` (default: `https://shopee.com.br`)
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

## 7) Amazon provider config (optional)

In `Admin > Providers`, you can override Amazon connector settings via `config_json`:

```json
{
  "host": "webservices.amazon.com.br",
  "region": "us-east-1",
  "marketplace": "www.amazon.com.br",
  "search_index": "All"
}
```

## 8) Shopee provider config (optional)

In `Admin > Providers`, optional `config_json` for Shopee:

```json
{
  "host": "partner.shopeemobile.com",
  "shop_id": "123456789",
  "storefront_url": "https://shopee.com.br",
  "max_scan_pages": 4
}
```

Important:

- current connector reads products from your authenticated Shopee shop catalog and filters by rule query.
