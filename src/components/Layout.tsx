
import { ReactNode, useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { DadAISidebar } from "./DadAISidebar";
import { DadAvatar } from "./DadAvatar";
import { Navigation } from "./Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockNewsData } from "../data/mockNewsData";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [userEngagement, setUserEngagement] = useState(30);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [showDadAvatar, setShowDadAvatar] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Show Dad Avatar while scrolling, but not if it's already showing
      // Only on desktop, for mobile we'll have the navigation dad avatar
      if (!isMobile && position > 200 && Math.random() < 0.05 && !showDadAvatar) {
        const randomNews = mockNewsData[Math.floor(Math.random() * mockNewsData.length)];
        setCurrentSuggestion(`Hey! You should check out "${randomNews.title}"`);
        setShowDadAvatar(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showDadAvatar, isMobile]);

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
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <Navigation />
        <div className="flex flex-1 relative pb-16 sm:pb-0">
          <div className="flex-1 px-4 md:px-0">
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
        
        {/* Only show floating avatar when needed and not on mobile */}
        {!isMobile && (
          <DadAvatar 
            isVisible={showDadAvatar}
            suggestion={currentSuggestion}
            onAction={handleDadAvatarAction}
          />
        )}
      </div>
    </SidebarProvider>
  );
}
