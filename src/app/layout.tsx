import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import "./globals.css";

const cairo = Cairo({ subsets: ['latin'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: "Mohamed Mohsen | Elite Business & Industrial Consultant",
  description: "Specialized in SME growth, supply chain optimization, operations management, and deep organizational turnaround.",
  keywords: ["Business Consultant", "Supply Chain Optimization", "Industrial Operations", "SME Growth", "Cost Reduction", "Mohamed Mohsen"],
  authors: [{ name: "Mohamed Mohsen" }],
  creator: "Mohamed Mohsen",
  publisher: "Mohamed Mohsen",
  openGraph: {
    title: "Mohamed Mohsen | Business Consultant",
    description: "I partner with visionaries to engineer scalable operations, master supply chains, and build organizations built for speed.",
    url: "https://mohamedmohsen.com",
    siteName: "Mohamed Mohsen Consulting",
    images: [
      {
        url: "/og-image.jpg", // Create an og-image.jpg in the public folder eventually
        width: 1200,
        height: 630,
        alt: "Mohamed Mohsen - Industrial Business Consulting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Mohsen | Business Consultant",
    description: "Engineer scalable operations and master supply chains.",
    creator: "@mohamedmohsen", // Update to real handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
