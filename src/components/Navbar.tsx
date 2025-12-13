import { useState } from "react";
import { Menu, X, ChevronDown, Server } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sections = [
  { id: "notes", label: "Important Notes" },
  { id: "login", label: "Server Login" },
  { id: "nginx", label: "Install Nginx" },
  { id: "php", label: "PHP Installation" },
  { id: "mysql", label: "MySQL Setup" },
  { id: "composer", label: "Composer" },
  { id: "github", label: "GitHub Connection" },
  { id: "laravel", label: "Laravel Setup" },
  { id: "domain", label: "Domain & DNS" },
  { id: "ssl", label: "SSL Certificates" },
  { id: "final", label: "Final Steps" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-foreground font-bold text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Server className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Laravel Server Docs</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Sections <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                {sections.map((section) => (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="cursor-pointer"
                  >
                    {section.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {section.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 text-primary font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
