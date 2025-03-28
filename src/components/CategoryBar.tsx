
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Politics",
  "Tech",
  "Business",
  "Entertainment",
  "Sports",
  "World",
  "Science",
  "Health",
  "Opinion"
];

interface CategoryBarProps {
  onCategoryChange: (category: string) => void;
}

export function CategoryBar({ onCategoryChange }: CategoryBarProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 150;
      
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative py-2 px-2 sm:px-4">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => scroll("left")}
          className="mr-1 shrink-0 rounded-full border-2 border-brutalist h-8 w-8"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        
        <div 
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto scrollbar-none py-1 px-1 max-w-full"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`category-button shrink-0 text-xs sm:text-sm py-1 px-2 sm:px-3 ${
                activeCategory === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => scroll("right")}
          className="ml-1 shrink-0 rounded-full border-2 border-brutalist h-8 w-8"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
