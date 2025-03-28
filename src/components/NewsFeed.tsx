
import { useState, useEffect } from "react";
import { NewsCard, NewsItem } from "./NewsCard";
import { mockNewsData } from "../data/mockNewsData";
import { motion, AnimatePresence } from "framer-motion";

interface NewsFeedProps {
  category: string;
  onArticleRead: (newsId: string) => void;
}

export function NewsFeed({ category, onArticleRead }: NewsFeedProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [dadSuggestion, setDadSuggestion] = useState<string | null>(null);
  const [suggestedArticleId, setSuggestedArticleId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch news based on the category
    // For now, we're using mock data and filtering it
    const filteredNews = category === "All" 
      ? mockNewsData 
      : mockNewsData.filter(item => item.category === category);
    
    setNewsItems(filteredNews);
    
    // Dad occasionally suggests a specific article
    const shouldSuggest = Math.random() > 0.7;
    if (shouldSuggest && filteredNews.length > 0) {
      const randomArticle = filteredNews[Math.floor(Math.random() * filteredNews.length)];
      setSuggestedArticleId(randomArticle.id);
      
      const suggestions = [
        "Dad recommends this one! 👍",
        "Dad says: READ THIS ONE! 📰",
        "Dad's pick of the day! ⭐",
        "Dad thinks you'll like this! 🔍"
      ];
      
      setDadSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
      
      // Clear the suggestion after some time
      setTimeout(() => {
        setSuggestedArticleId(null);
        setDadSuggestion(null);
      }, 15000);
    }
  }, [category]);

  const handleReadMore = (newsId: string) => {
    onArticleRead(newsId);
    
    // Clear suggestion if this was the suggested article
    if (newsId === suggestedArticleId) {
      setSuggestedArticleId(null);
      setDadSuggestion(null);
    }
  };

  return (
    <div className="py-3 px-3 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {newsItems.map((news) => (
          <div key={news.id} className="relative">
            <NewsCard 
              news={news} 
              onReadMore={handleReadMore} 
            />
            
            {/* Dad's suggestion badge */}
            <AnimatePresence>
              {suggestedArticleId === news.id && dadSuggestion && (
                <motion.div 
                  className="absolute -top-4 right-2 bg-yellow-300 text-black px-3 py-1 rounded-brutalist border-2 border-brutalist shadow-brutalist z-10 transform -rotate-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring" }}
                >
                  <div className="text-xs font-brutalist flex items-center gap-1">
                    <motion.div
                      className="dad-animated-face w-6 h-6 bg-yellow-200 rounded-full relative inline-block"
                      style={{ 
                        border: "1px solid #000",
                      }}
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="dad-avatar-eyes absolute top-1 w-full flex justify-center space-x-1">
                        <div className="dad-avatar-eye w-1 h-1 bg-black rounded-full" />
                        <div className="dad-avatar-eye w-1 h-1 bg-black rounded-full" />
                      </div>
                      <div 
                        className="absolute bottom-1 w-3 h-1 mx-auto left-0 right-0"
                        style={{ 
                          borderRadius: "0 0 100px 100px",
                          border: "1px solid black",
                          borderTop: "none"
                        }}
                      />
                    </motion.div>
                    <span>{dadSuggestion}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
