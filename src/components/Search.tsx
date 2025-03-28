'use client';

import { useState } from 'react';
import { Search as SearchIcon, Filter, Newspaper, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';

interface Article {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  urlToImage?: string;
}

const API_KEY = 'd3fd22da17484864840d8ca74dbda586';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [dadJoke, setDadJoke] = useState('');

  const dadJokes = [
    "I'm not just searching for news, I'm searching for the truth! 🕵️‍♂️",
    "Back in my day, we had to walk uphill both ways to get our news! 📰",
    "These articles won't read themselves, kiddo! 👀",
    "I've got a nose for news, and it's telling me to keep searching! 👃",
    "Breaking news: Dad found the perfect article! 🎯"
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setDadJoke("Hey! You can't search for nothing! What do you think this is, a mime convention?");
      return;
    }
    
    setIsLoading(true);
    setDadJoke(dadJokes[Math.floor(Math.random() * dadJokes.length)]);
    
    try {
      const today = new Date();
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&from=${today.toISOString().split('T')[0]}&sortBy=popularity&apiKey=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setDadJoke("Hmph! The internet's acting up again. Back in my day, we didn't need the internet!");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brutalist-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-black text-center mb-2">Search News</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">NO NONSENSE NEWS, JUST HOW DAD LIKES IT</p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white dark:bg-brutalist-secondary rounded-brutalist border-2 border-black dark:border-white p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Find News Articles</h2>
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for news..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-black dark:border-white rounded-brutalist bg-white dark:bg-brutalist-dark dark:text-white"
                />
              </div>
              
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-brutalist hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-2 font-bold disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <SearchIcon size={20} />}
                Search
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border-2 border-black dark:border-white rounded-brutalist hover:bg-gray-100 dark:hover:bg-brutalist-dark flex items-center gap-2"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          {dadJoke && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-brutalist border-2 border-black dark:border-white">
              <p className="text-sm font-medium flex items-center gap-2">
                <span className="text-xl">👨</span>
                {dadJoke}
              </p>
            </div>
          )}
        </div>

        {articles.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
              <Newspaper className="w-6 h-6" />
              Search Results
              <span className="text-sm font-normal text-gray-500">({articles.length} articles found)</span>
            </h2>

            <div className="grid gap-4">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-brutalist-secondary rounded-brutalist border-2 border-black dark:border-white hover:shadow-brutalist transition-shadow"
                >
                  <div className="flex gap-4">
                    {article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-32 h-32 object-cover rounded-brutalist border-2 border-black dark:border-white"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 dark:text-white">{article.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{article.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {article.source.name} • {formatDate(article.publishedAt)}
                        </span>
                        <button
                          onClick={() => window.open(article.url, '_blank')}
                          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-brutalist hover:bg-gray-800 dark:hover:bg-gray-200 font-bold"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="animate-spin w-8 h-8 mx-auto mb-4 text-black dark:text-white" />
            <p className="text-gray-600 dark:text-gray-400">Dad's searching for the best news...</p>
          </div>
        )}
      </main>
    </div>
  );
} 