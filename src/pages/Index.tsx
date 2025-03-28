
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { NewsFeed } from "@/components/NewsFeed";
import { CategoryBar } from "@/components/CategoryBar";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readArticles, setReadArticles] = useState<string[]>([]);

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
      <NewsFeed 
        category={selectedCategory} 
        onArticleRead={handleArticleRead} 
      />
    </Layout>
  );
}

export default Index;
