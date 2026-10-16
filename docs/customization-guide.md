# Vanguard Template Customization & Deployment Guide

This guide walks you through editing, styling, extending, and deploying the **Vanguard Business Brokers & Franchise Consulting** HTML template.

---

## 1. Modifying Brand Identity & Logo

- **Brand Mark Icon:** Located in `assets/favicon/favicon.svg`. You can replace this vector file or edit its SVG nodes.
- **Brand Name:** Displayed in the sticky `<header>` and `<footer>` of each HTML file. Search for `VANGUARD BROKERS` and replace with your firm's name.

---

## 2. Managing Sample Business Listings

All business listings are defined in `assets/js/listings.js`.

- **Field Reference:**
  - `id`: Unique identifier (e.g., `"BB-1042"`). Used in URLs and NDA requests.
  - `title`: Enterprise headline.
  - `category`: Must match the filter values (`Food & Beverage`, `Services`, `Health & Fitness`, `Retail`, `Automotive`, `Education`, `Manufacturing`, `E-commerce`).
  - `type`: `"Franchise"` or `"Independent"`.
  - `location`: City and state.
  - `askingPrice`: Numeric value in dollars (e.g., `850000`).
  - `annualRevenue`: Numeric value in dollars.
  - `netProfit`: Owner Cash Flow / SDE in dollars.
  - `yearEstablished`: Year founded.
  - `employees`: Headcount.
  - `badges`: Array including `"Verified"`, `"Confidential"`, `"New"`.
  - `highlights`: Key bullet points for the detail modal.
  - `images`: Array of 3 to 4 image URLs.

---

## 3. Currency Configuration

To adapt the template to international markets (UK, Europe, UAE, Canada, Australia):
Open `assets/js/listings.js` and edit `ListingConfig`:
```javascript
const ListingConfig = {
  currencySymbol: '£', // Or '€', 'AED', '$', etc.
  formatCurrency: function(num) {
    if (isNaN(num)) return '£0';
    return this.currencySymbol + Number(num).toLocaleString('en-GB');
  }
};
```

---

## 4. Theme & Color Tokens

In `assets/css/tokens.css`:
- `--accent-primary`: Main CTA and highlight color (default: `#10B981` Emerald Green).
- `--accent-hover`: Hover state (default: `#059669`).
- `--hero-min-height`: Standardized hero height across all 8 pages (default: `460px`).
- Dark and Light mode themes are managed via CSS custom properties and the `.light-mode` class on the `<html>` element.

---

## 5. Deployment Options

- **Static Web Hosts:** Netlify, Vercel, GitHub Pages, Cloudflare Pages, AWS S3 / CloudFront.
- **Traditional Apache/Nginx Web Hosting:** Upload all files directly to your `public_html` root directory.
- No build steps or Node.js runtime required.
