import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import "./globals.css";

const cairo = Cairo({ subsets: ['latin'], variable: '--font-cairo' });

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
      <body className={`${cairo.variable}`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <CalendlyWidget />
      </body>
    </html>
  );
}
