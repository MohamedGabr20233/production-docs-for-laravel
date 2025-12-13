import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Server, Github, Linkedin, Mail, Phone, Facebook } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectPhpVersion, selectAvailableVersions, setPhpVersion, PhpVersion } from "@/store/phpVersionSlice";

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

const contactLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/MohamedGabr20233",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-gbr-222776278/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/mhmd.jbr.414935",
  },
  {
    icon: Mail,
    label: "Email",
    href: "#",
    copyValue: "mohamedgbr20233@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    href: "https://wa.me/201033058554",
  },
];

// Custom Dropdown Component with animation
function CustomDropdown({
  trigger,
  children,
  align = "start",
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <div
        className={`absolute ${align === "end" ? "right-0" : "left-0"} mt-2 z-50 min-w-[12rem] overflow-hidden rounded-lg border border-border bg-popover shadow-lg transition-all duration-200 ease-out origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div onClick={() => setIsOpen(false)}>{children}</div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Get PHP version from Redux store
  const currentPhpVersion = useAppSelector(selectPhpVersion);
  const availableVersions = useAppSelector(selectAvailableVersions);

  // Check if on home page - handle both with and without trailing slash, and base path
  const pathname = location.pathname;
  const isHomePage = pathname === "/" || pathname === "" || pathname === "/shine-landing" || pathname === "/shine-landing/";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  // Fixed active state detection
  const isActive = (path: string) => {
    if (path === "/") {
      return isHomePage;
    }
    // Handle paths with or without base path
    return pathname === path || pathname === `/shine-landing${path}` || pathname.endsWith(path);
  };

  const handleEmailCopy = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    toast({
      title: "Email copied!",
      description: email,
    });
  };

  const handleVersionChange = (version: PhpVersion) => {
    dispatch(setPhpVersion(version));
    toast({
      title: `Switched to PHP ${version}`,
      description: "Documentation updated for this version.",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Version Dropdown */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground font-bold text-lg"
            >
              <Server className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline">Laravel Server Docs</span>
            </Link>

            {/* PHP Version Dropdown - Connected to Redux */}
            <CustomDropdown
              trigger={
                <Button variant="outline" size="sm" className="gap-1 h-8 px-2 text-xs cursor-pointer">
                  <span className="hidden sm:inline">PHP {currentPhpVersion}</span>
                  <span className="sm:hidden">{currentPhpVersion}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              }
            >
              <div className="p-1">
                <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                  PHP Version
                </p>
                {availableVersions.map((version) => (
                  <button
                    key={version}
                    onClick={() => handleVersionChange(version)}
                    className={`flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md transition-colors ${
                      currentPhpVersion === version
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    PHP {version}
                    {currentPhpVersion === version && (
                      <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                        active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </CustomDropdown>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isHomePage && (
              <CustomDropdown
                align="end"
                trigger={
                  <Button variant="ghost" className="gap-1 cursor-pointer">
                    Sections <ChevronDown className="h-4 w-4" />
                  </Button>
                }
              >
                <div className="p-1 max-h-[60vh] overflow-y-auto">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="flex items-center w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors text-left"
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </CustomDropdown>
            )}
            <Link to="/troubleshooting">
              <Button
                variant="ghost"
                className={
                  isActive("/troubleshooting")
                    ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20"
                    : "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/10"
                }
              >
                Have Error?
              </Button>
            </Link>
            <Link to="/commands">
              <Button
                variant="ghost"
                className={
                  isActive("/commands")
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : ""
                }
              >
                Useful Commands
              </Button>
            </Link>

            {/* Contact Me Dropdown */}
            <CustomDropdown
              align="end"
              trigger={
                <Button variant="ghost" className="gap-1 cursor-pointer text-primary">
                  Contact Me <ChevronDown className="h-4 w-4" />
                </Button>
              }
            >
              <div className="p-2 w-56">
                <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium mb-1">
                  Get in touch
                </p>
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.copyValue ? undefined : "_blank"}
                    rel={link.copyValue ? undefined : "noopener noreferrer"}
                    onClick={link.copyValue ? (e) => handleEmailCopy(e, link.copyValue!) : undefined}
                    className="flex items-center gap-3 w-full px-2 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                  >
                    <link.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </CustomDropdown>

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
      <div
        className={`md:hidden bg-background border-b border-border overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {/* Mobile PHP Version Selector - Connected to Redux */}
          <div className="pb-2 mb-2 border-b border-border">
            <p className="text-xs text-muted-foreground px-4 mb-2">PHP Version</p>
            {availableVersions.map((version) => (
              <button
                key={version}
                onClick={() => {
                  handleVersionChange(version);
                  setMobileOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors ${
                  currentPhpVersion === version
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>PHP {version}</span>
                {currentPhpVersion === version && (
                  <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                    active
                  </span>
                )}
              </button>
            ))}
          </div>

          {isHomePage && (
            <div className="pb-2 mb-2 border-b border-border">
              <p className="text-xs text-muted-foreground px-4 mb-2">Sections</p>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {section.label}
                </button>
              ))}
            </div>
          )}

          <Link
            to="/troubleshooting"
            onClick={() => setMobileOpen(false)}
            className={`block w-full text-left px-4 py-2 font-medium rounded-lg transition-colors ${
              isActive("/troubleshooting")
                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                : "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/10"
            }`}
          >
            Have Error?
          </Link>
          <Link
            to="/commands"
            onClick={() => setMobileOpen(false)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              isActive("/commands")
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted"
            }`}
          >
            Useful Commands
          </Link>

          {/* Mobile Contact Links */}
          <div className="pt-2 mt-2 border-t border-border">
            <p className="text-xs text-muted-foreground px-4 mb-2">Contact Me</p>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.copyValue ? undefined : "_blank"}
                rel={link.copyValue ? undefined : "noopener noreferrer"}
                onClick={(e) => {
                  if (link.copyValue) {
                    handleEmailCopy(e, link.copyValue);
                  }
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <link.icon className="h-4 w-4 text-primary" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
