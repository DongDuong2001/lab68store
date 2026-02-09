import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create categories
  const templates = await prisma.category.upsert({
    where: { slug: "templates" },
    update: {},
    create: {
      slug: "templates",
      nameEn: "Templates",
      nameVi: "Mau Template",
    },
  });

  const scripts = await prisma.category.upsert({
    where: { slug: "scripts" },
    update: {},
    create: {
      slug: "scripts",
      nameEn: "Scripts",
      nameVi: "Script",
    },
  });

  const boilerplates = await prisma.category.upsert({
    where: { slug: "boilerplates" },
    update: {},
    create: {
      slug: "boilerplates",
      nameEn: "Boilerplates",
      nameVi: "Boilerplate",
    },
  });

  // Create sample products
  await prisma.product.upsert({
    where: { slug: "nextjs-saas-starter" },
    update: {},
    create: {
      slug: "nextjs-saas-starter",
      status: "PUBLISHED",
      nameEn: "Next.js SaaS Starter Kit",
      nameVi: "Bo Khoi Tao SaaS Next.js",
      descriptionEn:
        "A production-ready SaaS starter kit built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Stripe. Includes authentication, billing, team management, and a complete admin dashboard. Designed for rapid deployment with best practices baked in.",
      descriptionVi:
        "Bo khoi tao SaaS san sang cho san xuat, xay dung voi Next.js 15, TypeScript, Tailwind CSS, Prisma va Stripe. Bao gom xac thuc, thanh toan, quan ly nhom va bang dieu khien quan tri hoan chinh. Thiet ke de trien khai nhanh voi cac thuc hanh tot nhat.",
      featuresEn: [
        "Authentication with Clerk",
        "Stripe billing integration",
        "Multi-tenant architecture",
        "Admin dashboard",
        "Role-based access control",
        "Email notifications",
        "SEO optimized",
        "Dark mode support",
      ],
      featuresVi: [
        "Xac thuc voi Clerk",
        "Tich hop thanh toan Stripe",
        "Kien truc da nha cung cap",
        "Bang dieu khien quan tri",
        "Kiem soat truy cap theo vai tro",
        "Thong bao email",
        "Toi uu hoa SEO",
        "Ho tro che do toi",
      ],
      price: 4900,
      comparePrice: 9900,
      currency: "USD",
      techStack: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Stripe", "Clerk"],
      demoUrl: "https://demo.lab68.dev/saas-starter",
      fileUrl: "https://storage.lab68.dev/nextjs-saas-starter.zip",
      fileSize: "12.4 MB",
      categoryId: boilerplates.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "react-component-library" },
    update: {},
    create: {
      slug: "react-component-library",
      status: "PUBLISHED",
      nameEn: "React Component Library",
      nameVi: "Thu Vien Component React",
      descriptionEn:
        "A comprehensive collection of 50+ reusable React components with TypeScript support, Storybook documentation, and full test coverage. Includes form elements, data display components, navigation patterns, and layout utilities.",
      descriptionVi:
        "Bo suu tap day du hon 50 React component tai su dung voi ho tro TypeScript, tai lieu Storybook va test coverage day du. Bao gom cac thanh phan form, hien thi du lieu, mau dieu huong va tien ich layout.",
      featuresEn: [
        "50+ reusable components",
        "TypeScript strict mode",
        "Storybook documentation",
        "Unit test coverage",
        "Accessible (ARIA compliant)",
        "Tree-shakeable exports",
      ],
      featuresVi: [
        "Hon 50 component tai su dung",
        "TypeScript strict mode",
        "Tai lieu Storybook",
        "Unit test coverage",
        "Ho tro tiep can (ARIA)",
        "Tree-shakeable exports",
      ],
      price: 2900,
      comparePrice: 4900,
      currency: "USD",
      techStack: ["React", "TypeScript", "Storybook", "Vitest", "Tailwind"],
      demoUrl: "https://demo.lab68.dev/component-library",
      fileUrl: "https://storage.lab68.dev/react-components.zip",
      fileSize: "8.2 MB",
      categoryId: templates.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "node-api-toolkit" },
    update: {},
    create: {
      slug: "node-api-toolkit",
      status: "PUBLISHED",
      nameEn: "Node.js API Toolkit",
      nameVi: "Bo Cong Cu API Node.js",
      descriptionEn:
        "Battle-tested Node.js API utilities including rate limiting, caching, validation middleware, error handling, and logging. Drop these into any Express or Fastify project and save weeks of development time.",
      descriptionVi:
        "Cac tien ich API Node.js da duoc kiem chung, bao gom gioi han toc do, bo nho dem, middleware xac thuc, xu ly loi va ghi log. Tich hop vao bat ky du an Express hoac Fastify nao va tiet kiem hang tuan phat trien.",
      featuresEn: [
        "Rate limiting middleware",
        "Redis caching layer",
        "Request validation",
        "Structured error handling",
        "Winston logging setup",
        "Health check endpoints",
      ],
      featuresVi: [
        "Middleware gioi han toc do",
        "Lop bo nho dem Redis",
        "Xac thuc yeu cau",
        "Xu ly loi co cau truc",
        "Cau hinh logging Winston",
        "Endpoint kiem tra suc khoe",
      ],
      price: 1900,
      currency: "USD",
      techStack: ["Node.js", "TypeScript", "Express", "Redis", "Zod"],
      fileUrl: "https://storage.lab68.dev/node-api-toolkit.zip",
      fileSize: "3.1 MB",
      categoryId: scripts.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "python-automation-scripts" },
    update: {},
    create: {
      slug: "python-automation-scripts",
      status: "PUBLISHED",
      nameEn: "Python Automation Scripts Bundle",
      nameVi: "Bo Script Tu Dong Hoa Python",
      descriptionEn:
        "A curated collection of 20+ Python automation scripts for DevOps, data processing, web scraping, and system administration. Each script is well-documented with usage examples and configuration options.",
      descriptionVi:
        "Bo suu tap duoc chon loc hon 20 script tu dong hoa Python cho DevOps, xu ly du lieu, web scraping va quan tri he thong. Moi script duoc tai lieu hoa day du voi vi du su dung va tuy chon cau hinh.",
      featuresEn: [
        "20+ automation scripts",
        "DevOps utilities",
        "Data processing tools",
        "Web scraping templates",
        "CLI argument parsing",
        "Comprehensive documentation",
      ],
      featuresVi: [
        "Hon 20 script tu dong hoa",
        "Tien ich DevOps",
        "Cong cu xu ly du lieu",
        "Mau web scraping",
        "Phan tich tham so CLI",
        "Tai lieu day du",
      ],
      price: 2400,
      comparePrice: 3900,
      currency: "USD",
      techStack: ["Python", "Click", "BeautifulSoup", "Pandas", "Docker"],
      fileUrl: "https://storage.lab68.dev/python-automation.zip",
      fileSize: "5.7 MB",
      categoryId: scripts.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "tailwind-dashboard-template" },
    update: {},
    create: {
      slug: "tailwind-dashboard-template",
      status: "PUBLISHED",
      nameEn: "Tailwind Admin Dashboard",
      nameVi: "Mau Dashboard Quan Tri Tailwind",
      descriptionEn:
        "A pixel-perfect admin dashboard template built with Tailwind CSS and React. Includes 30+ pages, charts, data tables, form layouts, and a complete design system. Ready to integrate with any backend.",
      descriptionVi:
        "Mau dashboard quan tri hoan hao tung pixel, xay dung voi Tailwind CSS va React. Bao gom hon 30 trang, bieu do, bang du lieu, layout form va he thong thiet ke hoan chinh. San sang tich hop voi bat ky backend nao.",
      featuresEn: [
        "30+ dashboard pages",
        "Chart.js integration",
        "Data tables with sorting",
        "Form builder layouts",
        "Complete design system",
        "Responsive on all devices",
      ],
      featuresVi: [
        "Hon 30 trang dashboard",
        "Tich hop Chart.js",
        "Bang du lieu voi sap xep",
        "Layout form builder",
        "He thong thiet ke hoan chinh",
        "Responsive tren moi thiet bi",
      ],
      price: 3900,
      comparePrice: 6900,
      currency: "USD",
      techStack: ["React", "Tailwind CSS", "Chart.js", "TypeScript"],
      demoUrl: "https://demo.lab68.dev/dashboard",
      fileUrl: "https://storage.lab68.dev/tailwind-dashboard.zip",
      fileSize: "15.8 MB",
      categoryId: templates.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "docker-compose-collection" },
    update: {},
    create: {
      slug: "docker-compose-collection",
      status: "PUBLISHED",
      nameEn: "Docker Compose Collection",
      nameVi: "Bo Suu Tap Docker Compose",
      descriptionEn:
        "Production-grade Docker Compose configurations for common development stacks. Includes PostgreSQL, Redis, Elasticsearch, RabbitMQ, Nginx reverse proxy, and monitoring setups with Prometheus and Grafana.",
      descriptionVi:
        "Cau hinh Docker Compose cap san xuat cho cac stack phat trien pho bien. Bao gom PostgreSQL, Redis, Elasticsearch, RabbitMQ, Nginx reverse proxy va cau hinh giam sat voi Prometheus va Grafana.",
      featuresEn: [
        "15+ compose configurations",
        "Production-optimized",
        "Environment variable templates",
        "Health check configurations",
        "Monitoring stack included",
        "Documentation for each stack",
      ],
      featuresVi: [
        "Hon 15 cau hinh compose",
        "Toi uu cho san xuat",
        "Mau bien moi truong",
        "Cau hinh kiem tra suc khoe",
        "Stack giam sat di kem",
        "Tai lieu cho tung stack",
      ],
      price: 1400,
      currency: "USD",
      techStack: ["Docker", "PostgreSQL", "Redis", "Nginx", "Prometheus"],
      fileUrl: "https://storage.lab68.dev/docker-compose.zip",
      fileSize: "2.3 MB",
      categoryId: scripts.id,
    },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
