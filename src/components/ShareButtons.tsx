
import { Share, Facebook, Twitter, Mail, Link } from "lucide-react";
import { useState } from "react";
import { NewsItem } from "./NewsCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  article: NewsItem;
}

export function ShareButtons({ article }: ShareButtonsProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const handleShare = (platform: string) => {
    // This would typically open a share dialog or redirect to a share URL
    // For now, we'll just show a toast notification
    toast({
      title: `Shared to ${platform}!`,
      description: `You've shared "${article.title}" to ${platform}`,
    });
    
    setShowShareOptions(false);
  };
  
  const copyToClipboard = () => {
    // In a real app, this would use the actual URL of the article
    const url = `https://dadnews.example.com/article/${article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
      });
    });
    setShowShareOptions(false);
  };

  return (
    <div className="relative">
      <Button 
        variant="outline"
        size="sm"
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="border-2 border-brutalist rounded-brutalist flex items-center"
      >
        <Share size={16} className="mr-2" />
        Share
      </Button>
      
      {showShareOptions && (
        <div className="absolute right-0 top-full mt-2 bg-background border-2 border-brutalist rounded-brutalist p-2 shadow-brutalist z-10 min-w-[180px]">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => handleShare('Facebook')}
              className="flex items-center p-2 hover:bg-secondary rounded-brutalist transition-colors"
            >
              <Facebook size={16} className="mr-2 text-blue-600" />
              <span className="text-sm">Facebook</span>
            </button>
            
            <button 
              onClick={() => handleShare('Twitter')}
              className="flex items-center p-2 hover:bg-secondary rounded-brutalist transition-colors"
            >
              <Twitter size={16} className="mr-2 text-blue-400" />
              <span className="text-sm">Twitter</span>
            </button>
            
            <button 
              onClick={() => handleShare('Email')}
              className="flex items-center p-2 hover:bg-secondary rounded-brutalist transition-colors"
            >
              <Mail size={16} className="mr-2 text-brutalist" />
              <span className="text-sm">Email</span>
            </button>
            
            <button 
              onClick={copyToClipboard}
              className="flex items-center p-2 hover:bg-secondary rounded-brutalist transition-colors"
            >
              <Link size={16} className="mr-2 text-brutalist" />
              <span className="text-sm">Copy Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
