import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Fish, Calendar, Weight, Navigation, Search, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

// Fix for default marker icons
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

const fishSpecies = [
  "Tuna", "Mackerel", "Pomfret", "Anchovy", "Sardine", 
  "Prawns", "King Fish", "Seer Fish", "Barracuda", "Snapper"
];

// Each fish species has different location across AP coast (offshore)
const mockPredictions = {
  "Tuna": { probability: 85, zones: ["Bheemili Deep Sea", "Pudimadaka Offshore"], time: "4:30 AM - 7:00 AM", lat: 17.92, lng: 83.55, name: "Northern Vizag Waters" },
  "Mackerel": { probability: 72, zones: ["Kakinada Offshore", "Uppada Deep Waters"], time: "5:00 AM - 8:00 AM", lat: 16.98, lng: 82.75, name: "East Godavari Zone" },
  "Pomfret": { probability: 68, zones: ["Machilipatnam Deep Sea", "Nizampatnam Waters"], time: "6:00 AM - 9:00 AM", lat: 16.18, lng: 81.45, name: "Krishna District Zone" },
  "Anchovy": { probability: 91, zones: ["Yarada Offshore", "Gangavaram Deep Waters"], time: "3:30 AM - 6:30 AM", lat: 17.68, lng: 83.43, name: "South Vizag Waters" },
  "Sardine": { probability: 78, zones: ["Kalingapatnam Deep Sea", "Bhavanapadu Offshore"], time: "5:30 AM - 8:30 AM", lat: 18.35, lng: 84.18, name: "Srikakulam Waters" },
  "Prawns": { probability: 84, zones: ["Narsapur Offshore", "Bhimavaram Waters"], time: "4:00 AM - 7:00 AM", lat: 16.45, lng: 82.05, name: "West Godavari Zone" },
  "King Fish": { probability: 88, zones: ["Krishnapatnam Deep Sea", "Mypadu Offshore"], time: "3:30 AM - 6:30 AM", lat: 14.25, lng: 80.20, name: "Nellore Waters" },
  "Seer Fish": { probability: 81, zones: ["Chirala Offshore", "Vodarevu Deep Waters"], time: "5:00 AM - 8:00 AM", lat: 15.82, lng: 80.92, name: "Prakasam District Zone" },
  "Barracuda": { probability: 76, zones: ["Rushikonda Deep Sea", "Appikonda Offshore"], time: "4:30 AM - 7:30 AM", lat: 17.82, lng: 83.52, name: "Central Vizag Waters" },
  "Snapper": { probability: 79, zones: ["Antarvedi Ocean", "Yanam Offshore"], time: "6:00 AM - 9:00 AM", lat: 16.35, lng: 81.88, name: "Godavari Delta Zone" },
};

export default function MarkCatch() {
  const { toast } = useToast();
  const [selectedFish, setSelectedFish] = useState("");
  const [fishCount, setFishCount] = useState("");
  const [fishWeight, setFishWeight] = useState("");
  const [searchFish, setSearchFish] = useState("");
  const [prediction, setPrediction] = useState<any>(null);

  // Mock GPS coordinates (Visakhapatnam)
  const mockLocation = { lat: 17.6868, lng: 83.2185 };

  const handleSaveCatch = () => {
    if (!selectedFish || !fishCount || !fishWeight) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before saving.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "✅ Catch Saved Successfully (Demo)",
      description: `${fishCount} ${selectedFish} recorded at ${mockLocation.lat}°N, ${mockLocation.lng}°E`,
    });
  };

  const handleClearForm = () => {
    setSelectedFish("");
    setFishCount("");
    setFishWeight("");
  };

  const handleSearchFish = () => {
    if (!searchFish) {
      toast({
        title: "Enter Fish Name",
        description: "Please select a fish species to search.",
        variant: "destructive",
      });
      return;
    }

    const result = mockPredictions[searchFish as keyof typeof mockPredictions];
    if (result) {
      setPrediction({ fish: searchFish, ...result });
      toast({
        title: "🎣 Prediction Loaded",
        description: `AI prediction found for ${searchFish}`,
      });
    } else {
      toast({
        title: "No Data Available",
        description: `No prediction data for ${searchFish} at this time.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card pt-24 pb-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-heading">
          Mark Catch & Search Fish
        </h1>
        <p className="text-lg text-muted-foreground">
          Record your catches and discover AI-powered fishing predictions
        </p>
      </motion.div>

      {/* Tabs Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        <Tabs defaultValue="mark-catch" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="mark-catch">Mark Catch</TabsTrigger>
            <TabsTrigger value="search-fish">Search Fish</TabsTrigger>
          </TabsList>

          {/* MARK CATCH TAB */}
          <TabsContent value="mark-catch">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2 font-heading">
                    Mark Your Catch
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Record your daily catch and help the AI improve future predictions.
                  </p>

                  <div className="space-y-4">
                    {/* Fish Name Dropdown */}
                    <div>
                      <Label htmlFor="fish-name" className="mb-2 block">
                        <Fish className="inline w-4 h-4 mr-2" />
                        Fish Name
                      </Label>
                      <Select value={selectedFish} onValueChange={setSelectedFish}>
                        <SelectTrigger id="fish-name">
                          <SelectValue placeholder="Select fish species" />
                        </SelectTrigger>
                        <SelectContent>
                          {fishSpecies.map((fish) => (
                            <SelectItem key={fish} value={fish}>
                              {fish}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fish Count */}
                    <div>
                      <Label htmlFor="fish-count" className="mb-2 block">
                        <TrendingUp className="inline w-4 h-4 mr-2" />
                        Fish Count
                      </Label>
                      <Input
                        id="fish-count"
                        type="number"
                        placeholder="Enter number of fish caught"
                        value={fishCount}
                        onChange={(e) => setFishCount(e.target.value)}
                        min="1"
                      />
                    </div>

                    {/* Size/Weight */}
                    <div>
                      <Label htmlFor="fish-weight" className="mb-2 block">
                        <Weight className="inline w-4 h-4 mr-2" />
                        Size/Weight (kg)
                      </Label>
                      <Input
                        id="fish-weight"
                        type="text"
                        placeholder="e.g., 5.5 kg or 3-8 kg"
                        value={fishWeight}
                        onChange={(e) => setFishWeight(e.target.value)}
                      />
                    </div>

                    {/* Auto GPS Location */}
                    <div>
                      <Label className="mb-2 block">
                        <MapPin className="inline w-4 h-4 mr-2" />
                        GPS Location (Auto-detected)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          value={`${mockLocation.lat}°N`}
                          readOnly
                          className="bg-muted"
                        />
                        <Input
                          value={`${mockLocation.lng}°E`}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <Label className="mb-2 block">
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Date & Time (Auto-set)
                      </Label>
                      <Input
                        value={new Date().toLocaleString()}
                        readOnly
                        className="bg-muted"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveCatch}
                        className="flex-1"
                      >
                        Save Catch
                      </Button>
                      <Button
                        onClick={handleClearForm}
                        variant="outline"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Map Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-xl font-bold text-foreground mb-4 font-heading flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Your Location
                  </h3>
                  
                  {/* Interactive Map Display */}
                  <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border">
                    <MapContainer
                      center={[mockLocation.lat, mockLocation.lng]}
                      zoom={12}
                      style={{ height: "100%", width: "100%" }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap'
                      />
                      <Marker position={[mockLocation.lat, mockLocation.lng]}>
                        <Popup>
                          <div className="text-center">
                            <strong>Your Current Location</strong><br />
                            {mockLocation.lat}°N, {mockLocation.lng}°E<br />
                            <span className="text-xs text-muted-foreground">Visakhapatnam Coast</span>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* SEARCH FISH TAB */}
          <TabsContent value="search-fish">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2 font-heading">
                    Search Fish Zones (AI Prediction)
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Enter a fish name to view predicted locations & time for best catch.
                  </p>

                  {/* Search Input */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="search-fish" className="mb-2 block">
                        <Search className="inline w-4 h-4 mr-2" />
                        Search by Fish Name
                      </Label>
                      <Select value={searchFish} onValueChange={setSearchFish}>
                        <SelectTrigger id="search-fish">
                          <SelectValue placeholder="Select fish to search" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(mockPredictions).map((fish) => (
                            <SelectItem key={fish} value={fish}>
                              {fish}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSearchFish}
                      className="w-full"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search Predictions
                    </Button>
                  </div>

                  {/* Prediction Results */}
                  {prediction && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-4"
                    >
                      <div className="p-4 rounded-lg bg-card border">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            {prediction.fish} Prediction
                          </h3>
                          <Badge variant="secondary">
                            Active
                          </Badge>
                        </div>

                        {/* Probability */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-foreground mb-2">
                            <span>Catch Probability</span>
                            <span className="font-bold">{prediction.probability}%</span>
                          </div>
                          <Progress value={prediction.probability} className="h-3" />
                        </div>

                        {/* Nearest Zones */}
                        <div className="mb-3">
                          <div className="text-sm text-muted-foreground mb-2">Nearest Zones:</div>
                          <div className="flex flex-wrap gap-2">
                            {prediction.zones.map((zone: string) => (
                              <Badge key={zone} variant="outline">
                                {zone}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Suggested Time */}
                        <div className="p-3 rounded bg-secondary border">
                          <div className="text-xs text-muted-foreground mb-1">Best Fishing Window:</div>
                          <div className="text-foreground font-semibold">{prediction.time}</div>
                        </div>
                      </div>

                      {/* Warning Banner */}
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-yellow-700 dark:text-yellow-300 font-semibold text-sm">
                              Safety Advisory
                            </div>
                            <div className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">
                              Check weather conditions and avoid restricted zones
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>

              {/* Prediction Map Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-xl font-bold text-foreground mb-4 font-heading flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Prediction Map - {prediction ? prediction.name : "Andhra Pradesh Coast"}
                  </h3>
                  
                  {/* Interactive Prediction Map */}
                  <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border">
                    {prediction ? (
                      <MapContainer
                        center={[prediction.lat, prediction.lng]}
                        zoom={10}
                        style={{ height: "100%", width: "100%" }}
                        scrollWheelZoom={false}
                        key={prediction.fish}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; OpenStreetMap'
                        />
                        <Marker position={[prediction.lat, prediction.lng]}>
                          <Popup>
                            <div className="text-center">
                              <strong>{prediction.fish} Prediction Zone</strong><br />
                              <span className="text-sm font-semibold text-green-600">
                                {prediction.probability}% Probability
                              </span><br />
                              {prediction.lat}°N, {prediction.lng}°E<br />
                              <span className="text-xs text-muted-foreground">{prediction.name}</span><br />
                              <span className="text-xs font-semibold">Best Time: {prediction.time}</span>
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    ) : (
                      <MapContainer
                        center={[16.5, 82.0]}
                        zoom={7}
                        style={{ height: "100%", width: "100%" }}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; OpenStreetMap'
                        />
                      </MapContainer>
                    )}
                    {!prediction && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                        <div className="text-center text-white bg-black/50 p-4 rounded-lg">
                          <Search className="w-12 h-12 mx-auto mb-3" />
                          <p>Search for a fish to view predictions on map</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
