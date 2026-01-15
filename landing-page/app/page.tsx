"use client";

import { Hero } from "@/components/hero";
import { BentoGrid, BentoCard } from "@/components/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { InterestCard } from "@/components/interest-card";
import { Footer } from "@/components/footer";
import { Smartphone, Mail, Radio, BookOpen, Dumbbell } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background gradient */}
      <div className="background-gradient" />

      {/* Main content */}
      <main className="relative z-10 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <Hero />

          {/* Bento Grid */}
          <div className="py-16">
            <BentoGrid>
              {/* Mobile App - Large card (col-span-2) */}
              <BentoCard colSpan={2} delay={0.1}>
                <ProjectCard
                  title="Mobile App"
                  description="A beautiful mobile application built with React Native. Features modern UI/UX design, smooth animations, and seamless user experience."
                  link="https://example.com"
                  icon={<Smartphone />}
                  image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
                />
              </BentoCard>

              {/* Newsletter */}
              <BentoCard delay={0.2}>
                <ProjectCard
                  title="Newsletter"
                  description="Weekly insights on technology, design, and productivity. Join thousands of subscribers."
                  link="https://example.com/newsletter"
                  icon={<Mail />}
                />
              </BentoCard>

              {/* Podcast */}
              <BentoCard delay={0.3}>
                <ProjectCard
                  title="Podcast"
                  description="Conversations with industry leaders about their journey, insights, and lessons learned."
                  link="https://example.com/podcast"
                  icon={<Radio />}
                />
              </BentoCard>

              {/* Reading List */}
              <BentoCard delay={0.4}>
                <InterestCard
                  title="Reading List"
                  items={[
                    "The Design of Everyday Things",
                    "Atomic Habits",
                    "The Pragmatic Programmer",
                  ]}
                  icon={<BookOpen />}
                />
              </BentoCard>

              {/* Sports/Activities */}
              <BentoCard delay={0.5}>
                <InterestCard
                  title="Sports & Activities"
                  items={["Running", "Cycling", "Rock Climbing"]}
                  icon={<Dumbbell />}
                />
              </BentoCard>
            </BentoGrid>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
