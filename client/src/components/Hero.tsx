import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Waves, Satellite, Fish, Anchor, Ship, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-16">
      {/* Layered Ocean Background with Deep Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001233] via-[#003d66] to-[#0066a1]">
        {/* Animated Wave Layers */}
        <div className="absolute inset-0">
          {/* Deep Ocean Layer */}
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0, 150, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 200, 255, 0.2) 0%, transparent 50%)",
            }}
          />
          
          {/* Animated Water Surface Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI1MCI+PHBhdGggZD0iTTAgMjVRMjUgMCA1MCAyNVQxMDAgMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBvcGFjaXR5PSIwLjMiLz48cGF0aCBkPSJNMCAzMFEyNSAxMCA1MCAzMFQxMDAgMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3dhdmVzKSIvPjwvc3ZnPg==')]"></div>
          </div>
        </div>

        {/* Sunlight Rays from Above */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-300/30 via-cyan-400/10 to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                transform: "skewX(-10deg)",
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Fish and Maritime Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const isFish = i % 3 === 0;
          const Icon = isFish ? Fish : i % 2 === 0 ? Anchor : Waves;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, isFish ? 40 : 20, 0],
                y: [0, isFish ? -30 : 20, 0],
                rotate: isFish ? [0, 10, 0] : [0, 360],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: isFish ? 6 + Math.random() * 3 : 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Icon className="w-6 h-6 text-cyan-200/40" />
            </motion.div>
          );
        })}
      </div>

      {/* Bubbles Rising */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
            style={{
              width: `${4 + Math.random() * 12}px`,
              height: `${4 + Math.random() * 12}px`,
              left: `${Math.random() * 100}%`,
              bottom: "-20px",
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20 z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-300/30 mb-8 shadow-2xl">
              <Ship className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-semibold text-cyan-100">
                SmartIDEAthon 2025 | Digital Fisheries Mission
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-heading leading-[1.1]"
          >
            <span className="block text-white drop-shadow-2xl">
              Navigate the Ocean's
            </span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              Hidden Intelligence
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-cyan-50/90 mb-4 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Empowering Andhra Pradesh fishermen with <span className="font-semibold text-cyan-200">AI-powered predictions</span>, 
            <span className="font-semibold text-blue-200"> real-time climate insights</span>, and 
            <span className="font-semibold text-cyan-200"> smart marketplace intelligence</span>
          </motion.p>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10 text-cyan-100/80 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <Fish className="w-5 h-5 text-cyan-300" />
              <span>2000+ Active Fishermen</span>
            </div>
            <div className="w-1 h-1 bg-cyan-400/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span>40% Income Growth</span>
            </div>
            <div className="w-1 h-1 bg-cyan-400/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-300" />
              <span>24/7 Ocean Monitoring</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white border-0 px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              onClick={() => setLocation("/dashboard")}
              data-testid="button-demo"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
              <Fish className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-2 border-cyan-300/50 hover:bg-cyan-400/20 hover:border-cyan-300 backdrop-blur-xl px-10 py-7 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => setLocation("/map")}
              data-testid="button-explore"
            >
              <Satellite className="w-6 h-6 mr-2" />
              Explore Fish Map
            </Button>
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 text-cyan-200/60 text-sm"
          >
            Trusted by Government of Andhra Pradesh • Supporting UN SDG-14: Life Below Water
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ 
            y: [0, 12, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium text-cyan-200/80">Dive Deeper</span>
          <div className="w-6 h-10 border-2 border-cyan-300/50 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-cyan-300 rounded-full"
            />
          </div>
          <ChevronDown className="w-5 h-5 text-cyan-300/70" data-testid="icon-scroll-hint" />
        </motion.div>
      </motion.div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="rgba(255,255,255,0.05)"
            animate={{
              d: [
                "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </section>
  );
}
