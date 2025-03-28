import { useState, useEffect } from "react";
import { NewsCard, NewsItem } from "./NewsCard";
import { fetchNews } from "@/lib/newsApi";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { DadBriefing } from "./DadBriefing";

interface NewsFeedProps {
  category: string;
  onArticleRead: (newsId: string) => void;
  onNewsLoaded?: (articles: NewsItem[]) => ReactNode;
}

export function NewsFeed({ category, onArticleRead, onNewsLoaded }: NewsFeedProps) {
  const [dadSuggestion, setDadSuggestion] = useState<string | null>(null);
  const [suggestedArticleId, setSuggestedArticleId] = useState<string | null>(null);

  // Use React Query for data fetching
  const { data: newsItems = [], isLoading, error } = useQuery({
    queryKey: ['news', category],
    queryFn: () => fetchNews(category),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second between retries
  });

  useEffect(() => {
    // Dad occasionally suggests a specific article
    const shouldSuggest = Math.random() > 0.7;
    if (shouldSuggest && newsItems.length > 0) {
      const randomArticle = newsItems[Math.floor(Math.random() * newsItems.length)];
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
  }, [category, newsItems]);

  const handleReadMore = (newsId: string) => {
    onArticleRead(newsId);
    
    // Clear suggestion if this was the suggested article
    if (newsId === suggestedArticleId) {
      setSuggestedArticleId(null);
      setDadSuggestion(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-3 px-3 sm:px-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-brutalist mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-brutalist"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return (
      <div className="py-3 px-3 sm:px-4">
        <div className="bg-red-100 border-2 border-red-500 rounded-brutalist p-4 text-red-700">
          <p className="font-brutalist">Oops! Dad couldn't fetch the news right now.</p>
          <p className="text-sm mt-2">{errorMessage}</p>
          <p className="text-xs mt-2">Please try again later or check your internet connection.</p>
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="py-3 px-3 sm:px-4">
        <div className="bg-yellow-100 border-2 border-yellow-500 rounded-brutalist p-4 text-yellow-700">
          <p className="font-brutalist">No news found for this category, kiddo!</p>
          <p className="text-sm mt-2">Try a different category or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 px-3 sm:px-4">
      <div className="flex gap-6">
        <div className="flex-1">
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
        <div className="hidden lg:block w-80 flex-shrink-0">
          {category === 'All' && <DadBriefing articles={newsItems} className="sticky top-4" />}
        </div>
      </div>
    </div>
  );
}
