
import { ReactNode, useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { CategoryBar } from "./CategoryBar";
import { DadAISidebar } from "./DadAISidebar";
import { DadAvatar } from "./DadAvatar";
import { Navigation } from "./Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockNewsData } from "../data/mockNewsData";
import { toast } from "sonner";

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
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const isMobile = useIsMobile();

  // Function to update user engagement and dad's mood
  const updateEngagement = (increment: boolean) => {
    setUserEngagement(prev => {
      const newValue = increment 
        ? Math.min(prev + 10, 100) 
        : Math.max(prev - 5, 0);
      
      // Show appropriate toast based on engagement level change
      if (increment) {
        if (newValue >= 80) {
          toast("Dad is proud of you for staying informed!", {
            icon: "👨‍🦳👍",
          });
        }
      } else {
        if (newValue <= 20) {
          toast("Dad is disappointed in your lack of interest...", {
            icon: "👨‍🦳👎",
          });
        }
      }
      
      return newValue;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Determine if it's time to show Dad Avatar
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteraction;
      
      // Only show after some scrolling and if it's been at least 30 seconds since last interaction
      // and with a random chance
      if (position > 200 && 
          timeSinceLastInteraction > 30000 && 
          Math.random() < 0.2 && 
          !showDadAvatar) {
        const randomNews = mockNewsData[Math.floor(Math.random() * mockNewsData.length)];
        setCurrentSuggestion(`Hey! You should check out "${randomNews.title}"`);
        setShowDadAvatar(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showDadAvatar, lastInteraction]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleArticleRead = (newsId: string) => {
    if (!readArticles.includes(newsId)) {
      setReadArticles([...readArticles, newsId]);
      updateEngagement(true);
      setLastInteraction(Date.now());
    }
  };

  const handleDadAvatarAction = (action: "read" | "ignore") => {
    if (action === "read") {
      updateEngagement(true);
    } else {
      updateEngagement(false);
    }
    
    setShowDadAvatar(false);
    setLastInteraction(Date.now());
  };

  // Export state for other components to use
  useEffect(() => {
    // Make user engagement available to other components using window
    window.dadAI = {
      userEngagement,
      readArticles,
      updateEngagement
    };
  }, [userEngagement, readArticles]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <Navigation />
        <CategoryBar onCategoryChange={handleCategoryChange} />
        <div className="flex flex-1 relative pb-16 sm:pb-0">
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
        
        {/* Only show the popup avatar when needed, not duplicating with navbar */}
        <DadAvatar 
          isVisible={showDadAvatar}
          suggestion={currentSuggestion}
          onAction={handleDadAvatarAction}
        />
      </div>
    </SidebarProvider>
  );
}

// Add global type definitions for window
declare global {
  interface Window {
    dadAI?: {
      userEngagement: number;
      readArticles: string[];
      updateEngagement: (increment: boolean) => void;
    };
  }
}
