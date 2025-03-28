import { motion } from 'framer-motion';
import { NewsItem } from './NewsCard';
import { useNavigate } from 'react-router-dom';

interface DadBriefingProps {
  articles: NewsItem[];
  className?: string;
}

export function DadBriefing({ articles, className = '' }: DadBriefingProps) {
  const navigate = useNavigate();
  const topArticles = articles.slice(0, 5); // Get top 5 articles

  const handleArticleClick = (article: NewsItem) => {
    localStorage.setItem(`article_${article.id}`, JSON.stringify(article));
    navigate(`/article/${encodeURIComponent(article.id)}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-white dark:bg-black border-2 border-black dark:border-white rounded-brutalist p-4 shadow-brutalist ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
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
              transform: "rotate(180deg)" // Make dad frown for serious briefing
            }}
          />
        </motion.div>
        
        <div>
          <h2 className="font-brutalist text-xl mb-1 text-black dark:text-white">DAD'S BRIEFING</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Back in my day, we didn't ignore the news. Now, read this or else.
          </p>
        </div>
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
              onClick={() => handleArticleClick(article)}
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
        Fine, scroll past. See if I care!
      </motion.div>
    </motion.div>
  );
} 