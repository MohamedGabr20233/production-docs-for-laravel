import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DocumentationContent } from "@/components/DocumentationContent";
import { SocialLinks } from "@/components/SocialLinks";

const Index = () => {
  return (
    <ThemeProvider>
      <Helmet>
        <title>Laravel Server Deployment Guide | Production Setup Documentation</title>
        <meta
          name="description"
          content="Complete step-by-step guide to deploy your Laravel project to a production server. Covers PHP 8.3, Nginx, MySQL, Composer, SSL, and more."
        />
        <meta
          name="keywords"
          content="Laravel, deployment, production server, PHP 8.3, Nginx, MySQL, SSL, Let's Encrypt, Composer"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <DocumentationContent />
        </main>
        <SocialLinks />
      </div>
    </ThemeProvider>
  );
};

export default Index;