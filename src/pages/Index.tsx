import { useState } from "react";
import { Layout } from "@/components/Layout";
import { NewsFeed } from "@/components/NewsFeed";
import { CategoryBar } from "@/components/CategoryBar";
import { DadSuggestion } from "@/components/DadSuggestion";
import { NewsItem } from "@/components/NewsCard";

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

  const handleSuggestedArticleRead = (article: NewsItem) => {
    handleArticleRead(article.id);
    window.open(article.readMoreUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout>
      <CategoryBar onCategoryChange={handleCategoryChange} />
      <NewsFeed 
        category={selectedCategory} 
        onArticleRead={handleArticleRead}
        onNewsLoaded={(articles) => (
          <DadSuggestion 
            articles={articles.filter(article => !readArticles.includes(article.id))}
            onReadArticle={handleSuggestedArticleRead}
          />
        )}
      />
    </Layout>
  );
}

export default Index;
