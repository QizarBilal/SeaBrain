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
    ];

    listingsData.forEach((data) => {
      const id = randomUUID();
      this.marketplaceListings.set(id, { ...data, id, isActive: true });
    });

    // Seed Chatbot Responses
    const chatbotData: InsertChatbotResponse[] = [
      {
        question: "Where should I fish today?",
        answerEnglish: "Try near Bheemili waters. High Tuna activity detected 🌊",
        answerTelugu: "భీములిపట్నం నీరు దగ్గర ప్రయత్నించండి. అధిక ట్యూనా కార్యాచరణ గుర్తించబడింది 🌊",
        answerTamil: "பீமிலி நீரில் முயற்சி செய்யவும். அதிக டுனா செயல்பாடு கண்டறியப்பட்டது 🌊",
        category: "fishing",
      },
      {
        question: "What is the weather today?",
        answerEnglish: "Today: Clear skies, gentle waves (0.5m). Perfect conditions! ☀️",
        answerTelugu: "ఈ రోజు: స్పష్టమైన ఆకాశం, సున్నితమైన తరంగాలు (0.5m). ఖచ్చితమైన పరిస్థితులు! ☀️",
        answerTamil: "இன்று: தெளிவான வானம், மென்மையான அலைகள் (0.5m). சரியான நிலைமைகள்! ☀️",
        category: "weather",
      },
      {
        question: "What are the current market prices?",
        answerEnglish: "Current market: Pomfret ₹450/kg, Tuna ₹320/kg, Sardine ₹180/kg 💰",
        answerTelugu: "ప్రస్తుత మార్కెట్: పాపలెట్ ₹450/కిలో, ట్యూనా ₹320/కిలో, సార్డిన్ ₹180/కిలో 💰",
        answerTamil: "தற்போதைய சந்தை: பாப்லெட் ₹450/கிலோ, டுனா ₹320/கிலோ, சாடின் ₹180/கிலோ 💰",
        category: "price",
      },
      {
        question: "Safety tips for fishing?",
        answerEnglish: "Always check weather alerts. Carry life jackets and emergency beacon 🦺",
        answerTelugu: "ఎల్లప్పుడూ వాతావరణ హెచ్చరికలను తనిఖీ చేయండి. లైఫ్ జాకెట్లు తీసుకెళ్లండి 🦺",
        answerTamil: "எப்போதும் வானிலை எச்சரிக்கைகளை சரிபார்க்கவும். உயிர் காக்கும் உடைகள் எடுத்துச் செல்லவும் 🦺",
        category: "safety",
      },
    ];

    chatbotData.forEach((data) => {
      const id = randomUUID();
      this.chatbotResponses.set(id, { ...data, id });
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
    return Array.from(this.chatbotResponses.values()).find((r) =>
      r.question.toLowerCase().includes(lowerQuery) ||
      r.answerEnglish.toLowerCase().includes(lowerQuery) ||
      r.category.toLowerCase().includes(lowerQuery)
    );
  }

  async createChatbotResponse(response: InsertChatbotResponse): Promise<ChatbotResponse> {
    const id = randomUUID();
    const chatbotResponse: ChatbotResponse = { ...response, id };
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
