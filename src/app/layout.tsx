import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
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
    <html lang="en" className={ibmPlexSans.variable}>
      <body className="font-ibm-plex-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
