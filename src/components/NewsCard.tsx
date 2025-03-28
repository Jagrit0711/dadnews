
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
    <div className="news-card flex flex-col h-full">
      <div className="mb-2">
        <span className="inline-block px-2 py-1 text-xs font-brutalist bg-brutalist text-white rounded-brutalist">
          {news.category}
        </span>
      </div>
      <h2 className="text-xl font-brutalist mb-2">{news.title}</h2>
      <p className="text-sm mb-4 flex-grow">{news.summary}</p>
      
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <DadRating articleId={news.id} />
        <ShareButtons article={news} />
      </div>
      
      <Button 
        onClick={handleReadMore} 
        className="w-full border-2 border-brutalist rounded-brutalist"
      >
        READ MORE
      </Button>
    </div>
  );
}
