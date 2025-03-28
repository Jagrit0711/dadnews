
import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the default mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowPrompt(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    // Check if the app is already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    if (isInstalled) {
      setShowPrompt(false);
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);
  
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We no longer need the prompt. Clear it up
    setDeferredPrompt(null);
    
    // Hide our install UI regardless of outcome
    setShowPrompt(false);
  };
  
  const dismissPrompt = () => {
    setShowPrompt(false);
  };
  
  if (!showPrompt) return null;
  
  return (
    <div className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-xs bg-background border-2 border-brutalist rounded-brutalist shadow-brutalist p-3 z-50 animate-float-up">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <Download className="h-5 w-5 mr-2 text-brutalist" />
          <h3 className="font-brutalist text-sm">Install Dad News</h3>
        </div>
        <button onClick={dismissPrompt} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs mb-3">Add Dad News to your home screen for the full dad experience!</p>
      <button 
        onClick={handleInstall}
        className="w-full py-2 px-4 bg-brutalist text-white font-brutalist text-sm rounded-brutalist hover:bg-brutalist/90 transition-colors"
      >
        INSTALL NOW
      </button>
    </div>
  );
}
