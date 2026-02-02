"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { BentoCard } from "@/components/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { ContentCard } from "@/components/content-card";
import { InterestCard } from "@/components/interest-card";
import { Footer } from "@/components/footer";
import { Dumbbell, BookOpen, Activity, Mail, Headphones, Youtube, Podcast, Github, Smartphone, Play, DollarSign } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1d1d1f] tracking-[-0.02em] mb-6"
    >
      {children}
    </motion.h2>
  );
}

export default function Home() {
  const newsletterPlatforms = [
    { name: "Read Now", href: "https://www.gist-newsletter.com", icon: <Mail className="w-4 h-4" /> },
    { name: "Spotify", href: "https://open.spotify.com/show/0r6kYx2AC8yYwwygyi0R2G?si=mIsLYI5OQIW1qoIs27gGpA", icon: <Headphones className="w-4 h-4" /> },
    { name: "YouTube", href: "https://youtube.com/@gist-tech-newsletter?si=QpeEWIpQRz-SMBrH", icon: <Youtube className="w-4 h-4" /> },
    { name: "Apple", href: "https://podcasts.apple.com/us/podcast/gist/id1869418127", icon: <Podcast className="w-4 h-4" /> },
  ];

  const lifttrackLinks = [
    { name: "TestFlight", href: "https://testflight.apple.com/join/kaB6bdcu", icon: <Smartphone className="w-4 h-4" /> },
    { name: "GitHub", href: "https://github.com/nthiessenf", icon: <Github className="w-4 h-4" /> },
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
            
            {/* FrugalScan - Featured Project */}
            <BentoCard delay={0.1} className="w-full mb-5">
              <ProjectCard
                title="FrugalScan"
                description="AI-powered spending insights from your bank statements. Upload a PDF, get personalized analysis in 60 seconds—no account linking required. Built with Next.js, Claude API, and Recharts."
                icon={<DollarSign className="w-full h-full" />}
                videoUrl="/videos/frugalscan-demo.mp4"
                videoThumbnail="/images/frugalscan-thumbnail.png"
                links={[
                  { name: "Demo", href: "#watch-demo", icon: <Play className="w-4 h-4" /> },
                  { name: "Try It Now", href: "https://frugalscan.com", icon: <></> },
                  { name: "GitHub", href: "https://github.com/nthiessenf", icon: <Github className="w-4 h-4" /> },
                ]}
                href="https://frugalscan.com"
              />
            </BentoCard>

            {/* LiftTrack */}
            <BentoCard delay={0.2} className="w-full">
              <ProjectCard
                title="LiftTrack"
                description="An iOS local-first workout tracking app built with React Native. Features weekly goals, progress monitoring, and routine management to help you stay consistent."
                icon={<Dumbbell className="w-full h-full" />}
                videoThumbnail="/images/lifttrack-dual-screenshot.png"
                links={lifttrackLinks}
                href="https://testflight.apple.com/join/kaB6bdcu"
              />
            </BentoCard>
          </section>

          {/* What I'm Sharing Section */}
          <section className="py-10">
            <SectionTitle>What I'm Sharing.</SectionTitle>
            <BentoCard delay={0.1} className="w-full">
              <ContentCard
                title="Gist | Weekly Newsletter"
                description="Every week, one new trend or concept in frontier tech explained clearly—AI, chips, the forces reshaping the future. No jargon. No hype. So you're never the one nodding along."
                platforms={newsletterPlatforms}
                image="/images/gist-thumbnail.png"
                href="https://www.gist-newsletter.com"
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
                    "The Will of The Many — James Islington",
                    "The Origins of Efficiency — Brian Potter",
                    "Lenny's Newsletter — Lenny Rachitsky",
                  ]}
                  icon={<BookOpen className="w-full h-full" />}
                />
              </BentoCard>

              <BentoCard delay={0.2}>
                <InterestCard
                  title="Active Life"
                  items={[
                    "Jiu Jitsu — training for my next competition",
                    "Surfing — planning my next trip to Indonesia",
                    "Gym — staying young, one rep at a time",
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
