
import { ThemeToggle } from "./ThemeToggle";
import { WeatherWidget } from "./WeatherWidget";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="pt-4 pb-2 border-b border-brutalist">
      <div className="container px-4 flex flex-col items-center">
        <motion.div 
          className="flex flex-col items-center mb-1"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="brutalist-header text-4xl md:text-5xl lg:text-6xl text-foreground font-brutalist">Dad News</h1>
          <motion.p 
            className="text-sm md:text-base font-brutalist-text mt-1 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            NO NONSENSE NEWS, JUST HOW DAD LIKES IT
          </motion.p>
        </motion.div>
        <div className="flex flex-row items-center justify-center gap-3 mt-2">
          <WeatherWidget />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
