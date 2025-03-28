
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DadAvatarProps {
  isVisible: boolean;
  suggestion: string;
  onAction: (action: "read" | "ignore") => void;
}

const dadPrompts = [
  "Ayo beta, you should really read this one!",
  "This article has your name written all over it!",
  "C'mon! This is important news right here!",
  "Hey! Stop scrolling and read this!",
  "I found something you might like! Click here!"
];

const dadReactions = {
  positive: [
    "Finally! You clicked! I am proud of you.",
    "That's my child! Good choice!",
    "See? Dad knows best!",
    "I knew you'd make the right decision!"
  ],
  negative: [
    "Oh, so you're scrolling past me? I see how it is.",
    "Fine, ignore your dad. I'm used to it.",
    "*sighs dramatically*",
    "Nobody listens to dad anymore..."
  ]
};

export function DadAvatar({ isVisible, suggestion, onAction }: DadAvatarProps) {
  const [prompt, setPrompt] = useState("");
  const [reaction, setReaction] = useState("");
  const [reacted, setReacted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [mood, setMood] = useState<"happy" | "sad" | "neutral">("neutral");
  const [isBlinking, setIsBlinking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Blinking effect
  useEffect(() => {
    if (isVisible && !isHidden) {
      const blinkInterval = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }, 4000);
      
      return () => clearInterval(blinkInterval);
    }
  }, [isVisible, isHidden]);

  // Random head tilt
  useEffect(() => {
    if (isVisible && !isHidden) {
      const tiltInterval = setInterval(() => {
        setHeadTilt(Math.random() * 10 - 5);
      }, 5000);
      
      return () => clearInterval(tiltInterval);
    }
  }, [isVisible, isHidden]);

  useEffect(() => {
    if (isVisible && !isHidden) {
      const randomPrompt = suggestion || dadPrompts[Math.floor(Math.random() * dadPrompts.length)];
      setPrompt(randomPrompt);
      setReacted(false);
      setMood("neutral");
      
      // Add animation when appearing
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isVisible, suggestion, isHidden]);

  useEffect(() => {
    if (isVisible) {
      setIsHidden(false);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsHidden(true);
      }, 500); // Match animation duration
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const handleClick = () => {
    onAction("read");
    setReacted(true);
    setMood("happy");
    const positiveReaction = dadReactions.positive[Math.floor(Math.random() * dadReactions.positive.length)];
    setReaction(positiveReaction);
    
    // Dad does a little dance when happy
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    setTimeout(() => {
      onAction("ignore"); // This will hide the avatar after a delay
    }, 3000);
  };

  const handleIgnore = () => {
    onAction("ignore");
    setReacted(true);
    setMood("sad");
    const negativeReaction = dadReactions.negative[Math.floor(Math.random() * dadReactions.negative.length)];
    setReaction(negativeReaction);
  };

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div 
          className={`dad-avatar ${!isVisible ? "hidden" : ""} ${isAnimating ? "dad-pop" : ""}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <div className="flex items-start">
            <motion.div 
              className="mr-3 flex-shrink-0"
              animate={{ 
                rotate: headTilt,
                scale: isAnimating ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className={`dad-animated-face w-12 h-12 ${isBlinking ? "dad-blink" : ""}`}
                style={{ 
                  boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                  border: "2px solid #000" 
                }}
              >
                <div className="dad-avatar-eyes">
                  <div className="dad-avatar-eye"></div>
                  <div className="dad-avatar-eye"></div>
                </div>
                <motion.div 
                  className={`dad-avatar-mouth ${mood}`}
                  animate={{ 
                    scaleX: mood === "happy" ? 1.2 : mood === "sad" ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
            <div className="flex-1">
              {!reacted ? (
                <>
                  <motion.p 
                    className="mb-2 font-brutalist text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {prompt}
                  </motion.p>
                  <div className="flex gap-2">
                    <motion.button 
                      onClick={handleClick}
                      className="bg-brutalist text-white px-3 py-1 text-sm font-bold rounded-brutalist hover:bg-brutalist/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      READ
                    </motion.button>
                    <motion.button 
                      onClick={handleIgnore}
                      className="bg-transparent border border-brutalist px-3 py-1 text-sm font-bold rounded-brutalist hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LATER
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.p 
                  className="font-brutalist text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {reaction}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
