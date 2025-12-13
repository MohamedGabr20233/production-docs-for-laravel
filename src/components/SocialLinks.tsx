import { Facebook, Github, Linkedin, Mail, Phone } from "lucide-react";

interface SocialLink {
  icon: typeof Facebook;
  label: string;
  href: string;
  placeholder: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "#", // Replace with your Facebook URL
    placeholder: "facebook.com/yourprofile",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "#", // Replace with your GitHub URL
    placeholder: "github.com/yourprofile",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#", // Replace with your LinkedIn URL
    placeholder: "linkedin.com/in/yourprofile",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:your@email.com", // Replace with your email
    placeholder: "your@email.com",
  },
  {
    icon: Phone,
    label: "Phone",
    href: "tel:+1234567890", // Replace with your phone number
    placeholder: "+1 234 567 890",
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
          <p className="text-muted-foreground max-w-md mx-auto">
            I'm available for freelance projects. Feel free to reach out through any of the channels below.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-muted hover:bg-primary/10 rounded-xl transition-all duration-300 group border border-transparent hover:border-primary/30"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-foreground font-medium">{link.label}</span>
            </a>
          ))}
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
