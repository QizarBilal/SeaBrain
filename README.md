# 🌊 SeaBrain - Ocean Intelligence Platform

![SeaBrain Banner](https://img.shields.io/badge/SeaBrain-Ocean%20Intelligence-0066a1?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

SeaBrain is a comprehensive ocean intelligence platform designed specifically for fishermen and coastal communities. It provides AI-powered fishing predictions, real-time weather updates, climate monitoring, fish zone mapping, marketplace functionality, and community features - all in one unified platform.

## ✨ Features

### 🎣 Fish Zone Mapping
- Interactive map with 15+ active fishing zones
- Real-time AI predictions for fish abundance
- Zone-specific fish types and catch probabilities
- 5 major harbor locations with detailed information

### 🌤️ Climate & Weather Dashboard
- Real-time weather conditions with stunning animations
- Ocean depth analysis (4 depth levels: 0-10m, 10-20m, 20-50m, 50m+)
- Tide information with visual patterns
- UV index monitoring with circular gauges
- 7-day weather forecast with rain probability charts
- Moon phase tracking for optimal fishing conditions
- Animated safety alerts and recommendations

### 💰 Marketplace
- 18+ active fish sellers with real-time listings
- Search and filter by fish type, location, and price
- Direct contact with sellers
- Price range from ₹150/kg to ₹720/kg
- Variety of fish: Pomfret, Tuna, Sardine, Prawns, King Fish, Seer Fish, and more

### 🤖 SEA Assistant - AI Chatbot
- Multilingual support (English, Telugu, Tamil)
- 30+ pre-trained Q&A responses
- Intelligent keyword-based search
- Quick question suggestions
- Real-time assistance for fishing, weather, market, and safety queries

### 👥 Community Features
- Share fishing experiences and tips
- Connect with other fishermen
- Post updates and photos
- Community engagement platform

### 📊 Analytics Dashboard
- Income growth tracking
- Active fishermen statistics
- 24/7 ocean monitoring insights
- Performance metrics

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4.17** - Utility-first styling
- **Framer Motion 11.18.2** - Smooth animations
- **Wouter 3.3.5** - Lightweight routing
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React-Leaflet** - Interactive maps
- **TanStack Query 5.60.5** - Data fetching and caching

### Backend
- **Express 4.21.2** - Node.js web framework
- **TypeScript** - Type-safe backend
- **Drizzle ORM** - Database toolkit
- **Vite 5.4.20** - Fast build tool
- **Cross-env** - Cross-platform environment variables

### Development Tools
- **ESBuild** - Lightning-fast bundler
- **PostCSS** - CSS processing
- **TSX** - TypeScript execution

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/QizarBilal/SeaBrain.git
   cd SeaBrain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file from template
   cp .env.example .env
   
   # Edit .env with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5000`

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
```

This will:
- Build the frontend with Vite
- Bundle the backend with ESBuild
- Output to `dist/` directory

### Start Production Server
```bash
npm start
```

### Type Checking
```bash
npm run check
```

## 🌐 Deployment Options

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repository to Vercel dashboard for automatic deployments.

### Deploy to Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. Follow the prompts

Or connect your GitHub repository to Netlify dashboard.

### Deploy to Railway/Render
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Configure environment variables

## 📁 Project Structure

```
SeaBrain/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # Radix UI components
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── FloatingChatbot.tsx
│   │   │   └── ...
│   │   ├── pages/        # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Climate.tsx
│   │   │   ├── FishMap.tsx
│   │   │   ├── Marketplace.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Community.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and helpers
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   ├── public/           # Static assets
│   └── index.html        # HTML template
├── server/               # Backend application
│   ├── index.ts         # Express server
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Data storage
│   └── vite.ts          # Vite middleware
├── shared/              # Shared types and schemas
│   └── schema.ts
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── vite.config.ts       # Vite configuration
├── vercel.json          # Vercel deployment config
└── netlify.toml         # Netlify deployment config
```

## 🎨 Design Highlights

### Color Theme
- **Primary Ocean Blue**: `#0066a1`, `#003d66`, `#001233`
- **Accent Cyan**: `#00e5ff`, `#00b8d4`
- **Gradients**: Ocean-themed gradients throughout
- **Dark Mode**: Fully supported with theme switching

### Animations
- Smooth transitions with Framer Motion
- Floating marine elements (fish, anchors, waves)
- Rising bubbles effect
- Animated sunlight rays
- Interactive hover states
- Pulse and shimmer effects

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_url_here
```

### Tailwind Configuration
The theme is configured in `tailwind.config.ts` with custom ocean colors and animations.

### Vite Configuration
Client and server setup is in `vite.config.ts` for optimal development experience.

## 📱 Features in Detail

### Fish Zone Map
- **15 Active Zones**: Comprehensive coverage from Pudimadaka (17.91°N) to Mukhalingam (17.58°N)
- **AI Predictions**: Machine learning-based fish abundance predictions
- **Visual Circles**: Color-coded zones based on probability
- **Zone Details**: Click for detailed information

### Climate Dashboard
- **Real-time Data**: Current weather conditions
- **Ocean Depth Analysis**: 4-layer depth visualization
- **Tide Patterns**: 12-hour tide chart
- **UV Index**: Circular gauge with safety warnings
- **Hourly Forecast**: 5-hour prediction with icons
- **Weekly Forecast**: 7-day outlook with rain probability

### Marketplace
- **18 Sellers**: Diverse fish types and locations
- **Price Range**: ₹150-₹720 per kg
- **Filter Options**: By fish type and location
- **Contact Sellers**: Direct communication

### SEA Assistant
- **3 Languages**: English, Telugu, Tamil
- **30+ Responses**: Pre-trained knowledge base
- **Smart Search**: Keyword-based matching
- **Quick Questions**: Suggested topics
- **Real-time**: Instant responses

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Developed with ❤️ for fishermen and coastal communities.

## 📞 Support

For support, questions, or feedback:
- GitHub Issues: [Create an issue](https://github.com/QizarBilal/SeaBrain/issues)
- Email: support@seabrain.com

## 🙏 Acknowledgments

- Fishermen communities for valuable feedback
- Open-source libraries and contributors
- Design inspiration from ocean conservation initiatives

---

<div align="center">
  <strong>🌊 Making Fishing Smarter with Ocean Intelligence 🐟</strong>
  <br />
  <sub>Built with React, TypeScript, and Ocean Love</sub>
</div>
