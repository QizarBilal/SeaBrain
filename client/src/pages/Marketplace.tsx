import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Fish,
  MapPin,
  Phone,
  TrendingUp,
  MessageSquare,
  Star,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useQuery } from "@tanstack/react-query";
import type { MarketplaceListing } from "@shared/schema";

const priceData = [
  { day: "Mon", pomfret: 400, tuna: 360, sardine: 170 },
  { day: "Tue", pomfret: 410, tuna: 370, sardine: 175 },
  { day: "Wed", pomfret: 415, tuna: 365, sardine: 180 },
  { day: "Thu", pomfret: 405, tuna: 375, sardine: 178 },
  { day: "Fri", pomfret: 420, tuna: 380, sardine: 180 },
];

// Mock marketplace listings for demo
const mockListings: MarketplaceListing[] = [
  {
    id: "1",
    userId: 1,
    fishType: "Pomfret",
    quantity: 50,
    price: 420,
    location: "Visakhapatnam Harbor",
    phone: "+91 98765 43210",
    description: "Fresh premium pomfret caught today morning. High quality, ideal for export.",
    status: "active",
    rating: 4.8,
    totalSales: 127,
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: 2,
    fishType: "Tuna",
    quantity: 120,
    price: 380,
    location: "Kakinada Port",
    phone: "+91 98765 43211",
    description: "Large yellowfin tuna, excellent condition. Bulk orders welcome.",
    status: "active",
    rating: 4.9,
    totalSales: 215,
    createdAt: new Date(),
  },
  {
    id: "3",
    userId: 3,
    fishType: "King Fish",
    quantity: 80,
    price: 450,
    location: "Machilipatnam",
    phone: "+91 98765 43212",
    description: "Premium king fish, perfect size. Direct from boat to market.",
    status: "active",
    rating: 4.7,
    totalSales: 98,
    createdAt: new Date(),
  },
  {
    id: "4",
    userId: 4,
    fishType: "Sardine",
    quantity: 200,
    price: 180,
    location: "Bheemunipatnam",
    phone: "+91 98765 43213",
    description: "Fresh sardines in bulk. Great for processing and canning.",
    status: "active",
    rating: 4.6,
    totalSales: 156,
    createdAt: new Date(),
  },
  {
    id: "5",
    userId: 5,
    fishType: "Prawns",
    quantity: 30,
    price: 650,
    location: "Visakhapatnam Harbor",
    phone: "+91 98765 43214",
    description: "Tiger prawns, premium quality. Refrigerated storage available.",
    status: "active",
    rating: 4.9,
    totalSales: 189,
    createdAt: new Date(),
  },
  {
    id: "6",
    userId: 6,
    fishType: "Mackerel",
    quantity: 150,
    price: 220,
    location: "Kakinada Port",
    phone: "+91 98765 43215",
    description: "Fresh mackerel, caught this morning. Competitive bulk pricing.",
    status: "active",
    rating: 4.5,
    totalSales: 143,
    createdAt: new Date(),
  },
];

export default function Marketplace() {
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  
  const { data: apiListings, isLoading, error } = useQuery<MarketplaceListing[]>({
    queryKey: ['/api/marketplace'],
  });
  
  // Use mock data if API fails or returns empty
  const displayListings = apiListings && apiListings.length > 0 ? apiListings : mockListings;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 font-heading" data-testid="heading-marketplace">
            Smart Marketplace
          </h1>
          <p className="text-muted-foreground">
            Connect directly with buyers and get fair prices
          </p>
        </motion.div>

        {isLoading && !error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" data-testid="spinner-loading"></div>
              <p className="text-muted-foreground">Loading marketplace...</p>
            </div>
          </div>
        )}
        
        {!isLoading && displayListings.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Listings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {displayListings.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-6 hover-elevate transition-all" data-testid={`card-listing-${idx}`}>
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                        {listing.sellerName?.split(" ").map((n) => n[0]).join("") || "??"}
                      </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground font-heading">
                            {listing.sellerName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{listing.sellerPort}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-semibold">4.8</span>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Fish Type</div>
                          <div className="flex items-center gap-2">
                            <Fish className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-foreground">
                              {listing.fishType}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Quantity</div>
                          <span className="font-semibold text-foreground">
                            {listing.quantity} kg
                          </span>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Price</div>
                          <span className="text-lg font-bold text-secondary font-heading">
                            ₹{listing.pricePerKg}/kg
                          </span>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Available</div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="font-medium text-foreground">{listing.availableDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Badge
                          variant={listing.quality === "Premium" ? "default" : "secondary"}
                          data-testid={`badge-quality-${idx}`}
                        >
                          {listing.quality}
                        </Badge>
                        {listing.availableDate === "Today" && (
                          <Badge variant="outline" className="border-accent text-accent">
                            Available Now
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => setSelectedListing(listing.id || null)}
                          data-testid={`button-chat-${idx}`}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Start Chat
                        </Button>
                        <Button variant="outline" size="sm" data-testid={`button-contact-${idx}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Price Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-bold text-foreground font-heading">
                  Price Trends
                </h2>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                      dataKey="day"
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
                    <Line
                      type="monotone"
                      dataKey="pomfret"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-1))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="tuna"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-2))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sardine"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-3))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-1" />
                    <span className="text-muted-foreground">Pomfret</span>
                  </div>
                  <span className="font-semibold text-foreground">₹420/kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-2" />
                    <span className="text-muted-foreground">Tuna</span>
                  </div>
                  <span className="font-semibold text-foreground">₹380/kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-3" />
                    <span className="text-muted-foreground">Sardine</span>
                  </div>
                  <span className="font-semibold text-foreground">₹180/kg</span>
                </div>
              </div>
            </Card>

            {/* Profit Estimator */}
            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10">
              <h3 className="text-lg font-bold text-foreground mb-4 font-heading">
                Profit Estimator
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Today's Average Price</span>
                  <span className="font-semibold text-foreground">₹327/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Your Est. Catch</span>
                  <span className="font-semibold text-foreground">40 kg</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-foreground">Expected Revenue</span>
                  <span className="text-xl font-bold text-secondary font-heading">
                    ₹13,080
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
        )}

        {/* Chat Drawer */}
        {selectedListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4"
            onClick={() => setSelectedListing(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="w-96 max-w-full"
            >
              <Card className="p-6">
                <h3 className="font-bold text-foreground mb-4 font-heading">
                  Chat with Seller
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat feature coming soon! For now, please use the contact button to reach
                  the seller directly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedListing(null)}
                  data-testid="button-close-chat"
                >
                  Close
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
