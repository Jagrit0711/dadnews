
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
      const scrollAmount = 200;
      
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative container py-4">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => scroll("left")}
          className="mr-2 shrink-0 rounded-full border-2 border-brutalist md:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-none py-2 px-1"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`category-button shrink-0 ${
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
          className="ml-2 shrink-0 rounded-full border-2 border-brutalist md:hidden"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
