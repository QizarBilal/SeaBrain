# SEABRAIN - Ocean Intelligence Platform

## Project Overview

SEABRAIN is a **government-grade ocean intelligence platform** designed for the fishermen of Andhra Pradesh, India. Built for the **SmartIDEAthon 2025 | Digital Fisheries Mission**, this platform combines AI-powered fish predictions, real-time climate monitoring, and marketplace intelligence to empower coastal fishing communities.

### Vision
*"Empowering Bharat's Fishermen through Intelligent Oceans"*

Supporting **UN SDG-14: Life Below Water** 🌊

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** component library
- **Framer Motion** for animations
- **React-Leaflet** for interactive maps
- **Recharts** for data visualization
- **Lottie React** for animated icons
- **Wouter** for client-side routing

### Backend
- **Express.js** server
- **In-memory storage** (MemStorage) for MVP
- **Vite** for development and build

### Design System
**Oceanic-Professional Color Palette:**
- Primary: Deep Sea Blue (#012A4A / hsl(203, 95%, 15%))
- Secondary: Turquoise Blue (#2A9D8F / hsl(174, 56%, 40%))
- Accent: Coral Orange (#F76C6C / hsl(0, 90%, 69%))
- Supportive: Sand Beige (#F6E7CB / hsl(39, 70%, 88%))

**Typography:**
- Headings: Poppins (700-900 weight)
- Body: Inter/Nunito Sans (400-600 weight)

**Design Principles:**
- Glassmorphism for cards and modals
- Ocean-themed animations (waves, floating particles)
- Government-standard professional appearance
- Mobile-first responsive design

## Features

### 1. **Hero Section** 🏠
- Full-screen ocean-gradient background with floating particles
- Animated call-to-action buttons
- Government branding (SmartIDEAthon 2025)
- Smooth scroll indicator

### 2. **About Section** 📖
- Problem → Solution → Impact infographic flow
- Animated feature cards with ocean gradients
- Impact statistics (40% fuel reduction, 85% accuracy, 2000+ fishers)

### 3. **Feature Showcase** ⚡
- 8 comprehensive features with 3D-style hover effects
- AI Fish Prediction, Offline Navigation, SEA-Assist Chatbot
- Climate Alerts, Smart Marketplace, Community Network
- Mobile-optimized design with clear icons

### 4. **Interactive Fish Map** 🗺️
- Leaflet-based map centered on Visakhapatnam coast
- Heatmap circles showing fish zones with probability
- Harbor markers and zone details
- Real-time market price sidebar

### 5. **Climate Dashboard** ☁️
- Real-time weather stats (temperature, wind, waves, visibility)
- Safety alerts with color-coded badges
- Hourly forecast with animated icons
- Tide information with progress indicators
- UV index warnings

### 6. **Smart Marketplace** 🛒
- Buyer-seller listing cards with ratings
- Profile avatars and quality badges
- Live price trend charts (Recharts)
- Profit estimator calculator
- Chat interface (modal drawer)

### 7. **SEA-Assist Chatbot** 💬
- Floating circular button (bottom-right)
- Multilingual support (English, Telugu, Tamil)
- Ocean-gradient modal design
- Typing animation and auto-responses
- Context-aware Q&A (fishing zones, weather, prices, safety)

### 8. **Community Dashboard** 👥
- Regional distribution bar charts
- Catch type pie chart
- Fisher statistics by port
- Community impact metrics
- SDG-14 branding

### 9. **Dashboard** 📊
- Daily stats cards (catch potential, market price, weather)
- Quick action buttons to all features
- Recent alerts feed
- AI-powered recommendations

### 10. **Theme Toggle** 🌓
- Light mode (sunlight on water)
- Dark mode (deep-sea theme)
- Smooth animated transitions
- Persistent localStorage

## Data Schemas

All data models defined in `shared/schema.ts`:
- `fishPredictions` - AI zone predictions with probability
- `weatherData` - Climate and tide information
- `marketplaceListings` - Buyer-seller fish listings
- `chatbotResponses` - Multilingual Q&A database
- `communityStats` - Regional analytics
- `chatMessages` - Marketplace live chat

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/          # Shadcn components
│   │   ├── ThemeProvider.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FeatureShowcase.tsx
│   │   ├── FloatingChatbot.tsx
│   │   └── WaveDivider.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── FishMap.tsx
│   │   ├── Climate.tsx
│   │   ├── Marketplace.tsx
│   │   └── Community.tsx
│   ├── App.tsx
│   └── index.css
├── index.html
server/
├── routes.ts
├── storage.ts
shared/
└── schema.ts
```

## Current Implementation Status

### ✅ Completed (Task 1)
- Full oceanic design system implementation
- All 6 pages with stunning animations
- Navbar with theme toggle and mobile menu
- Interactive Leaflet map with fish zones
- Climate dashboard with charts
- Marketplace with price trends
- Community analytics with visualizations
- Floating chatbot with multilingual support
- Responsive design across all breakpoints
- Framer Motion animations throughout

### 🚧 In Progress (Task 2)
- Backend API endpoints
- Data persistence layer
- Mock government-quality data

### 📋 Planned (Task 3)
- Frontend-backend integration
- Loading states and error handling
- Final polish and testing

## Running the Application

```bash
npm install
npm run dev
```

The application will be available at the URL shown in the Webview.

## Design Guidelines

Refer to `design_guidelines.md` for comprehensive design specifications including:
- Color palette and usage
- Typography hierarchy
- Component standards
- Animation patterns
- Government branding requirements

## Future Enhancements

**After MVP:**
- OpenAI integration for intelligent chatbot responses
- Live weather and ocean data APIs
- User authentication for personalized profiles
- Real-time marketplace transactions
- Admin dashboard for government monitoring
- PWA for offline mobile app experience
- SMS alerts via Twilio integration

## Government Partnership

**Supported by:**
- Government of Andhra Pradesh
- SmartIDEAthon 2025
- Digital Fisheries Mission

**Target Impact:**
- Empower 10,000+ fishermen across AP coast
- Reduce fuel costs by 40%
- Increase catch efficiency by 32%
- Improve market prices by 18%

---

**Quality Standard:** ₹10-lakh government innovation prototype

**Visual Excellence:** Apple-grade design × Indian Government identity
