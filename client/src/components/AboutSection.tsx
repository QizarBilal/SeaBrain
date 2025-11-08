import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Fish,
  Cloud,
  Navigation,
  MessageSquare,
  TrendingUp,
  Wifi,
  CloudRain,
} from "lucide-react";

const problems = [
  {
    icon: Fish,
    title: "Unpredictable Catches",
    description: "Fishermen waste fuel searching in wrong zones",
  },
  {
    icon: CloudRain,
    title: "Climate Risks",
    description: "Sudden weather changes endanger lives at sea",
  },
  {
    icon: TrendingUp,
    title: "Market Uncertainty",
    description: "Poor pricing knowledge leads to losses",
  },
];

const solutions = [
  {
    icon: Brain,
    title: "AI Fish Prediction",
    description: "ML-powered zone recommendations with 85% accuracy",
    color: "from-primary to-secondary",
  },
  {
    icon: Navigation,
    title: "Offline Navigation",
    description: "GPS guidance works without internet connectivity",
    color: "from-secondary to-accent",
  },
  {
    icon: MessageSquare,
    title: "SEA-Assist Chatbot",
    description: "Multilingual AI assistant in Telugu, Tamil, English",
    color: "from-accent to-primary",
  },
  {
    icon: Cloud,
    title: "Real-time Climate Alerts",
    description: "Weather, tide, and safety warnings on your phone",
    color: "from-primary to-accent",
  },
];

const impacts = [
  {
    value: "40%",
    label: "Fuel Cost Reduction",
    icon: TrendingUp,
  },
  {
    value: "2000+",
    label: "Fishers Empowered",
    icon: Fish,
  },
  {
    value: "85%",
    label: "Prediction Accuracy",
    icon: Brain,
  },
  {
    value: "100%",
    label: "Offline Capability",
    icon: Wifi,
  },
];

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
            Ocean Intelligence Meets{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Human Wisdom
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transforming traditional fishing with cutting-edge AI and satellite technology
          </p>
        </motion.div>

        {/* Problem → Solution → Impact Flow */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-destructive/10 text-destructive font-semibold text-sm mb-3">
                Problem
              </span>
              <h3 className="text-2xl font-bold text-foreground font-heading">
                Current Challenges
              </h3>
            </div>
            <div className="space-y-4">
              {problems.map((problem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Card className="p-4 hover-elevate transition-all" data-testid={`card-problem-${idx}`}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <problem.icon className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {problem.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-3">
                Solution
              </span>
              <h3 className="text-2xl font-bold text-foreground font-heading">
                Our Technology
              </h3>
            </div>
            <div className="space-y-4">
              {solutions.map((solution, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <Card className="p-4 hover-elevate transition-all overflow-hidden relative" data-testid={`card-solution-${idx}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-5`} />
                    <div className="relative flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${solution.color}`}>
                        <solution.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {solution.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-3">
                Impact
              </span>
              <h3 className="text-2xl font-bold text-foreground font-heading">
                Real Results
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {impacts.map((impact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <Card className="p-6 text-center hover-elevate transition-all" data-testid={`card-impact-${idx}`}>
                    <impact.icon className="w-8 h-8 mx-auto mb-3 text-secondary" />
                    <div className="text-3xl font-bold text-primary mb-1 font-heading">
                      {impact.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {impact.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
