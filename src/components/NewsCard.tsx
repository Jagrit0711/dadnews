import { Button } from "@/components/ui/button";
import { DadRating } from "@/components/DadRating";
import { ShareButtons } from "@/components/ShareButtons";
import { format } from "date-fns";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  readMoreUrl: string;
  imageUrl?: string;
  publishedAt?: string;
  content?: string;
}

interface NewsCardProps {
  news: NewsItem;
  onReadMore: (newsId: string) => void;
}

export function NewsCard({ news, onReadMore }: NewsCardProps) {
  const handleReadMore = () => {
    onReadMore(news.id);
    // Open the original article URL in a new tab
    window.open(news.readMoreUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white dark:bg-brutalist-secondary border-2 border-brutalist rounded-brutalist overflow-hidden h-full flex flex-col">
      {/* Image container with fixed aspect ratio */}
      <div className="relative pt-[56.25%]">
        {news.imageUrl ? (
          <img
            src={news.imageUrl}
            alt={news.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-brutalist-secondary flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-600">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-brutalist bg-brutalist text-white rounded-brutalist">
            {news.category}
          </span>
        </div>
        
        <h3 className="font-brutalist text-lg mb-2 line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-1">
          {news.summary}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-dashed border-brutalist/30">
          <div className="text-xs text-gray-500">
            {news.publishedAt && format(new Date(news.publishedAt), 'MMM dd, yyyy')}
          </div>
          
          <Button
            onClick={handleReadMore}
            className="text-xs px-2 py-1 hover:bg-brutalist hover:text-white transition-colors"
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
}
