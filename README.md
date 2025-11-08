# SeaBrain - Ocean Intelligence Platform for Fishermen

![SeaBrain Banner](https://img.shields.io/badge/SeaBrain-Ocean%20Intelligence-0066a1?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)

## 🌊 About SeaBrain

SeaBrain is a comprehensive ocean intelligence platform designed to empower fishermen with real-time data, AI-powered predictions, and community-driven insights. The platform combines weather monitoring, fish zone predictions, marketplace functionality, and community features to support sustainable fishing practices.

## ✨ Features

- **🐟 AI Fish Zone Predictions** - Real-time fishing zone recommendations with probability scores
- **⛅ Climate Dashboard** - Comprehensive weather monitoring with animated visualizations
- **🛒 Marketplace** - Connect buyers and sellers with real-time catch listings
- **👥 Community** - Share experiences, tips, and connect with fellow fishermen
- **🤖 SEA Assistant** - Multilingual AI chatbot (English, Telugu, Tamil) for instant support
- **🗺️ Interactive Maps** - Leaflet-powered maps showing fishing zones and harbors
- **🌓 Dark/Light Theme** - Comfortable viewing in any lighting condition

## 🚀 Tech Stack

### Frontend
- **React 18.3** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Leaflet** for interactive maps
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Radix UI** for accessible components

### Backend
- **Express.js** server
- **TypeScript** for type safety
- **In-memory storage** (can be extended to any database)

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/QizarBilal/SeaBrain.git
   cd SeaBrain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 🏗️ Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
SeaBrain/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and helpers
│   └── public/          # Static assets
├── server/              # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data storage layer
└── shared/              # Shared TypeScript schemas
```

## 🌐 Deployment

### Vercel (Recommended)
1. Import your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Deploy!

### Other Platforms
- **Netlify**: Similar to Vercel setup
- **Railway**: Perfect for full-stack deployment
- **Render**: Great for both frontend and backend
- **Heroku**: Traditional platform support

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

### Customization
- Theme colors: Edit `tailwind.config.ts`
- Design guidelines: See `design_guidelines.md`
- API endpoints: Modify `server/routes.ts`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Created with ❤️ for the fishing community

## 🙏 Acknowledgments

- Weather data visualization inspired by modern meteorological interfaces
- Community features designed with fishermen feedback
- AI predictions based on oceanographic research

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with 🌊 by SeaBrain Team**
