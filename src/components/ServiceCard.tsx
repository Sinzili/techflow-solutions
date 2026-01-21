import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
  index: number;
}

const ServiceCard = ({ icon: Icon, title, items, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-primary mb-5">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      <ul className="space-y-2 text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-secondary mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ServiceCard;
