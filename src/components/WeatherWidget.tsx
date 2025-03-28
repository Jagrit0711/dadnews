import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Sun, CloudSun, CloudRain, CloudSnow, CloudFog } from "lucide-react";

// Mock weather data and dad phrases
const weatherTypes = [
  { 
    type: "sunny", 
    icon: Sun, 
    phrases: [
      "Hot as a BBQ grill left on too long!",
      "Sunny enough to make your lawn beg for SPF 50!",
      "Perfect weather for telling the kids to go outside!",
    ] 
  },
  { 
    type: "cloudy", 
    icon: CloudSun, 
    phrases: [
      "Looks like the sky forgot to shave today!",
      "Partial clouds with a chance of dad jokes!",
      "Cloudy enough to justify watching the game inside!",
    ] 
  },
  { 
    type: "rainy", 
    icon: CloudRain, 
    phrases: [
      "It's raining cats and dogs... better than the wife's cooking!",
      "Perfect day to remind the kids how you walked to school in worse!",
      "Rain so heavy you might need to build an ark... or just complain about it!",
    ] 
  },
  { 
    type: "snowy", 
    icon: CloudSnow, 
    phrases: [
      "Snow day! Time to shovel the driveway while sighing loudly!",
      "Cold enough to make your jokes about winter even less funny!",
      "Snowing harder than when I had to walk uphill both ways!",
    ] 
  },
  { 
    type: "foggy", 
    icon: CloudFog, 
    phrases: [
      "Foggy enough to lose the TV remote in plain sight!",
      "Can't see a thing... reminds me of trying to find stuff in the fridge!",
      "Visibility lower than when I try to find something in the garage!",
    ] 
  }
];

export function WeatherWidget() {
  const [weather, setWeather] = useState<typeof weatherTypes[0]>(weatherTypes[0]);
  const [phrase, setPhrase] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(72);
  const [isCompact, setIsCompact] = useState(false);
  
  useEffect(() => {
    // Check if this widget is in the header (by checking parent elements)
    const isInHeader = document.querySelector('header .weather-widget') !== null;
    setIsCompact(isInHeader);
    
    // Simulate fetching weather data
    const randomIndex = Math.floor(Math.random() * weatherTypes.length);
    const selectedWeather = weatherTypes[randomIndex];
    setWeather(selectedWeather);
    
    // Select a random dad phrase
    const randomPhraseIndex = Math.floor(Math.random() * selectedWeather.phrases.length);
    setPhrase(selectedWeather.phrases[randomPhraseIndex]);
    
    // Random temperature between 30 and 95
    setTemperature(Math.floor(Math.random() * (95 - 30 + 1)) + 30);
  }, []);

  const WeatherIcon = weather.icon;

  // Compact version for header
  if (isCompact) {
    return (
      <div className="weather-widget flex items-center bg-card rounded-brutalist px-3 py-1 border border-brutalist">
        <WeatherIcon className="text-brutalist mr-2" size={18} />
        <span className="font-brutalist">{temperature}°F</span>
      </div>
    );
  }

  // Regular version for sidebar
  return (
    <Card className="weather-widget p-4 rounded-brutalist border-2 border-brutalist shadow-brutalist bg-gradient-to-b from-card to-secondary/80">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-brutalist text-xl">Dad Weather Report</h3>
        <WeatherIcon className="text-brutalist" size={28} />
      </div>
      
      <div className="flex items-end mb-2">
        <span className="text-3xl font-brutalist">{temperature}°F</span>
        <span className="ml-2 text-sm text-muted-foreground capitalize">{weather.type}</span>
      </div>
      
      <p className="text-sm italic border-t border-brutalist/20 pt-2 dad-ai-message">
        "{phrase}"
      </p>
    </Card>
  );
}
