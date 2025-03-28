'use client';

import { useState, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { Clock, Newspaper } from 'lucide-react';

interface ReadArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  readAt: string;
}

const STORAGE_KEY = 'dadnews_read_history';

export default function History() {
  const [readArticles, setReadArticles] = useState<ReadArticle[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      setReadArticles(JSON.parse(savedHistory));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black mb-6 flex items-center gap-3 dark:text-white">
            <Clock className="w-8 h-8" />
            Your Reading History
          </h1>

          {readArticles.length === 0 ? (
            <div className="bg-white dark:bg-brutalist-secondary rounded-brutalist border-2 border-black dark:border-white p-8 text-center">
              <Newspaper className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-bold mb-2 dark:text-white">You haven't read any articles yet.</p>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Back in my day, we read every article in the newspaper! Even the classifieds!"
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {readArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white dark:bg-brutalist-secondary rounded-brutalist border-2 border-black dark:border-white p-4 sm:p-6 hover:shadow-brutalist transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold mb-2 dark:text-white">{article.title}</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{article.source}</span>
                        <span>•</span>
                        <span>Read on {formatDate(article.readAt)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(article.url, '_blank')}
                      className="w-full sm:w-auto px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-brutalist hover:bg-gray-800 dark:hover:bg-gray-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                      <Newspaper className="w-4 h-4" />
                      Read Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
