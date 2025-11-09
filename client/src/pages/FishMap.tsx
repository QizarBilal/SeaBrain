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
  // Northern AP Coast - Srikakulam District (offshore)
  {
    id: 1,
    name: "Kalingapatnam Deep Sea Zone",
    lat: 18.3500,
    lng: 84.1800,
    probability: 88,
    fishType: "Tuna, King Fish",
    radius: 2500,
    color: "#2A9D8F",
  },
  {
    id: 2,
    name: "Bhavanapadu Offshore",
    lat: 18.4200,
    lng: 84.2200,
    probability: 82,
    fishType: "Pomfret, Seer Fish",
    radius: 2200,
    color: "#012A4A",
  },
  {
    id: 3,
    name: "Baruva Deep Waters",
    lat: 18.8500,
    lng: 84.6000,
    probability: 79,
    fishType: "Sailfish, Barracuda",
    radius: 2300,
    color: "#168AAD",
  },
  {
    id: 4,
    name: "Jalumuru Ocean Zone",
    lat: 19.0800,
    lng: 84.7500,
    probability: 85,
    fishType: "Ribbon Fish, Croaker",
    radius: 2400,
    color: "#01497C",
  },
  
  // Vizianagaram Coast (offshore)
  {
    id: 5,
    name: "Bhogapuram Deep Sea",
    lat: 18.1500,
    lng: 83.9500,
    probability: 76,
    fishType: "Mackerel, Sardine",
    radius: 2000,
    color: "#34A0A4",
  },
  {
    id: 6,
    name: "Bandaruvanipeta Offshore",
    lat: 18.2800,
    lng: 84.0800,
    probability: 81,
    fishType: "Prawns, Cuttlefish",
    radius: 2100,
    color: "#52B69A",
  },
  
  // Visakhapatnam District (offshore - far from shore)
  {
    id: 7,
    name: "Bheemili Deep Ocean",
    lat: 17.9200,
    lng: 83.5500,
    probability: 90,
    fishType: "Tuna, Marlin",
    radius: 2800,
    color: "#2A9D8F",
  },
  {
    id: 8,
    name: "Visakha Deep Sea Zone",
    lat: 17.7500,
    lng: 83.4800,
    probability: 87,
    fishType: "King Fish, Grouper",
    radius: 2600,
    color: "#F76C6C",
  },
  {
    id: 9,
    name: "Rushikonda Offshore",
    lat: 17.8200,
    lng: 83.5200,
    probability: 84,
    fishType: "Pomfret, Snapper",
    radius: 2400,
    color: "#76C893",
  },
  {
    id: 10,
    name: "Yarada Deep Waters",
    lat: 17.6800,
    lng: 83.4300,
    probability: 78,
    fishType: "Seer Fish, Cobia",
    radius: 2200,
    color: "#99D98C",
  },
  {
    id: 11,
    name: "Gangavaram Offshore",
    lat: 17.6500,
    lng: 83.4000,
    probability: 82,
    fishType: "Red Snapper, Grouper",
    radius: 2300,
    color: "#184E77",
  },
  {
    id: 12,
    name: "Pudimadaka Ocean Zone",
    lat: 17.9500,
    lng: 83.5800,
    probability: 83,
    fishType: "Barracuda, Trevally",
    radius: 2350,
    color: "#1A759F",
  },
  {
    id: 13,
    name: "Appikonda Deep Sea",
    lat: 17.7800,
    lng: 83.5000,
    probability: 80,
    fishType: "Anchovy, Sardine",
    radius: 2100,
    color: "#168AAD",
  },
  
  // East Godavari District (offshore)
  {
    id: 14,
    name: "Kakinada Deep Ocean",
    lat: 16.9800,
    lng: 82.7500,
    probability: 86,
    fishType: "Prawns, King Fish",
    radius: 2500,
    color: "#2A9D8F",
  },
  {
    id: 15,
    name: "Uppada Offshore Zone",
    lat: 17.0800,
    lng: 82.8200,
    probability: 81,
    fishType: "Pomfret, Squid",
    radius: 2200,
    color: "#012A4A",
  },
  {
    id: 16,
    name: "Draksharamam Deep Sea",
    lat: 16.7800,
    lng: 82.5800,
    probability: 77,
    fishType: "Mackerel, Ribbonfish",
    radius: 2000,
    color: "#34A0A4",
  },
  {
    id: 17,
    name: "Antarvedi Ocean Waters",
    lat: 16.3500,
    lng: 81.8800,
    probability: 84,
    fishType: "Tuna, Sailfish",
    radius: 2400,
    color: "#52B69A",
  },
  {
    id: 18,
    name: "Yanam Offshore",
    lat: 16.7300,
    lng: 82.5200,
    probability: 79,
    fishType: "Seer Fish, Croaker",
    radius: 2100,
    color: "#76C893",
  },
  
  // West Godavari District (offshore)
  {
    id: 19,
    name: "Bhimavaram Deep Sea",
    lat: 16.5500,
    lng: 82.1800,
    probability: 75,
    fishType: "King Fish, Grouper",
    radius: 1900,
    color: "#99D98C",
  },
  {
    id: 20,
    name: "Narsapur Ocean Zone",
    lat: 16.4500,
    lng: 82.0500,
    probability: 80,
    fishType: "Pomfret, Cuttlefish",
    radius: 2150,
    color: "#184E77",
  },
  
  // Krishna District (offshore)
  {
    id: 21,
    name: "Machilipatnam Deep Waters",
    lat: 16.1800,
    lng: 81.4500,
    probability: 83,
    fishType: "Prawns, Lobster",
    radius: 2300,
    color: "#1A759F",
  },
  {
    id: 22,
    name: "Manginapudi Offshore",
    lat: 16.1500,
    lng: 81.4000,
    probability: 78,
    fishType: "Mackerel, Sardine",
    radius: 2000,
    color: "#168AAD",
  },
  {
    id: 23,
    name: "Gudivada Ocean Zone",
    lat: 16.0200,
    lng: 81.2500,
    probability: 81,
    fishType: "Seer Fish, Barracuda",
    radius: 2200,
    color: "#01497C",
  },
  
  // Guntur District (offshore)
  {
    id: 24,
    name: "Nizampatnam Deep Sea",
    lat: 15.9200,
    lng: 81.0800,
    probability: 85,
    fishType: "Tuna, King Fish",
    radius: 2450,
    color: "#2A9D8F",
  },
  {
    id: 25,
    name: "Vodarevu Offshore",
    lat: 15.8000,
    lng: 80.9500,
    probability: 79,
    fishType: "Pomfret, Red Snapper",
    radius: 2100,
    color: "#F76C6C",
  },
  
  // Prakasam District (offshore)
  {
    id: 26,
    name: "Chirala Deep Ocean",
    lat: 15.8200,
    lng: 80.9200,
    probability: 82,
    fishType: "Ribbon Fish, Croaker",
    radius: 2250,
    color: "#34A0A4",
  },
  {
    id: 27,
    name: "Vetapalem Offshore",
    lat: 15.7800,
    lng: 80.8800,
    probability: 77,
    fishType: "Mackerel, Anchovy",
    radius: 2000,
    color: "#52B69A",
  },
  
  // Nellore District (offshore)
  {
    id: 28,
    name: "Krishnapatnam Deep Sea",
    lat: 14.2500,
    lng: 80.2000,
    probability: 86,
    fishType: "King Fish, Grouper",
    radius: 2500,
    color: "#76C893",
  },
  {
    id: 29,
    name: "Mypadu Offshore Zone",
    lat: 14.3200,
    lng: 80.2500,
    probability: 80,
    fishType: "Tuna, Sailfish",
    radius: 2200,
    color: "#99D98C",
  },
  {
    id: 30,
    name: "Tada Deep Waters",
    lat: 13.9800,
    lng: 80.0500,
    probability: 83,
    fishType: "Prawns, Seer Fish",
    radius: 2300,
    color: "#184E77",
  },
];

const harbors = [
  { name: "Kalingapatnam Fishing Harbor", lat: 18.3347, lng: 84.1285 },
  { name: "Bhavanapadu Harbor", lat: 18.4019, lng: 84.1658 },
  { name: "Visakhapatnam Fishing Harbor", lat: 17.7041, lng: 83.3025 },
  { name: "Bheemili Harbor", lat: 17.8917, lng: 83.4574 },
  { name: "Gangavaram Port", lat: 17.6200, lng: 83.2400 },
  { name: "Kakinada Fishing Harbor", lat: 16.9608, lng: 82.2475 },
  { name: "Uppada Harbor", lat: 17.0868, lng: 82.3401 },
  { name: "Machilipatnam Fishing Harbor", lat: 16.1874, lng: 81.1386 },
  { name: "Nizampatnam Harbor", lat: 15.9126, lng: 80.6464 },
  { name: "Krishnapatnam Port", lat: 14.2554, lng: 80.0513 },
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
            Real-time AI predictions for Andhra Pradesh coastal waters - 30 active zones
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
                center={[16.5, 82.0]}
                zoom={7}
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
