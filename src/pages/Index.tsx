import EmergencyBar from "@/components/EmergencyBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceSelector from "@/components/ServiceSelector";
import Portfolio from "@/components/Portfolio";
import Training from "@/components/Training";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingAdminButton from "@/components/FloatingAdminButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EmergencyBar />
      <Header />
      <Hero />
      <Services />
      <ServiceSelector />
      <Portfolio />
      <Training />
      <Contact />
      <Footer />
      <FloatingAdminButton />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
