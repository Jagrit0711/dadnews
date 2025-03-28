
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
  const [blinkInterval, setBlinkInterval] = useState<NodeJS.Timeout | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Set up regular blinking
  useEffect(() => {
    if (isVisible && !isHidden) {
      const interval = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }, Math.random() * 4000 + 2000); // Random time between 2-6 seconds
      
      setBlinkInterval(interval);
    }
    
    return () => {
      if (blinkInterval) clearInterval(blinkInterval);
    };
  }, [isVisible, isHidden]);

  useEffect(() => {
    if (isVisible && !isHidden) {
      const randomPrompt = suggestion || dadPrompts[Math.floor(Math.random() * dadPrompts.length)];
      setPrompt(randomPrompt);
      setReacted(false);
      setMood("neutral");
      
      // Add a subtle movement to the avatar
      if (avatarRef.current) {
        const subtle = setInterval(() => {
          const randomX = (Math.random() - 0.5) * 2;
          const randomY = (Math.random() - 0.5) * 2;
          if (avatarRef.current) {
            avatarRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
          }
        }, 2000);
        
        return () => clearInterval(subtle);
      }
    }
  }, [isVisible, suggestion, isHidden]);

  useEffect(() => {
    if (isVisible) {
      setIsHidden(false);
    } else {
      setTimeout(() => {
        setIsHidden(true);
      }, 500); // Match animation duration
    }
  }, [isVisible]);

  const handleClick = () => {
    onAction("read");
    setReacted(true);
    setMood("happy");
    const positiveReaction = dadReactions.positive[Math.floor(Math.random() * dadReactions.positive.length)];
    setReaction(positiveReaction);
    
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
          className={`dad-avatar fixed bottom-20 right-4 z-50 bg-white p-3 rounded-brutalist border-2 border-brutalist shadow-lg max-w-xs ${!isVisible ? "hidden" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <div className="flex items-start">
            <div className="mr-3 flex-shrink-0" ref={avatarRef}>
              <div className="dad-animated-face w-12 h-12">
                <div className="dad-avatar-eyes">
                  <div className={`dad-avatar-eye ${isBlinking ? 'blink' : ''}`}></div>
                  <div className={`dad-avatar-eye ${isBlinking ? 'blink' : ''}`}></div>
                </div>
                <div className={`dad-avatar-mouth ${mood}`}></div>
              </div>
            </div>
            <div className="flex-1">
              {!reacted ? (
                <>
                  <p className="mb-2 font-brutalist text-sm">{prompt}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleClick}
                      className="bg-brutalist text-white px-3 py-1 text-sm font-bold rounded-brutalist hover-scale"
                    >
                      READ
                    </button>
                    <button 
                      onClick={handleIgnore}
                      className="bg-transparent border border-brutalist px-3 py-1 text-sm font-bold rounded-brutalist"
                    >
                      LATER
                    </button>
                  </div>
                </>
              ) : (
                <motion.p 
                  className="font-brutalist text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
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
