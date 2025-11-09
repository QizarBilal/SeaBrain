import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { WaveDivider } from "@/components/WaveDivider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      <Hero />
      
      <WaveDivider className="h-24 -mt-1" />
      
      <AboutSection />
      
      <WaveDivider className="h-24 -mt-1 rotate-180" />
      
      <FeatureShowcase />
      
      <WaveDivider className="h-24 -mt-1" />
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
              Ready to Transform Your Fishing?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join 2000+ fishermen who are already using SEABRAIN to increase their catch and income
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              onClick={() => setLocation("/dashboard")}
              data-testid="button-cta-dashboard"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-card-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2 font-heading">
              SEABRAIN
            </h3>
            <p className="text-sm text-muted-foreground">
              Empowering India's Fishermen through Ocean Intelligence
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
            <span>6+ Months of Development</span>
            <span>•</span>
            <span>AI-Powered Platform</span>
            <span>•</span>
            <span>Sustainable Fishing Initiative</span>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2025 SEABRAIN. Supporting UN SDG-14: Life Below Water & Coastal Communities
          </div>
        </div>
      </footer>
    </div>
  );
}
