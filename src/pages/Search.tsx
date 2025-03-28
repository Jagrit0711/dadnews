'use client';

import { useState, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { Search as SearchIcon, Filter, Newspaper, Loader2, X, AlertCircle, History, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  message?: string;
  code?: string;
}

const API_KEY = 'd3fd22da17484864840d8ca74dbda586';

const dadJokes = [
  "I'm not just searching for news, I'm searching for the truth! 🕵️‍♂️",
  "Back in my day, we had to walk uphill both ways to get our news! 📰",
  "These articles won't read themselves, kiddo! 👀",
  "I've got a nose for news, and it's telling me to keep searching! 👃",
  "Breaking news: Dad found the perfect article! 🎯"
];

const MAX_HISTORY_ITEMS = 5;
const STORAGE_KEY = 'dadnews_search_history';
const READ_HISTORY_KEY = 'dadnews_read_history';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [dadJoke, setDadJoke] = useState('');
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== term);
      return [term, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
    setShowHistory(false);
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    setShowHistory(false);
    handleSearch(term);
  };

  const handleSearch = async (searchTermOverride?: string) => {
    const termToSearch = searchTermOverride || searchTerm;
    if (!termToSearch.trim()) {
      setDadJoke("Hey! You can't search for nothing! What do you think this is, a mime convention?");
      return;
    }
    
    setIsLoading(true);
    setError('');
    setDadJoke(dadJokes[Math.floor(Math.random() * dadJokes.length)]);
    addToHistory(termToSearch);
    
    try {
      const today = new Date();
      const fromDate = today.toISOString().split('T')[0];

      const params = new URLSearchParams({
        q: termToSearch,
        from: fromDate,
        sortBy: 'popularity',
        apiKey: API_KEY,
        language: 'en',
        pageSize: '20'
      });

      const response = await fetch(`https://newsapi.org/v2/everything?${params}`);
      const data: NewsAPIResponse = await response.json();
      
      if (data.status === 'ok' && data.articles) {
        if (data.articles.length === 0) {
          setDadJoke("Hmm, no articles found. Maybe try searching for something less obscure? Even I can't find anything!");
        }
        setArticles(data.articles);
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch news');
      setDadJoke("Hmph! The internet's acting up again. Back in my day, we didn't need the internet!");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Also fetch top headlines when no search is performed
  const fetchTopHeadlines = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams({
        country: 'us',
        apiKey: API_KEY,
        pageSize: '10'
      });

      const response = await fetch(`https://newsapi.org/v2/top-headlines?${params}`);
      const data: NewsAPIResponse = await response.json();
      
      if (data.status === 'ok' && data.articles) {
        setArticles(data.articles);
      } else {
        throw new Error(data.message || 'Failed to fetch top headlines');
      }
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch top headlines');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleReadArticle = (article: Article) => {
    // Save to read history
    const readArticle = {
      id: article.url, // Using URL as unique identifier
      title: article.title,
      url: article.url,
      source: article.source.name,
      readAt: new Date().toISOString()
    };

    const savedHistory = localStorage.getItem(READ_HISTORY_KEY);
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    
    // Add to beginning of history if not already present
    if (!history.some((item: any) => item.id === readArticle.id)) {
      history.unshift(readArticle);
      localStorage.setItem(READ_HISTORY_KEY, JSON.stringify(history));
    }

    // Open article in new tab
    window.open(article.url, '_blank');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-2xl mx-auto mb-4 sm:mb-8">
          <div className="bg-white dark:bg-brutalist-secondary rounded-brutalist border-2 border-black dark:border-white p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Find News Articles</h2>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => setShowHistory(true)}
                  placeholder="Search for news..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-black dark:border-white rounded-brutalist bg-white dark:bg-brutalist-dark dark:text-white text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                  >
                    <X size={20} />
                  </button>
                )}

                {/* Search History Dropdown */}
                {showHistory && searchHistory.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-white dark:bg-brutalist-secondary border-2 border-black dark:border-white rounded-brutalist shadow-brutalist"
                  >
                    <div className="flex items-center justify-between p-2 border-b-2 border-black dark:border-white">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <History size={16} />
                        Recent Searches
                      </span>
                      <button
                        onClick={clearHistory}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {searchHistory.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleHistoryClick(term)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <History size={14} className="text-gray-400" />
                            {term}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleSearch()}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-brutalist hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-2 font-bold disabled:opacity-50 text-sm sm:text-base"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <SearchIcon size={20} />}
                  Search
                </button>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 border-2 border-black dark:border-white rounded-brutalist hover:bg-gray-100 dark:hover:bg-brutalist-dark flex items-center justify-center gap-2 ${
                    showFilters ? 'bg-yellow-400 text-black' : ''
                  }`}
                >
                  <Filter size={20} />
                </button>
              </div>
            </div>
          </div>

          {(dadJoke || error) && (
            <div className={`mt-4 p-4 rounded-brutalist border-2 border-black dark:border-white ${
              error ? 'bg-red-100 dark:bg-red-900' : 'bg-yellow-100 dark:bg-yellow-900'
            }`}>
              <p className="text-sm font-medium flex items-center gap-2">
                <span className="text-xl">{error ? <AlertCircle size={24} /> : '👨'}</span>
                {error || dadJoke}
              </p>
            </div>
          )}
        </div>

        {articles.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 dark:text-white">
              <Newspaper className="w-6 h-6" />
              {searchTerm ? 'Search Results' : 'Top Headlines'}
              <span className="text-sm font-normal text-gray-500">({articles.length} articles found)</span>
            </h2>

            <div className="grid gap-4">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-white dark:bg-brutalist-secondary rounded-brutalist border-2 border-black dark:border-white hover:shadow-brutalist transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-brutalist border-2 border-black dark:border-white"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 dark:text-white">{article.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm sm:text-base">{article.description}</p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {article.source.name} • {formatDate(article.publishedAt)}
                        </span>
                        <button
                          onClick={() => window.open(article.url, '_blank')}
                          className="w-full sm:w-auto px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-brutalist hover:bg-gray-800 dark:hover:bg-gray-200 font-bold text-sm sm:text-base"
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
          <div className="text-center py-8 sm:py-12">
            <Loader2 className="animate-spin w-8 h-8 mx-auto mb-4 text-black dark:text-white" />
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Dad's searching for the best news...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
