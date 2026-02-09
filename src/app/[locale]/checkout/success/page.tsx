import { getTranslations } from "next-intl/server";
import { Container, Button } from "@/components/ui";
import { Link } from "@/i18n/routing";
import { CheckCircle, ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutSuccessPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  const kofiUrl = process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/lab68";

  return (
    <section className="border-b-3 border-black">
      <Container className="py-32 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 border-3 border-black bg-white flex items-center justify-center neo-shadow">
            <CheckCircle size={40} strokeWidth={2.5} />
          </div>
          <h1 className="heading-caps text-3xl md:text-4xl mb-4">
            {t("kofiTitle")}
          </h1>
          <p className="text-gray-600 text-lg mb-10">{t("kofiMessage")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={kofiUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                {t("viewKofi")}
                <ExternalLink className="ml-2 inline-block" size={18} />
              </Button>
            </a>
            <Link href="/products">
              <Button variant="outline" size="lg">
                {t("browseProducts")}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
