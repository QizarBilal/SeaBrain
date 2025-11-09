import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Fish, Calendar, Weight, Navigation, Search, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const fishSpecies = [
  "Tuna", "Mackerel", "Pomfret", "Anchovy", "Sardine", 
  "Prawns", "King Fish", "Seer Fish", "Barracuda", "Snapper"
];

const mockPredictions = {
  "Tuna": { probability: 85, zones: ["Bheemili", "Rushikonda"], time: "4:30 AM - 7:00 AM", lat: 17.89, lng: 83.45 },
  "Mackerel": { probability: 72, zones: ["Yarada", "Gangavaram"], time: "5:00 AM - 8:00 AM", lat: 17.65, lng: 83.28 },
  "Pomfret": { probability: 68, zones: ["Visakhapatnam Port", "Dolphin's Nose"], time: "6:00 AM - 9:00 AM", lat: 17.69, lng: 83.22 },
  "Anchovy": { probability: 91, zones: ["Appikonda", "Tenneti Park"], time: "3:30 AM - 6:30 AM", lat: 17.75, lng: 83.35 },
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
    <div className="min-h-screen bg-gradient-to-b from-[#001233] via-[#003d66] to-[#0066a1] pt-20 px-4 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-heading">
          🎣 Mark Catch & Search Fish
        </h1>
        <p className="text-lg text-blue-200">
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
                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-2 font-heading">
                    Mark Your Catch
                  </h2>
                  <p className="text-blue-200 text-sm mb-6">
                    Record your daily catch and help the AI improve future predictions.
                  </p>

                  <div className="space-y-4">
                    {/* Fish Name Dropdown */}
                    <div>
                      <Label htmlFor="fish-name" className="text-white mb-2 block">
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
                      <Label htmlFor="fish-count" className="text-white mb-2 block">
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
                      <Label htmlFor="fish-weight" className="text-white mb-2 block">
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
                      <Label className="text-white mb-2 block">
                        <MapPin className="inline w-4 h-4 mr-2" />
                        GPS Location (Auto-detected)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          value={`${mockLocation.lat}°N`}
                          readOnly
                          className="bg-white/5"
                        />
                        <Input
                          value={`${mockLocation.lng}°E`}
                          readOnly
                          className="bg-white/5"
                        />
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <Label className="text-white mb-2 block">
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Date & Time (Auto-set)
                      </Label>
                      <Input
                        value={new Date().toLocaleString()}
                        readOnly
                        className="bg-white/5"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveCatch}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      >
                        Save Catch
                      </Button>
                      <Button
                        onClick={handleClearForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
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
                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 h-full">
                  <h3 className="text-xl font-bold text-white mb-4 font-heading flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Your Location
                  </h3>
                  
                  {/* Mock Map Display */}
                  <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-white/10">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-white font-semibold">
                          {mockLocation.lat}°N, {mockLocation.lng}°E
                        </div>
                        <div className="text-blue-200 text-sm mt-2">
                          Visakhapatnam Coast
                        </div>
                      </div>
                    </motion.div>

                    {/* Animated Circles */}
                    <motion.div
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-cyan-400"
                    />
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
                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-2 font-heading">
                    Search Fish Zones (AI Prediction)
                  </h2>
                  <p className="text-blue-200 text-sm mb-6">
                    Enter a fish name to view predicted locations & time for best catch.
                  </p>

                  {/* Search Input */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="search-fish" className="text-white mb-2 block">
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
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
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
                      <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white">
                            {prediction.fish} Prediction
                          </h3>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                            Active
                          </Badge>
                        </div>

                        {/* Probability */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-white mb-2">
                            <span>Catch Probability</span>
                            <span className="font-bold">{prediction.probability}%</span>
                          </div>
                          <Progress value={prediction.probability} className="h-3" />
                        </div>

                        {/* Nearest Zones */}
                        <div className="mb-3">
                          <div className="text-sm text-blue-200 mb-2">Nearest Zones:</div>
                          <div className="flex flex-wrap gap-2">
                            {prediction.zones.map((zone: string) => (
                              <Badge key={zone} variant="outline" className="border-cyan-400/50 text-cyan-300">
                                {zone}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Suggested Time */}
                        <div className="p-3 rounded bg-blue-500/20 border border-blue-500/30">
                          <div className="text-xs text-blue-200 mb-1">Best Fishing Window:</div>
                          <div className="text-white font-semibold">{prediction.time}</div>
                        </div>
                      </div>

                      {/* Warning Banner */}
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-400">⚠️</span>
                          <div>
                            <div className="text-yellow-300 font-semibold text-sm">
                              Safety Advisory
                            </div>
                            <div className="text-yellow-200/80 text-xs mt-1">
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
                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 h-full">
                  <h3 className="text-xl font-bold text-white mb-4 font-heading flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Prediction Map
                  </h3>
                  
                  {/* Mock Prediction Map */}
                  <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-white/10">
                    {prediction ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="text-center">
                          {/* Animated Fish Markers */}
                          <motion.div
                            animate={{
                              y: [-10, 10, -10],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="mb-4"
                          >
                            <div className="text-6xl">🐟</div>
                          </motion.div>
                          
                          <div className="text-white font-semibold text-lg mb-2">
                            {prediction.fish} Zone
                          </div>
                          <div className="text-cyan-300 text-sm">
                            {prediction.lat}°N, {prediction.lng}°E
                          </div>
                          
                          {/* Heatmap Effect */}
                          <motion.div
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-radial from-green-500/40 to-transparent"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-blue-200">
                          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Search for a fish to view predictions</p>
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
