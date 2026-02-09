import { getTranslations } from "next-intl/server";
import { Container, Button } from "@/components/ui";
import { Link } from "@/i18n/routing";
import { XCircle } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutErrorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });

  return (
    <section className="border-b-3 border-black">
      <Container className="py-32 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 border-3 border-black bg-danger flex items-center justify-center neo-shadow">
            <XCircle size={40} strokeWidth={2.5} className="text-white" />
          </div>
          <h1 className="heading-caps text-3xl md:text-4xl mb-4">
            {t("error")}
          </h1>
          <p className="text-gray-600 text-lg mb-10">{t("errorMessage")}</p>
          <Link href="/products">
            <Button variant="primary" size="lg">
              {t("browseProducts")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
