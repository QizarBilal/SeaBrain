# SEABRIAN Ocean Intelligence Platform - Design Guidelines

## Design Philosophy
**"Ocean Intelligence meets Human Wisdom"** - A government-standard, ₹10-lakh-quality platform reflecting Andhra Pradesh's coastal identity with professional, trustworthy, and technologically advanced design.

## Visual Identity

### Color Palette (Oceanic-Professional)
- **Primary:** Deep Sea Blue `#012A4A`
- **Secondary:** Turquoise Blue `#2A9D8F`
- **Accent:** Coral Orange `#F76C6C`
- **Supportive:** Sand Beige `#F6E7CB`
- **Backgrounds:** Navy Gradients `#001F3F → #01497C`
- **Text:** White `#FFFFFF` or Deep Navy `#002233`

Use gradients and soft transparency (glassmorphism) throughout for elegance.

### Typography
- **Headings:** Poppins (700-900 weight)
- **Body:** Inter or Nunito Sans (400-600)
- **Multilingual:** Include Telugu and Tamil fonts for local language support

### Spacing System
Use Tailwind units: 8, 12, 16, 20, 24, 32 for consistent rhythm. Section spacing: py-20 to py-32.

## Layout & Component Standards

### Global Design Principles
- **Consistent corner radius:** 12px+ (rounded-xl)
- **Glassmorphic cards:** backdrop-blur with ocean gradients
- **Depth shadows:** Blurred blue-tinted shadows
- **Smooth transitions:** cubic-bezier(0.19, 1, 0.22, 1)
- **Responsive grid:** Mobile-first with 1-2-3 column progression

### Navigation Bar
- Fixed glass-style navbar with backdrop-blur
- Government of Andhra Pradesh emblem (placeholder) + SeaBrain logo
- Hover underlines with ripple animations
- Theme toggle: Light (sunlight on water) / Dark (deep-sea) modes

### Hero Section
- **Full-screen ocean background:** Video loop of Visakhapatnam coastline/fishing boats
- **Text overlay:** "Empowering Every Fisher with the Intelligence of the Ocean"
- **Animated CTAs:** Two primary buttons with blurred backgrounds when on video
  - "🎣 Experience the Demo"
  - "🛰 Explore Premium Insights"
- **Scroll hint:** Pulsing down arrow animation
- **Gradient transition:** Smooth fade into next sections

### Feature Components

#### About SEABRIAN
- Animated infographics showing "Problem → Solution → Impact" flow
- Icon-driven sections: AI, Fish, Cloud, GPS, Voice
- Lottie animations for Offline Sync, AI Brain, Weather Alert

#### Feature Showcase
- 3D-style cards with hover expansion
- Each card: icon + subtitle + animation + tagline
- Examples:
  - AI Fish Prediction: animated sonar radar
  - Offline Navigation: map pin waves
  - SEA-Assist Chatbot: floating speech bubbles

#### Interactive Map Section
- Embedded Mapbox/OpenLayers zoomed on Visakhapatnam coast
- Heatmap overlays for fish zones
- Harbor pins with hover popups
- Side panel with real-time charts (Recharts/Chart.js):
  - Catch Probability %
  - Market Price Trends
  - Weather Index

#### Climate Dashboard
- Ocean-blue background with glassmorphic cards
- Animated weather/tide/safety alerts
- Moving waves for tide, spinning turbines for wind, drizzle for rain (Lottie)
- "Today's Climate Summary" slide-in component

#### Marketplace
- Elegant buyer-seller cards with avatars, port names, fish types
- "Live Chat" expandable side drawer
- Price trend graphs and profit estimator

#### SEA-Assist Chatbot
- Floating circular icon (bottom-right) expanding to modal
- Ocean-gradient background with animated fish emojis
- Typing animation, multilingual switching (English/Telugu/Tamil)
- Static Q&A with simulated intelligence

#### Community Dashboard
- Infographic charts replacing raw tables:
  - Bar charts: Catch types per region
  - Pie charts: Market contribution
  - Heatmap overlay: Community density
- Motion cards with statistic counters

## Animation & Motion Design

### Section Transitions
- Animated SVG wave dividers between sections
- Subtle bubble particles or floating fish icons (Lottie)
- Ocean depth parallax backgrounds
- Soft lighting & shadow gradients (water refraction effect)
- Page transitions: fade-slide-in with water ripple

### Interaction Effects
- Hover: wave ripple effects
- Click: slight pressure shrink
- All transitions: smooth with 300-400ms duration

## Government Branding

### Official Elements
- Government of Andhra Pradesh logo in footer (placeholder)
- "Supported by SmartIDEAthon 2025 | Digital Fisheries Mission" tagline
- Formal, trustworthy tone throughout
- Material 3 / GOV Design System alignment

### Impact Visualization
- Custom infographic panels:
  - Fuel Cost vs Catch Rate Improvement
  - Digital Inclusion Progress
  - Climate Risk Reduction Impact
- SDG-14 icon ("Life Below Water")

## Mobile Optimization
- Sticky bottom navigation: Dashboard, Map, Chatbot, Alerts
- One-hand use optimization
- Seamless scroll experience
- All cards stack to single column

## Images

### Hero Section
**Large ocean video background** (full viewport):
- Visakhapatnam coastline OR fishing boats at dawn
- Overlay with semi-transparent navy gradient for text readability
- Buttons use backdrop-blur background (no hover state changes)

### Feature Sections
- **Infographic illustrations**: Ocean-themed icons and animations
- **Map screenshots**: Visakhapatnam coastal areas with data overlays
- **Lottie animations**: Fish swimming, boats moving, wave loading animations
- **Chart visualizations**: Ocean-blue gradient backgrounds with glowing data lines

### Visual Motifs
- Looping GIFs of fish swimming as subtle backgrounds
- Boats moving across screen in headers
- Wave patterns as section dividers

## Quality Standards
Visual sophistication matching Apple's polish combined with Indian Government web identity. Every element must feel ocean-inspired, professionally designed, and pitch-ready for ₹10-lakh government innovation prototype presentation.