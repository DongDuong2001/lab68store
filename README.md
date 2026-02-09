# Lab SixtyEight Store

A premium digital product showcase for source code, boilerplate templates, and scripts. Built with modern web technologies and a strict black-and-white design aesthetic.

## Tech Stack

- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Neon PostgreSQL
- **ORM:** Prisma
- **Payments:** Ko-fi
- **Localization:** next-intl (English, Vietnamese)

## Design System

**Visual Identity:**

- **Font:** Archivo
- **Colors:** Strict black (#000000) and white (#FFFFFF) palette
- **Style:** Neo-Brutalism with hard shadows, thick borders, flat colors

## Features

### Product Showcase

- Gallery-style product display with large imagery
- Category filtering
- Bilingual product information (EN/VI)
- Ko-fi integration for purchases

### Design

- Large product cards with 4:3 aspect ratio imagery
- Heavy use of whitespace for premium feel
- Neo-Brutalism aesthetic with thick borders and hard shadows
- Custom favicon with "68" branding

### Internationalization

- Full English and Vietnamese support
- Locale-specific product names and descriptions
- Automatic language switching
- URL-based locale routing (`/en/products`, `/vi/products`)

## Routes

- `/` - Homepage with featured products
- `/products` - Product listing with category filter
- `/products/[slug]` - Product detail page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

All rights reserved. Lab SixtyEight.
