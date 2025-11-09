import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Phone, Mail, MapPin, Send, LifeBuoy, Linkedin, Code, FileText, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactSOS() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSOSClick = () => {
    toast({
      title: "🚨 SOS Request Recorded (Demo)",
      description: "Your emergency request has been logged. For real emergencies, contact local coastal guards immediately.",
      variant: "destructive",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "✅ Message Sent Successfully!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card pt-24 pb-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-heading">
          Contact & Emergency SOS
        </h1>
        <p className="text-lg text-muted-foreground">
          Get help or reach out to us for support and assistance
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Column - SOS & Contact Info */}
        <div className="space-y-6">
          {/* Emergency SOS Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
                <h2 className="text-2xl font-bold text-foreground font-heading">
                  Emergency SOS
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                In case of emergency at sea, press the button below to send an SOS alert.
              </p>

              <Button
                onClick={handleSOSClick}
                variant="destructive"
                className="w-full h-16 text-xl font-bold"
              >
                <LifeBuoy className="w-6 h-6 mr-3" />
                SEND SOS HELP
              </Button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                For real emergencies, contact local coastal guards immediately at 108
              </p>
            </Card>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-foreground mb-4 font-heading">
              Contact Information
            </h3>

            {/* Address Card */}
            <Card className="p-4 hover:bg-accent transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Address</h4>
                  <p className="text-muted-foreground text-sm">
                    Fisheries Help Center<br />
                    Visakhapatnam, Andhra Pradesh<br />
                    India - 530001
                  </p>
                </div>
              </div>
            </Card>

            {/* Phone Card */}
            <Card className="p-4 hover:bg-accent transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-muted-foreground text-sm">
                    +91-891-2345678 (Office)<br />
                    +91-9876543210 (Support)<br />
                    Emergency: 108
                  </p>
                </div>
              </div>
            </Card>

            {/* Email Card */}
            <Card className="p-4 hover:bg-accent transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">
                    support@seabrain.in<br />
                    emergency@seabrain.in<br />
                    info@seabrain.in
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Email Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-heading">
              Send us a Message
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Have questions or need assistance? We're here to help!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="mb-2 block">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="mb-2 block">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 rounded-lg bg-secondary border">
              <p className="text-xs text-muted-foreground text-center">
                We typically respond within 24 hours during business days
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Meet the Team Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-heading">
            Meet the Minds Behind SeaBrain
          </h2>
          <p className="text-lg text-muted-foreground">
            Passionate innovators dedicated to empowering India's fishing communities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Founder Card - Sakthivel S M */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="relative h-64 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                <img
                  src="/sakthivel.jpg"
                  alt="Sakthivel S M - Founder"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                    Founder
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-1 font-heading">
                    Sakthivel S M
                  </h3>
                  <p className="text-sm font-semibold text-primary">
                    Founder, Brainstormer & Documentor
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <p>Visionary behind SeaBrain's mission to revolutionize India's fishing industry through AI and ocean intelligence</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <p>Expert in strategic planning, documentation, and conceptualizing innovative solutions for coastal communities</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <p>Passionate advocate for sustainable fishing practices and empowering fishermen with technology</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href="mailto:s.m.sakthivelofficial@gmail.com"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">s.m.sakthivelofficial@gmail.com</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/callmedataman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">linkedin.com/in/callmedataman</span>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Co-Founder Card - Mohammed Qizar Bilal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-secondary/50">
              <div className="relative h-64 bg-gradient-to-br from-secondary/20 via-accent/20 to-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                <img
                  src="/qizarbilal.png"
                  alt="Mohammed Qizar Bilal - Co-Founder"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <Badge className="bg-secondary text-secondary-foreground text-sm px-3 py-1">
                    Co-Founder
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-1 font-heading">
                    Mohammed Qizar Bilal
                  </h3>
                  <p className="text-sm font-semibold text-secondary">
                    Co-Founder, Technical Implementor & Designer
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Code className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                    <p>Full-stack architect and developer who brought SeaBrain's vision to life with cutting-edge technology</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Palette className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                    <p>Expert in UI/UX design, crafting intuitive and beautiful interfaces for fishermen and coastal communities</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Code className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                    <p>Specializes in AI integration, real-time data systems, and building scalable ocean intelligence platforms</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href="mailto:bilalqizar@gmail.com"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-secondary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Mail className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="font-medium">bilalqizar@gmail.com</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/mohammed-qizar-bilal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-secondary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Linkedin className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="font-medium">linkedin.com/in/mohammed-qizar-bilal</span>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
