import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SectionProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  variant?: "default" | "warning" | "info";
}

export function Section({ id, title, icon: Icon, children, variant = "default" }: SectionProps) {
  const variantStyles = {
    default: "bg-card border-border",
    warning: "bg-yellow-500/10 border-yellow-500/30",
    info: "bg-primary/5 border-primary/20",
  };

  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <div className={`rounded-2xl border ${variantStyles[variant]} p-6 md:p-8`}>
        <div className="flex items-center gap-3 mb-6">
          {Icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}
