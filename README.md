# Painting3 website

One-page website for a small interior & exterior house painting company.

## Run it on your computer

This project needs Node 18 or newer. Your default Node is 12, so use the Node 18 that nvm already has:

```powershell
$env:Path = "C:\dev\nvm\v18.16.0;" + $env:Path
cd C:\dev\painting3
npm run dev
```

Then open http://localhost:5173

## Files

- `index.html`: all the page content (text, services, reviews, FAQ, form)
- `src/style.css`: colours, fonts and layout. Brand colours are at the top in `:root`.
- `src/main.js`: mobile menu and the estimate form
- `public/favicon.svg`: browser tab icon

## Before you publish: replace the placeholders

- Phone `(555) 012-3456`: search and replace everywhere (also `tel:+15550123456`)
- Email `hello@painting3.com`
- Service area "Your city and nearby towns" and business hours
- **Recent work**: sample projects. Replace with your own before/after photos.
- **Reviews**: sample reviews. Replace with real ones from your customers.
- Warranty length, "licensed & insured" and any claims that don't match your business

## Publish

```powershell
npm run build
```

Upload the `dist` folder to Netlify (drag and drop at app.netlify.com/drop, or connect a Git repo).
On Netlify, the estimate form works automatically: requests show up under **Forms** in your Netlify dashboard, and you can turn on email notifications there.
