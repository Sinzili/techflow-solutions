import { motion } from "framer-motion";
import { Wrench, Zap, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-smart-home.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[600px] flex items-center justify-center text-center py-24 px-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Your Complete Technology Partner
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-10">
            Welcome to Eagle Vision, your one-stop solution for smart home automation, 
            appliance repair and IoT training. Based in Pretoria East, we transform 
            your home into a smart, connected and comfortable space.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="destructive" className="w-full sm:w-auto">
              <a href="#contact" className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Emergency Repair
              </a>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#services" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Smart Upgrade
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-accent">
              <a href="#training" className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Training Courses
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
