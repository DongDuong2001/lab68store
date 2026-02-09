"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-3 border-black">
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/lab68dev_logo.png"
              alt="Lab SixtyEight"
              width={40}
              height={40}
              className="object-contain border-3 border-black rounded-lg"
              priority
            />
          </div>
          <span className="text-lg font-black tracking-tight hidden sm:block">
            LAB SIXTYEIGHT
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-wide hover:text-gray-600 transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="/products"
            className="text-sm font-bold uppercase tracking-wide hover:text-gray-600 transition-colors"
          >
            {t("products")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-3 border-black bg-white">
          <Container className="py-6 flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/products"
              className="text-sm font-bold uppercase tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              {t("products")}
            </Link>
            <div className="pt-4 border-t-3 border-black">
              <LanguageSwitcher />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
