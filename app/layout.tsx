import type { Metadata } from "next";
import "./globals.css";
import { plusJakartaSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/config";
import { HeaderNav } from "@/components/header-nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full w-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col">
        <header>
          <HeaderNav />
        </header>
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
