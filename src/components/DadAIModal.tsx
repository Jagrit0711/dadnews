import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { NewsItem } from "./NewsCard";
import { mockNewsData } from "../data/mockNewsData";
import { motion } from "framer-motion";

interface DadAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEngagement: number;
}

const dadPhrases = {
  greeting: [
    "Back in my day, we didn't ignore the news. Now, read this or else.",
    "Listen up! Important things happened today!",
    "You know who reads this stuff? Successful people!",
    "Hey kiddo, time for your daily news briefing!"
  ],
  lowEngagement: [
    "Still ignoring me? What did I do to deserve this?",
    "Fine, scroll past. See if I care!",
    "Kids these days have no respect for the news.",
    "Helloooo? Is anybody there? READ. THE. NEWS."
  ],
  highEngagement: [
    "That's my child! Good choice!",
    "See? Dad knows best!",
    "Making your dad proud!",
    "Now THAT'S what I call being informed!"
  ]
};

export function DadAIModal({ isOpen, onClose, userEngagement }: DadAIModalProps) {
  const [randomGreeting, setRandomGreeting] = useState("");
  const [randomEngagementComment, setRandomEngagementComment] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);
  const [dadMood, setDadMood] = useState<"happy" | "sad" | "neutral">("neutral");
  const [topArticles, setTopArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setRandomGreeting(dadPhrases.greeting[Math.floor(Math.random() * dadPhrases.greeting.length)]);
      
      // Set dad's mood and comment based on user engagement
      if (userEngagement > 70) {
        setDadMood("happy");
        setRandomEngagementComment(dadPhrases.highEngagement[Math.floor(Math.random() * dadPhrases.highEngagement.length)]);
      } else if (userEngagement < 30) {
        setDadMood("sad");
        setRandomEngagementComment(dadPhrases.lowEngagement[Math.floor(Math.random() * dadPhrases.lowEngagement.length)]);
      } else {
        setDadMood("neutral");
      }
      
      // Get top 5 articles
      setTopArticles(mockNewsData.slice(0, 5));
      
      // Start blinking animation
      const blinkInterval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 3000);
      
      return () => clearInterval(blinkInterval);
    }
  }, [isOpen, userEngagement]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/90 backdrop-blur-sm">
      <div className="bg-white dark:bg-black w-full max-w-md rounded-brutalist border-4 border-black dark:border-white shadow-brutalist max-h-[80vh] overflow-y-auto relative">
        {/* Pull tab */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-24 bg-black dark:bg-white rounded-l-brutalist border-2 border-r-0 border-black dark:border-white flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform">
          <div className="w-1 h-12 bg-white dark:bg-black rounded-full"></div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-black dark:bg-white rounded-full relative border-2 border-black dark:border-white flex-shrink-0"
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="absolute top-3 w-full flex justify-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white dark:bg-black rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white dark:bg-black rounded-full" />
                </div>
                <div 
                  className="absolute bottom-3 w-6 h-1.5 mx-auto left-0 right-0"
                  style={{ 
                    borderRadius: "0 0 100px 100px",
                    border: "1.5px solid currentColor",
                    borderTop: "none",
                    transform: "rotate(180deg)"
                  }}
                />
              </motion.div>
              <div>
                <h2 className="font-brutalist text-xl text-black dark:text-white">DAD'S BRIEFING</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">{randomGreeting}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="font-brutalist text-lg mb-2 text-black dark:text-white">TOP HEADLINES:</h3>
            {topArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => {
                    window.open(article.readMoreUrl, '_blank', 'noopener,noreferrer');
                    onClose();
                  }}
                  className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-brutalist transition-colors border-b border-dashed border-black/30 dark:border-white/30 group"
                >
                  <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                    {article.title}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-4 text-right text-sm text-gray-600 dark:text-gray-400 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {randomEngagementComment}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
