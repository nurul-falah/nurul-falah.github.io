import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PrayerTimesWidget } from "@/components/home/PrayerTimesWidget";
import { PilarSection } from "@/components/home/PilarSection";
import { AdArtSection } from "@/components/home/AdArtSection";
import { AdArtPage } from "@/components/home/AdArtPage";
import { RoutineProgramSection } from "@/components/home/RoutineProgramSection";
import { LongTermProgramSection } from "@/components/home/LongTermProgramSection";
import { DesainMasjidSection } from "@/components/home/DesainMasjidSection";
import { WakafPembangunanSection } from "@/components/home/WakafPembangunanSection";
import { PendanaanSection } from "@/components/home/PendanaanSection";
import { TaskRecapSection } from "@/components/home/TaskRecapSection";
import { OrganizationSection } from "@/components/home/OrganizationSection";
import { Footer } from "@/components/layout/Footer";
import { InfaqModal } from "@/components/infaq/InfaqModal";
import { LayananModal } from "@/components/home/LayananModal";

function getCurrentRoute(): "home" | "ad-art" {
  if (typeof window === "undefined") return "home";
  const cleanPath = window.location.pathname.replace(/\/+$/, "");
  const params = new URLSearchParams(window.location.search);
  if (
    cleanPath === "/ad-art" ||
    params.get("page") === "ad-art" ||
    window.location.hash === "#ad-art-page"
  ) {
    return "ad-art";
  }
  return "home";
}

export function App() {
  const [isInfaqOpen, setIsInfaqOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [activePage, setActivePage] = useState<"home" | "ad-art">(getCurrentRoute);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getCurrentRoute());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigatePage = (page: "home" | "ad-art", hash?: string) => {
    setActivePage(page);
    if (page === "ad-art") {
      window.history.pushState({ page: "ad-art" }, "", "/ad-art");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetUrl = `/${hash || ""}`;
      window.history.pushState({ page: "home" }, "", targetUrl);
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white font-sans antialiased">
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenInfaq={() => setIsInfaqOpen(true)}
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
      />

      {/* 2. Main Content: Switch between /ad-art Page & Home Landing Page */}
      {activePage === "ad-art" ? (
        <main className="flex-1">
          <AdArtPage onBackToHome={() => handleNavigatePage("home")} />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection onOpenInfaq={() => setIsInfaqOpen(true)} />

          {/* 1. Jadwal Sholat */}
          <PrayerTimesWidget />

          {/* 2. 3 Pilar Nilai */}
          <PilarSection />

          {/* 2b. AD/ART Konstitusi Organisasi Preview & CTA */}
          <AdArtSection onOpenFullPage={() => handleNavigatePage("ad-art")} />

          {/* 3. Program Rutin */}
          <RoutineProgramSection />

          {/* 3. Program Jangka Panjang */}
          <LongTermProgramSection
            onOpenWakaf={() => setIsInfaqOpen(true)}
            onOpenLayanan={() => setIsLayananOpen(true)}
          />

          {/* 4. Desain Masjid */}
          <DesainMasjidSection />

          {/* 5. Wakaf Pembangunan */}
          <WakafPembangunanSection onOpenWakaf={() => setIsInfaqOpen(true)} />

          {/* 6. Skema Pendanaan */}
          <PendanaanSection onOpenWakaf={() => setIsInfaqOpen(true)} />

          {/* 7. Rekap Pelaksanaan Tugas */}
          <TaskRecapSection />

          {/* Layanan & Sekretariat */}
          <OrganizationSection />
        </main>
      )}

      {/* 3. Footer */}
      <Footer onNavigatePage={handleNavigatePage} />

      {/* 4. Interactive Modals */}
      <InfaqModal open={isInfaqOpen} onOpenChange={setIsInfaqOpen} />
      <LayananModal open={isLayananOpen} onOpenChange={setIsLayananOpen} />
    </div>
  );
}

export default App;
