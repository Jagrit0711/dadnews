
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (isVisible && !isHidden) {
      const randomPrompt = suggestion || dadPrompts[Math.floor(Math.random() * dadPrompts.length)];
      setPrompt(randomPrompt);
      setReacted(false);
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
    const positiveReaction = dadReactions.positive[Math.floor(Math.random() * dadReactions.positive.length)];
    setReaction(positiveReaction);
    
    setTimeout(() => {
      onAction("ignore"); // This will hide the avatar after a delay
    }, 3000);
  };

  const handleIgnore = () => {
    onAction("ignore");
    setReacted(true);
    const negativeReaction = dadReactions.negative[Math.floor(Math.random() * dadReactions.negative.length)];
    setReaction(negativeReaction);
  };

  if (isHidden) return null;

  return (
    <div className={`dad-avatar ${!isVisible ? "hidden" : ""}`}>
      <div className="flex items-start">
        <div className="mr-3 font-bold text-lg">👨‍🦳</div>
        <div>
          {!reacted ? (
            <>
              <p className="mb-2 font-brutalist text-sm">{prompt}</p>
              <div className="flex gap-2">
                <button 
                  onClick={handleClick}
                  className="bg-brutalist text-white px-3 py-1 text-sm font-bold"
                >
                  READ
                </button>
                <button 
                  onClick={handleIgnore}
                  className="bg-transparent border border-brutalist px-3 py-1 text-sm font-bold"
                >
                  LATER
                </button>
              </div>
            </>
          ) : (
            <p className="font-brutalist text-sm">{reaction}</p>
          )}
        </div>
      </div>
    </div>
  );
}
