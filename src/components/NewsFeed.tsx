
import { useState, useEffect } from "react";
import { NewsCard, NewsItem } from "./NewsCard";
import { mockNewsData } from "../data/mockNewsData";

interface NewsFeedProps {
  category: string;
  onArticleRead: (newsId: string) => void;
}

export function NewsFeed({ category, onArticleRead }: NewsFeedProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    // In a real app, we would fetch news based on the category
    // For now, we're using mock data and filtering it
    const filteredNews = category === "All" 
      ? mockNewsData 
      : mockNewsData.filter(item => item.category === category);
    
    setNewsItems(filteredNews);
  }, [category]);

  const handleReadMore = (newsId: string) => {
    onArticleRead(newsId);
    
    // In a real app, we would navigate to the article page
    // For now, let's just show an alert
    alert(`Reading article: ${newsId}`);
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <NewsCard 
            key={news.id} 
            news={news} 
            onReadMore={handleReadMore} 
          />
        ))}
      </div>
    </div>
  );
}
