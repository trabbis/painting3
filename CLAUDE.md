# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A one-page marketing site for a small house painting company. It's plain HTML, CSS and JavaScript bundled with Vite 5, the only dependency. There's no framework, linter or test suite.

## Commands

Vite 5 needs Node 18+. The default Node (via nvm-windows) is 18.16.0. Node 12 is also installed, so if `node -v` shows v12, run `nvm use 18.16.0` as Administrator.

```powershell
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the built dist/
```

Deployment is a manual upload of `dist/` to Netlify.

## Architecture

- `index.html` holds all page content: a hero with an inline SVG illustration, then services, process, work, reviews, FAQ and the estimate form. Sections are `<section class="section">`, and every other one adds `section-band` for the tinted background. Nav links point to section ids.
- `src/style.css` holds all design tokens as CSS variables on `:root`. Dark mode redefines the same tokens twice: under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`. When you add or change a colour token, update all three blocks.
- `src/main.js` runs the mobile nav toggle, the footer year and the estimate form.

### Estimate form (Netlify Forms)

The form relies on Netlify Forms, so these attributes in `index.html` must stay in place: `name="estimate"`, `data-netlify="true"`, `netlify-honeypot="company"` and the hidden `form-name` input. In production, `main.js` POSTs the form as URL-encoded data to `/`. In dev (`import.meta.env.DEV`) it skips the request and shows a simulated success message. Validation is custom (`novalidate`). Name and phone are required, and email is checked only if it's filled in. Field names (`name`, `phone`, `email`, `postal`, `timing`, `message`) become the column names in the Netlify dashboard.

## Placeholder content

Several items are placeholders the owner must replace before publishing: the phone `(555) 012-3456` / `tel:+15550123456` (it also appears in the form error message in `main.js`), the email `hello@painting3.com`, the service area, the hours, the sample "Recent work" projects, the sample reviews, and the warranty and licensing claims. Don't present sample reviews or projects as real.
