import { Wrench, Home, Shield, LaptopMinimal, Cpu, Globe, Smartphone, Code, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { useServices } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Wrench, Home, Shield, LaptopMinimal, Cpu, Globe, Smartphone, Code,
};

const fallbackServices = [
  { icon: Wrench, title: "Repair & Electrical", items: ["Appliance & TV Repair", "Electrical Installations", "Maintenance Services", "Emergency Fixes", "Warranty Support"] },
  { icon: Home, title: "Home Automation & IoT", items: ["Smart Home/Business Setup", "Smart Locks & Access Control", "Smart Cameras & Monitoring", "IoT Sensor Networks", "Cloud Integration"] },
  { icon: Shield, title: "AI Security & Cloud", items: ["CCTV & Biometric Systems", "AI Human/Vehicle Detection", "Smart Alarm Systems", "Cloud Dashboards", "Custom Monitoring Websites"] },
  { icon: LaptopMinimal, title: "Software & Web Development", items: ["Custom Business Software", "Website Design & Development", "Mobile App Development", "E-commerce Solutions", "API & System Integration"] },
];

const Services = () => {
  const { data: services } = useServices();

  const serviceList = services?.map(s => ({
    icon: iconMap[s.icon_name] || Wrench,
    title: s.title,
    items: s.items,
  })) || fallbackServices;

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Complete Service Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg">
            Connecting hardware, software, and human knowledge in one place
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceList.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/software-development">
              Explore Software & Web Development <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
