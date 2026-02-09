"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { ExternalLink } from "lucide-react";

interface BuyButtonProps {
  productSlug: string;
}

export function BuyButton({ productSlug }: BuyButtonProps) {
  const t = useTranslations("products");
  const kofiUrl = process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/lab68";

  return (
    <a
      href={kofiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
    >
      <Button variant="primary" size="lg" className="w-full">
        {t("buyOnKofi")}
        <ExternalLink className="ml-2 inline-block" size={16} />
      </Button>
    </a>
  );
}
