import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const options = [
  { id: "repair", label: "Something is broken", price: "R750-1500/hour" },
  { id: "upgrade", label: "Make it smart", price: "Starting at R15,000" },
  { id: "security", label: "Add security/AI", price: "Starting at R25,000" },
  { id: "training", label: "Learn to do it myself", price: "R2,999-4,999/course" },
  { id: "custom", label: "Custom project", price: "Contact for quote" },
];

const ServiceSelector = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedOption = options.find((opt) => opt.id === selected);

  return (
    <section className="py-16">
      <div className="container mx-auto px-5">
        <div className="bg-[hsl(var(--service-selector-bg))] rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            What do you need help with today?
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`px-6 py-3 rounded-full border-2 border-primary font-medium transition-all ${
                  selected === option.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8"
              >
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  Estimated Starting Price:{" "}
                  <span className="text-primary">{selectedOption.price}</span>
                </h4>
                <Button asChild size="lg" className="mt-4">
                  <a href="#contact">Get Exact Quote</a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelector;
