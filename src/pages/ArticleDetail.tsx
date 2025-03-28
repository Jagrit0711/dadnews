
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { mockNewsData } from "@/data/mockNewsData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommentSection } from "@/components/CommentSection";
import { DadRating } from "@/components/DadRating";
import { ShareButtons } from "@/components/ShareButtons";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const dadOpinions = [
  "This is the kind of news they don't teach in schools anymore!",
  "I've been saying this for YEARS! Finally someone reports on it!",
  "Your mother needs to read this article. I'll forward it to her.",
  "If more people read articles like this, the world would be a better place!",
  "Back in my day, this would be front page news!",
  "See? This is why I always say you should read more news!",
  "They don't make reporting like this anymore. Solid journalism!",
  "I knew this was happening all along. This confirms it!"
];

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [dadOpinion, setDadOpinion] = useState("");
  const [showDadOpinion, setShowDadOpinion] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch the article data from an API
    const foundArticle = mockNewsData.find(item => item.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Set a random dad opinion
      setDadOpinion(dadOpinions[Math.floor(Math.random() * dadOpinions.length)]);
      
      // Show dad's opinion with a delay
      setTimeout(() => {
        setShowDadOpinion(true);
      }, 3000);
    }
  }, [id]);

  if (!article) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-brutalist">Article not found</h2>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-4 border-2 border-brutalist rounded-brutalist"
          >
            <ArrowLeft className="mr-2" size={16} />
            Go back to news
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Button 
          onClick={() => navigate('/')} 
          className="mb-6 border-2 border-brutalist rounded-brutalist"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to news
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 rounded-brutalist border-2 border-brutalist shadow-brutalist">
              <div className="mb-4">
                <span className="inline-block px-2 py-1 text-xs font-brutalist bg-brutalist text-white rounded-brutalist">
                  {article.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-brutalist mb-4">{article.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <DadRating articleId={article.id} />
                <ShareButtons article={article} />
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg mb-4">{article.summary}</p>
                {/* Mock full content paragraphs */}
                <p>In what can only be described as a groundbreaking development, experts from around the world have gathered to discuss the implications of this news. "It's unprecedented," says Dr. Jane Smith, leading researcher in the field.</p>
                <p>The ramifications of this event are expected to be felt across multiple sectors, with economic forecasts suggesting a possible ripple effect throughout global markets.</p>
                
                {/* Dad's opinion bubble */}
                <motion.div 
                  className={`relative my-6 p-4 bg-yellow-50 border-2 border-brutalist rounded-brutalist`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: showDadOpinion ? 1 : 0, x: showDadOpinion ? 0 : -50 }}
                  transition={{ type: "spring" }}
                >
                  <div className="absolute -top-6 -left-4">
                    <motion.div
                      className="dad-animated-face w-12 h-12 bg-yellow-200 rounded-full relative border-2 border-black"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="dad-avatar-eyes absolute top-3 w-full flex justify-center space-x-2">
                        <div className="dad-avatar-eye w-2 h-2 bg-black rounded-full" />
                        <div className="dad-avatar-eye w-2 h-2 bg-black rounded-full" />
                      </div>
                      <div 
                        className="absolute bottom-3 w-6 h-2 mx-auto left-0 right-0"
                        style={{ 
                          borderRadius: "0 0 100px 100px",
                          border: "2px solid black",
                          borderTop: "none"
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="ml-8 italic font-brutalist-text">
                    <strong>Dad says:</strong> "{dadOpinion}"
                  </div>
                </motion.div>
                
                <p>Community leaders have expressed cautious optimism, while emphasizing the importance of addressing potential challenges that may arise as a result of these new developments.</p>
                <p>"We've been preparing for something like this for years," commented local official Tom Johnson. "Now that it's happening, we're ready to implement our comprehensive response plan."</p>
                <p>Citizens are encouraged to stay informed through reliable news sources as the situation continues to evolve. Updates will be provided as more information becomes available.</p>
                <p>Historical context suggests that similar events in the past have led to significant societal changes, though analysts caution against drawing direct parallels due to the unique nature of current circumstances.</p>
              </div>
            </Card>

            <CommentSection articleId={article.id} />
          </div>

          <div className="space-y-6">
            <Card className="p-4 rounded-brutalist border-2 border-brutalist">
              <h3 className="font-brutalist text-xl mb-4">Related Articles</h3>
              <div className="space-y-4">
                {mockNewsData
                  .filter(item => item.category === article.category && item.id !== article.id)
                  .slice(0, 3)
                  .map(relatedArticle => (
                    <motion.div 
                      key={relatedArticle.id}
                      className="p-3 border-b border-brutalist last:border-0 cursor-pointer hover:bg-secondary/50 transition-colors relative"
                      onClick={() => navigate(`/article/${relatedArticle.id}`)}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(0,0,0,0.05)" 
                      }}
                    >
                      <h4 className="font-brutalist text-base">{relatedArticle.title}</h4>
                      <p className="text-xs text-muted-foreground">{relatedArticle.category}</p>
                      
                      {/* Random chance to add dad's thumbs up */}
                      {Math.random() > 0.7 && (
                        <motion.div 
                          className="absolute -right-1 -top-1"
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: 1, rotate: [0, -10, 0, 10, 0] }}
                          transition={{ duration: 1, delay: 0.5 }}
                        >
                          <div className="bg-green-100 border border-black rounded-full p-1 shadow-md">
                            <div className="text-xs">👍</div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                }
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetail;
