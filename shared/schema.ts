import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Fish Prediction Schema
export const fishPredictions = pgTable("fish_predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  zone: text("zone").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  fishType: text("fish_type").notNull(),
  probability: integer("probability").notNull(), // percentage 0-100
  bestTime: text("best_time").notNull(),
  description: text("description").notNull(),
});

export const insertFishPredictionSchema = createInsertSchema(fishPredictions).omit({ id: true });
export type InsertFishPrediction = z.infer<typeof insertFishPredictionSchema>;
export type FishPrediction = typeof fishPredictions.$inferSelect;

// Weather/Climate Schema
export const weatherData = pgTable("weather_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: text("location").notNull(),
  temperature: real("temperature").notNull(),
  windSpeed: real("wind_speed").notNull(),
  waveHeight: real("wave_height").notNull(),
  tideLevel: text("tide_level").notNull(),
  safetyLevel: text("safety_level").notNull(), // safe, caution, danger
  forecast: text("forecast").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({ id: true, timestamp: true });
export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;

// Marketplace Listings Schema
export const marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerName: text("seller_name").notNull(),
  sellerPort: text("seller_port").notNull(),
  fishType: text("fish_type").notNull(),
  quantity: real("quantity").notNull(),
  pricePerKg: real("price_per_kg").notNull(),
  quality: text("quality").notNull(),
  availableDate: text("available_date").notNull(),
  contact: text("contact").notNull(),
  isActive: boolean("is_active").default(true),
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({ id: true, isActive: true });
export type InsertMarketplaceListing = z.infer<typeof insertMarketplaceListingSchema>;
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;

// Chatbot Q&A Schema
export const chatbotResponses = pgTable("chatbot_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  answerEnglish: text("answer_english").notNull(),
  answerTelugu: text("answer_telugu"),
  answerTamil: text("answer_tamil"),
  category: text("category").notNull(),
});

export const insertChatbotResponseSchema = createInsertSchema(chatbotResponses).omit({ id: true });
export type InsertChatbotResponse = z.infer<typeof insertChatbotResponseSchema>;
export type ChatbotResponse = typeof chatbotResponses.$inferSelect;

// Community Analytics Schema
export const communityStats = pgTable("community_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  region: text("region").notNull(),
  totalFishers: integer("total_fishers").notNull(),
  avgCatchPerDay: real("avg_catch_per_day").notNull(),
  marketContribution: real("market_contribution").notNull(), // percentage
  primaryFishType: text("primary_fish_type").notNull(),
  month: text("month").notNull(),
});

export const insertCommunityStatsSchema = createInsertSchema(communityStats).omit({ id: true });
export type InsertCommunityStats = z.infer<typeof insertCommunityStatsSchema>;
export type CommunityStats = typeof communityStats.$inferSelect;

// Chat Message Schema (for live chat in marketplace)
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  listingId: varchar("listing_id").notNull(),
  sender: text("sender").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, timestamp: true });
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// User Schema (keep existing for future auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
