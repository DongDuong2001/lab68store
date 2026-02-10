import { getTranslations } from "next-intl/server";
import { Container, Button } from "@/components/ui";
import { Send } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CustomServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "customServices" });

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
      <Container className="max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="heading-caps text-3xl md:text-5xl mb-4">
            {locale === "vi" ? "Dịch Vụ Tùy Chỉnh" : "Custom Services"}
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {locale === "vi" 
              ? "Tôi cung cấp dịch vụ tạo script, template và landing page theo yêu cầu. Hãy mô tả dự án của bạn và tôi sẽ liên hệ lại sớm nhất."
              : "I provide custom services for creating scripts, templates, and landing pages. Describe your project and I'll get back to you soon."}
          </p>
        </div>

        <form 
          action="/api/contact" 
          method="POST" 
          className="bg-white border border-gray-200 p-8 md:p-10 space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold uppercase mb-2">
              {locale === "vi" ? "Tên của bạn" : "Your Name"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
              placeholder={locale === "vi" ? "Nhập tên của bạn" : "Enter your name"}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold uppercase mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
              placeholder={locale === "vi" ? "email@example.com" : "email@example.com"}
            />
          </div>

          {/* Service Type */}
          <div>
            <label htmlFor="serviceType" className="block text-sm font-bold uppercase mb-2">
              {locale === "vi" ? "Loại dịch vụ" : "Service Type"} <span className="text-red-500">*</span>
            </label>
            <select
              id="serviceType"
              name="serviceType"
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
            >
              <option value="">
                {locale === "vi" ? "Chọn loại dịch vụ" : "Select service type"}
              </option>
              <option value="script">
                {locale === "vi" ? "Script tùy chỉnh" : "Custom Script"}
              </option>
              <option value="template">
                {locale === "vi" ? "Template/Theme" : "Template/Theme"}
              </option>
              <option value="landing">
                {locale === "vi" ? "Landing Page" : "Landing Page"}
              </option>
              <option value="other">
                {locale === "vi" ? "Khác" : "Other"}
              </option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-bold uppercase mb-2">
              {locale === "vi" ? "Ngân sách dự kiến" : "Estimated Budget"}
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
              placeholder={locale === "vi" ? "VD: $500 - $1000" : "e.g., $500 - $1000"}
            />
          </div>

          {/* Timeline */}
          <div>
            <label htmlFor="timeline" className="block text-sm font-bold uppercase mb-2">
              {locale === "vi" ? "Thời gian hoàn thành mong muốn" : "Desired Timeline"}
            </label>
            <input
              type="text"
              id="timeline"
              name="timeline"
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
              placeholder={locale === "vi" ? "VD: 2-3 tuần" : "e.g., 2-3 weeks"}
            />
          </div>

          {/* Project Details */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold uppercase mb-2">
              {locale === "vi" ? "Chi tiết dự án" : "Project Details"} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
              placeholder={locale === "vi" 
                ? "Mô tả chi tiết về dự án của bạn, các tính năng mong muốn, và bất kỳ yêu cầu đặc biệt nào..."
                : "Describe your project in detail, desired features, and any special requirements..."}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              <Send className="mr-2 inline-block" size={18} />
              {locale === "vi" ? "Gửi yêu cầu" : "Send Request"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            {locale === "vi" 
              ? "Tôi sẽ phản hồi trong vòng 24-48 giờ"
              : "I'll respond within 24-48 hours"}
          </p>
        </form>
      </Container>
    </section>
  );
}
