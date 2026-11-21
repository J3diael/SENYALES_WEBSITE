# SENYALES: brand website

The landing page for **SENYALES**, a Filipino streetwear brand. *Senyales* means "sign."

It's a dark, minimal page with scroll animations, a film-grain overlay and a custom cursor. It collects early-access email signups before a drop and sends visitors to the online store to buy.

**🔗 Live site:** https://senyales-website.vercel.app · **Shop:** https://senyales.com

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion

## Features

- **Brand story:** hero, about, origin and audience sections, revealed with scroll animations
- **Working email signup** (`/api/subscribe`), with two ways to save signups:
  - **Shopify:** each signup becomes a customer subscribed to email marketing and tagged `early-access`, ready for Shopify Email campaigns
  - **Any webhook:** Google Sheets (via Apps Script), Formspree, Zapier, etc.
- **Shop and social links** controlled by environment variables, so links can change without code changes
- Server-side email validation, loading, success and error states, and accessible labels
- SEO and Open Graph metadata for link previews on Facebook and Messenger
- Custom cursor on desktop only; touch devices keep normal behavior

## Getting started

```bash
cd senyales
cp .env.example .env.local   # fill in your shop link and signup destination
npm install
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SHOP_URL` | Your online store. Shows "Shop the drop" buttons when set |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_TIKTOK_URL` | Footer links (optional) |
| `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_TOKEN` | Save signups to Shopify (custom app with `write_customers` scope) |
| `SIGNUP_WEBHOOK_URL` | Alternatively, POST signups to any webhook |

## Deploying

Deploy the `senyales` folder to [Vercel](https://vercel.com). Set **Root Directory** to `senyales` and add the environment variables above.

## Author

Built by **Prince Jediael Rance**, founder of SENYALES · [GitHub](https://github.com/J3diael)
