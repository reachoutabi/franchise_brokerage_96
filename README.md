# Vanguard – Franchise Consulting & Business Brokerage HTML Template

A modern, high-trust, conversion-focused **Franchise Consulting & Business Brokerage HTML5 Template** designed for business brokers, M&A advisors, franchise development consultants, and business-for-sale marketplaces.

Developed with clean semantic HTML5, modern Tailwind CSS utilities, modular Vanilla JavaScript (ES6), and CSS custom properties (design tokens). Fully responsive, accessible, dark/light theme ready, and RTL (Right-to-Left) compatible.

---

## 📁 Project Structure

```
franchise-brokerage-template/
├── index.html                  # Homepage (Hero search, stats, featured listings, spotlights, services, advisors, FAQs)
├── buy-a-business.html         # Buyer portal with sticky filter sidebar, live keyword search, grid/list view, pagination
├── sell-your-business.html        # Seller portal with interactive valuation estimator, multi-step listing form
├── contact.html                # Contact page with pre-fill enquiry form, dedicated map section, regional offices
├── privacy-policy.html         # Confidentiality terms, M&A data room protection, electronic NDA policy
├── terms.html                  # Terms of brokerage service, non-circumvention, valuation disclaimers
├── 404.html                    # Themed 404 error page with listing search and quick navigation
├── coming-soon.html            # Private Deal Room portal coming soon with live countdown timer
├── assets/
│   ├── css/
│   │   ├── tokens.css          # Core CSS variables (dark & light theme tokens, hero heights, radius)
│   │   ├── main.css            # Base typography, sticky header, cards, form controls, modals, animations
│   │   └── rtl.css             # Right-to-Left layout overrides and directional mirroring
│   ├── js/
│   │   ├── listings.js         # Central sample data (24 business listings, 4 franchises, 3 market articles)
│   │   ├── theme.js            # Theme switcher (Dark/Light) and RTL layout manager with LocalStorage
│   │   ├── forms.js            # Valuation estimator engine, multi-step seller form, contact pre-fills, NDAs
│   │   ├── filters.js          # Live keyword search, price sliders, category chips, sort & pagination
│   │   └── main.js             # Sticky header, favorites manager, listing details modal, counters, toasts
│   ├── favicon/
│   │   └── favicon.svg         # Bespoke geometric vector brand icon
│   └── images/                 # Local image assets
└── docs/                       # Additional documentation guides
```

---

## 🚀 Getting Started

1. Simply open `index.html` in any modern web browser, or serve the directory using any static file server:
   ```bash
   # Using Python 3:
   python -m http.server 8080

   # Or using Node.js npx:
   npx serve .
   ```
2. No Node.js build process, PHP backend, or complex build steps are required. The template is 100% frontend and self-contained.

---

## ⚙️ Customization Guide

### 1. How to Edit or Add Business Listings
All listing data is stored in [`assets/js/listings.js`](assets/js/listings.js) in the `businessListingsData` array. Each listing is an object formatted as:

```javascript
{
  id: "BB-1042",
  title: "Gourmet Artisan Coffee & Bakery Franchise",
  category: "Food & Beverage",     // Matches category filters
  type: "Franchise",               // "Franchise" or "Independent"
  location: "Austin, TX",
  askingPrice: 850000,
  annualRevenue: 1650000,
  netProfit: 340000,               // Cash flow / SDE
  yearEstablished: 2017,
  employees: 14,
  reasonForSale: "Owner focusing on out-of-state ventures",
  badges: ["Verified", "New"],     // Options: "Verified", "Confidential", "New"
  highlights: [
    "Prime downtown corner location with drive-thru approval",
    "Consistent 18% YoY net revenue growth"
  ],
  images: [
    "https://images.unsplash.com/...", // 3 to 4 image URLs
  ],
  description: "Executive summary description...",
  facility: "2,400 sq.ft. leased space...",
  leaseTerms: "5 years remaining...",
  inventoryIncluded: "$38,000 in supplies included"
}
```

### 2. How to Change Currency Symbol & Formatting
In [`assets/js/listings.js`](assets/js/listings.js), locate the `ListingConfig` object at the top:
```javascript
const ListingConfig = {
  currencySymbol: '$', // Change to '€', '£', 'AED', '¥', etc.
  formatCurrency: function(num) {
    if (isNaN(num)) return '$0';
    return this.currencySymbol + Number(num).toLocaleString('en-US');
  }
};
```

### 3. How to Change Brand Colors & Theme Tokens
All design tokens are defined in [`assets/css/tokens.css`](assets/css/tokens.css). To adjust the accent color or dark theme palette, modify:
```css
:root {
  /* Default Dark Mode Theme */
  --bg-primary: #070B14;      /* Deep midnight background */
  --bg-secondary: #0D1527;    /* Slate container background */
  --accent-primary: #10B981;  /* Primary Emerald Green */
  --accent-hover: #059669;    /* Hover State */
  --accent-light: #34D399;    /* Lighter tint for dark mode contrast */
  --hero-min-height: 460px;   /* Standardized hero height across all pages */
}

html.light-mode {
  --bg-primary: #F8FAFC;      /* Executive crisp light background */
  --bg-card: #FFFFFF;         /* Pure white card surface */
  --accent-primary: #059669;  /* Accessible green for light mode */
}
```

### 4. How to Change Typography
The template uses Google Fonts **Plus Jakarta Sans**. To switch fonts, update the font import in [`assets/css/main.css`](assets/css/main.css) and the `--font-sans` variable in [`assets/css/tokens.css`](assets/css/tokens.css).

### 5. How to Replace Images with Local Assets
Replace any Unsplash URL in [`assets/js/listings.js`](assets/js/listings.js) or the HTML hero backgrounds with a local path:
```javascript
images: [
  "assets/images/listings/listing-1.jpg",
  "assets/images/listings/listing-2.jpg"
]
```

---

## 🌟 Key Features & Reviewer Fixes Checklist (Section 15)

- ✅ **Identical Sticky Header:** Fixed across all pages with zero wrapping or truncation at 360px, 768px, 1024px, and 1440px.
- ✅ **Recognizable Toggles:** Sun/moon toggle for theme, globe with "RTL" badge, and heart icon with live counter for saved listings.
- ✅ **Primary CTA (No Login/Admin):** Freed header space utilized for a high-converting "Free Consultation" primary action.
- ✅ **Equal Height Hero Banners:** Every page shares the `--hero-min-height` token with high-resolution imagery and dark scrim overlays.
- ✅ **Equal Height Cards & Pinned Footers:** In both grid and list layouts, cards maintain consistent height with button rows pinned to the base (`mt-auto`).
- ✅ **Filter Chips:** Strict height parity between active and inactive states.
- ✅ **Live Search & Filter Sidebar:** Desktop sticky sidebar with mobile off-canvas drawer.
- ✅ **Interactive Business Valuation Estimator:** Instant SDE/EBITDA multiple calculation with one-click pre-fill into the seller form.
- ✅ **Multi-Step Seller Form:** 4-step intake with validation, reference ID generation, confirmation modal, and LocalStorage save.
- ✅ **Pre-Filled Contact Form:** Auto-populates listing ID and title when arriving from any listing card.
- ✅ **Dedicated Map Section:** Clean, standalone map section with custom dark styling.
- ✅ **RTL Mirroring:** Complete right-to-left compatibility with mirrored directional icons, text alignments, and drawer positions.
- ✅ **Zero Dead Links:** Every button, article ("Read Article" modal), filter, and footer link performs a functional action.

---

## 📄 License
Commercial Theme License – Suitable for ThemeForest, TemplateMonster, or direct corporate client deployments.
