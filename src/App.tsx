import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PrayerTimesWidget } from "@/components/home/PrayerTimesWidget";
import { PilarSection } from "@/components/home/PilarSection";
import { AdArtSection } from "@/components/home/AdArtSection";
import { AdArtPage } from "@/components/home/AdArtPage";
import { HistoryPage } from "@/components/history/HistoryPage";
import { RoutineProgramSection } from "@/components/home/RoutineProgramSection";
import { LongTermProgramSection } from "@/components/home/LongTermProgramSection";
import { DesainMasjidSection } from "@/components/home/DesainMasjidSection";
import { WakafPembangunanSection } from "@/components/home/WakafPembangunanSection";
import { PendanaanSection } from "@/components/home/PendanaanSection";
import { TaskRecapSection } from "@/components/home/TaskRecapSection";
import { OrganizationSection } from "@/components/home/OrganizationSection";
import { StrukturOrganisasiSection } from "@/components/home/StrukturOrganisasiSection";
import { Footer } from "@/components/layout/Footer";
import { InfaqModal } from "@/components/infaq/InfaqModal";
import { LayananModal } from "@/components/home/LayananModal";

const SECTION_PATH_MAP: Record<string, string> = {
  "/pilar": "#pilar",
  "/jadwal": "#jadwal",
  "/program": "#program",
  "/program-panjang": "#program-panjang",
  "/desain-masjid": "#desain-masjid",
  "/wakaf-pembangunan": "#wakaf-pembangunan",
  "/pendanaan": "#pendanaan",
  "/rekap-tugas": "#rekap-tugas",
  "/struktur-organisasi": "#struktur-organisasi",
};

function getInitialPath(): string {
  if (typeof window === "undefined") return "/";
  const params = new URLSearchParams(window.location.search);
  if (params.get("page") === "ad-art" || window.location.hash === "#ad-art-page") {
    return "/ad-art";
  }
  const cleaned = window.location.pathname.replace(/\/+$/, "");
  return cleaned === "" ? "/" : cleaned;
}

function scrollToSectionByPath(path: string) {
  if (!path || path === "/" || path === "#beranda") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const selector = path.startsWith("#")
    ? path
    : SECTION_PATH_MAP[path] || `#${path.replace(/^\/+/, "")}`;

  setTimeout(() => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 60);
}

export function App() {
  const [isInfaqOpen, setIsInfaqOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  // Handle initial load for direct route visits (/pilar, /desain-masjid, etc.) or legacy hashes
  useEffect(() => {
    if (currentPath === "/ad-art" || currentPath === "/history") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (currentPath !== "/" && SECTION_PATH_MAP[currentPath]) {
      scrollToSectionByPath(currentPath);
    } else if (window.location.hash) {
      const hash = window.location.hash;
      const matchingPath = Object.keys(SECTION_PATH_MAP).find(
        (k) => SECTION_PATH_MAP[k] === hash
      );
      if (matchingPath) {
        window.history.replaceState({}, "", matchingPath);
        setCurrentPath(matchingPath);
      }
      scrollToSectionByPath(hash);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = getInitialPath();
      setCurrentPath(path);
      if (path === "/ad-art" || path === "/history") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToSectionByPath(window.location.hash || path);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = useCallback((targetPath: string) => {
    let cleanTarget = targetPath || "/";
    if (cleanTarget === "#beranda") {
      cleanTarget = "/";
    } else if (cleanTarget.startsWith("#")) {
      const matched = Object.keys(SECTION_PATH_MAP).find(
        (k) => SECTION_PATH_MAP[k] === cleanTarget
      );
      cleanTarget = matched || `/${cleanTarget.slice(1)}`;
    }

    setCurrentPath(cleanTarget);
    window.history.pushState({ path: cleanTarget }, "", cleanTarget);

    if (cleanTarget === "/ad-art" || cleanTarget === "/history") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToSectionByPath(cleanTarget);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white font-sans antialiased">
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenInfaq={() => setIsInfaqOpen(true)}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Content: Switch between Pages (/ad-art, /history) & Home Landing Page */}
      {currentPath === "/ad-art" ? (
        <main className="flex-1">
          <AdArtPage onBackToHome={() => handleNavigate("/")} />
        </main>
      ) : currentPath === "/history" ? (
        <main className="flex-1">
          <HistoryPage onBackToHome={() => handleNavigate("/")} />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onOpenInfaq={() => setIsInfaqOpen(true)}
            onNavigate={handleNavigate}
          />

          {/* 1. Jadwal Shalat */}
          <PrayerTimesWidget />

          {/* 2. 3 Pilar Nilai */}
          <PilarSection />

          {/* 2b. AD/ART Konstitusi Organisasi Preview & CTA */}
          <AdArtSection onOpenFullPage={() => handleNavigate("/ad-art")} />

          {/* 2c. Struktur Organisasi DKM & RKM */}
          <StrukturOrganisasiSection onOpenAdArt={() => handleNavigate("/ad-art")} />

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
          <TaskRecapSection defaultOpen={currentPath === "/rekap-tugas"} />

          {/* Layanan & Sekretariat */}
          <OrganizationSection />
        </main>
      )}

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Interactive Modals */}
      <InfaqModal open={isInfaqOpen} onOpenChange={setIsInfaqOpen} />
      <LayananModal open={isLayananOpen} onOpenChange={setIsLayananOpen} />
    </div>
  );
}

export default App;
