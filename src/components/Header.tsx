
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="pt-8 pb-4">
      <div className="container flex justify-between items-center">
        <h1 className="brutalist-header">Dad News</h1>
        <ThemeToggle />
      </div>
      <div className="container mt-2 h-1 bg-brutalist"></div>
    </header>
  );
}
