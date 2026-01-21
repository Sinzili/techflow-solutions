import { motion } from "framer-motion";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";
import portfolioRepair from "@/assets/portfolio-repair.jpg";
import portfolioSmartHome from "@/assets/portfolio-smart-home.jpg";
import portfolioSecurity from "@/assets/portfolio-security.jpg";
import portfolioArduino from "@/assets/portfolio-arduino.jpg";

// Default items shown when database is empty
const defaultItems = [
  {
    id: "default-1",
    image: portfolioRepair,
    title: "Appliance Repair",
    description: "Quick diagnostics and fix",
  },
  {
    id: "default-2",
    image: portfolioSmartHome,
    title: "Smart Home Automation",
    description: "Full home control system",
  },
  {
    id: "default-3",
    image: portfolioSecurity,
    title: "AI Security System",
    description: "Human detection & alerts",
  },
  {
    id: "default-4",
    image: portfolioArduino,
    title: "Arduino Workshop",
    description: "Hands-on electronics training",
  },
];

const Portfolio = () => {
  const { data: dbItems, isLoading } = usePortfolioItems();

  // Use database items if available, otherwise use defaults
  const items = dbItems && dbItems.length > 0
    ? dbItems.map((item) => ({
        id: item.id,
        image: item.image_url || portfolioRepair,
        title: item.title,
        description: item.description || "",
      }))
    : defaultItems;

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Work in Action
          </h2>
          <p className="text-muted-foreground text-lg">
            From simple repairs to complex AI systems
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-muted rounded-xl animate-pulse"
              />
            ))
          ) : (
            items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl h-64 group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-accent/90 text-accent-foreground p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
