import { motion } from "framer-motion";
import { Code, Globe, Smartphone, ShoppingCart, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const offerings = [
  {
    icon: Code,
    title: "Custom Business Software",
    description: "Tailored applications designed to streamline your operations, automate workflows, and boost productivity.",
    features: ["Process Automation", "Inventory Management", "CRM Solutions", "Reporting Dashboards"],
  },
  {
    icon: Globe,
    title: "Website Design & Development",
    description: "Modern, responsive websites that represent your brand and convert visitors into customers.",
    features: ["Responsive Design", "SEO Optimized", "CMS Integration", "Performance Focused"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications that deliver seamless user experiences on any device.",
    features: ["iOS & Android", "Push Notifications", "Offline Support", "App Store Deployment"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Full-featured online stores with secure payments, inventory management, and analytics.",
    features: ["Payment Integration", "Product Management", "Order Tracking", "Analytics Dashboard"],
  },
];

const SoftwareDevelopment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-5 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Software & Web Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            From custom business software to beautiful websites and mobile apps — we bring your digital vision to life.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Button size="lg" asChild>
              <a href="/#contact">
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <offering.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{offering.title}</h3>
                <p className="text-muted-foreground mb-4">{offering.description}</p>
                <ul className="space-y-2">
                  {offering.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-secondary" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-6">Contact us for a free consultation and quote.</p>
          <Button size="lg" asChild>
            <a href="/#contact">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SoftwareDevelopment;
