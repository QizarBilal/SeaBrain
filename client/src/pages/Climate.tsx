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
  Droplets,
  Compass,
  Moon,
  CloudSnow,
  CloudDrizzle,
  Navigation,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const weatherData = {
  temperature: 28,
  windSpeed: 12,
  waveHeight: 0.5,
  visibility: 10,
  humidity: 75,
  pressure: 1013,
  tideLevel: "Low",
  nextHighTide: "14:30",
  uvIndex: 7,
  safetyLevel: "safe",
  windDirection: 45, // degrees
  sunrise: "05:42",
  sunset: "17:48",
  moonPhase: "Waxing Gibbous",
};

const forecast = [
  { time: "6 AM", temp: 26, waves: 0.4, condition: "Clear", icon: Sun, wind: 10 },
  { time: "9 AM", temp: 28, waves: 0.5, condition: "Sunny", icon: Sun, wind: 11 },
  { time: "12 PM", temp: 31, waves: 0.6, condition: "Sunny", icon: Sun, wind: 13 },
  { time: "3 PM", temp: 30, waves: 0.7, condition: "Partly Cloudy", icon: CloudDrizzle, wind: 14 },
  { time: "6 PM", temp: 28, waves: 0.5, condition: "Clear", icon: Sun, wind: 12 },
];

const weekForecast = [
  { day: "Mon", high: 32, low: 25, condition: "Sunny", rain: 10 },
  { day: "Tue", high: 31, low: 26, condition: "Partly Cloudy", rain: 20 },
  { day: "Wed", high: 30, low: 25, condition: "Cloudy", rain: 40 },
  { day: "Thu", high: 29, low: 24, condition: "Light Rain", rain: 60 },
  { day: "Fri", high: 31, low: 26, condition: "Sunny", rain: 15 },
  { day: "Sat", high: 32, low: 27, condition: "Clear", rain: 5 },
  { day: "Sun", high: 33, low: 26, condition: "Sunny", rain: 10 },
];

const oceanConditions = [
  { depth: "0-10m", temp: 28, salinity: 35, current: "Weak" },
  { depth: "10-20m", temp: 26, salinity: 35.5, current: "Moderate" },
  { depth: "20-50m", temp: 24, salinity: 36, current: "Strong" },
  { depth: "50m+", temp: 22, salinity: 36.5, current: "Very Strong" },
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
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-secondary/5 pt-24 pb-12 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 font-heading" data-testid="heading-climate">
                Climate Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time weather, tide, and safety information for Visakhapatnam
              </p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="hidden md:block"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-2xl flex items-center justify-center">
                <Sun className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </div>
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
              className={`p-6 relative overflow-hidden ${
                alert.type === "safe"
                  ? "bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent border-secondary/30"
                  : "bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border-accent/30"
              }`}
              data-testid="card-safety-alert"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: [-1000, 1000] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
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
                </motion.div>
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
                  {alert.type === "safe" ? "✓ Safe" : "⚠ Caution"}
                </Badge>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* AI Weather Assistant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border-cyan-500/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  animate={{ 
                    boxShadow: ['0 0 20px rgba(6, 182, 212, 0.3)', '0 0 40px rgba(6, 182, 212, 0.6)', '0 0 20px rgba(6, 182, 212, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600"
                >
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-2 font-heading flex items-center gap-2">
                    AI Weather Assistant
                    <Badge variant="secondary" className="text-xs">LIVE</Badge>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Real-time AI-powered analysis and recommendations based on current weather patterns
                  </p>
                </div>
              </div>

              {/* AI Insights Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Today's Recommendation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="font-semibold text-foreground">Today's AI Recommendation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Based on current weather patterns, sea conditions are optimal for fishing between <span className="text-cyan-400 font-semibold">6:00 AM - 11:00 AM</span>. Wind speeds will remain favorable, and wave heights are minimal.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">95% confidence level</span>
                  </div>
                </motion.div>

                {/* Weather Pattern Analysis */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <h3 className="font-semibold text-foreground">Pattern Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    AI detected a <span className="text-blue-400 font-semibold">high-pressure system</span> moving in from the northeast. Expect stable conditions for the next 48 hours with minimal rainfall probability.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">Satellite data analyzed</span>
                  </div>
                </motion.div>

                {/* Safety Advisory */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <h3 className="font-semibold text-foreground">Safety Advisory</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    UV index will peak at <span className="text-orange-400 font-semibold">7 (High)</span> around 1:00 PM. AI recommends applying SPF 50+ sunscreen every 2 hours and wearing protective clothing.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Health precaution</span>
                  </div>
                </motion.div>

                {/* Best Fishing Zones */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <h3 className="font-semibold text-foreground">Optimal Zones</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    AI predicts highest fish activity in <span className="text-cyan-400 font-semibold">Zone A3 and B7</span> based on current temperature gradients (26-28°C) and plankton bloom detection via satellite imaging.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400">
                    <Compass className="w-4 h-4" />
                    <span className="font-medium">ML model prediction</span>
                  </div>
                </motion.div>
              </div>

              {/* AI Processing Status */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full"
                  />
                  <span className="text-sm font-medium text-foreground">AI continuously monitoring 15 weather parameters</span>
                </div>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                  Updated 2 min ago
                </Badge>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Animated Weather Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {/* Animated Wave Pattern */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-24 border-b-2 border-primary/30"
                  style={{ top: `${i * 15}%` }}
                  animate={{
                    x: [-100, 100],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground font-heading flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-primary" />
                  Ocean Conditions Map
                </h2>
                <Badge variant="outline" className="text-sm">
                  Live Data
                </Badge>
              </div>

              {/* Simplified Ocean Depth Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {oceanConditions.map((condition, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="relative"
                  >
                    <div className="p-4 rounded-lg bg-gradient-to-b from-primary/20 to-primary/5 border border-primary/30 relative overflow-hidden">
                      {/* Animated Water Effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-500/20 to-transparent"
                        animate={{
                          height: ["60%", "70%", "60%"],
                        }}
                        transition={{
                          duration: 2 + idx * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="text-xs text-muted-foreground mb-2 font-semibold">
                          {condition.depth}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Thermometer className="w-3 h-3" />
                              Temp
                            </span>
                            <span className="text-sm font-bold text-foreground">
                              {condition.temp}°C
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Droplets className="w-3 h-3" />
                              Salinity
                            </span>
                            <span className="text-sm font-bold text-foreground">
                              {condition.salinity}‰
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Waves className="w-3 h-3" />
                              Current
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {condition.current}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Weather Stats - Enhanced with Animations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Thermometer,
              label: "Temperature",
              value: `${weatherData.temperature}°C`,
              subValue: "Feels like 30°C",
              color: "from-orange-400 to-red-500",
              bgPattern: "bg-gradient-to-t",
              animate: { scale: [1, 1.05, 1] },
            },
            {
              icon: Wind,
              label: "Wind Speed",
              value: `${weatherData.windSpeed} km/h`,
              subValue: "Northeast direction",
              color: "from-cyan-400 to-blue-500",
              bgPattern: "bg-gradient-to-r",
              animate: { x: [-5, 5, -5] },
            },
            {
              icon: Waves,
              label: "Wave Height",
              value: `${weatherData.waveHeight}m`,
              subValue: "Calm conditions",
              color: "from-blue-400 to-cyan-600",
              bgPattern: "bg-gradient-to-b",
              animate: { y: [-5, 5, -5] },
            },
            {
              icon: Eye,
              label: "Visibility",
              value: `${weatherData.visibility} km`,
              subValue: "Excellent",
              color: "from-purple-400 to-pink-500",
              bgPattern: "bg-gradient-to-br",
              animate: { opacity: [0.8, 1, 0.8] },
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <Card className="p-6 hover-elevate transition-all backdrop-blur-sm bg-card/80 relative overflow-hidden group" data-testid={`card-weather-${idx}`}>
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 ${stat.bgPattern} from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                <motion.div
                  animate={stat.animate}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} inline-flex mb-4 shadow-lg relative z-10`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-sm text-muted-foreground mb-1 relative z-10">
                  {stat.label}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1 font-heading relative z-10">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground relative z-10">{stat.subValue}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Row with Infographic Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Droplets, label: "Humidity", value: `${weatherData.humidity}%`, color: "text-blue-500" },
            { icon: Compass, label: "Wind Dir", value: `${weatherData.windDirection}° NE`, color: "text-green-500" },
            { icon: ArrowUp, label: "Sunrise", value: weatherData.sunrise, color: "text-orange-500" },
            { icon: ArrowDown, label: "Sunset", value: weatherData.sunset, color: "text-purple-500" },
          ].map((item, idx) => (
            <Card key={idx} className="p-4 text-center hover:shadow-lg transition-all">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              </motion.div>
              <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
              <div className="text-lg font-bold text-foreground font-heading">{item.value}</div>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Forecast - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -mr-32 -mt-32" />
              
              <h2 className="text-xl font-bold text-foreground mb-6 font-heading relative z-10">
                Today's Hourly Forecast
              </h2>
              <div className="space-y-3 relative z-10">
                {forecast.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/30 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all group cursor-pointer"
                    data-testid={`forecast-${idx}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-sm font-semibold text-foreground w-20">
                        {item.time}
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      >
                        <item.icon className="w-6 h-6 text-amber-500" />
                      </motion.div>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">{item.temp}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Waves className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{item.waves}m</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-cyan-500" />
                          <span className="text-sm font-medium">{item.wind} km/h</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs group-hover:bg-primary group-hover:text-white transition-all">
                      {item.condition}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* 7-Day Forecast with Visual Chart */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 font-heading">
                7-Day Forecast
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {weekForecast.map((day, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + idx * 0.05 }}
                    className="text-center"
                  >
                    <div className="text-xs font-semibold text-muted-foreground mb-2">
                      {day.day}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 rounded-lg bg-gradient-to-b from-primary/10 to-primary/5 mb-2"
                    >
                      <Sun className="w-6 h-6 text-amber-500 mx-auto" />
                    </motion.div>
                    <div className="text-sm font-bold text-foreground">{day.high}°</div>
                    <div className="text-xs text-muted-foreground">{day.low}°</div>
                    <div className="mt-2 h-12 bg-muted/20 rounded-full relative overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${day.rain}%` }}
                        transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{day.rain}%</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Tide & Additional Info - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            {/* Tide Information with Animation */}
            <Card className="p-6 relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/20 to-transparent"
                animate={{
                  height: ["30%", "40%", "30%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <h2 className="text-xl font-bold text-foreground mb-6 font-heading relative z-10">
                Tide Information
              </h2>
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Current Level</span>
                    <Badge variant="secondary" className="animate-pulse">{weatherData.tideLevel} Tide</Badge>
                  </div>
                  <Progress value={30} className="h-3" data-testid="progress-tide" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                    </motion.div>
                    <span className="text-sm font-semibold text-foreground">
                      Next High Tide
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-blue-500 font-heading mb-1">
                    {weatherData.nextHighTide}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expected height: 1.8m
                  </p>
                </motion.div>

                {/* Tide Chart Visualization */}
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2">Today's Tide Pattern</div>
                  <div className="h-20 flex items-end justify-between gap-1">
                    {[0.8, 1.2, 1.6, 1.8, 1.5, 1.0, 0.7, 0.5, 0.6, 1.0, 1.4, 1.7].map((height, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${height * 40}%` }}
                        transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* UV Index with Animated Gauge */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 font-heading">
                UV Index
              </h2>
              <div className="text-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative w-32 h-32 mx-auto mb-4"
                >
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted/20"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-orange-500"
                      initial={{ strokeDasharray: "0 352" }}
                      animate={{ strokeDasharray: `${(weatherData.uvIndex / 11) * 352} 352` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-orange-500 font-heading">
                      {weatherData.uvIndex}
                    </div>
                  </div>
                </motion.div>
                <Badge variant="destructive" data-testid="badge-uv" className="text-sm">
                  ⚠️ High Exposure
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Wear sunscreen and protective clothing. Avoid prolonged sun exposure between 10 AM - 4 PM.
              </p>
            </Card>

            {/* Moon Phase */}
            <Card className="p-6 bg-gradient-to-br from-slate-900/10 to-slate-800/10">
              <h2 className="text-lg font-bold text-foreground mb-4 font-heading flex items-center gap-2">
                <Moon className="w-5 h-5 text-slate-400" />
                Moon Phase
              </h2>
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-lg"
                />
                <div className="text-sm font-semibold text-foreground">{weatherData.moonPhase}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Good fishing conditions during this phase
                </p>
              </div>
            </Card>

            {/* Safety Recommendation with Animation */}
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/20 to-transparent rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h2 className="text-lg font-bold text-foreground mb-3 font-heading relative z-10 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✓
                </motion.div>
                Safety Recommendation
              </h2>
              <p className="text-sm text-muted-foreground relative z-10 leading-relaxed">
                Conditions are excellent for fishing today. Remember to stay hydrated
                and check weather updates every 2 hours. Carry emergency equipment.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* AI Weather Simulation & Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-500/30 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundImage: [
                  'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2 font-heading flex items-center gap-2">
                    <motion.svg 
                      className="w-7 h-7 text-indigo-500"
                      viewBox="0 0 24 24" 
                      fill="none"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                    AI Weather Simulation
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Advanced machine learning models predicting conditions for next 7 days
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    ML Powered
                  </Badge>
                </motion.div>
              </div>

              {/* Simulation Metrics */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-card/60 backdrop-blur border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                    <h3 className="text-sm font-semibold text-foreground">Accuracy Rate</h3>
                  </div>
                  <div className="text-3xl font-bold text-green-500 mb-1 font-heading">92.4%</div>
                  <p className="text-xs text-muted-foreground">Based on 10,000+ data points</p>
                  <Progress value={92} className="h-2 mt-3" />
                </div>

                <div className="p-4 rounded-lg bg-card/60 backdrop-blur border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      className="w-3 h-3 bg-blue-500 rounded-full"
                    />
                    <h3 className="text-sm font-semibold text-foreground">Data Sources</h3>
                  </div>
                  <div className="text-3xl font-bold text-blue-500 mb-1 font-heading">24</div>
                  <p className="text-xs text-muted-foreground">Satellites, buoys, weather stations</p>
                  <div className="flex gap-1 mt-3">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 h-2 bg-blue-500/30 rounded"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/60 backdrop-blur border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                      className="w-3 h-3 bg-purple-500 rounded-full"
                    />
                    <h3 className="text-sm font-semibold text-foreground">Update Frequency</h3>
                  </div>
                  <div className="text-3xl font-bold text-purple-500 mb-1 font-heading">15m</div>
                  <p className="text-xs text-muted-foreground">Real-time continuous learning</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-purple-500">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"
                    />
                    <span>Live updates</span>
                  </div>
                </div>
              </div>

              {/* AI Predictions Timeline */}
              <div className="p-5 rounded-lg bg-gradient-to-br from-card/80 to-card/40 backdrop-blur border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  48-Hour AI Forecast Timeline
                </h3>
                
                <div className="space-y-3">
                  {[
                    { time: "Next 6 hours", condition: "Optimal", temp: "27-29°C", waves: "0.3-0.5m", confidence: 98, color: "green" },
                    { time: "6-12 hours", condition: "Good", temp: "28-30°C", waves: "0.5-0.8m", confidence: 95, color: "green" },
                    { time: "12-24 hours", condition: "Moderate", temp: "26-28°C", waves: "0.8-1.2m", confidence: 89, color: "yellow" },
                    { time: "24-48 hours", condition: "Caution", temp: "25-27°C", waves: "1.2-1.5m", confidence: 82, color: "orange" },
                  ].map((prediction, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-all border border-border/50"
                    >
                      <div className="flex-shrink-0 w-24">
                        <div className="text-xs font-semibold text-muted-foreground">{prediction.time}</div>
                      </div>
                      <div className="flex-1 flex items-center gap-4">
                        <Badge 
                          variant={prediction.color === "green" ? "secondary" : "outline"}
                          className={`${
                            prediction.color === "green" ? "bg-green-500/20 text-green-600 dark:text-green-400" :
                            prediction.color === "yellow" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                            "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                          }`}
                        >
                          {prediction.condition}
                        </Badge>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Thermometer className="w-3 h-3" />
                            {prediction.temp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Waves className="w-3 h-3" />
                            {prediction.waves}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-sm font-bold text-foreground">{prediction.confidence}%</div>
                        <div className="text-xs text-muted-foreground">confidence</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Neural Network Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Neural Network Active</div>
                      <div className="text-xs text-muted-foreground">Processing weather patterns from Indian Ocean region</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ● LIVE
                      </motion.span>
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
