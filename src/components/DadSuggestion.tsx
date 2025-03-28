import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface NewsItem {
  title: string;
  url: string;
  id: string;
}

interface DadSuggestionProps {
  onReadArticle: (article: NewsItem) => void;
}

export function DadSuggestion({ onReadArticle }: DadSuggestionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<NewsItem | null>(null);
  const [articles, setArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=d3fd22da17484864840d8ca74dbda586'
        );
        const data = await response.json();
        
        if (data.articles) {
          const formattedArticles = data.articles.map((article: any, index: number) => ({
            id: `${index}-${Date.now()}`,
            title: article.title,
            url: article.url
          }));
          setArticles(formattedArticles);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
    // Fetch new articles every hour
    const interval = setInterval(fetchNews, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      // Show suggestion after a random delay between 5-15 seconds
      const delay = Math.random() * (15000 - 5000) + 5000;
      const showTimeout = setTimeout(() => {
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];
        setCurrentArticle(randomArticle);
        setIsVisible(true);
      }, delay);

      // Hide after 10 seconds
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, delay + 10000);

      return () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [articles]);

  const handleReadIt = () => {
    if (currentArticle) {
      onReadArticle(currentArticle);
      setIsVisible(false);
      // Open the original news source in a new tab
      window.open(currentArticle.url, '_blank');
    }
  };

  const handleLater = () => {
    setIsVisible(false);
  };

  if (!isVisible || !currentArticle) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="bg-white dark:bg-brutalist-secondary border-2 border-brutalist rounded-brutalist p-4 shadow-brutalist max-w-sm">
          <div className="flex items-start gap-3">
            <motion.div
              className="w-12 h-12 bg-black dark:bg-white rounded-full relative border-2 border-black flex-shrink-0 overflow-hidden"
              animate={{ 
                rotate: [0, -3, 0, 3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Eyes Container */}
              <motion.div 
                className="absolute top-[40%] w-full flex justify-center"
                animate={{
                  y: [-1, 0, -1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Left Eye */}
                <motion.div 
                  className="w-2 h-2 bg-white dark:bg-black rounded-full mr-3"
                  animate={{
                    scaleY: [1, 0.2, 1],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
                {/* Right Eye */}
                <motion.div 
                  className="w-2 h-2 bg-white dark:bg-black rounded-full"
                  animate={{
                    scaleY: [1, 0.2, 1],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              </motion.div>

              {/* Lips - straight line */}
              <div 
                className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-5 h-[2px] bg-white dark:bg-black"
              />
            </motion.div>
            
            <div className="flex-1">
              <p className="text-sm mb-3 dark:text-white">
                Back in my day, we didn't ignore the news. Now, read this or else: "{currentArticle.title}"!
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleReadIt}
                  className="flex-1 bg-brutalist text-white hover:bg-brutalist/90"
                >
                  READ IT
                </Button>
                <Button
                  onClick={handleLater}
                  variant="outline"
                  className="flex-1 border-2 border-brutalist dark:border-white dark:text-white"
                >
                  LATER
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 