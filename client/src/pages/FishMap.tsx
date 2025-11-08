import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Fish, Navigation, TrendingUp } from "lucide-react";
import { Icon } from "leaflet";

// Fix for default marker icons in production
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const fishZones = [
  {
    id: 1,
    name: "Bheemili Coastal Zone",
    lat: 17.8892,
    lng: 83.4480,
    probability: 85,
    fishType: "Tuna, Pomfret",
    radius: 2000,
    color: "#2A9D8F",
  },
  {
    id: 2,
    name: "Visakhapatnam Port Area",
    lat: 17.6868,
    lng: 83.2185,
    probability: 72,
    fishType: "Sardine, Mackerel",
    radius: 1500,
    color: "#012A4A",
  },
  {
    id: 3,
    name: "Yarada Beach Waters",
    lat: 17.6562,
    lng: 83.2770,
    probability: 68,
    fishType: "Prawns, Crab",
    radius: 1800,
    color: "#F76C6C",
  },
  {
    id: 4,
    name: "Rushikonda Deep Waters",
    lat: 17.7833,
    lng: 83.3850,
    probability: 78,
    fishType: "King Fish, Barracuda",
    radius: 1700,
    color: "#01497C",
  },
  {
    id: 5,
    name: "Gangavaram Port Zone",
    lat: 17.6250,
    lng: 83.2450,
    probability: 74,
    fishType: "Pomfret, Snapper",
    radius: 1600,
    color: "#2A9D8F",
  },
  {
    id: 6,
    name: "Dolphin's Nose Point",
    lat: 17.6450,
    lng: 83.2900,
    probability: 82,
    fishType: "Tuna, Sailfish",
    radius: 2200,
    color: "#168AAD",
  },
  {
    id: 7,
    name: "Appikonda Beach Waters",
    lat: 17.7500,
    lng: 83.3500,
    probability: 70,
    fishType: "Sardine, Anchovy",
    radius: 1400,
    color: "#34A0A4",
  },
  {
    id: 8,
    name: "Pudimadaka Coastal Belt",
    lat: 17.9100,
    lng: 83.4600,
    probability: 71,
    fishType: "Seer Fish, Ribbonfish",
    radius: 1500,
    color: "#52B69A",
  },
  {
    id: 9,
    name: "Tenneti Park Waters",
    lat: 17.7600,
    lng: 83.3700,
    probability: 69,
    fishType: "Pomfret, Grouper",
    radius: 1300,
    color: "#76C893",
  },
  {
    id: 10,
    name: "Rishikonda North Bay",
    lat: 17.7900,
    lng: 83.3900,
    probability: 75,
    fishType: "Prawns, Squid",
    radius: 1600,
    color: "#99D98C",
  },
  {
    id: 11,
    name: "Mukhalingam Offshore",
    lat: 17.5800,
    lng: 83.2100,
    probability: 80,
    fishType: "King Fish, Cobia",
    radius: 2000,
    color: "#184E77",
  },
  {
    id: 12,
    name: "Lawson's Bay Fishing Ground",
    lat: 17.7200,
    lng: 83.3400,
    probability: 66,
    fishType: "Mackerel, Croaker",
    radius: 1200,
    color: "#1A759F",
  },
];

const harbors = [
  { name: "Visakhapatnam Fishing Harbor", lat: 17.7041, lng: 83.3025 },
  { name: "Bheemili Harbor", lat: 17.8917, lng: 83.4574 },
  { name: "Gangavaram Port", lat: 17.6200, lng: 83.2400 },
  { name: "Yarada Beach Landing", lat: 17.6550, lng: 83.2760 },
  { name: "Rushikonda Boat Station", lat: 17.7850, lng: 83.3870 },
];

export default function FishMap() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 font-heading" data-testid="heading-fishmap">
            Interactive Fish Zone Map
          </h1>
          <p className="text-muted-foreground">
            Real-time AI predictions for Visakhapatnam coastal waters
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden h-[600px]">
              <MapContainer
                center={[17.7041, 83.3025]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
                data-testid="map-container"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Fish Zones with Heatmap Circles */}
                {fishZones.map((zone) => (
                  <Circle
                    key={zone.id}
                    center={[zone.lat, zone.lng]}
                    radius={zone.radius}
                    pathOptions={{
                      fillColor: zone.color,
                      fillOpacity: 0.3,
                      color: zone.color,
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-sm mb-1">{zone.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {zone.fishType}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {zone.probability}% Probability
                        </Badge>
                      </div>
                    </Popup>
                  </Circle>
                ))}

                {/* Harbor Markers */}
                {harbors.map((harbor, idx) => (
                  <Marker key={idx} position={[harbor.lat, harbor.lng]}>
                    <Popup>
                      <div className="text-sm font-semibold">{harbor.name}</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Card>
          </motion.div>

          {/* Zone Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 font-heading">
                Active Zones
              </h2>
              <div className="space-y-3">
                {fishZones.map((zone, idx) => (
                  <div
                    key={zone.id}
                    className="p-4 rounded-lg bg-muted/30 hover-elevate transition-all"
                    data-testid={`zone-${idx}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm text-foreground">
                        {zone.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{ backgroundColor: `${zone.color}20`, color: zone.color }}
                      >
                        {zone.probability}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Fish className="w-3 h-3" />
                      <span>{zone.fishType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Navigation className="w-3 h-3" />
                      <span>
                        {zone.lat.toFixed(4)}, {zone.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Legend */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 font-heading">
                Map Legend
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-secondary/30 border-2 border-secondary" />
                  <span className="text-sm text-foreground">High Probability (80%+)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary/30 border-2 border-primary" />
                  <span className="text-sm text-foreground">Medium Probability (60-80%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-accent/30 border-2 border-accent" />
                  <span className="text-sm text-foreground">Lower Probability (&lt;60%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={markerIcon} alt="Harbor" className="w-6 h-6" />
                  <span className="text-sm text-foreground">Fishing Harbor</span>
                </div>
              </div>
            </Card>

            {/* Market Info */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">Market Prices</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tuna</span>
                  <span className="font-semibold text-foreground">₹420/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pomfret</span>
                  <span className="font-semibold text-foreground">₹380/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sardine</span>
                  <span className="font-semibold text-foreground">₹180/kg</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
