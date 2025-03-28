
import { ThemeToggle } from "./ThemeToggle";
import { WeatherWidget } from "./WeatherWidget";

export function Header() {
  return (
    <header className="pt-4 pb-2 border-b border-brutalist">
      <div className="container px-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-1">
          <h1 className="brutalist-header text-4xl md:text-5xl lg:text-6xl text-foreground font-brutalist">Dad News</h1>
          <p className="text-sm md:text-base font-brutalist-text mt-1 italic">NO NONSENSE NEWS, JUST HOW DAD LIKES IT</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 mt-2">
          <WeatherWidget />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
