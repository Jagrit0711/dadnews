
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, ThumbsUp } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment1",
      author: "DadJokeMaster",
      content: "This article really hammered the point home! 🔨",
      timestamp: "2 hours ago",
      likes: 15,
      liked: false
    },
    {
      id: "comment2",
      author: "LawnMowerKing",
      content: "I was just telling my kids about this yesterday. Finally, some news that cuts through the weeds!",
      timestamp: "5 hours ago",
      likes: 23,
      liked: false
    },
    {
      id: "comment3",
      author: "GrillMaster5000",
      content: "Hot take: this is the best article I've read all day. And I know hot, I've been standing over the grill since noon.",
      timestamp: "1 day ago",
      likes: 42,
      liked: false
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment${Date.now()}`,
      author: "You",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      liked: false
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };
  
  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };

  return (
    <Card className="mt-6 p-6 rounded-brutalist border-2 border-brutalist shadow-brutalist">
      <h2 className="text-2xl font-brutalist mb-4">Comments</h2>
      
      <div className="flex mb-6">
        <div className="flex-1 relative">
          <textarea
            className="w-full p-3 border-2 border-brutalist rounded-brutalist resize-none focus:outline-none focus:ring-2 focus:ring-brutalist bg-background"
            rows={3}
            placeholder="Add your dad take on this article..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleAddComment}
          className="ml-2 self-end border-2 border-brutalist rounded-brutalist"
        >
          <Send size={16} className="mr-2" />
          Comment
        </Button>
      </div>
      
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="p-4 border-2 border-brutalist/30 rounded-brutalist bg-secondary/50">
            <div className="flex justify-between items-start">
              <div className="font-bold">{comment.author}</div>
              <div className="text-xs text-muted-foreground">{comment.timestamp}</div>
            </div>
            <p className="my-2">{comment.content}</p>
            <div className="flex items-center">
              <button 
                onClick={() => handleLike(comment.id)}
                className={`flex items-center text-xs ${comment.liked ? 'text-brutalist font-medium' : 'text-muted-foreground'}`}
              >
                <ThumbsUp size={14} className="mr-1" />
                {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
