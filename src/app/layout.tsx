import type { Metadata } from 'next';
import { Cairo, Playfair_Display } from 'next/font/google';
import "./globals.css";

const cairo = Cairo({ subsets: ['latin'], variable: '--font-cairo' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['400', '600', '700', '900'] });

export const metadata: Metadata = {
  title: "Mohamed Mohsen | Business Consultant",
  description: "Business & Industrial Consultant specializing in SME growth, process improvement, and supply chain management.",
};

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import CalendlyWidget from "@/components/layout/CalendlyWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} ${playfair.variable}`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <CalendlyWidget />
      </body>
    </html>
  );
}
