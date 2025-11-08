import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Fish, Users, TrendingUp, MapPin } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const regionData = [
  { region: "Visakhapatnam", fishers: 450, avgCatch: 45 },
  { region: "Bheemili", fishers: 320, avgCatch: 52 },
  { region: "Yarada", fishers: 180, avgCatch: 38 },
  { region: "Gangavaram", fishers: 250, avgCatch: 48 },
];

const catchTypeData = [
  { name: "Tuna", value: 32, color: "hsl(var(--chart-1))" },
  { name: "Pomfret", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Sardine", value: 22, color: "hsl(var(--chart-3))" },
  { name: "Prawns", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 6, color: "hsl(var(--chart-5))" },
];

const stats = [
  {
    icon: Users,
    label: "Total Fishermen",
    value: "1,200",
    change: "+8% this month",
    color: "from-primary to-secondary",
  },
  {
    icon: Fish,
    label: "Average Daily Catch",
    value: "45.8 kg",
    change: "+12% vs last month",
    color: "from-secondary to-accent",
  },
  {
    icon: TrendingUp,
    label: "Market Contribution",
    value: "₹2.4M",
    change: "+15% growth",
    color: "from-accent to-primary",
  },
  {
    icon: MapPin,
    label: "Active Regions",
    value: "12",
    change: "Across AP coast",
    color: "from-primary to-accent",
  },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 font-heading" data-testid="heading-community">
            Community Analytics
          </h1>
          <p className="text-muted-foreground">
            Collective insights from the SEABRIAN fishing community
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-6 hover-elevate transition-all" data-testid={`card-stat-${idx}`}>
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
                <div className="text-xs text-secondary font-medium">{stat.change}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Regional Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 font-heading">
                Regional Distribution
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                      dataKey="region"
                      tick={{ fontSize: 12 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="fishers"
                      fill="hsl(var(--chart-1))"
                      radius={[8, 8, 0, 0]}
                      name="Number of Fishers"
                    />
                    <Bar
                      dataKey="avgCatch"
                      fill="hsl(var(--chart-2))"
                      radius={[8, 8, 0, 0]}
                      name="Avg Catch (kg)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Catch Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 font-heading">
                Catch Type Distribution
              </h2>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={catchTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {catchTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Regional Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6 font-heading">
              Regional Performance
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regionData.map((region, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 hover-elevate transition-all"
                  data-testid={`region-${idx}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">{region.region}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fishers</span>
                      <span className="font-semibold text-foreground">
                        {region.fishers}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Catch</span>
                      <span className="font-semibold text-secondary">
                        {region.avgCatch} kg/day
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Community Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">
                Community Impact
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Together, the SEABRIAN community has reduced fuel costs by{" "}
                <span className="font-bold text-secondary">40%</span>, increased daily
                catch by <span className="font-bold text-secondary">32%</span>, and
                improved market prices by{" "}
                <span className="font-bold text-secondary">18%</span>
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/20 border border-secondary/30">
                <span className="text-sm font-medium text-foreground">
                  Supporting UN SDG-14: Life Below Water
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
