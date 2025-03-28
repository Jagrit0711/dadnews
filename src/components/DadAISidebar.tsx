
import { useState, useEffect } from "react";
import { NewsItem } from "./NewsCard";

interface DadAISidebarProps {
  newsItems: NewsItem[];
  userEngagement: number;
  onNewsClick: (newsId: string) => void;
}

const dadGreetings = [
  "Aye beta, did you even know what happened today? No? Here, read this!",
  "So you're ignoring the news? Great. Why did I raise you?",
  "Back in my day, we didn't ignore the news. Now, read this or else.",
  "You want to be informed? Start with these headlines!",
  "Listen up! Important things happened today!"
];

const dadResponses = {
  positive: [
    "Good job! That's my child!",
    "Finally, you're making your dad proud!",
    "See? Reading the news isn't so bad, is it?",
    "That's the spirit! Keep it up!"
  ],
  negative: [
    "Still ignoring me? What did I do to deserve this?",
    "Fine, scroll past. See if I care!",
    "Kids these days have no respect for the news.",
    "Helloooo? Is anybody there? READ. THE. NEWS."
  ]
};

export function DadAISidebar({ newsItems, userEngagement, onNewsClick }: DadAISidebarProps) {
  const [greeting, setGreeting] = useState("");
  const [topNews, setTopNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const randomGreeting = dadGreetings[Math.floor(Math.random() * dadGreetings.length)];
    setGreeting(randomGreeting);
    
    // Get top 5 news items
    setTopNews(newsItems.slice(0, 5));
  }, [newsItems]);

  const getResponse = () => {
    const responseType = userEngagement > 50 ? "positive" : "negative";
    const responses = dadResponses[responseType];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-full px-4 py-6 bg-sidebar border-l border-brutalist">
      <h2 className="font-brutalist text-2xl mb-4">DAD'S BRIEFING</h2>
      
      <div className="dad-ai-message">
        {greeting}
      </div>
      
      <div className="mt-6">
        <h3 className="font-brutalist text-lg mb-3">TOP HEADLINES:</h3>
        <ul className="space-y-4">
          {topNews.map((news) => (
            <li key={news.id} className="border-b border-dashed border-brutalist pb-2">
              <button 
                className="text-left font-medium hover:text-brutalist transition-colors w-full"
                onClick={() => onNewsClick(news.id)}
              >
                {news.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="dad-ai-message mt-8">
        {getResponse()}
      </div>
    </div>
  );
}
