"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { BentoCard } from "@/components/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { ContentCard } from "@/components/content-card";
import { InterestCard } from "@/components/interest-card";
import { Footer } from "@/components/footer";
import { Smartphone, BookOpen, Activity, Mail, Headphones, Youtube, Podcast } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1d1d1f] tracking-[-0.02em] mb-6"
    >
      {children}
    </motion.h2>
  );
}

export default function Home() {
  const platforms = [
    { name: "Subscribe", href: "https://example.com/newsletter", icon: <Mail className="w-4 h-4" /> },
    { name: "Spotify", href: "https://spotify.com", icon: <Headphones className="w-4 h-4" /> },
    { name: "YouTube", href: "https://youtube.com", icon: <Youtube className="w-4 h-4" /> },
    { name: "Apple", href: "https://podcasts.apple.com", icon: <Podcast className="w-4 h-4" /> },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="relative z-10 flex-1">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Hero Section */}
          <Hero />

          {/* What I'm Building Section */}
          <section className="py-10">
            <SectionTitle>What I'm Building.</SectionTitle>
            <BentoCard delay={0.1} className="w-full">
              <ProjectCard
                title="Mobile App"
                description="A beautifully crafted mobile experience that puts users first. Built with React Native and focused on performance."
                link="https://example.com"
                icon={<Smartphone className="w-full h-full" />}
                image="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop"
              />
            </BentoCard>
          </section>

          {/* What I'm Sharing Section */}
          <section className="py-10">
            <SectionTitle>What I'm Sharing.</SectionTitle>
            <BentoCard delay={0.1} className="w-full">
              <ContentCard
                title="Weekly Insights"
                description="Every Sunday, I share thoughts on building, design, and life. Available as a newsletter or podcast on your favorite platform."
                platforms={platforms}
                image="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&h=600&fit=crop"
              />
            </BentoCard>
          </section>

          {/* What I'm Into Section */}
          <section className="py-10 pb-20">
            <SectionTitle>What I'm Into.</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <BentoCard delay={0.1}>
                <InterestCard
                  title="Currently Reading"
                  items={[
                    "The Design of Everyday Things",
                    "Atomic Habits",
                    "Range by David Epstein",
                  ]}
                  icon={<BookOpen className="w-full h-full" />}
                />
              </BentoCard>

              <BentoCard delay={0.2}>
                <InterestCard
                  title="Active Life"
                  items={[
                    "Running 5K three times a week",
                    "Tennis on weekends",
                    "Cycling through the city",
                  ]}
                  icon={<Activity className="w-full h-full" />}
                />
              </BentoCard>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
