"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = {
  en: "EN",
  vi: "VI",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-0 border-3 border-black">
      {Object.entries(localeLabels).map(([key, label]) => (
        <button
          key={key}
          onClick={() => switchLocale(key)}
          className={cn(
            "px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
            locale === key
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100",
            key !== "en" && "border-l-3 border-black"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
