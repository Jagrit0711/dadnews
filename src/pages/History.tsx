
import React from "react";
import { Layout } from "@/components/Layout";
import { mockNewsData } from "@/data/mockNewsData";
import { NewsCard } from "@/components/NewsCard";

const History = () => {
  // Mock read history
  const readArticleIds = ["news-1", "news-3", "news-5"];
  const readArticles = mockNewsData.filter(news => readArticleIds.includes(news.id));

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-brutalist mb-6">Your Reading History</h1>
        {readArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readArticles.map(news => (
              <NewsCard
                key={news.id}
                news={news}
                onReadMore={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg">You haven't read any articles yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
