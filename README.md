# Hawaii Ocean Travel — Website v1

A fast, responsive static website for hawaiioceantravel.com.

## What is included
- Responsive homepage
- Private boat charter section
- AIDA freediving section
- About / credentials
- Photo gallery using your uploaded photos
- Booking inquiry CTA
- Basic SEO / Open Graph metadata
- No framework or build step required

## Important before launch
The current booking email is `hello@hawaiioceantravel.com`.
If that mailbox does not exist yet, replace it in `index.html` or connect your preferred booking system.

## Local preview
Double-click `index.html`, or run a simple local web server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## Cloudflare deployment
This is a static site. You can connect the GitHub repository to Cloudflare and use the repository root as the site output. No build command is needed.

## Main files
- `index.html` — page content
- `styles.css` — design and responsive styles
- `script.js` — mobile menu and header behavior
- `assets/images/` — optimized WebP photos
Deployment trigger
