import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Phone, Mail, MapPin, Send, LifeBuoy } from "lucide-react";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-to-b from-[#001233] via-[#003d66] to-[#0066a1] pt-20 px-4 pb-12">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-heading">
          🚨 Contact & Emergency SOS
        </h1>
        <p className="text-lg text-blue-200">
          Get help or reach out to us for support and assistance
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        {/* Left Column - SOS & Contact Info */}
        <div className="space-y-6">
          {/* Emergency SOS Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-red-500/20 to-red-700/20 backdrop-blur-lg border-red-500/30 relative overflow-hidden">
              {/* Animated Pulse Background */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/30 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white font-heading">
                    Emergency SOS
                  </h2>
                </div>

                <p className="text-red-200 mb-6">
                  In case of emergency at sea, press the button below to send an SOS alert.
                </p>

                <Button
                  onClick={handleSOSClick}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg shadow-red-500/50"
                >
                  <LifeBuoy className="w-6 h-6 mr-3" />
                  🚨 SEND SOS HELP
                </Button>

                <p className="text-xs text-red-300 mt-4 text-center">
                  For real emergencies, contact local coastal guards immediately at 108
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-4 font-heading">
              Contact Information
            </h3>

            {/* Address Card */}
            <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Address</h4>
                  <p className="text-blue-200 text-sm">
                    Fisheries Help Center<br />
                    Visakhapatnam, Andhra Pradesh<br />
                    India - 530001
                  </p>
                </div>
              </div>
            </Card>

            {/* Phone Card */}
            <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <p className="text-blue-200 text-sm">
                    +91-891-2345678 (Office)<br />
                    +91-9876543210 (Support)<br />
                    Emergency: 108
                  </p>
                </div>
              </div>
            </Card>

            {/* Email Card */}
            <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <p className="text-blue-200 text-sm">
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
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2 font-heading">
              Send us a Message
            </h2>
            <p className="text-blue-200 text-sm mb-6">
              Have questions or need assistance? We're here to help!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
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
                <Label htmlFor="email" className="text-white mb-2 block">
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
                <Label htmlFor="message" className="text-white mb-2 block">
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
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-blue-200 text-center">
                📧 We typically respond within 24 hours during business days
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Wave Divider Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative mt-16 h-32 overflow-hidden"
      >
        <svg
          className="absolute bottom-0 w-full h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="rgba(0, 229, 255, 0.1)"
            d="M0,128L48,133.3C96,139,192,149,288,165.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,128L48,133.3C96,139,192,149,288,165.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,165.3C96,171,192,181,288,197.3C384,213,480,235,576,229.3C672,224,768,192,864,186.7C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,128L48,133.3C96,139,192,149,288,165.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
