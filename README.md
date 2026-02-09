# Lab SixtyEight Store

A premium digital product showcase for source code, boilerplate templates, and scripts. Built with modern web technologies and a strict black-and-white design aesthetic.

## Architecture

### Technology Stack

- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Database:** Neon PostgreSQL
- **ORM:** Prisma
- **Authentication:** Simple password-based admin auth
- **Payments:** Ko-fi (external platform)
- **Localization:** next-intl (English, Vietnamese)

### Design System

**Visual Identity:**
- **Font:** Archivo (exclusive)
- **Colors:** Strict black (#000000) and white (#FFFFFF) palette
- **Style:** Neo-Brutalism with hard shadows, thick borders, flat colors
- **Tone:** Senior developer level. Clean, modular code.

### Data Model

```prisma
model Product {
  id            String        @id @default(cuid())
  slug          String        @unique
  status        ProductStatus @default(DRAFT)
  nameEn        String
  nameVi        String
  descriptionEn String
  descriptionVi String
  featuresEn    String[]
  featuresVi    String[]
  price         Int
  currency      String        @default("USD")
  imageUrl      String?
  galleryUrls   String[]
  techStack     String[]
  demoUrl       String?
  fileUrl       String
  fileSize      String?
  categoryId    String?
  category      Category?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Category {
  id        String    @id @default(cuid())
  slug      String    @unique
  nameEn    String
  nameVi    String
  products  Product[]
}
```

## Admin Panel

### Authentication

Simple password-based authentication for managing products:

**Location:** `/admin/login`
**Dashboard:** `/admin/dashboard`

Features:
- Session-based cookie authentication
- Product CRUD operations
- Image upload management
- Category management
- Status control (Draft/Published/Archived)

### Admin Routes

```
/admin/login              # Admin login page
/admin/dashboard          # Product list & stats
/admin/dashboard/add      # Create new product
/admin/dashboard/edit/[id] # Edit existing product
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Setup environment variables
# Edit .env.local with your credentials

# Push schema to database
npm run db:push

# Generate Prisma client
npx prisma generate

# Seed sample data (optional)
npm run db:seed

# Start development server
npm run dev
```

### Database Commands

```bash
# Push schema changes
npm run db:push

# Open Prisma Studio
npm run db:studio

# Seed database
npm run db:seed

# Clear database
npm run db:clear
```

### Build & Deploy

```bash
# Test production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── products/       # Public: product listing
│   │   ├── privacy/        # Privacy policy
│   │   └── terms/          # Terms of service
│   ├── admin/              # Admin panel
│   │   ├── login/          # Admin authentication
│   │   └── dashboard/      # Product management
│   └── api/
│       ├── admin/          # Admin API endpoints
│       ├── checkout/       # Ko-fi redirect
│       └── products/       # Public product API
├── components/
│   ├── ui/                 # Base UI components
│   ├── admin/              # Admin components
│   ├── header.tsx          # Main navigation
│   ├── footer.tsx          # Site footer
│   └── product-card.tsx    # Gallery-style product cards
├── lib/
│   ├── db.ts               # Prisma client
│   ├── admin-auth.ts       # Admin authentication
│   └── utils.ts            # Utility functions
├── messages/
│   ├── en.json             # English translations
│   └── vi.json             # Vietnamese translations
└── middleware.ts           # Internationalization middleware
```

## Key Features

### Product Showcase
- Gallery-style product display with large imagery
- Category filtering
- Bilingual product information (EN/VI)
- Ko-fi integration for purchases
- Direct purchase links to Ko-fi store

### Gallery Design
- Large product cards with 4:3 aspect ratio imagery
- Heavy use of whitespace for premium feel
- Strict black/white color palette
- Neo-Brutalism aesthetic with thick borders and hard shadows

### Internationalization
- Full English and Vietnamese support
- Locale-specific product names and descriptions
- Automatic language detection and switching
- URL-based locale routing (`/en/products`, `/vi/products`)

### Favicon & Branding
- Custom dynamic favicon generated with "68" branding
- Static favicon.ico support
- Apple touch icon for mobile devices

## Environment Variables

Required variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Ko-fi
NEXT_PUBLIC_KOFI_URL="https://ko-fi.com/your-username"
```

## Routes

### Public Routes
- `/` - Homepage with featured products
- `/products` - Product listing with category filter
- `/products/[slug]` - Product detail page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Admin Routes (Protected)
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Product management
- `/admin/dashboard/add` - Create product
- `/admin/dashboard/edit/[id]` - Edit product

### API Routes
- `GET /api/products` - List all published products
- `POST /api/checkout` - Redirect to Ko-fi
- `POST /api/admin/login` - Admin login
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `POST /api/admin/upload` - Upload images

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_KOFI_URL`
4. Deploy

The build automatically runs `prisma generate` via the `postinstall` script.

### Database Setup

This project uses Neon PostgreSQL. Get your connection string from:
- https://console.neon.tech/

## License

All rights reserved. Lab SixtyEight.

