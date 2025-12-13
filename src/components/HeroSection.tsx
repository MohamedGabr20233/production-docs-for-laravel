import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { selectPhpVersion } from "@/store/phpVersionSlice";

export function HeroSection() {
  const phpVersion = useSelector(selectPhpVersion);
  const scrollToContent = () => {
    const element = document.getElementById("notes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-start))] via-[hsl(var(--hero-mid))] to-[hsl(var(--hero-end))] animate-gradient" />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.2) 0%, transparent 50%)`,
        }} />
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Produce Your Laravel Project Into{" "}
          <span className="gradient-text">Production Server</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/80 mb-4">
          Complete step-by-step documentation for deploying Laravel applications
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm text-white/60 mb-12">
          <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">PHP {phpVersion}</span>
          <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">Composer 2.9.2</span>
          <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">Nginx</span>
          <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">MySQL</span>
          <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">Let's Encrypt SSL</span>
        </div>

        <button
          onClick={scrollToContent}
          className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-sm mb-2">Start Reading</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
