import { Facebook, Github, Linkedin, Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialLink {
  icon: typeof Facebook;
  label: string;
  href: string;
  placeholder: string;
  copyToClipboard?: boolean;
  copyValue?: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/mhmd.jbr.414935",
    placeholder: "https://www.facebook.com/mhmd.jbr.414935",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/MohamedGabr20233",
    placeholder: "https://github.com/MohamedGabr20233",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-gbr-222776278/",
    placeholder: "https://www.linkedin.com/in/mohamed-gbr-222776278/",
  },
  {
    icon: Mail,
    label: "Email",
    href: "#",
    placeholder: "mohamedgbr20233@gmail.com",
    copyToClipboard: true,
    copyValue: "mohamedgbr20233@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    href: "https://wa.me/201033058554",
    placeholder: "+20 103 3058 554",
  },
];

export function SocialLinks() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hire Me Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Want to <span className="text-primary">Hire Me</span>?
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">I'm available for freelance projects. Feel free to reach out through any of the channels below.</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((link) => {
            const handleClick = (e: React.MouseEvent) => {
              if (link.copyToClipboard && link.copyValue) {
                e.preventDefault();
                navigator.clipboard.writeText(link.copyValue);
                toast({
                  title: "Email copied successfully!",
                  description: link.copyValue,
                });
              }
            };

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.copyToClipboard ? undefined : "_blank"}
                rel={link.copyToClipboard ? undefined : "noopener noreferrer"}
                onClick={handleClick}
                className="flex items-center gap-3 px-5 py-3 bg-muted hover:bg-primary/10 rounded-xl transition-all duration-300 group border border-transparent hover:border-primary/30 cursor-pointer"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Laravel Server Documentation. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for the developer community</p>
        </div>
      </div>
    </footer>
  );
}
