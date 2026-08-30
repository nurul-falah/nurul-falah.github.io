import React, { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PrayerTimesWidget } from "@/components/home/PrayerTimesWidget";
import { RoutineProgramSection } from "@/components/home/RoutineProgramSection";
import { LongTermProgramSection } from "@/components/home/LongTermProgramSection";
import { OrganizationSection } from "@/components/home/OrganizationSection";
import { Footer } from "@/components/layout/Footer";
import { InfaqModal } from "@/components/infaq/InfaqModal";
import { LayananModal } from "@/components/home/LayananModal";

export function App() {
  const [isInfaqOpen, setIsInfaqOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white font-sans antialiased">
      {/* 1. Top Bar */}
      <TopBar />

      {/* 2. Header Navigation Bar */}
      <Navbar onOpenInfaq={() => setIsInfaqOpen(true)} />

      {/* 3. Main Content Sections in Menu Order */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenInfaq={() => setIsInfaqOpen(true)} />

        {/* 1. Jadwal Sholat */}
        <PrayerTimesWidget />

        {/* 2. Program Rutin */}
        <RoutineProgramSection />

        {/* 3. Program Jangka Panjang */}
        <LongTermProgramSection
          onOpenWakaf={() => setIsInfaqOpen(true)}
          onOpenLayanan={() => setIsLayananOpen(true)}
        />

        {/* Layanan & Sekretariat */}
        <OrganizationSection />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Interactive Modals */}
      <InfaqModal open={isInfaqOpen} onOpenChange={setIsInfaqOpen} />
      <LayananModal open={isLayananOpen} onOpenChange={setIsLayananOpen} />
    </div>
  );
}

export default App;
