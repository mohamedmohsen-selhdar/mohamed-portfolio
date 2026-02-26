import Hero from "@/components/home/Hero";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import ServicesSection from "@/components/home/ServicesSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/layout/FloatingButton";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Hero />
        <ClientsMarquee />
        <ServicesSection />
        <CaseStudiesSection />
      </div>
      <FloatingButton />
      <Footer />
    </main>
  );
}
