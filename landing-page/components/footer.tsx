"use client";

import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "#",
    label: "Twitter",
  },
  {
    icon: <Github className="w-5 h-5" />,
    href: "#",
    label: "GitHub",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "#",
    label: "Email",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted">
            © {currentYear} Your Name. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  "w-11 h-11 rounded-xl",
                  "bg-[rgba(255,255,255,0.7)] backdrop-blur-[20px]",
                  "border border-[rgba(255,255,255,0.3)]",
                  "flex items-center justify-center",
                  "text-muted",
                  "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  "hover:translate-y-[-2px]",
                  "hover:bg-[rgba(255,255,255,0.9)]",
                  "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]",
                  "hover:text-foreground"
                )}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

