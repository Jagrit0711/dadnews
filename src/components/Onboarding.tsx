import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "Welcome to Dad News!",
    description: "No nonsense news, just how dad likes it.",
    icon: (
      <motion.div
        className="w-16 h-16 bg-black dark:bg-white rounded-full relative border-2 border-black dark:border-white"
        animate={{ rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="absolute top-5 w-full flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
          <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
        </div>
        <div 
          className="absolute bottom-4 w-8 h-2 mx-auto left-0 right-0"
          style={{ 
            borderRadius: "0 0 100px 100px",
            border: "2px solid currentColor",
            borderTop: "none"
          }}
        />
        <div 
          className="absolute bottom-6 w-6 h-[2px] mx-auto left-0 right-0 bg-white dark:bg-black"
        />
      </motion.div>
    )
  },
  {
    title: "Dad's Briefing",
    description: "Dad personally curates the top headlines. He'll be very disappointed if you don't read them.",
    icon: (
      <div className="relative">
        <motion.div
          className="w-16 h-16 bg-black dark:bg-white rounded-full relative border-2 border-black dark:border-white"
          animate={{ rotate: [0, -5, 0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="absolute top-5 w-full flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
            <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
          </div>
          <div 
            className="absolute bottom-4 w-8 h-2 mx-auto left-0 right-0"
            style={{ 
              borderRadius: "0 0 100px 100px",
              border: "2px solid currentColor",
              borderTop: "none",
              transform: "rotate(180deg)"
            }}
          />
          <div 
            className="absolute bottom-6 w-6 h-[2px] mx-auto left-0 right-0 bg-white dark:bg-black"
          />
        </motion.div>
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          !
        </motion.div>
      </div>
    )
  },
  {
    title: "Dad's Suggestions",
    description: "Dad will pop up occasionally to make sure you're reading what he thinks is important.",
    icon: (
      <motion.div
        className="w-16 h-16 bg-black dark:bg-white rounded-full relative border-2 border-black dark:border-white"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute top-5 w-full flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
          <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
        </div>
        <div 
          className="absolute bottom-4 w-8 h-2 mx-auto left-0 right-0"
          style={{ 
            borderRadius: "0 0 100px 100px",
            border: "2px solid currentColor",
            borderTop: "none",
            transform: "rotate(180deg)"
          }}
        />
        <div 
          className="absolute bottom-6 w-6 h-[2px] mx-auto left-0 right-0 bg-white dark:bg-black"
        />
      </motion.div>
    )
  },
  {
    title: "Make Dad Proud!",
    description: "The more you read, the prouder dad gets. Don't let him down!",
    icon: (
      <motion.div
        className="w-16 h-16 bg-black dark:bg-white rounded-full relative border-2 border-black dark:border-white"
        animate={{ rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="absolute top-5 w-full flex justify-center space-x-2">
          <motion.div 
            className="w-2 h-2 bg-white dark:bg-black rounded-full"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="w-2 h-2 bg-white dark:bg-black rounded-full"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
        <div 
          className="absolute bottom-4 w-8 h-2 mx-auto left-0 right-0"
          style={{ 
            borderRadius: "100px 100px 0 0",
            border: "2px solid currentColor",
            borderBottom: "none"
          }}
        />
        <div 
          className="absolute bottom-6 w-6 h-[2px] mx-auto left-0 right-0 bg-white dark:bg-black"
        />
      </motion.div>
    )
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      setIsExiting(true);
      setTimeout(() => {
        localStorage.setItem('onboardingComplete', 'true');
        onComplete();
      }, 500);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('onboardingComplete', 'true');
      onComplete();
    }, 500);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-md mx-4 bg-white dark:bg-black border-4 border-black dark:border-white rounded-brutalist shadow-brutalist"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-8">
            <h2 className="font-brutalist text-2xl text-black dark:text-white">
              {onboardingSteps[currentStep].title}
            </h2>
            <button 
              onClick={handleSkip}
              className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 mb-8">
            {onboardingSteps[currentStep].icon}
            <p className="text-center text-gray-600 dark:text-gray-400">
              {onboardingSteps[currentStep].description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              className={`px-4 py-2 border-2 border-black dark:border-white rounded-brutalist font-brutalist text-black dark:text-white transition-colors ${
                currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep
                      ? 'bg-black dark:bg-white'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-brutalist font-brutalist hover:bg-black/80 dark:hover:bg-white/80 transition-colors flex items-center gap-2"
            >
              {currentStep === onboardingSteps.length - 1 ? "Let's Go!" : "Next"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 