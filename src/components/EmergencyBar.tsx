import { AlertTriangle, Phone } from "lucide-react";

const EmergencyBar = () => {
  return (
    <div className="bg-emergency text-emergency-foreground py-2.5 px-4 text-center font-bold">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-3">
        <span className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          24/7 EMERGENCY REPAIR SERVICE
        </span>
        <a
          href="tel:+27659132527"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm hover:opacity-90 transition-opacity"
        >
          <Phone className="h-4 w-4" />
          CALL NOW: +27 65 913 2527
        </a>
      </div>
    </div>
  );
};

export default EmergencyBar;
