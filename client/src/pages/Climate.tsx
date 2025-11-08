import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CloudRain,
  Wind,
  Waves,
  Thermometer,
  Sun,
  AlertTriangle,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const weatherData = {
  temperature: 28,
  windSpeed: 12,
  waveHeight: 0.5,
  visibility: 10,
  tideLevel: "Low",
  nextHighTide: "14:30",
  uvIndex: 7,
  safetyLevel: "safe",
};

const forecast = [
  { time: "6 AM", temp: 26, waves: 0.4, condition: "Clear" },
  { time: "9 AM", temp: 28, waves: 0.5, condition: "Sunny" },
  { time: "12 PM", temp: 31, waves: 0.6, condition: "Sunny" },
  { time: "3 PM", temp: 30, waves: 0.7, condition: "Partly Cloudy" },
  { time: "6 PM", temp: 28, waves: 0.5, condition: "Clear" },
];

const alerts = [
  {
    type: "safe",
    title: "Excellent Fishing Conditions",
    message: "Calm seas and clear skies make today ideal for fishing",
    icon: Sun,
  },
];

export default function Climate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-secondary/5 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 font-heading" data-testid="heading-climate">
            Climate Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time weather, tide, and safety information for Visakhapatnam
          </p>
        </motion.div>

        {/* Safety Alert */}
        {alerts.map((alert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card
              className={`p-6 ${
                alert.type === "safe"
                  ? "bg-secondary/10 border-secondary/30"
                  : "bg-accent/10 border-accent/30"
              }`}
              data-testid="card-safety-alert"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    alert.type === "safe"
                      ? "bg-secondary/20"
                      : "bg-accent/20"
                  }`}
                >
                  <alert.icon
                    className={`w-6 h-6 ${
                      alert.type === "safe" ? "text-secondary" : "text-accent"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1 font-heading">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <Badge
                  variant={alert.type === "safe" ? "secondary" : "destructive"}
                  data-testid="badge-safety-level"
                >
                  {alert.type === "safe" ? "Safe" : "Caution"}
                </Badge>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Main Weather Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Thermometer,
              label: "Temperature",
              value: `${weatherData.temperature}°C`,
              subValue: "Feels like 30°C",
              color: "from-accent to-primary",
            },
            {
              icon: Wind,
              label: "Wind Speed",
              value: `${weatherData.windSpeed} km/h`,
              subValue: "Northeast direction",
              color: "from-primary to-secondary",
            },
            {
              icon: Waves,
              label: "Wave Height",
              value: `${weatherData.waveHeight}m`,
              subValue: "Calm conditions",
              color: "from-secondary to-accent",
            },
            {
              icon: Eye,
              label: "Visibility",
              value: `${weatherData.visibility} km`,
              subValue: "Excellent",
              color: "from-accent to-secondary",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <Card className="p-6 hover-elevate transition-all backdrop-blur-sm bg-card/80" data-testid={`card-weather-${idx}`}>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} inline-flex mb-4`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1 font-heading">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.subValue}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Forecast */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 font-heading">
                Today's Forecast
              </h2>
              <div className="space-y-4">
                {forecast.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover-elevate transition-all"
                    data-testid={`forecast-${idx}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold text-foreground w-16">
                        {item.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{item.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Waves className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium">{item.waves}m</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.condition}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Tide & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Tide Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 font-heading">
                Tide Information
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Current Level</span>
                    <Badge variant="secondary">{weatherData.tideLevel} Tide</Badge>
                  </div>
                  <Progress value={30} className="h-2" data-testid="progress-tide" />
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      Next High Tide
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary font-heading">
                    {weatherData.nextHighTide}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected height: 1.8m
                  </p>
                </div>
              </div>
            </Card>

            {/* UV Index */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 font-heading">
                UV Index
              </h2>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-accent mb-2 font-heading">
                  {weatherData.uvIndex}
                </div>
                <Badge variant="destructive" data-testid="badge-uv">High Exposure</Badge>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Wear sunscreen and protective clothing
              </p>
            </Card>

            {/* Safety Recommendation */}
            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10">
              <h2 className="text-lg font-bold text-foreground mb-3 font-heading">
                Safety Recommendation
              </h2>
              <p className="text-sm text-muted-foreground">
                Conditions are excellent for fishing today. Remember to stay hydrated
                and check weather updates every 2 hours.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
