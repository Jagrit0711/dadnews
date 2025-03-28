
import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Tool } from "lucide-react";

interface DadRatingProps {
  articleId: string;
}

export function DadRating({ articleId }: DadRatingProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [approved, setApproved] = useState(false);
  const [total, setTotal] = useState<{ thumbsUp: number; thumbsDown: number; tools: number }>({
    thumbsUp: 0,
    thumbsDown: 0,
    tools: 0
  });
  
  useEffect(() => {
    // Simulate fetching existing ratings
    const randomThumbsUp = Math.floor(Math.random() * 50) + 10;
    const randomThumbsDown = Math.floor(Math.random() * 20) + 5;
    const randomTools = Math.floor(Math.random() * 40) + 15;
    
    setTotal({
      thumbsUp: randomThumbsUp,
      thumbsDown: randomThumbsDown,
      tools: randomTools
    });
    
    // Calculate dad approval
    const totalVotes = randomThumbsUp + randomTools - randomThumbsDown;
    setApproved(totalVotes > 20);
  }, [articleId]);

  const handleRate = (value: number) => {
    if (rating === value) {
      setRating(null);
      // Simulate removing a vote
      if (value === 1) setTotal(prev => ({ ...prev, thumbsUp: prev.thumbsUp - 1 }));
      else if (value === -1) setTotal(prev => ({ ...prev, thumbsDown: prev.thumbsDown - 1 }));
      else setTotal(prev => ({ ...prev, tools: prev.tools - 1 }));
    } else {
      // If already rated something else, remove previous vote
      if (rating === 1) setTotal(prev => ({ ...prev, thumbsUp: prev.thumbsUp - 1 }));
      else if (rating === -1) setTotal(prev => ({ ...prev, thumbsDown: prev.thumbsDown - 1 }));
      else if (rating === 2) setTotal(prev => ({ ...prev, tools: prev.tools - 1 }));
      
      // Add new vote
      setRating(value);
      if (value === 1) setTotal(prev => ({ ...prev, thumbsUp: prev.thumbsUp + 1 }));
      else if (value === -1) setTotal(prev => ({ ...prev, thumbsDown: prev.thumbsDown + 1 }));
      else setTotal(prev => ({ ...prev, tools: prev.tools + 1 }));
    }
  };

  return (
    <div className="flex items-center">
      <div className="mr-4">
        <div className="text-sm font-medium mb-1">Dad Approval Rating:</div>
        <span className={`inline-block px-2 py-1 text-xs font-brutalist rounded-brutalist ${approved ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {approved ? 'DAD APPROVED' : 'NEEDS WORK'}
        </span>
      </div>
      
      <div className="flex space-x-2 items-center">
        <button 
          onClick={() => handleRate(1)} 
          className={`flex items-center p-2 rounded-brutalist transition-colors ${rating === 1 ? 'bg-brutalist text-white' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          <ThumbsUp size={18} className="mr-1" />
          <span className="text-xs">{total.thumbsUp}</span>
        </button>
        
        <button 
          onClick={() => handleRate(-1)} 
          className={`flex items-center p-2 rounded-brutalist transition-colors ${rating === -1 ? 'bg-brutalist text-white' : 'bg-secondary hover:bg-secondary/80'}`}
        >
          <ThumbsDown size={18} className="mr-1" />
          <span className="text-xs">{total.thumbsDown}</span>
        </button>
        
        <button 
          onClick={() => handleRate(2)} 
          className={`flex items-center p-2 rounded-brutalist transition-colors ${rating === 2 ? 'bg-brutalist text-white' : 'bg-secondary hover:bg-secondary/80'}`}
          title="Dad Tool Rating"
        >
          <Tool size={18} className="mr-1" />
          <span className="text-xs">{total.tools}</span>
        </button>
      </div>
    </div>
  );
}
