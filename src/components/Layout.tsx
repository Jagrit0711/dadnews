import { ReactNode, useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { DadAvatar } from "./DadAvatar";
import { Navigation } from "./Navigation";
import { InstallPrompt } from "./InstallPrompt";
import { Onboarding } from "./Onboarding";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockNewsData } from "../data/mockNewsData";
import { useNavigate } from "react-router-dom";

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
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  }, []);

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
            setCurrentArticleId(randomNews.id);
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
            setCurrentArticleId(randomNews.id);
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
      // If there's a current article, navigate to it
      if (currentArticleId) {
        handleArticleRead(currentArticleId);
        navigate(`/article/${currentArticleId}`);
      } else {
        // Extract article ID from suggestion if possible
        const articleTitle = currentSuggestion.match(/"([^"]+)"/)?.[1];
        if (articleTitle) {
          const article = mockNewsData.find(item => item.title === articleTitle);
          if (article) {
            handleArticleRead(article.id);
            navigate(`/article/${article.id}`);
          }
        }
      }
      
      setUserEngagement(prev => Math.min(prev + 5, 100));
      setShowDadAvatar(false);
    } else {
      // When ignoring, don't hide dad avatar completely - make it nag more
      setUserEngagement(prev => Math.max(prev - 5, 0));
      
      // Instead of hiding, update the message to be more nagging
      const naggingMessages = [
        "You're missing out on important information!",
        "Come on, this is critical reading!",
        "Dad says you NEED to read this!",
        "Are you sure? This is important!",
        "You'll regret not reading this one!"
      ];
      
      setCurrentSuggestion(naggingMessages[Math.floor(Math.random() * naggingMessages.length)]);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
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
        </div>
        
        {/* Install prompt */}
        <InstallPrompt />
        
        {/* Improved Dad Avatar */}
        <DadAvatar 
          isVisible={showDadAvatar}
          suggestion={currentSuggestion}
          onAction={handleDadAvatarAction}
        />

        {/* Onboarding */}
        {showOnboarding && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </div>
    </SidebarProvider>
  );
}
