
import React, { useState } from "react";
import { Home, Search, History, User } from "lucide-react";
import { Link } from "react-router-dom";
import { DadAvatar } from "./DadAvatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavLink = ({ to, icon, label, isActive, onClick }: NavLinkProps) => (
  <Link
    to={to}
    className={`nav-link ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </Link>
);

export function Navigation() {
  const [activeLink, setActiveLink] = useState("home");
  const isMobile = useIsMobile();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dadMood, setDadMood] = useState<"happy" | "sad" | "neutral">("neutral");

  const handleNavClick = (link: string) => {
    setActiveLink(link);
    if (link === "dad") {
      setDadMood("happy");
      setTimeout(() => setDadMood("neutral"), 2000);
    } else {
      // Random chance of dad getting sad if not clicked
      if (Math.random() > 0.7) {
        setDadMood("sad");
        setTimeout(() => setDadMood("neutral"), 2000);
      }
    }
  };

  // Desktop navigation
  const desktopNav = (
    <nav className="hidden sm:flex space-x-6 pb-4 pt-2 px-6 border-b">
      <NavLink
        to="/"
        icon={<Home className="h-5 w-5" />}
        label="Home"
        isActive={activeLink === "home"}
        onClick={() => handleNavClick("home")}
      />
      <NavLink
        to="/search"
        icon={<Search className="h-5 w-5" />}
        label="Search"
        isActive={activeLink === "search"}
        onClick={() => handleNavClick("search")}
      />
      <div className="flex-1 flex justify-center">
        <div 
          className="avatar-container group cursor-pointer" 
          onClick={() => handleNavClick("dad")}
        >
          <div className="avatar-bubble">
            Click me to see top headlines!
          </div>
          <div className="dad-animated-face">
            <div className="dad-avatar-eyes">
              <div className="dad-avatar-eye"></div>
              <div className="dad-avatar-eye"></div>
            </div>
            <div className={`dad-avatar-mouth ${dadMood}`}></div>
          </div>
        </div>
      </div>
      <NavLink
        to="/history"
        icon={<History className="h-5 w-5" />}
        label="History"
        isActive={activeLink === "history"}
        onClick={() => handleNavClick("history")}
      />
      <NavLink
        to="/account"
        icon={<User className="h-5 w-5" />}
        label="Account"
        isActive={activeLink === "account"}
        onClick={() => handleNavClick("account")}
      />
    </nav>
  );

  // Mobile navigation (bottom bar)
  const mobileNav = (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        icon={<Home className="h-5 w-5" />}
        label="Home"
        isActive={activeLink === "home"}
        onClick={() => handleNavClick("home")}
      />
      <NavLink
        to="/search"
        icon={<Search className="h-5 w-5" />}
        label="Search"
        isActive={activeLink === "search"}
        onClick={() => handleNavClick("search")}
      />
      <div 
        className="avatar-container group cursor-pointer" 
        onClick={() => handleNavClick("dad")}
      >
        <div className="dad-animated-face">
          <div className="dad-avatar-eyes">
            <div className="dad-avatar-eye"></div>
            <div className="dad-avatar-eye"></div>
          </div>
          <div className={`dad-avatar-mouth ${dadMood}`}></div>
        </div>
      </div>
      <NavLink
        to="/history"
        icon={<History className="h-5 w-5" />}
        label="History"
        isActive={activeLink === "history"}
        onClick={() => handleNavClick("history")}
      />
      <NavLink
        to="/account"
        icon={<User className="h-5 w-5" />}
        label="Account"
        isActive={activeLink === "account"}
        onClick={() => handleNavClick("account")}
      />
    </nav>
  );

  return (
    <>
      {desktopNav}
      {mobileNav}
    </>
  );
}
