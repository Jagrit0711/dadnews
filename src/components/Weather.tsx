import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Loader2, CloudFog, Wind } from 'lucide-react';

interface WeatherData {
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        // First, get the user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 0,
          });
        });

        const { latitude, longitude } = position.coords;

        // Then fetch weather data with more parameters
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=09aca584b324b71dc075abfb85e0857b&units=metric&lang=en`
        );

        if (!response.ok) {
          throw new Error('Weather data not available');
        }

        const data = await response.json();

        setWeather({
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          wind_speed: Math.round(data.wind.speed),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    getWeather();

    // Refresh weather data every 10 minutes
    const interval = setInterval(getWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    // Enhanced icon mapping based on OpenWeatherMap codes
    const iconMap: { [key: string]: JSX.Element } = {
      '01d': <Sun className="w-5 h-5" />, // clear sky day
      '01n': <Sun className="w-5 h-5" />, // clear sky night
      '02d': <Cloud className="w-5 h-5" />, // few clouds day
      '02n': <Cloud className="w-5 h-5" />, // few clouds night
      '03d': <Cloud className="w-5 h-5" />, // scattered clouds
      '03n': <Cloud className="w-5 h-5" />, // scattered clouds
      '04d': <Cloud className="w-5 h-5" />, // broken clouds
      '04n': <Cloud className="w-5 h-5" />, // broken clouds
      '09d': <CloudRain className="w-5 h-5" />, // shower rain
      '09n': <CloudRain className="w-5 h-5" />, // shower rain
      '10d': <CloudRain className="w-5 h-5" />, // rain
      '10n': <CloudRain className="w-5 h-5" />, // rain
      '11d': <CloudLightning className="w-5 h-5" />, // thunderstorm
      '11n': <CloudLightning className="w-5 h-5" />, // thunderstorm
      '13d': <CloudSnow className="w-5 h-5" />, // snow
      '13n': <CloudSnow className="w-5 h-5" />, // snow
      '50d': <CloudFog className="w-5 h-5" />, // mist
      '50n': <CloudFog className="w-5 h-5" />, // mist
    };

    return iconMap[iconCode] || <Cloud className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-black dark:text-white">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading weather...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-black dark:text-white">
        <Cloud className="w-5 h-5" />
        <span>--°C</span>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-black dark:text-white group relative">
      <div className="flex items-center gap-2">
        {weather.icon && getWeatherIcon(weather.icon)}
        <span className="font-brutalist">{weather.temp}°C</span>
      </div>
      
      {/* Tooltip with additional weather info */}
      <div className="absolute hidden group-hover:block top-full mt-2 p-3 bg-white dark:bg-black border-2 border-black dark:border-white rounded-brutalist shadow-brutalist z-50 min-w-[200px]">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Feels like:</span>
            <span className="font-brutalist">{weather.feels_like}°C</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Humidity:</span>
            <span className="font-brutalist">{weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Wind:</span>
            <span className="font-brutalist">{weather.wind_speed} m/s</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Condition:</span>
            <span className="font-brutalist capitalize">{weather.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 