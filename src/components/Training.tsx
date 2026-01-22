import { motion } from "framer-motion";
import { useTrainingPrograms } from "@/hooks/useTrainingPrograms";

const defaultPrograms = [
  {
    title: "Beginner Track",
    price: "R2,999",
    duration: "4 Weeks",
    features: [
      "Arduino Basics",
      "Sensor Integration",
      "Simple Projects",
      "Certificate Included",
    ],
  },
  {
    title: "Advanced IoT",
    price: "R4,999",
    duration: "6 Weeks",
    features: [
      "Cloud Integration",
      "Mobile App Control",
      "AI Camera Systems",
      "Project Mentorship",
    ],
  },
  {
    title: "Corporate Training",
    price: "Custom",
    duration: "Flexible",
    features: [
      "Team Workshops",
      "Custom Curriculum",
      "On-site Training",
      "Ongoing Support",
    ],
  },
];

const Training = () => {
  const { data: dbPrograms, isLoading } = useTrainingPrograms();
  
  const programs = dbPrograms && dbPrograms.length > 0 ? dbPrograms : defaultPrograms;

  return (
    <section id="training" className="py-20 bg-muted">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Learn With Us
          </h2>
          <p className="text-muted-foreground text-lg">
            Arduino & Electronics Training Programs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-xl p-8 shadow-lg text-center"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">
                {program.title}
              </h3>
              <p className="text-2xl font-bold text-primary mb-1">
                {program.price}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {program.duration}
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
