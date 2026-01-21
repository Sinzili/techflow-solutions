import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#training", label: "Training" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="bg-footer text-footer-foreground py-16">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">Eagle</span>
              <span className="text-secondary">Vision</span>
            </h3>
            <p className="text-footer-muted mb-4">
              Your complete technology ecosystem partner. We bridge the gap between 
              physical repair and digital innovation. Based in Pretoria East.
            </p>
            <div className="space-y-2 text-footer-muted">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +27 65 913 2527
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Eaglevision.dev30@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Pretoria East, South Africa
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-footer-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Business Hours</h3>
            <div className="space-y-2 text-footer-muted">
              <p>
                <strong className="text-footer-foreground">Repair Services:</strong> 24/7 Emergency
              </p>
              <p>
                <strong className="text-footer-foreground">Office Hours:</strong> Mon-Fri 8AM-6PM
              </p>
              <p>
                <strong className="text-footer-foreground">Training:</strong> Weekends & Evenings
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-footer-muted/30 pt-6 text-center text-footer-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Eagle Vision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
