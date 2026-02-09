import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: any) {
  // Exclude admin routes from internationalization
  if (req.nextUrl.pathname.startsWith('/admin')) {
    return;
  }
  
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(en|vi)/:path*",
  ],
};
