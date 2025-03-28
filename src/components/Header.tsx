
import { ThemeToggle } from "./ThemeToggle";
import { WeatherWidget } from "./WeatherWidget";

export function Header() {
  return (
    <header className="pt-8 pb-4">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="brutalist-header text-foreground">Dad News</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <WeatherWidget />
          <ThemeToggle />
        </div>
      </div>
      <div className="container mt-2 h-1 bg-brutalist"></div>
    </header>
  );
}
