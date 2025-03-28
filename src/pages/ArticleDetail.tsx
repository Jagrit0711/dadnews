import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { DadRating } from "@/components/DadRating";
import { ShareButtons } from "@/components/ShareButtons";
import { motion } from "framer-motion";
import { NewsItem } from "@/components/NewsCard";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get the article data from localStorage (passed from DadSuggestion)
  const article: NewsItem | null = id ? JSON.parse(localStorage.getItem(`article_${id}`) || 'null') : null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleReadOriginal = () => {
    if (article) {
      window.open(article.readMoreUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-100 border-2 border-red-500 rounded-brutalist p-4 text-red-700">
            <p className="font-brutalist">Oops! Dad couldn't find this article.</p>
            <p className="text-sm mt-2">The article might have been moved or deleted.</p>
            <Button 
              onClick={handleBack}
              className="mt-4 border-2 border-brutalist rounded-brutalist"
            >
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        className="max-w-4xl mx-auto p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          onClick={handleBack}
          className="mb-4 border-2 border-brutalist rounded-brutalist"
        >
          ← Back to News
        </Button>

        <article className="bg-white border-2 border-brutalist rounded-brutalist p-6 shadow-brutalist">
          <h1 className="text-2xl sm:text-3xl font-brutalist mb-4">{article.title}</h1>
          
          {article.imageUrl && (
            <div className="mb-6 aspect-video w-full overflow-hidden rounded-brutalist border-2 border-brutalist">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="inline-block px-2 py-1 text-xs font-brutalist bg-brutalist text-white rounded-brutalist">
                {article.category}
              </span>
              {article.publishedAt && (
                <span className="text-sm text-gray-600">
                  {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                </span>
              )}
            </div>
            <ShareButtons article={article} />
          </div>

          <div className="prose prose-brutalist max-w-none mb-6">
            <p className="text-lg mb-4">{article.summary}</p>
            {article.content && (
              <div className="text-base space-y-4">
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          <div className="border-t-2 border-brutalist pt-4 mb-6">
            <DadRating articleId={article.id} />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleReadOriginal}
              className="flex-1 border-2 border-brutalist rounded-brutalist bg-brutalist text-white hover:bg-brutalist/90"
            >
              Read Original Article
            </Button>
            <Button 
              onClick={handleBack}
              variant="outline"
              className="flex-1 border-2 border-brutalist rounded-brutalist"
            >
              Back to News
            </Button>
          </div>
        </article>
      </motion.div>
    </Layout>
  );
} 