import Hero from "@/components/home/Hero";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import ArticlesSection from "@/components/home/ArticlesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Hero />
        <ClientsMarquee />
        <CaseStudiesSection />
        <ArticlesSection />
        <TestimonialsSection />
        <ManifestoSection />
      </div>
      <Footer />
    </main>
  );
}
