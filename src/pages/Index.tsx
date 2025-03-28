
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { NewsFeed } from "@/components/NewsFeed";
import { CategoryBar } from "@/components/CategoryBar";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [showDadTip, setShowDadTip] = useState(false);
  const [dadTip, setDadTip] = useState("");

  const dadTips = [
    "Pro tip: The more you read, the smarter you get!",
    "Dad says: Start with the headlines, then read the details!",
    "Dad wisdom: Reading news daily keeps your mind sharp!",
    "Dad's advice: Don't skip the important categories!",
    "Remember what dad says: Stay informed, stay ahead!"
  ];

  useEffect(() => {
    // Show a random dad tip after page loads with 40% probability
    if (Math.random() > 0.6) {
      const randomTip = dadTips[Math.floor(Math.random() * dadTips.length)];
      setDadTip(randomTip);
      
      // Show the tip after a short delay
      setTimeout(() => {
        setShowDadTip(true);
        
        // Hide it after some time
        setTimeout(() => {
          setShowDadTip(false);
        }, 7000);
      }, 2000);
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleArticleRead = (newsId: string) => {
    if (!readArticles.includes(newsId)) {
      setReadArticles([...readArticles, newsId]);
    }
  };

  return (
    <Layout>
      <CategoryBar onCategoryChange={handleCategoryChange} />
      
      <AnimatePresence>
        {showDadTip && (
          <motion.div 
            className="relative mx-auto max-w-md my-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-yellow-100 border-2 border-brutalist rounded-brutalist p-3 shadow-brutalist relative">
              <div className="flex items-center">
                <motion.div
                  className="dad-animated-face w-10 h-10 bg-yellow-200 rounded-full relative border-2 border-black mr-3 flex-shrink-0"
                  animate={{ rotate: [0, 3, 0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="dad-avatar-eyes absolute top-2 w-full flex justify-center space-x-2">
                    <div className="dad-avatar-eye w-1.5 h-1.5 bg-black rounded-full" />
                    <div className="dad-avatar-eye w-1.5 h-1.5 bg-black rounded-full" />
                  </div>
                  <div 
                    className="absolute bottom-2 w-5 h-1.5 mx-auto left-0 right-0"
                    style={{ 
                      borderRadius: "0 0 100px 100px",
                      border: "1.5px solid black",
                      borderTop: "none"
                    }}
                  />
                </motion.div>
                <div className="italic text-sm font-brutalist-text">{dadTip}</div>
              </div>
              <div 
                className="absolute -right-1 -top-1 cursor-pointer bg-brutalist text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                onClick={() => setShowDadTip(false)}
              >
                ×
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <NewsFeed 
        category={selectedCategory} 
        onArticleRead={handleArticleRead} 
      />
    </Layout>
  );
}

export default Index;
