import { NewsItem } from "@/components/NewsCard";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: {
      id: string;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }>;
}

export interface NewsApiError {
  status: string;
  code: string;
  message: string;
}

const CATEGORY_TO_QUERY: Record<string, string> = {
  'All': 'india news',
  'Politics': 'india politics',
  'Tech': 'india technology',
  'Business': 'india business',
  'Entertainment': 'bollywood entertainment',
  'Sports': 'india sports cricket',
  'World': 'india international news',
  'Science': 'india science',
  'Health': 'india health'
};

export async function fetchNews(category: string = 'All'): Promise<NewsItem[]> {
  try {
    // Get the appropriate query for the category
    const query = CATEGORY_TO_QUERY[category] || `india ${category.toLowerCase()}`;
    
    const response = await fetch(
      `${BASE_URL}/everything?` + 
      new URLSearchParams({
        q: query,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: '12',
        apiKey: API_KEY,
        domains: 'ndtv.com,indianexpress.com,timesofindia.indiatimes.com,hindustantimes.com'
      })
    );

    const data = await response.json();

    // Handle API-specific errors
    if (data.status === 'error') {
      const error = data as NewsApiError;
      if (error.code === 'rateLimited') {
        throw new Error('You have reached the API rate limit. Please try again later.');
      }
      throw new Error(error.message || 'Failed to fetch news');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const newsData = data as NewsApiResponse;
    
    // Transform the API response to match our NewsItem interface
    return newsData.articles.map(article => ({
      id: article.url, // Using URL as unique identifier
      title: article.title,
      summary: article.description || 'No description available',
      category: article.source.name,
      readMoreUrl: article.url,
      imageUrl: article.urlToImage || undefined,
      publishedAt: article.publishedAt,
      content: article.content || undefined
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Re-throw to let React Query handle it
  }
}

export async function fetchArticleById(articleUrl: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?` + 
      new URLSearchParams({
        qInTitle: articleUrl, // Search for exact article
        apiKey: API_KEY
      })
    );

    const data = await response.json();

    if (data.status === 'error' || !response.ok || !data.articles?.[0]) {
      return null;
    }

    const article = data.articles[0];
    return {
      id: article.url,
      title: article.title,
      summary: article.description || 'No description available',
      category: article.source.name,
      readMoreUrl: article.url,
      imageUrl: article.urlToImage || undefined,
      publishedAt: article.publishedAt,
      content: article.content || 'Full article content not available'
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
} 