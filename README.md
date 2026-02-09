# Lab SixtyEight Store

A premium digital marketplace for source code, boilerplate templates, and scripts. Built with modern web technologies and a strict black-and-white design aesthetic.

## Architecture

### Technology Stack

- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Database:** Neon PostgreSQL
- **ORM:** Prisma
- **Authentication:** Clerk
- **Payments:** Ko-fi (external)
- **Localization:** next-intl (English, Vietnamese)

### Design System

**Visual Identity:**
- **Font:** Archivo (exclusive)
- **Colors:** Strict black (#000000) and white (#FFFFFF) palette
- **Style:** Neo-Brutalism with hard shadows, thick borders, flat colors
- **Tone:** Senior developer level. Clean, modular code.

### Data Model

```prisma
model User {
  id         String     @id @default(cuid())
  clerkId    String     @unique
  email      String     @unique
  name       String?
  imageUrl   String?
  purchases  Purchase[]
}

model Product {
  id            String        @id @default(cuid())
  slug          String        @unique
  status        ProductStatus
  nameEn        String
  nameVi        String
  descriptionEn String
  descriptionVi String
  price         Int
  fileUrl       String
  category      Category?
  purchases     Purchase[]
}

model Purchase {
  id                String   @id @default(cuid())
  userId            String
  productId         String
  price             Int
  kofiTransactionId String?
  createdAt         DateTime @default(now())
}
```

## Authentication Integration

### Clerk Setup

1. **Environment Variables:**
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_WEBHOOK_SECRET=whsec_...
   ```

2. **Webhook Configuration:**
   - Endpoint: `https://your-domain.com/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
   - The webhook automatically syncs Clerk users to PostgreSQL database

3. **User Flow:**
   - User signs in via Google/GitHub through Clerk
   - Webhook fires on first login → creates User record with `clerkId`
   - User can view purchases in `/library` route
   - All routes under `/library` are protected (requires authentication)

### Webhook Handler

Located at `src/app/api/webhooks/clerk/route.ts`:

```typescript
// Automatically creates/updates users in PostgreSQL when they sign in
POST /api/webhooks/clerk
```

**Logic:**
- `user.created`: Creates new User record with clerkId
- `user.updated`: Upserts User data (email, name, imageUrl)
- `user.deleted`: Removes User from database

## Purchase Tracking

### My Library Page

Protected route at `/library` that displays all purchases for authenticated users.

**Features:**
- Lists all purchased products with download links
- Shows purchase date and price
- Direct download access to ZIP files
- Empty state with Ko-fi shop link

**Access Control:**
```typescript
const { userId } = await auth();
if (!userId) redirect("/sign-in");
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your Neon DB, Clerk, and Ko-fi credentials

# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed sample data
npm run db:seed

# Start development server
npm run dev
```

### Database Commands

```bash
# Push schema changes
npm run db:push

# Generate Prisma client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Seed database
npm run db:seed
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── library/        # Protected: user purchases
│   │   ├── products/       # Public: product listing
│   │   ├── sign-in/        # Clerk sign-in
│   │   └── sign-up/        # Clerk sign-up
│   └── api/
│       └── webhooks/
│           └── clerk/      # User sync webhook
├── components/
│   ├── ui/                 # Base UI components
│   ├── header.tsx          # Main navigation
│   ├── footer.tsx          # Site footer
│   └── product-card.tsx    # Gallery-style product cards
├── lib/
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Utility functions
├── messages/
│   ├── en.json             # English translations
│   └── vi.json             # Vietnamese translations
└── middleware.ts           # Clerk + i18n middleware
```

## Key Features

### Automatic Profile Sync
- Users authenticate via Clerk (Google/GitHub)
- Webhook automatically creates User record on first login
- Profile data synced to PostgreSQL for purchase tracking

### Purchase Management
- Users can view all purchases in `/library`
- Direct download links to ZIP files stored on Ko-fi
- Purchase history preserved in database

### Gallery Design
- Large product cards with 4:3 aspect ratio imagery
- Heavy use of whitespace for premium feel
- Strict black/white color palette
- Neo-Brutalism aesthetic with thick borders and hard shadows

### Internationalization
- Full English and Vietnamese support
- Locale-specific product names and descriptions
- Automatic language detection and switching

## Environment Variables

Required variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Ko-fi
NEXT_PUBLIC_KOFI_URL="https://ko-fi.com/..."
```

## Routes

- `/` - Homepage with gallery layout
- `/products` - Product listing with category filter
- `/products/[slug]` - Product detail page
- `/library` - User's purchased products (protected)
- `/sign-in` - Clerk authentication
- `/sign-up` - Clerk registration
- `/api/webhooks/clerk` - User sync webhook

## License

All rights reserved. Lab SixtyEight.
