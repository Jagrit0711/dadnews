
import { ReactNode, useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { CategoryBar } from "./CategoryBar";
import { DadAISidebar } from "./DadAISidebar";
import { DadAvatar } from "./DadAvatar";
import { mockNewsData } from "../data/mockNewsData";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userEngagement, setUserEngagement] = useState(30);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [showDadAvatar, setShowDadAvatar] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Randomly show Dad Avatar while scrolling
      if (position > 200 && Math.random() < 0.1 && !showDadAvatar) {
        const randomNews = mockNewsData[Math.floor(Math.random() * mockNewsData.length)];
        setCurrentSuggestion(`Hey! You should check out "${randomNews.title}"`);
        setShowDadAvatar(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showDadAvatar]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleArticleRead = (newsId: string) => {
    if (!readArticles.includes(newsId)) {
      setReadArticles([...readArticles, newsId]);
      setUserEngagement(prev => Math.min(prev + 10, 100));
    }
  };

  const handleDadAvatarAction = (action: "read" | "ignore") => {
    if (action === "read") {
      setUserEngagement(prev => Math.min(prev + 5, 100));
    } else {
      setUserEngagement(prev => Math.max(prev - 5, 0));
      setShowDadAvatar(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <main className="flex-1 flex flex-col min-h-screen">
          <Header />
          <CategoryBar onCategoryChange={handleCategoryChange} />
          <div className="flex flex-1">
            <div className="flex-1">
              {children}
            </div>
            <div className="hidden lg:block w-1/4 min-w-[300px]">
              <DadAISidebar 
                newsItems={mockNewsData}
                userEngagement={userEngagement}
                onNewsClick={handleArticleRead}
              />
            </div>
          </div>
        </main>
        
        <DadAvatar 
          isVisible={showDadAvatar}
          suggestion={currentSuggestion}
          onAction={handleDadAvatarAction}
        />
      </div>
    </SidebarProvider>
  );
}
