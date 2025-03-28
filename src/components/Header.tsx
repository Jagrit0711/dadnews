import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Weather } from "./Weather";
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";
import { AlertTriangle } from "lucide-react";

export function Header() {
  return (
    <header className="pt-4 pb-2 border-b-4 border-black dark:border-white bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div 
            className="flex flex-col items-center mb-4 relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-black dark:text-white font-brutalist">
                Dad News
              </h1>
            </Link>
            <motion.p 
              className="text-sm md:text-base font-brutalist mt-1 italic text-black dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              NO NONSENSE NEWS, JUST HOW DAD LIKES IT
            </motion.p>

            {/* Animated line */}
            <motion.div 
              className="absolute -bottom-4 h-1 bg-black dark:bg-white"
              initial={{ width: "0%", left: "10%" }}
              animate={{ 
                width: ["0%", "80%", "0%"],
                left: ["10%", "10%", "10%"]
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />

            <motion.div
              className="flex items-center gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400 font-brutalist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="italic">
                "Back in my day, we had to wait a week for the newspaper! This news is only a day old - you kids have it easy!"
              </span>
            </motion.div>
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-2">
            <Weather />
            <Clock />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
