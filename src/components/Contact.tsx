import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, FolderKanban, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Contact = () => {
  const [emergencyForm, setEmergencyForm] = useState({ name: "", phone: "", issue: "" });
  const [projectForm, setProjectForm] = useState({ company: "", type: "", description: "" });
  const [trainingForm, setTrainingForm] = useState({ name: "", email: "", interest: "" });

  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const issueLabels: Record<string, string> = {
      appliance: "Appliance (Fridge, Washer, etc.)",
      tv: "TV/Monitor",
      electrical: "Electrical Issue",
      smart: "Smart Device",
      other: "Other",
    };

    const subject = encodeURIComponent(`EMERGENCY REPAIR: ${issueLabels[emergencyForm.issue] || emergencyForm.issue}`);
    const body = encodeURIComponent(
      `Emergency Repair Request\n\n` +
      `Name: ${emergencyForm.name}\n` +
      `Phone: ${emergencyForm.phone}\n` +
      `Issue Type: ${issueLabels[emergencyForm.issue] || emergencyForm.issue}\n\n` +
      `Please call me back as soon as possible.`
    );
    
    window.location.href = `mailto:eaglevision.dev30@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening email client. We'll respond to your emergency ASAP!");
    setEmergencyForm({ name: "", phone: "", issue: "" });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We will contact you within 24 hours.");
    setProjectForm({ company: "", type: "", description: "" });
  };

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We will contact you within 24 hours.");
    setTrainingForm({ name: "", email: "", interest: "" });
  };

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the right contact method for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Repair Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Emergency Repair
            </h3>
            <form onSubmit={handleEmergencySubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={emergencyForm.name}
                onChange={(e) => setEmergencyForm({ ...emergencyForm, name: e.target.value })}
                required
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={emergencyForm.phone}
                onChange={(e) => setEmergencyForm({ ...emergencyForm, phone: e.target.value })}
                required
              />
              <Select
                value={emergencyForm.issue}
                onValueChange={(value) => setEmergencyForm({ ...emergencyForm, issue: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="What needs repair?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appliance">Appliance (Fridge, Washer, etc.)</SelectItem>
                  <SelectItem value="tv">TV/Monitor</SelectItem>
                  <SelectItem value="electrical">Electrical Issue</SelectItem>
                  <SelectItem value="smart">Smart Device</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" variant="destructive" className="w-full">
                Request Emergency Callback
              </Button>
            </form>
          </motion.div>

          {/* Project Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              Project Quote
            </h3>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <Input
                placeholder="Company/Project Name"
                value={projectForm.company}
                onChange={(e) => setProjectForm({ ...projectForm, company: e.target.value })}
              />
              <Select
                value={projectForm.type}
                onValueChange={(value) => setProjectForm({ ...projectForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smart-home">Smart Home/Business</SelectItem>
                  <SelectItem value="security">AI Security System</SelectItem>
                  <SelectItem value="software">Custom Software</SelectItem>
                  <SelectItem value="iot">IoT Network</SelectItem>
                  <SelectItem value="training">Training Program</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Describe your project needs..."
                className="min-h-[120px]"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              />
              <Button type="submit" className="w-full">
                Get Detailed Quote
              </Button>
            </form>
          </motion.div>

          {/* Training Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-secondary" />
              Training Inquiry
            </h3>
            <form onSubmit={handleTrainingSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={trainingForm.name}
                onChange={(e) => setTrainingForm({ ...trainingForm, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email"
                value={trainingForm.email}
                onChange={(e) => setTrainingForm({ ...trainingForm, email: e.target.value })}
              />
              <Select
                value={trainingForm.interest}
                onValueChange={(value) => setTrainingForm({ ...trainingForm, interest: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner Arduino</SelectItem>
                  <SelectItem value="advanced">Advanced IoT</SelectItem>
                  <SelectItem value="corporate">Corporate Training</SelectItem>
                  <SelectItem value="private">Private Tutoring</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" variant="secondary" className="w-full">
                Request Course Info
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
