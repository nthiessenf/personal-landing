"use client";

import { Hero } from "@/components/hero";
import { BentoGrid, BentoCard } from "@/components/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { InterestCard } from "@/components/interest-card";
import { Footer } from "@/components/footer";
import { Smartphone, Mail, Mic, BookOpen, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="relative z-10 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Hero />

          <section className="pb-24">
            <BentoGrid>
              <BentoCard colSpan={2} delay={0.1}>
                <ProjectCard
                  title="Mobile App"
                  description="A beautifully crafted mobile experience that puts users first. Built with React Native and focused on performance."
                  link="https://example.com"
                  icon={<Smartphone className="w-full h-full" />}
                  image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
                  label="Featured Project"
                />
              </BentoCard>

              <BentoCard delay={0.2}>
                <ProjectCard
                  title="Weekly Insights"
                  description="Every Sunday, thoughts on building, design, and life. Join 1,000+ readers."
                  link="https://example.com/newsletter"
                  icon={<Mail className="w-full h-full" />}
                  label="Subscribe"
                />
              </BentoCard>

              <BentoCard delay={0.3}>
                <ProjectCard
                  title="The Podcast"
                  description="Conversations with makers and creators who are shaping the future."
                  link="https://example.com/podcast"
                  icon={<Mic className="w-full h-full" />}
                  label="Listen"
                />
              </BentoCard>

              <BentoCard delay={0.4}>
                <InterestCard
                  title="Currently Reading"
                  items={[
                    "The Design of Everyday Things",
                    "Atomic Habits",
                    "Range by David Epstein",
                  ]}
                  icon={<BookOpen className="w-full h-full" />}
                  label="Reading"
                />
              </BentoCard>

              <BentoCard delay={0.5}>
                <InterestCard
                  title="Active Life"
                  items={[
                    "Running 5K three times a week",
                    "Tennis on weekends",
                    "Cycling through the city",
                  ]}
                  icon={<Activity className="w-full h-full" />}
                  label="Active"
                />
              </BentoCard>
            </BentoGrid>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
