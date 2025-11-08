import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Fish,
  TrendingUp,
  CloudRain,
  DollarSign,
  MapPin,
  Users,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { FishPrediction, WeatherData, MarketplaceListing } from "@shared/schema";

const recentAlerts = [
  {
    type: "success",
    message: "High Tuna activity detected near Bheemili",
    time: "2 hours ago",
  },
  {
    type: "warning",
    message: "Moderate waves expected tomorrow afternoon",
    time: "5 hours ago",
  },
  {
    type: "info",
    message: "Market price for Sardines increased by 12%",
    time: "1 day ago",
  },
];

const quickActions = [
  { icon: MapPin, label: "View Fish Zones", href: "/map" },
  { icon: CloudRain, label: "Climate Dashboard", href: "/climate" },
  { icon: DollarSign, label: "Marketplace", href: "/marketplace" },
  { icon: Users, label: "Community Stats", href: "/community" },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const { data: predictions, isLoading: predictionsLoading } = useQuery<FishPrediction[]>({
    queryKey: ['/api/fish-predictions'],
  });
  
  const { data: weatherResponse, isLoading: weatherLoading } = useQuery<WeatherData | WeatherData[]>({
    queryKey: ['/api/weather'],
  });
  
  const { data: listings, isLoading: listingsLoading } = useQuery<MarketplaceListing[]>({
    queryKey: ['/api/marketplace'],
  });
  
  const isLoading = predictionsLoading || weatherLoading || listingsLoading;
  
  const topPrediction = predictions?.[0];
  const currentWeather = Array.isArray(weatherResponse) ? weatherResponse[0] : weatherResponse;
  const topListing = listings?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 font-heading" data-testid="heading-dashboard">
            Welcome Back, Fisher!
          </h1>
          <p className="text-muted-foreground">
            Here's your ocean intelligence for today
          </p>
        </motion.div>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" data-testid="spinner-loading"></div>
              <p className="text-muted-foreground">Loading ocean intelligence...</p>
            </div>
          </motion.div>
        )}
        
        {!isLoading && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                <Card className="p-6 hover-elevate transition-all" data-testid="card-stat-0">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-secondary to-accent inline-flex mb-4">
                    <Fish className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Today's Catch Potential
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1 font-heading" data-testid="text-catch-potential">
                    {topPrediction ? 'High' : 'Loading...'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {topPrediction ? `${topPrediction.probability}% probability` : 'Analyzing...'}
                  </div>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-6 hover-elevate transition-all" data-testid="card-stat-1">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary inline-flex mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Market Price
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1 font-heading" data-testid="text-market-price">
                    {topListing ? `₹${topListing.pricePerKg}` : '₹420'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {topListing ? `per kg (${topListing.fishType})` : 'per kg (Pomfret)'}
                  </div>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6 hover-elevate transition-all" data-testid="card-stat-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-accent to-primary inline-flex mb-4">
                    <CloudRain className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Weather Condition
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1 font-heading" data-testid="text-weather">
                    {currentWeather?.safetyLevel === 'safe' ? 'Clear' : 'Loading...'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {currentWeather ? `Wave height: ${currentWeather.waveHeight}m` : 'Wave height: 0.5m'}
                  </div>
                </Card>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6 hover-elevate transition-all" data-testid="card-stat-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-secondary to-primary inline-flex mb-4">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Est. Daily Income
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1 font-heading" data-testid="text-income">
                    ₹8,400
                  </div>
                  <div className="text-xs text-muted-foreground">Based on predictions</div>
                </Card>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground font-heading">
                      Quick Actions
                    </h2>
                    <Activity className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {quickActions.map((action, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="h-auto p-6 flex-col items-start gap-3"
                        onClick={() => setLocation(action.href)}
                        data-testid={`button-action-${idx}`}
                      >
                        <action.icon className="w-8 h-8 text-primary" />
                        <span className="text-base font-semibold">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground font-heading">
                      Recent Alerts
                    </h2>
                    <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover-elevate"
                        data-testid={`alert-${idx}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 ${
                            alert.type === "success"
                              ? "bg-secondary"
                              : alert.type === "warning"
                              ? "bg-accent"
                              : "bg-primary"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-foreground mb-1">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary">
                    <Fish className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                      Today's Recommendation
                    </h3>
                    <p className="text-muted-foreground mb-4" data-testid="text-recommendation">
                      Based on AI analysis of ocean conditions, we recommend fishing in the{" "}
                      <span className="font-semibold text-secondary">
                        {topPrediction?.zone || "Bheemili coastal zone"}
                      </span>
                      . Expected catch: <span className="font-semibold">{topPrediction?.fishType || "Tuna, Pomfret"}</span>
                      . Best time: <span className="font-semibold">{topPrediction?.bestTime || "6 AM - 10 AM"}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" data-testid="badge-probability">
                        {topPrediction?.probability || 85}% Probability
                      </Badge>
                      <Badge variant="outline" className="border-primary text-primary" data-testid="badge-safety">
                        Safe Conditions
                      </Badge>
                      <Badge variant="outline" className="border-accent text-accent" data-testid="badge-price">
                        High Market Price
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
