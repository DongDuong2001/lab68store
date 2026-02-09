import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "vietnamese"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab SixtyEight | Store",
  description:
    "Premium source code, boilerplate templates, and scripts for developers",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/lab68dev_logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="font-archivo antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
