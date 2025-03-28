
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ArrowUp, BookOpen, MessageCircle, Smile, Frown, Angry } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockNewsData } from "@/data/mockNewsData";

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
  "I found something you might like! Click here!",
  "When I was your age, I read EVERY article!",
  "This is what's wrong with your generation - you don't read enough news!",
  "You know who reads this stuff? Successful people!",
  "Your mother would be so proud if you read this...",
  "I'm not mad, I'm just disappointed you haven't read this yet."
];

const dadReactions = {
  positive: [
    "Finally! You clicked! I am proud of you.",
    "That's my child! Good choice!",
    "See? Dad knows best!",
    "I knew you'd make the right decision!",
    "This is why you're my favorite!",
    "Reading makes you smarter! Just like your dad!",
    "Now THAT'S what I call a smart decision!",
    "Your mother will be so proud when I tell her!",
    "You're going places, beta! Just like your dad!"
  ],
  negative: [
    "Oh, so you're scrolling past me? I see how it is.",
    "Fine, ignore your dad. I'm used to it.",
    "*sighs dramatically*",
    "Nobody listens to dad anymore...",
    "This is why the country is going downhill!",
    "Back in MY day, we respected our elders' recommendations!",
    "I guess I raised a child who doesn't care about staying informed!",
    "You know who else ignores important news? LOSERS!",
    "Wow, just wow. Ignoring your dad's advice. Cool. Very cool.",
    "Don't come asking ME for advice later when you're uninformed!"
  ]
};

export function DadAvatar({ isVisible, suggestion, onAction }: DadAvatarProps) {
  const [prompt, setPrompt] = useState("");
  const [reaction, setReaction] = useState("");
  const [reacted, setReacted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [mood, setMood] = useState<"happy" | "sad" | "angry" | "excited" | "neutral">("neutral");
  const [isBlinking, setIsBlinking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  const [eyebrowRaise, setEyebrowRaise] = useState(0);
  const [shouldShake, setShouldShake] = useState(false);
  const [bellRing, setBellRing] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const naggingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const naggingCountRef = useRef(0);
  const navigate = useNavigate();

  // Blinking effect
  useEffect(() => {
    if (isVisible && !isHidden) {
      const blinkInterval = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }, Math.random() * 3000 + 2000); // Random blinking between 2-5 seconds
      
      return () => clearInterval(blinkInterval);
    }
  }, [isVisible, isHidden]);

  // Random head tilt and eyebrow movement
  useEffect(() => {
    if (isVisible && !isHidden) {
      const expressionInterval = setInterval(() => {
        if (mood === "neutral") {
          setHeadTilt(Math.random() * 10 - 5);
          setEyebrowRaise(Math.random() > 0.7 ? 2 : 0);
        }
      }, 4000);
      
      return () => clearInterval(expressionInterval);
    }
  }, [isVisible, isHidden, mood]);

  // Nagging effect if user hasn't interacted - increased intensity and frequency
  useEffect(() => {
    if (isVisible && !isHidden && !reacted) {
      naggingTimeoutRef.current = setTimeout(() => {
        if (!reacted) {
          naggingCountRef.current += 1;
          
          if (naggingCountRef.current > 2) {
            setMood("angry");
            setShouldShake(true);
            setBellRing(true);
            setTimeout(() => {
              setShouldShake(false);
              setBellRing(false);
            }, 1000);
          } else {
            setMood("sad");
          }
          
          // Update the prompt to be more nagging
          const naggingPrompts = dadPrompts.slice(5); // More nagging prompts are in the latter half
          const randomNaggingPrompt = naggingPrompts[Math.floor(Math.random() * naggingPrompts.length)];
          setPrompt(randomNaggingPrompt);
          
          // Reset the animation to draw attention
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 500);
        }
      }, 5000); // Reduced time to 5 seconds for more frequent nagging
      
      return () => {
        if (naggingTimeoutRef.current) clearTimeout(naggingTimeoutRef.current);
      };
    }
  }, [isVisible, isHidden, reacted, prompt]);

  useEffect(() => {
    if (isVisible && !isHidden) {
      const randomPrompt = suggestion || dadPrompts[Math.floor(Math.random() * 5)]; // Use less nagging prompts initially
      setPrompt(randomPrompt);
      setReacted(false);
      setMood("neutral");
      naggingCountRef.current = 0;
      
      // Extract article ID from suggestion if possible
      const articleTitle = suggestion.match(/"([^"]+)"/)?.[1];
      if (articleTitle) {
        const article = mockNewsData.find(item => item.title === articleTitle);
        if (article) {
          setArticleId(article.id);
        }
      }
      
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
    if (naggingTimeoutRef.current) clearTimeout(naggingTimeoutRef.current);
    
    onAction("read");
    setReacted(true);
    setMood("happy");
    setShouldShake(false);
    const positiveReaction = dadReactions.positive[Math.floor(Math.random() * dadReactions.positive.length)];
    setReaction(positiveReaction);
    
    // Dad does a little dance when happy
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    // Navigate to article page if article ID is available
    if (articleId) {
      setTimeout(() => {
        navigate(`/article/${articleId}`);
      }, 1500);
    } else {
      setTimeout(() => {
        onAction("ignore"); // This will hide the avatar after a delay
      }, 3000);
    }
  };

  const handleIgnore = () => {
    if (naggingTimeoutRef.current) clearTimeout(naggingTimeoutRef.current);
    
    // Don't actually hide dad, just make him react
    setReacted(true);
    
    // If dad was already angry, make him angrier
    if (mood === "angry") {
      setMood("angry");
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 1000);
    } else {
      setMood("sad");
    }
    
    const negativeReaction = dadReactions.negative[Math.floor(Math.random() * dadReactions.negative.length)];
    setReaction(negativeReaction);
    
    // Start nagging again after a short delay
    setTimeout(() => {
      setReacted(false);
      naggingCountRef.current += 1; // Increase nagging counter to make him more insistent
      
      // Re-appear with a more insistent message
      const naggingPrompts = dadPrompts.slice(5);
      const randomNaggingPrompt = naggingPrompts[Math.floor(Math.random() * naggingPrompts.length)];
      setPrompt(randomNaggingPrompt + " PLEASE READ THIS!");
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);
  };

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div 
          className={`dad-avatar fixed bottom-20 right-4 z-50 bg-white dark:bg-brutalist-secondary rounded-brutalist border-2 border-brutalist shadow-brutalist p-4 max-w-xs ${!isVisible ? "hidden" : ""} ${isAnimating ? "dad-pop" : ""}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          style={{
            boxShadow: shouldShake ? "0 0 8px red" : "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          <div className="flex items-start">
            <motion.div 
              className="mr-3 flex-shrink-0 relative"
              animate={{ 
                rotate: shouldShake ? [0, -5, 5, -5, 5, 0] : headTilt,
                scale: isAnimating ? [1, 1.1, 1] : 1,
              }}
              transition={{ 
                duration: shouldShake ? 0.5 : 0.5,
                repeat: shouldShake ? 2 : 0,
                repeatType: "loop"
              }}
            >
              {bellRing && (
                <motion.div 
                  className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <Bell size={16} className="animate-pulse" />
                </motion.div>
              )}
              
              <div 
                className={`dad-animated-face w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full relative ${isBlinking ? "dad-blink" : ""}`}
                style={{ 
                  boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                  border: "2px solid #000",
                  overflow: "hidden"
                }}
              >
                {/* Eyebrows */}
                <motion.div 
                  className="absolute w-4 h-1 bg-black rounded left-3 top-3"
                  animate={{ y: eyebrowRaise }}
                />
                <motion.div 
                  className="absolute w-4 h-1 bg-black rounded right-3 top-3"
                  animate={{ y: eyebrowRaise }}
                />
                
                {/* Eyes */}
                <div className="dad-avatar-eyes absolute top-6 w-full flex justify-center space-x-4">
                  <motion.div 
                    className="dad-avatar-eye w-3 h-3 bg-black rounded-full"
                    animate={{ 
                      scaleY: isBlinking ? 0.1 : 1,
                      y: mood === "angry" ? 1 : mood === "sad" ? 1 : mood === "happy" ? -1 : 0
                    }}
                  />
                  <motion.div 
                    className="dad-avatar-eye w-3 h-3 bg-black rounded-full"
                    animate={{ 
                      scaleY: isBlinking ? 0.1 : 1,
                      y: mood === "angry" ? 1 : mood === "sad" ? 1 : mood === "happy" ? -1 : 0
                    }}
                  />
                </div>
                
                {/* Mouth */}
                <motion.div 
                  className="absolute bottom-3 w-8 h-4 border-2 border-black mx-auto left-0 right-0"
                  style={{ 
                    borderRadius: mood === "happy" ? "0 0 100px 100px" : 
                                mood === "sad" ? "100px 100px 0 0" : 
                                mood === "angry" ? "100px 100px 0 0" : "0px",
                    borderTop: mood === "sad" || mood === "angry" ? "2px solid black" : "none",
                    borderBottom: mood === "happy" ? "2px solid black" : "none",
                    transform: mood === "angry" ? "scaleY(0.7) translateY(2px)" : "none"
                  }}
                />
                
                {/* Accessory based on mood */}
                {mood === "angry" && (
                  <motion.div 
                    className="absolute top-0 right-0"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Angry size={16} className="text-red-500" />
                  </motion.div>
                )}
                
                {mood === "happy" && (
                  <motion.div 
                    className="absolute bottom-0 right-0"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Smile size={16} className="text-green-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            <div className="flex-1">
              {!reacted ? (
                <>
                  <motion.div
                    className="relative"
                    animate={{ 
                      x: shouldShake ? [0, -2, 2, -2, 2, 0] : 0
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: shouldShake ? 3 : 0, 
                      repeatType: "loop"
                    }}
                  >
                    {bellRing && (
                      <motion.div 
                        className="absolute -top-5 -right-2"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <BookOpen size={16} className="text-red-500" />
                      </motion.div>
                    )}
                    
                    <motion.p 
                      className="mb-3 font-brutalist-text text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      style={{ 
                        fontWeight: naggingCountRef.current > 2 ? "bold" : "normal",
                        color: naggingCountRef.current > 2 ? "#cc0000" : "inherit"
                      }}
                    >
                      {prompt}
                      {naggingCountRef.current > 2 && (
                        <motion.span 
                          className="ml-1 inline-block"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          !!!
                        </motion.span>
                      )}
                    </motion.p>
                  </motion.div>
                  
                  <div className="flex gap-2">
                    <motion.button 
                      onClick={handleClick}
                      className="bg-brutalist text-white px-3 py-1 text-sm font-bold rounded-brutalist hover:bg-brutalist/80 transition-colors flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowUp size={14} />
                      READ IT
                    </motion.button>
                    <motion.button 
                      onClick={handleIgnore}
                      className="bg-transparent border border-brutalist px-3 py-1 text-sm font-bold rounded-brutalist hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LATER
                      {mood === "sad" && <Frown size={14} className="text-gray-500" />}
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mood === "happy" && (
                    <motion.div 
                      className="absolute -top-6 -right-2"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1, repeat: 3 }}
                    >
                      <MessageCircle size={16} className="text-green-500" />
                    </motion.div>
                  )}
                  
                  <motion.p 
                    className="font-brutalist-text text-sm"
                    style={{ 
                      fontWeight: mood === "angry" ? "bold" : "normal",
                      color: mood === "angry" ? "#cc0000" : mood === "happy" ? "#118822" : "inherit"
                    }}
                  >
                    {reaction}
                    {mood === "angry" && (
                      <motion.span 
                        className="ml-1 inline-block"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1, repeat: 2 }}
                      >
                        !!
                      </motion.span>
                    )}
                    {mood === "happy" && (
                      <motion.span 
                        className="ml-1 inline-block"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        👍
                      </motion.span>
                    )}
                  </motion.p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
