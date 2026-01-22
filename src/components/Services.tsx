import { Wrench, Home, Shield, LaptopMinimal } from "lucide-react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: Wrench,
    title: "Repair & Electrical",
    items: [
      "Appliance & TV Repair",
      "Electrical Installations",
      "Maintenance Services",
      "Emergency Fixes",
      "Warranty Support",
    ],
  },
  {
    icon: Home,
    title: "Home Automation & IoT",
    items: [
      "Smart Home/Business Setup",
      "Smart Locks & Access Control",
      "Smart Cameras & Monitoring",
      "IoT Sensor Networks",
      "Cloud Integration",
    ],
  },
  {
    icon: Shield,
    title: "AI Security & Cloud",
    items: [
      "CCTV & Biometric Systems",
      "AI Human/Vehicle Detection",
      "Smart Alarm Systems",
      "Cloud Dashboards",
      "Custom Monitoring Websites",
    ],
  },
  {
    icon: LaptopMinimal,
    title: "Software & Web Development",
    items: [
      "Custom Business Software",
      "Website Design & Development",
      "Mobile App Development",
      "E-commerce Solutions",
      "API & System Integration",
    ],
  },
];

const Services = () => {
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
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
