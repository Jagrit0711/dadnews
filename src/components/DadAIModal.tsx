
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { NewsItem } from "./NewsCard";
import { mockNewsData } from "@/data/mockNewsData";

interface DadAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEngagement: number;
}

export function DadAIModal({ isOpen, onClose, userEngagement }: DadAIModalProps) {
  const [animateIn, setAnimateIn] = useState(false);
  const [topNews, setTopNews] = useState<NewsItem[]>([]);
  const [dadMood, setDadMood] = useState<"happy" | "sad" | "neutral">("neutral");
  const [dadComment, setDadComment] = useState("");

  const dadGreetings = [
    "Aye beta, did you even know what happened today? Here's the latest!",
    "So you finally clicked on me? Great! Here's what you missed while scrolling mindlessly.",
    "Back in my day, we didn't ignore the news. Here's what you should know!",
    "You want to be informed? Start with these headlines!",
    "Listen up! Important things happened today!"
  ];

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      setTopNews(mockNewsData.slice(0, 5));
      
      // Set dad's mood based on user engagement
      if (userEngagement > 70) {
        setDadMood("happy");
        setDadComment("I'm so proud of you for staying informed!");
      } else if (userEngagement < 30) {
        setDadMood("sad");
        setDadComment("You barely read anything. What am I going to do with you?");
      } else {
        setDadMood("neutral");
        setDadComment(dadGreetings[Math.floor(Math.random() * dadGreetings.length)]);
      }
    } else {
      setAnimateIn(false);
    }
  }, [isOpen, userEngagement]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center ${animateIn ? 'animate-fade-in' : ''}`}>
      <div className="w-full max-w-md p-4 bg-background rounded-brutalist border-2 border-brutalist m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-brutalist text-2xl">DAD'S BRIEFING</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex items-center mb-4 p-3 bg-muted rounded-brutalist">
          <div className="dad-animated-face w-12 h-12 mr-3">
            <div className="dad-avatar-eyes">
              <div className="dad-avatar-eye"></div>
              <div className="dad-avatar-eye"></div>
            </div>
            <div className={`dad-avatar-mouth ${dadMood}`}></div>
          </div>
          <div className="dad-ai-message flex-1 font-brutalist">
            {dadComment}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-brutalist text-lg mb-3">TOP HEADLINES:</h3>
          <ul className="space-y-4">
            {topNews.map((news) => (
              <li key={news.id} className="border-b border-dashed border-brutalist pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium hover:text-brutalist transition-colors">{news.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
                  </div>
                  <span className="ml-2 text-xs px-2 py-1 bg-brutalist text-white rounded-brutalist">
                    {news.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          className="w-full mt-6 p-3 bg-brutalist text-white font-brutalist rounded-brutalist"
          onClick={onClose}
        >
          THANKS DAD!
        </button>
      </div>
    </div>
  );
}
