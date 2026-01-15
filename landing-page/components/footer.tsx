"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/nthiessenf", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/nthiessen/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:nthiessenf@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] mt-auto">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#86868b]">
            © 2025 Nikolas Thiessen
          </p>
          
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="group w-11 h-11 rounded-xl bg-white/70 backdrop-blur-sm border border-black/[0.04] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:border-[#93c5fd]/30 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06),0_4px_8px_rgba(147,197,253,0.1)]"
              >
                <Icon className="w-5 h-5 text-[#6e6e73] group-hover:text-[#1d1d1f] transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
