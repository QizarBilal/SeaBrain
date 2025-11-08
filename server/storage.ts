import {
  type User,
  type InsertUser,
  type FishPrediction,
  type InsertFishPrediction,
  type WeatherData,
  type InsertWeatherData,
  type MarketplaceListing,
  type InsertMarketplaceListing,
  type ChatbotResponse,
  type InsertChatbotResponse,
  type CommunityStats,
  type InsertCommunityStats,
  type ChatMessage,
  type InsertChatMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Fish Prediction methods
  getAllFishPredictions(): Promise<FishPrediction[]>;
  getFishPredictionById(id: string): Promise<FishPrediction | undefined>;
  createFishPrediction(prediction: InsertFishPrediction): Promise<FishPrediction>;

  // Weather methods
  getCurrentWeather(location: string): Promise<WeatherData | undefined>;
  getAllWeatherData(): Promise<WeatherData[]>;
  createWeatherData(weather: InsertWeatherData): Promise<WeatherData>;

  // Marketplace methods
  getAllListings(): Promise<MarketplaceListing[]>;
  getListingById(id: string): Promise<MarketplaceListing | undefined>;
  createListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing>;

  // Chatbot methods
  getAllChatbotResponses(): Promise<ChatbotResponse[]>;
  searchChatbotResponse(query: string): Promise<ChatbotResponse | undefined>;
  createChatbotResponse(response: InsertChatbotResponse): Promise<ChatbotResponse>;

  // Community Stats methods
  getAllCommunityStats(): Promise<CommunityStats[]>;
  getCommunityStatsByRegion(region: string): Promise<CommunityStats[]>;
  createCommunityStats(stats: InsertCommunityStats): Promise<CommunityStats>;

  // Chat Message methods
  getChatMessagesByListing(listingId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private fishPredictions: Map<string, FishPrediction>;
  private weatherData: Map<string, WeatherData>;
  private marketplaceListings: Map<string, MarketplaceListing>;
  private chatbotResponses: Map<string, ChatbotResponse>;
  private communityStats: Map<string, CommunityStats>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.fishPredictions = new Map();
    this.weatherData = new Map();
    this.marketplaceListings = new Map();
    this.chatbotResponses = new Map();
    this.communityStats = new Map();
    this.chatMessages = new Map();

    this.seedData();
  }

  private seedData() {
    // Seed Fish Predictions
    const fishPredictionsData: InsertFishPrediction[] = [
      {
        zone: "Bheemili Coastal Zone",
        latitude: 17.8892,
        longitude: 83.4480,
        fishType: "Tuna, Pomfret",
        probability: 85,
        bestTime: "6 AM - 10 AM",
        description: "High Tuna activity detected. Excellent conditions for deep-sea fishing.",
      },
      {
        zone: "Visakhapatnam Port Area",
        latitude: 17.6868,
        longitude: 83.2185,
        fishType: "Sardine, Mackerel",
        probability: 72,
        bestTime: "7 AM - 11 AM",
        description: "Moderate Sardine schools. Good for coastal fishing.",
      },
      {
        zone: "Yarada Beach Waters",
        latitude: 17.6562,
        longitude: 83.2770,
        fishType: "Prawns, Crab",
        probability: 68,
        bestTime: "5 AM - 9 AM",
        description: "Prawn concentration near shore. Ideal for net fishing.",
      },
      {
        zone: "Rushikonda Deep Waters",
        latitude: 17.7833,
        longitude: 83.3850,
        fishType: "King Fish, Barracuda",
        probability: 78,
        bestTime: "5 AM - 8 AM",
        description: "King Fish migration route. Strong current, excellent for big catch.",
      },
      {
        zone: "Gangavaram Port Zone",
        latitude: 17.6250,
        longitude: 83.2450,
        fishType: "Pomfret, Snapper",
        probability: 74,
        bestTime: "6 AM - 10 AM",
        description: "Premium Pomfret spotted. Ideal for commercial fishing.",
      },
      {
        zone: "Bheemunipatnam Estuary",
        latitude: 17.8900,
        longitude: 83.4300,
        fishType: "Mullet, Catfish",
        probability: 65,
        bestTime: "7 AM - 11 AM",
        description: "Brackish water species. Good for coastal net fishing.",
      },
      {
        zone: "Appikonda Beach Waters",
        latitude: 17.7500,
        longitude: 83.3500,
        fishType: "Sardine, Anchovy",
        probability: 70,
        bestTime: "6 AM - 9 AM",
        description: "Large Sardine schools detected. Perfect for purse seine nets.",
      },
      {
        zone: "Lawson's Bay Fishing Ground",
        latitude: 17.7200,
        longitude: 83.3400,
        fishType: "Mackerel, Croaker",
        probability: 66,
        bestTime: "5 AM - 8 AM",
        description: "Mackerel shoals active. Suitable for small-scale fishing.",
      },
      {
        zone: "Dolphin's Nose Point",
        latitude: 17.6450,
        longitude: 83.2900,
        fishType: "Tuna, Sailfish",
        probability: 82,
        bestTime: "5 AM - 9 AM",
        description: "Deep sea zone with high game fish activity. Excellent for sport fishing.",
      },
      {
        zone: "Pudimadaka Coastal Belt",
        latitude: 17.9100,
        longitude: 83.4600,
        fishType: "Seer Fish, Ribbonfish",
        probability: 71,
        bestTime: "6 AM - 10 AM",
        description: "Seer Fish concentration. Good for line fishing.",
      },
      {
        zone: "Tenneti Park Waters",
        latitude: 17.7600,
        longitude: 83.3700,
        fishType: "Pomfret, Grouper",
        probability: 69,
        bestTime: "7 AM - 11 AM",
        description: "Rocky bottom attracts Grouper. Ideal for hook and line.",
      },
      {
        zone: "Rishikonda North Bay",
        latitude: 17.7900,
        longitude: 83.3900,
        fishType: "Prawns, Squid",
        probability: 75,
        bestTime: "5 PM - 8 PM",
        description: "Evening squid activity. Perfect for night fishing.",
      },
      {
        zone: "Mukhalingam Offshore",
        latitude: 17.5800,
        longitude: 83.2100,
        fishType: "King Fish, Cobia",
        probability: 80,
        bestTime: "5 AM - 9 AM",
        description: "Deep offshore zone. High probability for large pelagic species.",
      },
      {
        zone: "Bheemili South Channel",
        latitude: 17.8700,
        longitude: 83.4400,
        fishType: "Croaker, Silver Belly",
        probability: 63,
        bestTime: "6 AM - 10 AM",
        description: "Shallow channel with steady catch. Good for beginners.",
      },
      {
        zone: "Jodugullapalem Beach",
        latitude: 17.7100,
        longitude: 83.3200,
        fishType: "Sardine, Horse Mackerel",
        probability: 67,
        bestTime: "6 AM - 9 AM",
        description: "Urban coastal zone. Moderate fish concentration.",
      },
    ];

    fishPredictionsData.forEach((data) => {
      const id = randomUUID();
      this.fishPredictions.set(id, { ...data, id });
    });

    // Seed Weather Data
    const weatherDataSeed: InsertWeatherData[] = [
      {
        location: "Visakhapatnam",
        temperature: 28,
        windSpeed: 12,
        waveHeight: 0.5,
        tideLevel: "Low",
        safetyLevel: "safe",
        forecast: "Clear skies, gentle waves. Perfect conditions for fishing.",
      },
    ];

    weatherDataSeed.forEach((data) => {
      const id = randomUUID();
      this.weatherData.set(id, { ...data, id, timestamp: new Date() });
    });

    // Seed Marketplace Listings
    const listingsData: InsertMarketplaceListing[] = [
      {
        sellerName: "Ravi Kumar",
        sellerPort: "Visakhapatnam Harbor",
        fishType: "Pomfret",
        quantity: 50,
        pricePerKg: 420,
        quality: "Premium",
        availableDate: "Today",
        contact: "+91 98765 43210",
      },
      {
        sellerName: "Venkat Rao",
        sellerPort: "Bheemili Harbor",
        fishType: "Tuna",
        quantity: 75,
        pricePerKg: 380,
        quality: "Fresh",
        availableDate: "Today",
        contact: "+91 98765 43211",
      },
      {
        sellerName: "Lakshmi Naidu",
        sellerPort: "Visakhapatnam Harbor",
        fishType: "Sardine",
        quantity: 120,
        pricePerKg: 180,
        quality: "Fresh",
        availableDate: "Tomorrow",
        contact: "+91 98765 43212",
      },
      {
        sellerName: "Suresh Babu",
        sellerPort: "Yarada Beach",
        fishType: "Prawns",
        quantity: 30,
        pricePerKg: 650,
        quality: "Premium",
        availableDate: "Today",
        contact: "+91 98765 43213",
      },
      {
        sellerName: "Prasad Reddy",
        sellerPort: "Gangavaram Port",
        fishType: "King Fish",
        quantity: 45,
        pricePerKg: 520,
        quality: "Premium",
        availableDate: "Today",
        contact: "+91 98765 43214",
      },
      {
        sellerName: "Ramesh Chowdary",
        sellerPort: "Bheemili Harbor",
        fishType: "Seer Fish",
        quantity: 35,
        pricePerKg: 480,
        quality: "Fresh",
        availableDate: "Today",
        contact: "+91 98765 43215",
      },
      {
        sellerName: "Madhavi Amma",
        sellerPort: "Visakhapatnam Harbor",
        fishType: "Mackerel",
        quantity: 90,
        pricePerKg: 220,
        quality: "Fresh",
        availableDate: "Today",
        contact: "+91 98765 43216",
      },
      {
        sellerName: "Srinivas Murthy",
        sellerPort: "Rushikonda Beach",
        fishType: "Barracuda",
        quantity: 25,
        pricePerKg: 450,
        quality: "Premium",
        availableDate: "Tomorrow",
        contact: "+91 98765 43217",
      },
      {
        sellerName: "Annapurna Devi",
        sellerPort: "Gangavaram Port",
        fishType: "Crab",
        quantity: 40,
        pricePerKg: 580,
        quality: "Premium",
        availableDate: "Today",
        contact: "+91 98765 43218",
      },
      {
        sellerName: "Krishna Murthy",
        sellerPort: "Visakhapatnam Harbor",
        fishType: "Snapper",
        quantity: 55,
        pricePerKg: 460,
        quality: "Fresh",
        availableDate: "Today",
        contact: "+91 98765 43219",
      },
      {
        sellerName: "Jagadish Varma",
        sellerPort: "Bheemili Harbor",
        fishType: "Squid",
        quantity: 60,
        pricePerKg: 380,
        quality: "Fresh",
        availableDate: "Tomorrow",
        contact: "+91 98765 43220",
      },
      {
        sellerName: "Sailaja Kumari",
        sellerPort: "Yarada Beach",
        fishType: "Anchovy",
        quantity: 100,
        pricePerKg: 150,
        quality: "Fresh",
        availableDate: "Today",
        contact: "+91 98765 43221",
      },
      {
        sellerName: "Narayana Rao",
        sellerPort: "Gangavaram Port",
        fishType: "Grouper",
        quantity: 28,
        pricePerKg: 550,
        quality: "Premium",
        availableDate: "Today",
        contact: "+91 98765 43222",
      },
      {
        sellerName: "Durga Prasad",
        sellerPort: "Visakhapatnam Harbor",
        fishType: "Ribbonfish",
        quantity: 70,
        pricePerKg: 280,
        quality: "Fresh",
        availableDate: "Tomorrow",
        contact: "+91 98765 43223",
      },
      {
        sellerName: "Subba Rao",
        sellerPort: "Bheemili Harbor",
        fishType: "Sailfish",
        quantity: 15,
        pricePerKg: 720,
        quality: "Premium",
        availableDate: "Today",
        contact: "+91 98765 43224",
      },
      {
        sellerName: "Padma Vathi",
        sellerPort: "Rushikonda Beach",
        fishType: "Croaker",
        quantity: 85,
        pricePerKg: 240,
        quality: "Fresh",
        availableDate: "Today",
        contact: "+91 98765 43225",
      },
      {
        sellerName: "Venkateswara Rao",
        sellerPort: "Gangavaram Port",
        fishType: "Cobia",
        quantity: 32,
        pricePerKg: 490,
        quality: "Premium",
        availableDate: "Tomorrow",
        contact: "+91 98765 43226",
      },
      {
        sellerName: "Manjula Devi",
        sellerPort: "Visakhapatnam Harbor",
        fishType: "Horse Mackerel",
        quantity: 95,
        pricePerKg: 200,
        quality: "Fresh",
        availableDate: "Today",
        contact: "+91 98765 43227",
      },
    ];

    listingsData.forEach((data) => {
      const id = randomUUID();
      this.marketplaceListings.set(id, { ...data, id, isActive: true });
    });

    // Seed Chatbot Responses - Comprehensive Training Data
    const chatbotData: InsertChatbotResponse[] = [
      // About SeaBrain Platform
      {
        question: "What is SeaBrain?",
        answerEnglish: "SeaBrain is a government-grade ocean intelligence platform for fishermen of Andhra Pradesh. We provide AI-powered fish predictions, real-time climate monitoring, and marketplace intelligence to help you catch more fish and earn better income! 🐟",
        answerTelugu: "సీబ్రెయిన్ ఆంధ్రప్రదేశ్ మత్స్యకారుల కోసం ప్రభుత్వ-స్థాయి సముద్ర మేధస్సు వేదిక. మేము AI ఆధారిత చేప అంచనాలు, రియల్ టైం వాతావరణ పర్యవేక్షణ మరియు మార్కెట్ తెలివితేటలను అందిస్తాము! 🐟",
        answerTamil: "சீபிரைன் என்பது ஆந்திரப் பிரதேச மீனவர்களுக்கான அரசாங்க தர கடல் நுண்ணறிவு தளம். AI சக்தி கொண்ட மீன் கணிப்புகள், நேரடி காலநிலை கண்காணிப்பு மற்றும் சந்தை நுண்ணறிவை வழங்குகிறோம்! 🐟",
        category: "platform",
      },
      {
        question: "How does SeaBrain work?",
        answerEnglish: "SeaBrain uses AI to analyze ocean data, satellite imagery, and historical catch patterns to predict the best fishing zones. You get real-time weather updates, market prices, and can connect with buyers directly through our marketplace! 🌊🤖",
        answerTelugu: "సీబ్రెయిన్ సముద్ర డేటా, ఉపగ్రహ చిత్రాలు మరియు చారిత్రక క్యాచ్ నమూనాలను విశ్లేషించడానికి AIని ఉపయోగిస్తుంది. మీకు రియల్ టైం వాతావరణ నవీకరణలు, మార్కెట్ ధరలు లభిస్తాయి! 🌊🤖",
        answerTamil: "சீபிரைன் கடல் தரவு, செயற்கைக்கோள் படங்கள் மற்றும் வரலாற்று மீன்பிடி முறைகளை பகுப்பாய்வு செய்ய AI பயன்படுத்துகிறது! 🌊🤖",
        category: "platform",
      },
      {
        question: "Is SeaBrain free to use?",
        answerEnglish: "Yes! SeaBrain is supported by the Digital Fisheries Mission and SmartIDEAthon 2025. Basic features are completely free. Premium features like advanced AI predictions and satellite data access are available at affordable rates! 💯",
        answerTelugu: "అవునూ! సీబ్రెయిన్‌కు డిజిటల్ ఫిషరీస్ మిషన్ మద్దతు ఉంది. ప్రాథమిక ఫీచర్లు పూర్తిగా ఉచితం. ప్రీమియం ఫీచర్లు సరసమైన ధరలకు లభ్యమవుతాయి! 💯",
        answerTamil: "ஆம்! சீபிரைன் டிஜிட்டல் மீன்வள பணியால் ஆதரிக்கப்படுகிறது. அடிப்படை அம்சங்கள் முற்றிலும் இலவசம்! 💯",
        category: "platform",
      },
      {
        question: "How to use the dashboard?",
        answerEnglish: "Visit the Dashboard to see AI fish predictions, weather conditions, and your catch history. The map shows color-coded fishing zones - green for high probability, yellow for medium, red for low. Click any zone for detailed insights! 📊",
        answerTelugu: "AI చేప అంచనాలు, వాతావరణ పరిస్థితులు చూడటానికి డాష్‌బోర్డ్‌ని సందర్శించండి. మ్యాప్ రంగు-కోడెడ్ ఫిషింగ్ జోన్‌లను చూపుతుంది - అధిక సంభావ్యత కోసం ఆకుపచ్చ! 📊",
        answerTamil: "AI மீன் கணிப்புகள், வானிலை நிலைமைகளைக் காண டாஷ்போர்டைப் பார்வையிடவும். வரைபடம் நிற-குறியீடு செய்யப்பட்ட மீன்பிடி மண்டலங்களைக் காட்டுகிறது! 📊",
        category: "website",
      },
      {
        question: "How to check fish zones?",
        answerEnglish: "Go to 'Fish Zones' in the navigation menu. You'll see an interactive map of Andhra Pradesh coast with AI-predicted fishing zones. Each zone shows fish type, probability percentage, and best time to visit! 🗺️",
        answerTelugu: "నావిగేషన్ మెనూలో 'ఫిష్ జోన్స్'కి వెళ్లండి. మీరు AI అంచనా ఫిషింగ్ జోన్‌లతో ఆంధ్రప్రదేశ్ తీరం యొక్క ఇంటరాక్టివ్ మ్యాప్‌ను చూస్తారు! 🗺️",
        answerTamil: "வழிசெலுத்தல் மெனுவில் 'மீன் மண்டலங்கள்' என்பதற்குச் செல்லவும். AI கணிக்கப்பட்ட மீன்பிடி மண்டலங்களுடன் ஆந்திரா கடற்கரையின் ஊடாடும் வரைபடத்தைக் காண்பீர்கள்! 🗺️",
        category: "website",
      },
      {
        question: "How to sell my catch?",
        answerEnglish: "Visit the Marketplace section! Create a listing with your fish type, quantity, and price. Buyers can contact you directly. Current top prices: Pomfret ₹450/kg, Tuna ₹380/kg, Prawns ₹650/kg! 💰",
        answerTelugu: "మార్కెట్‌ప్లేస్ విభాగాన్ని సందర్శించండి! మీ చేప రకం, పరిమాణం మరియు ధరతో జాబితాను సృష్టించండి. కొనుగోలుదారులు మిమ్మల్ని నేరుగా సంప్రదించవచ్చు! 💰",
        answerTamil: "சந்தை பகுதியைப் பார்வையிடவும்! உங்கள் மீன் வகை, அளவு மற்றும் விலையுடன் பட்டியலை உருவாக்கவும்! 💰",
        category: "website",
      },
      
      // Fishing Zones & Predictions
      {
        question: "Where should I fish today?",
        answerEnglish: "Best zones today: Bheemili Coastal Zone (High Tuna, 85% probability), Yarada Beach (Pomfret, 72%), Rushikonda Waters (Sardines, 68%). Check the Fish Map for live updates! 🎣",
        answerTelugu: "ఈ రోజు ఉత్తమ జోన్లు: భీములిపట్నం కోస్టల్ జోన్ (అధిక ట్యూనా, 85% సంభావ్యత), యారాడ బీచ్ (పాపలెట్, 72%), రుషికొండ వాటర్స్ (సార్డిన్స్, 68%)! 🎣",
        answerTamil: "இன்றைய சிறந்த மண்டலங்கள்: பீமிலி கடற்கரை மண்டலம் (உயர் டுனா, 85% வாய்ப்பு), யாராடா கடற்கரை (பாம்ஃப்ரெட், 72%)! 🎣",
        category: "fishing",
      },
      {
        question: "Best time to fish?",
        answerEnglish: "Optimal fishing times: Early morning (5 AM - 8 AM) and evening (4 PM - 7 PM) when fish are most active. Avoid 11 AM - 2 PM due to high sun intensity. Full moon nights are excellent for certain species! 🌅",
        answerTelugu: "సరైన ఫిషింగ్ సమయాలు: తెల్లవారుజామున (5 AM - 8 AM) మరియు సాయంత్రం (4 PM - 7 PM). 11 AM - 2 PM మధ్య ఎండ ఎక్కువగా ఉంటుంది కాబట్టి తప్పించుకోండి! 🌅",
        answerTamil: "உகந்த மீன்பிடி நேரங்கள்: அதிகாலை (5 AM - 8 AM) மற்றும் மாலை (4 PM - 7 PM). 11 AM - 2 PM தவிர்க்கவும்! 🌅",
        category: "fishing",
      },
      {
        question: "Which fish are available now?",
        answerEnglish: "November season: Tuna, Pomfret, Sardines, King Fish, Prawns, and Crabs are abundant. Tuna migration is at peak! Pomfret quality is excellent near Visakhapatnam port. 🐟🦐",
        answerTelugu: "నవంబర్ సీజన్: ట్యూనా, పాపలెట్, సార్డిన్స్, కింగ్ ఫిష్, రొయ్యలు మరియు పీతలు సమృద్ధిగా ఉన్నాయి. విశాఖపట్నం ఓడరేవు దగ్గర పాపలెట్ నాణ్యత అద్భుతంగా ఉంది! 🐟🦐",
        answerTamil: "நவம்பர் பருவம்: டுனா, பாம்ஃப்ரெட், சாடின்கள், கிங் ஃபிஷ், இறால் மற்றும் நண்டுகள் ஏராளமாக உள்ளன! 🐟🦐",
        category: "fishing",
      },
      {
        question: "Deep sea or coastal fishing?",
        answerEnglish: "Coastal fishing (0-12 nautical miles) is good for beginners - Sardines, Mackerel, Pomfret. Deep sea (12-200 nm) offers Tuna, King Fish, Barracuda but requires larger boats and more fuel. Check weather before deep sea trips! ⛵",
        answerTelugu: "కోస్టల్ ఫిషింగ్ (0-12 నాటికల్ మైళ్లు) ప్రారంభకులకు మంచిది - సార్డిన్స్, మాకెరెల్, పాపలెట్. డీప్ సీ (12-200 nm) ట్యూనా, కింగ్ ఫిష్ అందిస్తుంది! ⛵",
        answerTamil: "கடலோர மீன்பிடித்தல் (0-12 கடல் மைல்) ஆரம்பநிலையாளர்களுக்கு நல்லது. ஆழ்கடல் (12-200 nm) டுனா, கிங் ஃபிஷ் வழங்குகிறது! ⛵",
        category: "fishing",
      },
      
      // Weather & Climate
      {
        question: "What is the weather today?",
        answerEnglish: "Today's conditions: Temperature 28°C, Wind Speed 12 km/h, Wave Height 0.8m, Tide: Medium. Safety Level: SAFE ✅. Perfect for coastal and deep sea fishing. Check Climate page for 7-day forecast! ☀️",
        answerTelugu: "ఇప్పటి పరిస్థితులు: ఉష్ణోగ్రత 28°C, గాలి వేగం 12 km/h, అల ఎత్తు 0.8m, టైడ్: మధ్యస్థం. భద్రత స్థాయి: సురక్షితం ✅. 7 రోజుల సూచన కోసం క్లైమేట్ పేజీని చెక్ చేయండి! ☀️",
        answerTamil: "இன்றைய நிலைமைகள்: வெப்பநிலை 28°C, காற்று வேகம் 12 km/h, அலை உயரம் 0.8m, அலை: நடுத்தரம். பாதுகாப்பு நிலை: பாதுகாப்பானது ✅! ☀️",
        category: "weather",
      },
      {
        question: "Is it safe to go fishing?",
        answerEnglish: "Check the Safety Level indicator: 🟢 GREEN = Safe to sail, 🟡 YELLOW = Proceed with caution, check equipment, 🔴 RED = Stay at harbor, dangerous conditions. Always carry life jackets and emergency beacon! 🦺",
        answerTelugu: "భద్రత స్థాయి సూచికను తనిఖీ చేయండి: 🟢 ఆకుపచ్చ = ప్రయాణించడానికి సురక్షితం, 🟡 పసుపు = జాగ్రత్తతో కొనసాగండి, 🔴 ఎరుపు = నౌకాశ్రయంలో ఉండండి! 🦺",
        answerTamil: "பாதுகாப்பு நிலை குறிப்பானைச் சரிபார்க்கவும்: 🟢 பச்சை = பாதுகாப்பான பயணம், 🟡 மஞ்சள் = எச்சரிக்கையுடன் தொடரவும், 🔴 சிவப்பு = துறைமுகத்தில் இருங்கள்! 🦺",
        category: "weather",
      },
      {
        question: "When is monsoon season?",
        answerEnglish: "Monsoon season: June-September. Heavy fishing restrictions during this period. Best fishing months: October-May. Peak season: November-February with calm seas and abundant catch! 🌊",
        answerTelugu: "రుతుపవనాల కాలం: జూన్-సెప్టెంబర్. ఈ కాలంలో భారీ చేపలు పట్టడం ఆంక్షలు. ఉత్తమ చేపలు పట్టే నెలలు: అక్టోబర్-మే. పీక్ సీజన్: నవంబర్-ఫిబ్రవరి! 🌊",
        answerTamil: "பருவமழை காலம்: ஜூன்-செப்டம்பர். இந்த காலத்தில் மீன்பிடி கட்டுப்பாடுகள். சிறந்த மீன்பிடி மாதங்கள்: அக்டோபர்-மே! 🌊",
        category: "weather",
      },
      {
        question: "What are wave heights?",
        answerEnglish: "Wave Height Guide: 0-0.5m = Very calm, ideal for all boats. 0.5-1.5m = Moderate, safe for medium boats. 1.5-3m = Rough, only large boats. Above 3m = Very dangerous, stay at port! Current: Check Climate dashboard. 🌊",
        answerTelugu: "అల ఎత్తు గైడ్: 0-0.5m = చాలా ప్రశాంతం, అన్ని పడవలకు అనువైనది. 0.5-1.5m = మధ్యస్థం, మీడియం పడవలకు సురక్షితం. 1.5-3m = కఠినం. 3m పైన = చాలా ప్రమాదకరం! 🌊",
        answerTamil: "அலை உயர வழிகாட்டி: 0-0.5m = மிகவும் அமைதியானது, அனைத்து படகுகளுக்கும் ஏற்றது. 0.5-1.5m = மிதமானது. 1.5-3m = கடினமானது! 🌊",
        category: "weather",
      },
      
      // Market & Prices
      {
        question: "What are the current market prices?",
        answerEnglish: "Today's market rates: Pomfret ₹450/kg, Tuna ₹380/kg, King Fish ₹420/kg, Sardines ₹180/kg, Prawns ₹650/kg, Crabs ₹350/kg. Prices updated every 2 hours. Premium quality fetches 20% more! 💰",
        answerTelugu: "నేటి మార్కెట్ ధరలు: పాపలెట్ ₹450/కిలో, ట్యూనా ₹380/కిలో, కింగ్ ఫిష్ ₹420/కిలో, సార్డిన్స్ ₹180/కిలో, రొయ్యలు ₹650/కిలో, పీతలు ₹350/కిలో! 💰",
        answerTamil: "இன்றைய சந்தை விலைகள்: பாம்ஃப்ரெட் ₹450/கிலோ, டுனா ₹380/கிலோ, கிங் ஃபிஷ் ₹420/கிலோ, சாடின்கள் ₹180/கிலோ, இறால் ₹650/கிலோ! 💰",
        category: "price",
      },
      {
        question: "Where to sell fish for best price?",
        answerEnglish: "Best markets: 1) Visakhapatnam Fish Market (highest prices, bulk buyers), 2) Bheemili Port (quick sale), 3) Gangavaram Harbor (export quality). Use our Marketplace to connect directly with buyers and avoid middlemen! 🏪",
        answerTelugu: "ఉత్తమ మార్కెట్లు: 1) విశాఖపట్నం ఫిష్ మార్కెట్ (అత్యధిక ధరలు), 2) భీములిపట్నం పోర్ట్ (త్వరిత విక్రయం), 3) గంగవరం హార్బర్. మధ్యవర్తులను తప్పించుకోవడానికి మా మార్కెట్‌ప్లేస్‌ని ఉపయోగించండి! 🏪",
        answerTamil: "சிறந்த சந்தைகள்: 1) விசாகப்பட்டினம் மீன் சந்தை (அதிக விலை), 2) பீமிலி துறைமுகம் (விரைவு விற்பனை), 3) கங்காவரம் துறைமுகம்! 🏪",
        category: "price",
      },
      {
        question: "How to get better prices?",
        answerEnglish: "Tips for better prices: 1) Sell early morning for freshness premium, 2) Grade your catch (Premium/Standard), 3) Use ice boxes for quality, 4) Sell directly via our Marketplace, 5) Build long-term buyer relationships. Quality = Money! 📈",
        answerTelugu: "మెరుగైన ధరల కోసం చిట్కాలు: 1) తాజాదనం కోసం ఉదయాన్నే విక్రయించండి, 2) మీ క్యాచ్‌ను గ్రేడ్ చేయండి, 3) నాణ్యత కోసం మంచు పెట్టెలను ఉపయోగించండి, 4) మా మార్కెట్‌ప్లేస్ ద్వారా నేరుగా విక్రయించండి! 📈",
        answerTamil: "சிறந்த விலைக்கான குறிப்புகள்: 1) புத்துணர்ச்சிக்காக அதிகாலையில் விற்கவும், 2) உங்கள் மீன்பிடியை தரப்படுத்தவும், 3) தரத்திற்கு பனிப்பெட்டிகளைப் பயன்படுத்தவும்! 📈",
        category: "price",
      },
      
      // Safety Tips
      {
        question: "Safety tips for fishing?",
        answerEnglish: "Essential safety: ✅ Check weather before sailing, ✅ Carry life jackets for all crew, ✅ Keep emergency beacon/flare, ✅ Inform harbor about route & return time, ✅ Maintain boat engine, ✅ Carry first aid kit, ✅ Never sail alone! 🦺",
        answerTelugu: "అవసరమైన భద్రత: ✅ ప్రయాణానికి ముందు వాతావరణం తనిఖీ చేయండి, ✅ అన్ని సిబ్బందికి లైఫ్ జాకెట్లు తీసుకెళ్లండి, ✅ అత్యవసర బీకన్ ఉంచండి, ✅ మార్గం గురించి హార్బర్‌కు తెలియజేయండి! 🦺",
        answerTamil: "அத்தியாவசிய பாதுகாப்பு: ✅ பயணிக்கும் முன் வானிலையை சரிபார்க்கவும், ✅ அனைத்து பணியாளர்களுக்கும் உயிர் காக்கும் உடைகளை எடுத்துச் செல்லவும்! 🦺",
        category: "safety",
      },
      {
        question: "Emergency contacts?",
        answerEnglish: "Emergency Numbers: 🚨 Coast Guard: 1554, Fisheries Department: 1800-425-1660, Marine Police: 100, Cyclone Warning: 1077. Save these numbers! For medical emergencies at sea, call Coast Guard immediately. Stay safe! 📞",
        answerTelugu: "అత్యవసర నంబర్లు: 🚨 కోస్ట్ గార్డ్: 1554, ఫిషరీస్ డిపార్ట్‌మెంట్: 1800-425-1660, మెరైన్ పోలీస్: 100, సైక్లోన్ వార్నింగ్: 1077. ఈ నంబర్లను సేవ్ చేయండి! 📞",
        answerTamil: "அவசர எண்கள்: 🚨 கடலோரக் காவல்படை: 1554, மீன்வள துறை: 1800-425-1660, கடல் காவல்துறை: 100, சூறாவளி எச்சரிக்கை: 1077! 📞",
        category: "safety",
      },
      {
        question: "What equipment do I need?",
        answerEnglish: "Basic equipment: 🎣 Quality nets/fishing rods, 🧊 Ice boxes, 📱 Mobile with SeaBrain app, 🧭 GPS/compass, ⚓ Anchor, 🔦 Flashlight, 🔧 Basic tools, 💊 First aid kit, 🦺 Life jackets, 📻 Radio/communication device. Invest in quality! 🛠️",
        answerTelugu: "ప్రాథమిక పరికరాలు: 🎣 నాణ్యమైన వలలు/ఫిషింగ్ రాడ్స్, 🧊 మంచు పెట్టెలు, 📱 సీబ్రెయిన్ యాప్‌తో మొబైల్, 🧭 GPS/దిక్సూచి, ⚓ యాంకర్, 🔦 టార్చ్, 💊 ప్రథమ చికిత్స కిట్! 🛠️",
        answerTamil: "அடிப்படை உபகரணங்கள்: 🎣 தரமான வலைகள், 🧊 பனிப்பெட்டிகள், 📱 சீபிரைன் பயன்பாட்டுடன் மொபைல், 🧭 GPS, ⚓ நங்கூரம், 🔦 டார்ச், 💊 முதலுதவி பெட்டி! 🛠️",
        category: "safety",
      },
      
      // Community & Support
      {
        question: "How to join the community?",
        answerEnglish: "Join SeaBrain community! Visit the Community page to connect with 2000+ fishermen, share catch updates, learn best practices, and get support. Together we're making fishing smarter and more profitable! 🤝",
        answerTelugu: "సీబ్రెయిన్ కమ్యూనిటీలో చేరండి! 2000+ మత్స్యకారులతో కనెక్ట్ అవ్వడానికి, క్యాచ్ అప్‌డేట్‌లను భాగస్వామ్యం చేయడానికి, ఉత్తమ అభ్యాసాలను తెలుసుకోవడానికి కమ్యూనిటీ పేజీని సందర్శించండి! 🤝",
        answerTamil: "சீபிரைன் சமூகத்தில் சேரவும்! 2000+ மீனவர்களுடன் இணைய, மீன்பிடி புதுப்பிப்புகளைப் பகிர, சிறந்த நடைமுறைகளை அறிய சமூகப் பக்கத்தைப் பார்வையிடவும்! 🤝",
        category: "community",
      },
      {
        question: "Can I get training?",
        answerEnglish: "Yes! We offer free training on: Using SeaBrain platform, Modern fishing techniques, Safety procedures, Market negotiation, Financial literacy. Check our website for upcoming workshops in your area! 📚",
        answerTelugu: "అవును! మేము ఉచిత శిక్షణను అందిస్తాము: సీబ్రెయిన్ ప్లాట్‌ఫారమ్ ఉపయోగించడం, ఆధునిక చేపలు పట్టే పద్ధతులు, భద్రతా విధానాలు, మార్కెట్ చర్చలు, ఆర్థిక అక్షరాస్యత! 📚",
        answerTamil: "ஆம்! இலவச பயிற்சியை வழங்குகிறோம்: சீபிரைன் தளத்தைப் பயன்படுத்துதல், நவீன மீன்பிடி நுட்பங்கள், பாதுகாப்பு நடைமுறைகள், சந்தை பேச்சுவார்த்தை! 📚",
        category: "community",
      },
      {
        question: "How to contact support?",
        answerEnglish: "Need help? 💬 Chat with me (SEA-Assist) anytime, 📧 Email: support@seabrain.in, 📞 Helpline: 1800-SEA-BRAIN, 🌐 Visit Community page for peer support. We're here to help you succeed! Available in English, Telugu & Tamil! 🙋",
        answerTelugu: "సహాయం అవసరమా? 💬 ఎప్పుడైనా నాతో (SEA-Assist) చాట్ చేయండి, 📧 ఇమెయిల్: support@seabrain.in, 📞 హెల్ప్‌లైన్: 1800-SEA-BRAIN. ఆంగ్లం, తెలుగు & తమిళంలో అందుబాటులో ఉంది! 🙋",
        answerTamil: "உதவி தேவையா? 💬 எந்த நேரத்திலும் என்னுடன் (SEA-Assist) அரட்டையடிக்கவும், 📧 மின்னஞ்சல்: support@seabrain.in, 📞 உதவி எண்: 1800-SEA-BRAIN! 🙋",
        category: "support",
      },
      {
        question: "What languages are supported?",
        answerEnglish: "SeaBrain is available in English, Telugu (తెలుగు), and Tamil (தமிழ்)! You can switch languages anytime using the language selector. All features, predictions, and support are available in your preferred language! 🌐",
        answerTelugu: "సీబ్రెయిన్ ఆంగ్లం, తెలుగు మరియు తమిళంలో అందుబాటులో ఉంది! మీరు భాషా ఎంపిక ఉపయోగించి ఎప్పుడైనా భాషలను మార్చవచ్చు! 🌐",
        answerTamil: "சீபிரைன் ஆங்கிலம், தெலுங்கு மற்றும் தமிழில் கிடைக்கிறது! மொழி தேர்வாளரைப் பயன்படுத்தி எந்த நேரத்திலும் மொழிகளை மாற்றலாம்! 🌐",
        category: "support",
      },
      
      // Additional Common Questions
      {
        question: "How accurate are predictions?",
        answerEnglish: "Our AI predictions have 78-85% accuracy based on satellite data, ocean temperature, currents, and historical patterns. Accuracy improves as you provide feedback on your catches! The more fishermen use SeaBrain, the smarter it gets! 🎯",
        answerTelugu: "ఉపగ్రహ డేటా, సముద్ర ఉష్ణోగ్రత, ప్రవాహాలు మరియు చారిత్రక నమూనాల ఆధారంగా మా AI అంచనాలకు 78-85% ఖచ్చితత్వం ఉంది! 🎯",
        answerTamil: "செயற்கைக்கோள் தரவு, கடல் வெப்பநிலை, நீரோட்டங்கள் மற்றும் வரலாற்று முறைகளின் அடிப்படையில் எங்கள் AI கணிப்புகள் 78-85% துல்லியம் கொண்டவை! 🎯",
        category: "platform",
      },
      {
        question: "Can I use offline?",
        answerEnglish: "Yes! SeaBrain works offline. Download maps and predictions before sailing. Your data syncs automatically when you're back online. Perfect for remote fishing areas with poor network! 📡",
        answerTelugu: "అవును! సీబ్రెయిన్ ఆఫ్‌లైన్‌లో పనిచేస్తుంది. ప్రయాణానికి ముందు మ్యాప్‌లు మరియు అంచనాలను డౌన్‌లోడ్ చేయండి. మీరు తిరిగి ఆన్‌లైన్‌లో ఉన్నప్పుడు మీ డేటా స్వయంచాలకంగా సింక్ అవుతుంది! 📡",
        answerTamil: "ஆம்! சீபிரைன் ஆஃப்லைனில் வேலை செய்கிறது. பயணிக்கும் முன் வரைபடங்கள் மற்றும் கணிப்புகளைப் பதிவிறக்கவும்! 📡",
        category: "platform",
      },
      {
        question: "What is the best boat size?",
        answerEnglish: "Boat size depends on fishing type: Small boats (15-20 ft) for coastal fishing up to 12 nm, Medium boats (25-35 ft) for 12-50 nm, Large trawlers (40+ ft) for deep sea beyond 50 nm. Always match boat capacity with crew and catch weight! ⛵",
        answerTelugu: "పడవ పరిమాణం చేపలు పట్టే రకాన్ని బట్టి ఉంటుంది: చిన్న పడవలు (15-20 అడుగులు) 12 nm వరకు కోస్టల్ ఫిషింగ్ కోసం, మీడియం పడవలు (25-35 అడుగులు) 12-50 nm కోసం! ⛵",
        answerTamil: "படகு அளவு மீன்பிடி வகையைப் பொறுத்தது: சிறிய படகுகள் (15-20 அடி) 12 nm வரை கடலோர மீன்பிடிப்புக்கு, நடுத்தர படகுகள் (25-35 அடி) 12-50 nm! ⛵",
        category: "fishing",
      },
      {
        question: "Fuel saving tips?",
        answerEnglish: "Save fuel: 🔧 Maintain engine regularly, ⚡ Use optimal speed (not too fast), 🗺️ Plan shortest route using our maps, 🎣 Fish in predicted zones (less searching), 🌊 Sail with favorable currents, ⚖️ Reduce unnecessary weight. Save fuel = More profit! ⛽",
        answerTelugu: "ఇంధనం ఆదా: 🔧 ఇంజిన్‌ను క్రమం తప్పకుండా నిర్వహించండి, ⚡ సరైన వేగాన్ని ఉపయోగించండి, 🗺️ మా మ్యాప్‌లను ఉపయోగించి చిన్న మార్గాన్ని ప్లాన్ చేయండి! ⛽",
        answerTamil: "எரிபொருள் சேமிப்பு: 🔧 இயந்திரத்தை தொடர்ந்து பராமரிக்கவும், ⚡ உகந்த வேகத்தைப் பயன்படுத்தவும், 🗺️ எங்கள் வரைபடங்களைப் பயன்படுத்தி குறுகிய பாதையைத் திட்டமிடவும்! ⛽",
        category: "fishing",
      },
    ];

    chatbotData.forEach((data) => {
      const id = randomUUID();
      this.chatbotResponses.set(id, { 
        ...data, 
        id,
        answerTelugu: data.answerTelugu || null,
        answerTamil: data.answerTamil || null
      });
    });

    // Seed Community Stats
    const communityData: InsertCommunityStats[] = [
      {
        region: "Visakhapatnam",
        totalFishers: 450,
        avgCatchPerDay: 45,
        marketContribution: 32,
        primaryFishType: "Tuna",
        month: "November 2025",
      },
      {
        region: "Bheemili",
        totalFishers: 320,
        avgCatchPerDay: 52,
        marketContribution: 28,
        primaryFishType: "Pomfret",
        month: "November 2025",
      },
      {
        region: "Yarada",
        totalFishers: 180,
        avgCatchPerDay: 38,
        marketContribution: 22,
        primaryFishType: "Sardine",
        month: "November 2025",
      },
      {
        region: "Gangavaram",
        totalFishers: 250,
        avgCatchPerDay: 48,
        marketContribution: 18,
        primaryFishType: "Prawns",
        month: "November 2025",
      },
    ];

    communityData.forEach((data) => {
      const id = randomUUID();
      this.communityStats.set(id, { ...data, id });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Fish Prediction methods
  async getAllFishPredictions(): Promise<FishPrediction[]> {
    return Array.from(this.fishPredictions.values());
  }

  async getFishPredictionById(id: string): Promise<FishPrediction | undefined> {
    return this.fishPredictions.get(id);
  }

  async createFishPrediction(prediction: InsertFishPrediction): Promise<FishPrediction> {
    const id = randomUUID();
    const fishPrediction: FishPrediction = { ...prediction, id };
    this.fishPredictions.set(id, fishPrediction);
    return fishPrediction;
  }

  // Weather methods
  async getCurrentWeather(location: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values()).find((w) => w.location === location);
  }

  async getAllWeatherData(): Promise<WeatherData[]> {
    return Array.from(this.weatherData.values());
  }

  async createWeatherData(weather: InsertWeatherData): Promise<WeatherData> {
    const id = randomUUID();
    const weatherData: WeatherData = { ...weather, id, timestamp: new Date() };
    this.weatherData.set(id, weatherData);
    return weatherData;
  }

  // Marketplace methods
  async getAllListings(): Promise<MarketplaceListing[]> {
    return Array.from(this.marketplaceListings.values()).filter((l) => l.isActive);
  }

  async getListingById(id: string): Promise<MarketplaceListing | undefined> {
    return this.marketplaceListings.get(id);
  }

  async createListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing> {
    const id = randomUUID();
    const marketplaceListing: MarketplaceListing = { ...listing, id, isActive: true };
    this.marketplaceListings.set(id, marketplaceListing);
    return marketplaceListing;
  }

  // Chatbot methods
  async getAllChatbotResponses(): Promise<ChatbotResponse[]> {
    return Array.from(this.chatbotResponses.values());
  }

  async searchChatbotResponse(query: string): Promise<ChatbotResponse | undefined> {
    const lowerQuery = query.toLowerCase();
    const responses = Array.from(this.chatbotResponses.values());
    
    // Keywords mapping for better matching
    const keywordMap: Record<string, string[]> = {
      'fishing': ['fish', 'catch', 'zone', 'where', 'tuna', 'pomfret', 'sardine', 'prawn'],
      'weather': ['weather', 'climate', 'rain', 'wind', 'wave', 'storm', 'safe', 'temperature', 'tide'],
      'price': ['price', 'market', 'sell', 'cost', 'rate', 'money', 'buy', 'buyer'],
      'safety': ['safety', 'safe', 'danger', 'emergency', 'contact', 'help', 'risk', 'beacon', 'jacket'],
      'platform': ['seabrain', 'app', 'website', 'how', 'use', 'work', 'feature', 'dashboard', 'free'],
      'website': ['dashboard', 'map', 'marketplace', 'community', 'page', 'navigate', 'menu'],
      'community': ['community', 'join', 'connect', 'fishermen', 'training', 'workshop', 'support'],
    };
    
    // Try exact question match first
    let match = responses.find((r) => 
      r.question.toLowerCase() === lowerQuery
    );
    if (match) return match;
    
    // Try partial question match
    match = responses.find((r) => 
      r.question.toLowerCase().includes(lowerQuery) || 
      lowerQuery.includes(r.question.toLowerCase().split(' ').find(word => word.length > 4) || '')
    );
    if (match) return match;
    
    // Try keyword matching
    for (const [category, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        match = responses.find((r) => r.category === category);
        if (match) return match;
      }
    }
    
    // Try answer content match
    match = responses.find((r) =>
      r.answerEnglish.toLowerCase().includes(lowerQuery) ||
      r.category.toLowerCase().includes(lowerQuery)
    );
    
    return match;
  }

  async createChatbotResponse(response: InsertChatbotResponse): Promise<ChatbotResponse> {
    const id = randomUUID();
    const chatbotResponse: ChatbotResponse = { 
      ...response, 
      id,
      answerTelugu: response.answerTelugu || null,
      answerTamil: response.answerTamil || null
    };
    this.chatbotResponses.set(id, chatbotResponse);
    return chatbotResponse;
  }

  // Community Stats methods
  async getAllCommunityStats(): Promise<CommunityStats[]> {
    return Array.from(this.communityStats.values());
  }

  async getCommunityStatsByRegion(region: string): Promise<CommunityStats[]> {
    return Array.from(this.communityStats.values()).filter((s) => s.region === region);
  }

  async createCommunityStats(stats: InsertCommunityStats): Promise<CommunityStats> {
    const id = randomUUID();
    const communityStats: CommunityStats = { ...stats, id };
    this.communityStats.set(id, communityStats);
    return communityStats;
  }

  // Chat Message methods
  async getChatMessagesByListing(listingId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter((m) => m.listingId === listingId);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const chatMessage: ChatMessage = { ...message, id, timestamp: new Date() };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
}

export const storage = new MemStorage();
