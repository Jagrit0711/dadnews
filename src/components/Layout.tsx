
import { ReactNode, useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { DadAISidebar } from "./DadAISidebar";
import { DadAvatar } from "./DadAvatar";
import { Navigation } from "./Navigation";
import { InstallPrompt } from "./InstallPrompt";
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
  const [showCount, setShowCount] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Show Dad Avatar while scrolling with better logic
      if (!isMobile && position > 200 && !showDadAvatar) {
        // Increase probability of appearing based on scroll depth and how few times it's been shown
        const appearProbability = 0.05 + (position / 5000) + (3 - Math.min(showCount, 3)) * 0.03;
        
        if (Math.random() < appearProbability) {
          // Select articles the user hasn't read yet
          const unreadNews = mockNewsData.filter(item => !readArticles.includes(item.id));
          
          // If there are unread news, suggest one
          if (unreadNews.length > 0) {
            const randomNews = unreadNews[Math.floor(Math.random() * unreadNews.length)];
            // Vary the suggestion style
            const suggestionStyles = [
              `Hey! You should check out "${randomNews.title}"!`,
              `Beta! This just in: "${randomNews.title}"`,
              `Important news you're missing: "${randomNews.title}"`,
              `${randomNews.title} - this is critical reading!`
            ];
            
            setCurrentSuggestion(suggestionStyles[Math.floor(Math.random() * suggestionStyles.length)]);
            setShowDadAvatar(true);
            setShowCount(prev => prev + 1);
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showDadAvatar, isMobile, readArticles, showCount]);

  // Also show dad avatar occasionally on idle time
  useEffect(() => {
    if (!isMobile && !showDadAvatar) {
      const idleTimer = setTimeout(() => {
        // Only show if user has been idle for a while and not at the top of the page
        if (scrollPosition > 100) {
          const unreadNews = mockNewsData.filter(item => !readArticles.includes(item.id));
          
          if (unreadNews.length > 0) {
            const randomNews = unreadNews[Math.floor(Math.random() * unreadNews.length)];
            setCurrentSuggestion(`Hey! While you're taking a break, read "${randomNews.title}"`);
            setShowDadAvatar(true);
            setShowCount(prev => prev + 1);
          }
        }
      }, 15000); // 15 seconds of idle time
      
      return () => clearTimeout(idleTimer);
    }
  }, [showDadAvatar, isMobile, scrollPosition, readArticles]);

  const handleArticleRead = (newsId: string) => {
    if (!readArticles.includes(newsId)) {
      setReadArticles([...readArticles, newsId]);
      setUserEngagement(prev => Math.min(prev + 10, 100));
    }
  };

  const handleDadAvatarAction = (action: "read" | "ignore") => {
    if (action === "read") {
      // Extract article ID from suggestion if possible
      const articleTitle = currentSuggestion.match(/"([^"]+)"/)?.[1];
      if (articleTitle) {
        const article = mockNewsData.find(item => item.title === articleTitle);
        if (article) {
          handleArticleRead(article.id);
        }
      }
      
      setUserEngagement(prev => Math.min(prev + 5, 100));
    } else {
      setUserEngagement(prev => Math.max(prev - 5, 0));
      setShowDadAvatar(false);
      
      // Add a cooldown before showing again
      setTimeout(() => {
        setShowCount(prev => Math.max(prev - 1, 0));
      }, 30000);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <Navigation />
        <div className="flex flex-1 relative pb-16 sm:pb-0">
          <div className="flex-1 w-full">
            {children}
          </div>
          <div className="hidden lg:block w-1/4 min-w-[280px]">
            <DadAISidebar 
              newsItems={mockNewsData}
              userEngagement={userEngagement}
              onNewsClick={handleArticleRead}
            />
          </div>
        </div>
        
        {/* Install prompt */}
        <InstallPrompt />
        
        {/* Improved Dad Avatar */}
        <DadAvatar 
          isVisible={showDadAvatar}
          suggestion={currentSuggestion}
          onAction={handleDadAvatarAction}
        />
      </div>
    </SidebarProvider>
  );
}
