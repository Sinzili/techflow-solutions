import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FloatingAdminButton = () => {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
    >
      <Link to="/admin">
        <Settings className="h-6 w-6" />
      </Link>
    </Button>
  );
};

export default FloatingAdminButton;
