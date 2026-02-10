import { getTranslations } from "next-intl/server";
import { Container, Button } from "@/components/ui";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SuccessPage({ params }: Props) {
  const { locale } = await params;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <Container className="max-w-2xl text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 mx-auto text-green-600 mb-6" />
          <h1 className="heading-caps text-3xl md:text-4xl mb-4">
            {locale === "vi" ? "Gửi thành công!" : "Message Sent!"}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {locale === "vi" 
              ? "Cảm ơn bạn đã liên hệ! Tôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong vòng 24-48 giờ."
              : "Thank you for reaching out! I've received your request and will respond within 24-48 hours."}
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button variant="primary" size="lg">
              <ArrowLeft className="mr-2 inline-block" size={18} />
              {locale === "vi" ? "Về trang chủ" : "Back to Home"}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
