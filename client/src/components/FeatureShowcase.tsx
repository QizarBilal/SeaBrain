import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Navigation,
  MessageSquare,
  Cloud,
  TrendingUp,
  Users,
  Smartphone,
  Wifi,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Fish Prediction",
    subtitle: "Machine Learning Powered",
    description:
      "Advanced algorithms analyze ocean currents, temperature, and historical data to predict optimal fishing zones with 85% accuracy",
    gradient: "from-primary to-secondary",
    badge: "Core Feature",
  },
  {
    icon: Navigation,
    title: "Offline GPS Navigation",
    subtitle: "Works Without Internet",
    description:
      "Pre-loaded maps and GPS tracking ensure you never get lost at sea, even in areas with zero network coverage",
    gradient: "from-secondary to-accent",
    badge: "Always Available",
  },
  {
    icon: MessageSquare,
    title: "SEA-Assist Chatbot",
    subtitle: "Multilingual AI Assistant",
    description:
      "Ask questions in English, Telugu, or Tamil and get instant answers about weather, fish zones, and best practices",
    gradient: "from-accent to-primary",
    badge: "24/7 Support",
  },
  {
    icon: Cloud,
    title: "Real-Time Climate Alerts",
    subtitle: "Weather & Tide Monitoring",
    description:
      "Get push notifications for dangerous weather conditions, high waves, and optimal tide timings before you set sail",
    gradient: "from-primary to-accent",
    badge: "Safety First",
  },
  {
    icon: TrendingUp,
    title: "Smart Marketplace",
    subtitle: "Fair Price Discovery",
    description:
      "Connect directly with buyers, track market prices, and maximize profits with real-time demand insights",
    gradient: "from-secondary to-primary",
    badge: "Maximize Profit",
  },
  {
    icon: Users,
    title: "Community Network",
    subtitle: "Fisher to Fisher",
    description:
      "Share catches, exchange tips, and build relationships with fellow fishermen across Andhra Pradesh",
    gradient: "from-accent to-secondary",
    badge: "Growing Community",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    subtitle: "Built for Fishermen",
    description:
      "Simple interface designed for one-handed use on boats, with large buttons and clear visuals",
    gradient: "from-primary to-secondary",
    badge: "Easy to Use",
  },
  {
    icon: Wifi,
    title: "Offline Sync",
    subtitle: "Auto-Update on Network",
    description:
      "All your data syncs automatically when you return to shore, ensuring nothing is lost at sea",
    gradient: "from-secondary to-accent",
    badge: "Smart Sync",
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Ocean Intelligence
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every feature designed to make your fishing safer, smarter, and more profitable
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className="p-6 h-full hover-elevate transition-all duration-300 group relative overflow-hidden"
                data-testid={`card-feature-${idx}`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative">
                  {/* Badge */}
                  <Badge
                    variant="secondary"
                    className="mb-4 text-xs"
                    data-testid={`badge-feature-${idx}`}
                  >
                    {feature.badge}
                  </Badge>

                  {/* Icon */}
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} inline-flex mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-1 font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary font-medium mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
