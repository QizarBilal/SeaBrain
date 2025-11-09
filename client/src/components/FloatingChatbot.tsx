import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

type Language = "english" | "telugu" | "tamil";

const mockResponses: Record<string, { english: string; telugu: string; tamil: string }> = {
  "fishing": {
    english: "Try near Bheemili waters. High Tuna activity detected",
    telugu: "భీములిపట్నం నీరు దగ్గర ప్రయత్నించండి. అధిక ట్యూనా కార్యాచరణ గుర్తించబడింది",
    tamil: "பீமிலி நீரில் முயற்சி செய்யவும். அதிக டுனா செயல்பாடு கண்டறியப்பட்டது"
  },
  "weather": {
    english: "Today: Clear skies, gentle waves (0.5m). Perfect conditions for fishing!",
    telugu: "ఈ రోజు: స్పష్టమైన ఆకాశం, సున్నితమైన తరంగాలు (0.5m). చేపలు పట్టడానికి ఖచ్చితమైన పరిస్థితులు!",
    tamil: "இன்று: தெளிவான வானம், மென்மையான அலைகள் (0.5m). மீன்பிடிப்புக்கு சரியான நிலைமைகள்!"
  },
  "price": {
    english: "Current market: Pomfret ₹450/kg, Tuna ₹320/kg, Sardine ₹180/kg",
    telugu: "ప్రస్తుత మార్కెట్: పాపలెట్ ₹450/కిలో, ట్యూనా ₹320/కిలో, సార్డిన్ ₹180/కిలో",
    tamil: "தற்போதைய சந்தை: பாப்லெட் ₹450/கிலோ, டுனா ₹320/கிலோ, சாடின் ₹180/கிலோ"
  },
  "safety": {
    english: "Always check weather alerts before sailing. Carry life jackets and emergency beacon",
    telugu: "ప్రయాణానికి ముందు ఎల్లప్పుడూ వాతావరణ హెచ్చరికలను తనిఖీ చేయండి. లైఫ్ జాకెట్లు మరియు అత్యవసర బీకన్ తీసుకెళ్లండి",
    tamil: "பயணிக்கும் முன் எப்போதும் வானிலை எச்சரிக்கைகளை சரிபார்க்கவும். உயிர் காக்கும் உடைகள் மற்றும் அவசர கலங்கரை விளக்கம் எடுத்துச் செல்லவும்"
  }
};

const welcomeMessages = {
  english: "🌊 Hello! I'm SEA-Assist, your intelligent fishing companion! I can help you with:\n\n🎣 Best fishing zones & times\n☀️ Weather & safety alerts\n💰 Market prices & selling tips\n📱 Using SeaBrain features\n\nWhat would you like to know?",
  telugu: "🌊 నమస్కారం! నేను SEA-Assist, మీ తెలివైన చేపలు పట్టే సహచరుడిని! నేను మీకు సహాయం చేయగలను:\n\n🎣 ఉత్తమ చేపలు పట్టే జోన్లు & సమయాలు\n☀️ వాతావరణం & భద్రతా హెచ్చరికలు\n💰 మార్కెట్ ధరలు & అమ్మకపు చిట్కాలు\n📱 సీబ్రెయిన్ ఫీచర్లను ఉపయోగించడం\n\nమీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
  tamil: "🌊 வணக்கம்! நான் SEA-Assist, உங்கள் புத்திசாலி மீன்பிடி துணை! நான் உங்களுக்கு உதவ முடியும்:\n\n🎣 சிறந்த மீன்பிடி மண்டலங்கள் & நேரங்கள்\n☀️ வானிலை & பாதுகாப்பு எச்சரிக்கைகள்\n💰 சந்தை விலைகள் & விற்பனை குறிப்புகள்\n📱 சீபிரைன் அம்சங்களைப் பயன்படுத்துதல்\n\nநீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?"
};

const quickQuestions = {
  english: ["Where to fish today?", "Current weather?", "Market prices?", "How to use SeaBrain?"],
  telugu: ["ఈ రోజు ఎక్కడ చేపలు పట్టాలి?", "ప్రస్తుత వాతావరణం?", "మార్కెట్ ధరలు?", "సీబ్రెయిన్ ఎలా ఉపయోగించాలి?"],
  tamil: ["இன்று எங்கே மீன்பிடிக்க வேண்டும்?", "தற்போதைய வானிலை?", "சந்தை விலைகள்?", "சீபிரைன் எப்படி பயன்படுத்துவது?"]
};

const placeholderText = {
  english: "Ask me anything...",
  telugu: "నన్ను ఏదైనా అడగండి...",
  tamil: "என்னிடம் கேளுங்கள்..."
};

const typingText = {
  english: "SEA-Assist is typing...",
  telugu: "SEA-Assist టైప్ చేస్తోంది...",
  tamil: "SEA-Assist தட்டச்சு செய்கிறது..."
};

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [language, setLanguage] = useState<Language>("english");
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: welcomeMessages.english, isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([{ text: welcomeMessages[language], isBot: true }]);
    setShowQuickQuestions(true);
  }, [language]);

  const handleSend = async (messageText?: string) => {
    const userMessage = (messageText || input).trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsTyping(true);
    setShowQuickQuestions(false);

    try {
      const response = await fetch(`/api/chatbot?q=${encodeURIComponent(userMessage)}`);
      if (response.ok) {
        const data = await response.json();
        const responseText = language === "english" ? data.answerEnglish : 
                           language === "telugu" ? data.answerTelugu : 
                           data.answerTamil;
        setMessages(prev => [...prev, { text: responseText || data.answerEnglish, isBot: true }]);
      } else {
        const fallbackResponse = {
          english: "I can help with fishing zones, weather, prices, and safety tips. What would you like to know?",
          telugu: "నేను చేపలు పట్టే ప్రాంతాలు, వాతావరణం, ధరలు మరియు భద్రతా చిట్కాలతో సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
          tamil: "மீன்பிடி மண்டலங்கள், வானிலை, விலைகள் மற்றும் பாதுகாப்பு குறிப்புகளுடன் நான் உதவ முடியும். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?"
        };
        setMessages(prev => [...prev, { text: fallbackResponse[language], isBot: true }]);
      }
    } catch (error) {
      const errorResponse = {
        english: "Sorry, I'm having trouble connecting. Please try again.",
        telugu: "క్షమించండి, నేను కనెక్ట్ అవ్వడంలో సమస్య ఎదుర్కొంటున్నాను. దయచేసి మళ్లీ ప్రయత్నించండి.",
        tamil: "மன்னிக்கவும், இணைப்பில் சிக்கல் உள்ளது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
      };
      setMessages(prev => [...prev, { text: errorResponse[language], isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent shadow-2xl hover:scale-110 transition-transform"
              onClick={() => setIsOpen(true)}
              data-testid="button-chatbot-open"
            >
              <MessageSquare className="w-7 h-7 text-white" />
            </Button>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full-screen backdrop */}
            {isFullScreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-gradient-to-br from-[#001233]/95 via-[#003d66]/95 to-[#0066a1]/95 backdrop-blur-sm"
                onClick={() => setIsFullScreen(false)}
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                ...(isFullScreen && {
                  position: "fixed",
                  inset: 0,
                  margin: "auto",
                  width: "min(90vw, 800px)",
                  height: "min(90vh, 700px)",
                  bottom: "auto",
                  right: "auto"
                })
              }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              className={isFullScreen ? "fixed inset-0 z-50 m-auto" : "fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"}
              style={isFullScreen ? { width: "min(90vw, 800px)", height: "min(90vh, 700px)" } : {}}
            >
              <Card className="overflow-hidden shadow-2xl h-full flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-br from-secondary to-accent p-4 text-white flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Waves className="w-5 h-5" />
                      <h3 className="font-bold font-heading" data-testid="text-chatbot-title">SEA-Assist</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Full-screen toggle button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        title={isFullScreen ? "Exit full screen" : "Full screen"}
                      >
                        {isFullScreen ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => {
                          setIsOpen(false);
                          setIsFullScreen(false);
                        }}
                        data-testid="button-chatbot-close"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                {/* Language Selector */}
                <div className="flex gap-2">
                  {(["english", "telugu", "tamil"] as Language[]).map((lang) => (
                    <Badge
                      key={lang}
                      variant={language === lang ? "secondary" : "outline"}
                      className={`cursor-pointer transition-all ${
                        language === lang
                          ? "bg-white text-secondary"
                          : "bg-white/10 text-white border-white/30"
                      }`}
                      onClick={() => setLanguage(lang)}
                      data-testid={`button-language-${lang}`}
                    >
                      {lang === "english" ? "English" : lang === "telugu" ? "తెలుగు" : "தமிழ்"}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className={`${isFullScreen ? "flex-1" : "h-80"} overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-background to-card/50`}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isBot
                          ? "bg-secondary/10 text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                      data-testid={`message-${idx}`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Quick Question Buttons */}
                {showQuickQuestions && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    {quickQuestions[language].map((question, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white/50 hover:bg-primary hover:text-white transition-all"
                        onClick={() => handleSend(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </motion.div>
                )}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            className="w-2 h-2 bg-secondary rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-card-border bg-card flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                      if (e.key === "Escape" && isFullScreen) setIsFullScreen(false);
                    }}
                    placeholder={placeholderText[language]}
                    data-testid="input-chatbot-message"
                  />
                  <Button
                    size="icon"
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    data-testid="button-chatbot-send"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
