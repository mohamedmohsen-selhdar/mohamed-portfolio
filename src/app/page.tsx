import Hero from "@/components/home/Hero";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import Experience from "@/components/home/Experience";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/layout/FloatingButton";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Hero />
        <ClientsMarquee />
        <Experience />
      </div>
      <FloatingButton />
      <Footer />
    </main>
  );
}
