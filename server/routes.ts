import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertFishPredictionSchema,
  insertWeatherDataSchema,
  insertMarketplaceListingSchema,
  insertChatbotResponseSchema,
  insertCommunityStatsSchema,
  insertChatMessageSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Fish Prediction Routes
  app.get("/api/fish-predictions", async (_req, res) => {
    try {
      const predictions = await storage.getAllFishPredictions();
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fish predictions" });
    }
  });

  app.get("/api/fish-predictions/:id", async (req, res) => {
    try {
      const prediction = await storage.getFishPredictionById(req.params.id);
      if (!prediction) {
        return res.status(404).json({ error: "Prediction not found" });
      }
      res.json(prediction);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prediction" });
    }
  });

  app.post("/api/fish-predictions", async (req, res) => {
    try {
      const validatedData = insertFishPredictionSchema.parse(req.body);
      const prediction = await storage.createFishPrediction(validatedData);
      res.status(201).json(prediction);
    } catch (error) {
      res.status(400).json({ error: "Invalid prediction data" });
    }
  });

  // Weather Routes
  app.get("/api/weather", async (req, res) => {
    try {
      const location = req.query.location as string;
      if (location) {
        const weather = await storage.getCurrentWeather(location);
        if (!weather) {
          return res.status(404).json({ error: "Weather data not found for location" });
        }
        return res.json(weather);
      }
      const allWeather = await storage.getAllWeatherData();
      res.json(allWeather);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  app.post("/api/weather", async (req, res) => {
    try {
      const validatedData = insertWeatherDataSchema.parse(req.body);
      const weather = await storage.createWeatherData(validatedData);
      res.status(201).json(weather);
    } catch (error) {
      res.status(400).json({ error: "Invalid weather data" });
    }
  });

  // Marketplace Routes
  app.get("/api/marketplace", async (_req, res) => {
    try {
      const listings = await storage.getAllListings();
      res.json(listings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marketplace listings" });
    }
  });

  app.get("/api/marketplace/:id", async (req, res) => {
    try {
      const listing = await storage.getListingById(req.params.id);
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch listing" });
    }
  });

  app.post("/api/marketplace", async (req, res) => {
    try {
      const validatedData = insertMarketplaceListingSchema.parse(req.body);
      const listing = await storage.createListing(validatedData);
      res.status(201).json(listing);
    } catch (error) {
      res.status(400).json({ error: "Invalid listing data" });
    }
  });

  // Chatbot Routes
  app.get("/api/chatbot", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (query) {
        const response = await storage.searchChatbotResponse(query);
        if (!response) {
          return res.status(404).json({ error: "No response found for query" });
        }
        return res.json(response);
      }
      const allResponses = await storage.getAllChatbotResponses();
      res.json(allResponses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chatbot responses" });
    }
  });

  app.post("/api/chatbot", async (req, res) => {
    try {
      const validatedData = insertChatbotResponseSchema.parse(req.body);
      const response = await storage.createChatbotResponse(validatedData);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: "Invalid chatbot response data" });
    }
  });

  // Community Stats Routes
  app.get("/api/community-stats", async (req, res) => {
    try {
      const region = req.query.region as string;
      if (region) {
        const stats = await storage.getCommunityStatsByRegion(region);
        return res.json(stats);
      }
      const allStats = await storage.getAllCommunityStats();
      res.json(allStats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch community stats" });
    }
  });

  app.post("/api/community-stats", async (req, res) => {
    try {
      const validatedData = insertCommunityStatsSchema.parse(req.body);
      const stats = await storage.createCommunityStats(validatedData);
      res.status(201).json(stats);
    } catch (error) {
      res.status(400).json({ error: "Invalid community stats data" });
    }
  });

  // Chat Messages Routes
  app.get("/api/chat-messages/:listingId", async (req, res) => {
    try {
      const messages = await storage.getChatMessagesByListing(req.params.listingId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat-messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid chat message data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
