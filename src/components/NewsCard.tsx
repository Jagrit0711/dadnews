
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DadRating } from "@/components/DadRating";
import { ShareButtons } from "@/components/ShareButtons";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  readMoreUrl: string;
}

interface NewsCardProps {
  news: NewsItem;
  onReadMore: (newsId: string) => void;
}

export function NewsCard({ news, onReadMore }: NewsCardProps) {
  const navigate = useNavigate();
  
  const handleReadMore = () => {
    onReadMore(news.id);
    navigate(`/article/${news.id}`);
  };

  return (
    <div className="news-card flex flex-col h-full w-full">
      <div className="mb-2">
        <span className="inline-block px-2 py-1 text-xs font-brutalist bg-brutalist text-white rounded-brutalist">
          {news.category}
        </span>
      </div>
      <h2 className="text-lg sm:text-xl font-brutalist mb-2 line-clamp-2">{news.title}</h2>
      <p className="text-xs sm:text-sm mb-3 flex-grow line-clamp-3">{news.summary}</p>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <DadRating articleId={news.id} />
        <ShareButtons article={news} />
      </div>
      
      <Button 
        onClick={handleReadMore} 
        className="w-full border-2 border-brutalist rounded-brutalist text-sm"
      >
        READ MORE
      </Button>
    </div>
  );
}
