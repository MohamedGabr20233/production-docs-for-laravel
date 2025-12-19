import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { SocialLinks } from "@/components/SocialLinks";
import { Bell, ChevronDown, ChevronRight, Home, Mail } from "lucide-react";
import { IntegrationProvider, useIntegrationSections } from "@/contexts/IntegrationContext";

// Left sidebar navigation - simple list
const integrationTabs = [
  {
    id: "introduction",
    label: "Introduction",
    path: "/integration",
    icon: Home,
  },
  {
    id: "notifications",
    label: "Notifications",
    path: "/integration/notifications",
    icon: Bell,
  },
  // Future integrations:
  // { id: "email", label: "Email", path: "/integration/email", icon: Mail },
];

function IntegrationLayoutContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const { sections, sectionGroups } = useIntegrationSections();

  // Check if on main integration page (introduction)
  const isIntegrationHome = location.pathname === "/integration" ||
                            location.pathname === "/integration/";

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Initialize all groups as expanded
  useEffect(() => {
    if (sectionGroups.length > 0) {
      setExpandedGroups(new Set(sectionGroups.map(g => g.id)));
    }
  }, [sectionGroups]);

  // Toggle group expansion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <ThemeProvider>
      <Helmet>
        <title>Integration - Laravel Server Docs</title>
        <meta
          name="description"
          content="Integration guides for Laravel including notifications, email, and more. Updated documentation with modern best practices."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Simple Navigation */}
              <aside className="lg:w-48 flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <nav className="space-y-1">
                    {integrationTabs.map((tab) => {
                      const isActive = tab.id === "introduction"
                        ? isIntegrationHome
                        : location.pathname.includes(tab.path) && tab.path !== "/integration";
                      const Icon = tab.icon;

                      return (
                        <Link
                          key={tab.id}
                          to={tab.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {tab.label}
                        </Link>
                      );
                    })}

                    {/* Coming Soon */}
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted">Soon</span>
                    </div>
                  </nav>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {isIntegrationHome ? (
                  <IntegrationIntro />
                ) : (
                  <Outlet />
                )}
              </div>

              {/* Right Sidebar - Dropdown Sections */}
              {sectionGroups.length > 0 && !isIntegrationHome && (
                <aside className="hidden xl:block w-56 flex-shrink-0">
                  <div className="sticky top-24">
                    <p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      On this page
                    </p>
                    <nav className="space-y-1">
                      {sectionGroups.map((group) => {
                        const isExpanded = expandedGroups.has(group.id);
                        const hasActiveSection = group.sections.some(s => s.id === activeSection);

                        return (
                          <div key={group.id}>
                            {/* Group Header */}
                            <button
                              onClick={() => toggleGroup(group.id)}
                              className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded transition-colors ${
                                hasActiveSection
                                  ? "text-primary font-medium"
                                  : "text-foreground hover:bg-muted"
                              }`}
                            >
                              <span>{group.label}</span>
                              <ChevronDown
                                className={`h-4 w-4 text-muted-foreground transition-transform ${
                                  isExpanded ? "" : "-rotate-90"
                                }`}
                              />
                            </button>

                            {/* Group Items */}
                            {isExpanded && (
                              <div className="ml-2 pl-2 border-l border-border space-y-0.5">
                                {group.sections.map((section) => (
                                  <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                                      activeSection === section.id
                                        ? "text-primary bg-primary/5"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                  >
                                    {section.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </nav>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </main>

        <SocialLinks />
      </div>
    </ThemeProvider>
  );
}

// Integration Introduction Component
function IntegrationIntro() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Laravel Integrations
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Comprehensive guides for integrating essential services into your Laravel application.
            Including push notifications, email services, and more.
          </p>

          {/* Updated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Updated: {today}
            </span>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Why Updated Docs Matter */}
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6">
        <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
          Why Up-to-Date Documentation Matters
        </h2>
        <p className="text-muted-foreground mb-4">
          Many Laravel integration tutorials online are <strong className="text-foreground">outdated</strong> and
          recommend installing unnecessary packages or using deprecated methods.
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">&#10005;</span>
            <span>Version conflicts and dependency issues</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">&#10005;</span>
            <span>Security vulnerabilities from unmaintained packages</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">&#10005;</span>
            <span>Wasted time debugging deprecated code</span>
          </li>
        </ul>
      </div>

      {/* Available Integrations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Available Integrations</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Notifications Card */}
          <Link
            to="/integration/notifications"
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Push Notifications
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Firebase Cloud Messaging (FCM) setup with Laravel.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">Firebase</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">Laravel</span>
                </div>
              </div>
            </div>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Coming Soon Card */}
          <div className="relative overflow-hidden rounded-xl border border-dashed border-border bg-card/50 p-6 opacity-60">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-muted p-3">
                <Mail className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-muted-foreground">
                  Email Services
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure email sending with various providers.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export wraps the layout content with the context provider
export function IntegrationLayout() {
  return (
    <IntegrationProvider>
      <IntegrationLayoutContent />
    </IntegrationProvider>
  );
}

export default IntegrationLayout;
