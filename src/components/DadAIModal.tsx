
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { NewsItem } from "./NewsCard";
import { mockNewsData } from "../data/mockNewsData";

interface DadAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEngagement: number;
}

const dadPhrases = {
  greeting: [
    "Beta! Listen up! Here's what's happening in the world today!",
    "Arrey, you're finally paying attention! Let me tell you what's important...",
    "Acha, so now you want to know the news? Let me educate you!",
    "Finally! I was waiting to share all this important stuff with you!"
  ],
  recommendation: [
    "Beta, I think you should read this one first!",
    "This one's important, don't ignore it like you ignore my advice!",
    "If you read only one article today, make it this one!",
    "You know what would make your dad proud? Reading this article!"
  ],
  lowEngagement: [
    "Beta, you barely read anything these days! What am I raising?",
    "Your knowledge is suffering! Read more!",
    "In my day, we used to read newspapers front to back!",
    "How will you become successful if you don't stay informed?"
  ],
  highEngagement: [
    "I'm so proud of you, beta! You're staying well-informed!",
    "That's my child! Reading and learning, just like I taught you!",
    "You're making your dad proud with all this reading!",
    "See? Reading the news isn't so bad after all!"
  ]
};

export function DadAIModal({ isOpen, onClose, userEngagement }: DadAIModalProps) {
  const [randomGreeting, setRandomGreeting] = useState("");
  const [randomRecommendation, setRandomRecommendation] = useState("");
  const [randomEngagementComment, setRandomEngagementComment] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);
  const [dadMood, setDadMood] = useState<"happy" | "sad" | "neutral">("neutral");
  const [recommendedArticle, setRecommendedArticle] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Set random phrases when modal opens
      setRandomGreeting(dadPhrases.greeting[Math.floor(Math.random() * dadPhrases.greeting.length)]);
      setRandomRecommendation(dadPhrases.recommendation[Math.floor(Math.random() * dadPhrases.recommendation.length)]);
      
      // Set dad's mood based on user engagement
      if (userEngagement > 70) {
        setDadMood("happy");
        setRandomEngagementComment(dadPhrases.highEngagement[Math.floor(Math.random() * dadPhrases.highEngagement.length)]);
      } else if (userEngagement < 30) {
        setDadMood("sad");
        setRandomEngagementComment(dadPhrases.lowEngagement[Math.floor(Math.random() * dadPhrases.lowEngagement.length)]);
      } else {
        setDadMood("neutral");
      }
      
      // Pick a random article to recommend
      setRecommendedArticle(mockNewsData[Math.floor(Math.random() * mockNewsData.length)]);
      
      // Start blinking animation
      const blinkInterval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 3000);
      
      return () => clearInterval(blinkInterval);
    }
  }, [isOpen, userEngagement]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-brutalist-secondary w-full max-w-3xl rounded-brutalist border-4 border-brutalist p-6 shadow-brutalist max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className={`dad-animated-face w-16 h-16 mr-4 ${isBlinking ? 'dad-blink' : ''}`}>
              <div className="dad-avatar-eyes">
                <div className="dad-avatar-eye"></div>
                <div className="dad-avatar-eye"></div>
              </div>
              <div className={`dad-avatar-mouth ${dadMood}`}></div>
            </div>
            <h2 className="font-brutalist text-3xl">DAD'S NEWS BRIEFING</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-brutalist flex items-center justify-center text-white hover:bg-brutalist/80 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="dad-ai-message mb-6">
          {randomGreeting}
        </div>
        
        {recommendedArticle && (
          <div className="p-4 border-2 border-brutalist rounded-brutalist mb-6 bg-yellow-50 dark:bg-yellow-900/20">
            <h3 className="font-brutalist text-lg mb-2">
              {randomRecommendation}
            </h3>
            <div className="font-bold">{recommendedArticle.title}</div>
            <p className="mt-2">{recommendedArticle.summary}</p>
          </div>
        )}
        
        <div className="dad-ai-message mb-6">
          {randomEngagementComment}
        </div>
        
        <h3 className="font-brutalist text-xl mb-4">TODAY'S TOP STORIES:</h3>
        <div className="space-y-4">
          {mockNewsData.map((news) => (
            <div key={news.id} className="p-4 border border-brutalist border-dashed rounded-brutalist">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-brutalist text-lg">{news.title}</h4>
                  <span className="inline-block px-2 py-1 text-xs font-brutalist bg-brutalist text-white rounded-brutalist mt-1 mb-2">
                    {news.category}
                  </span>
                </div>
                <div className="dad-animated-face w-8 h-8 shrink-0">
                  <div className="dad-avatar-eyes">
                    <div className="dad-avatar-eye"></div>
                    <div className="dad-avatar-eye"></div>
                  </div>
                  <div className={`dad-avatar-mouth happy`}></div>
                </div>
              </div>
              <p className="text-sm">{news.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
