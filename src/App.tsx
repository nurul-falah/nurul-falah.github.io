import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PrayerTimesWidget } from "@/components/home/PrayerTimesWidget";
import { PilarSection } from "@/components/home/PilarSection";
import { AdArtSection } from "@/components/home/AdArtSection";
import { AdArtPage } from "@/components/home/AdArtPage";
import { HistoryPage } from "@/components/history/HistoryPage";
import { CaraBerdonasiPage } from "@/components/donate/CaraBerdonasiPage";
import { ProgramMasjidPage } from "@/components/program/ProgramMasjidPage";
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
import { useI18n } from "@/i18n/LanguageProvider";

const STANDALONE_PAGES = new Set(["/ad-art", "/history", "/program-masjid", "/cara-berdonasi"]);

function isStandalonePage(path: string): boolean {
  return STANDALONE_PAGES.has(path);
}

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

function resolveNavTarget(targetPath: string): { path: string; hash: string } {
  let raw = targetPath || "/";
  let hash = "";
  const hashAt = raw.indexOf("#");
  if (hashAt > 0) {
    hash = raw.slice(hashAt);
    raw = raw.slice(0, hashAt) || "/";
  }

  if (raw === "#beranda" || raw === "") {
    return { path: "/", hash: "" };
  }
  if (raw.startsWith("#")) {
    const matched = Object.keys(SECTION_PATH_MAP).find((key) => SECTION_PATH_MAP[key] === raw);
    return { path: matched || `/${raw.slice(1)}`, hash: "" };
  }
  return { path: raw, hash };
}

function getInitialPath(): string {
  if (typeof window === "undefined") return "/";
  const params = new URLSearchParams(window.location.search);
  if (params.get("page") === "ad-art" || window.location.hash === "#ad-art-page") {
    return "/ad-art";
  }
  const cleaned = window.location.pathname.replace(/\/+$/, "");
  return cleaned === "" ? "/" : cleaned;
}

function hashElementId(): string {
  const raw = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function scrollStandalonePage(path: string) {
  if (path !== "/program-masjid") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = hashElementId();
  setTimeout(() => {
    const el = id ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 60);
}

function scrollToSectionByPath(path: string) {
  if (!path || path === "/" || path === "#beranda") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const selector = path.startsWith("#")
    ? path
    : SECTION_PATH_MAP[path] || `#${path.replace(/^\/+/, "")}`;

  const started = performance.now();
  const attempt = () => {
    const el = document.querySelector(selector);
    if (el) {
      const distance = Math.abs(el.getBoundingClientRect().top);
      el.scrollIntoView({
        behavior: distance > window.innerHeight ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    if (performance.now() - started < 800) {
      window.setTimeout(attempt, 50);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.setTimeout(attempt, 60);
}

export function App() {
  const { tx } = useI18n();
  const [isInfaqOpen, setIsInfaqOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  // Handle initial load for direct route visits (/pilar, /desain-masjid, etc.) or legacy hashes
  useEffect(() => {
    if (isStandalonePage(currentPath)) {
      scrollStandalonePage(currentPath);
      return;
    }
    if (
      currentPath !== "/" &&
      SECTION_PATH_MAP[currentPath] &&
      window.location.hash &&
      window.location.hash !== SECTION_PATH_MAP[currentPath]
    ) {
      scrollToSectionByPath(window.location.hash);
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
      if (isStandalonePage(path)) {
        scrollStandalonePage(path);
      } else {
        scrollToSectionByPath(window.location.hash || path);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = useCallback((targetPath: string) => {
    const { path, hash } = resolveNavTarget(targetPath);
    setCurrentPath(path);
    window.history.pushState({ path }, "", hash ? `${path}${hash}` : path);

    if (isStandalonePage(path)) {
      scrollStandalonePage(path);
    } else {
      scrollToSectionByPath(hash || path);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white font-sans antialiased">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:bg-white focus:text-emerald-900 focus:px-3 focus:py-2 focus:rounded-lg"
      >
        {tx("Lewati ke konten")}
      </a>
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenInfaq={() => setIsInfaqOpen(true)}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Content: Switch between standalone pages and the home landing page */}
      {currentPath === "/ad-art" ? (
        <main id="konten" className="flex-1">
          <AdArtPage onBackToHome={() => handleNavigate("/")} />
        </main>
      ) : currentPath === "/history" ? (
        <main id="konten" className="flex-1">
          <HistoryPage onBackToHome={() => handleNavigate("/")} />
        </main>
      ) : currentPath === "/program-masjid" ? (
        <main id="konten" className="flex-1">
          <ProgramMasjidPage onNavigate={handleNavigate} />
        </main>
      ) : currentPath === "/cara-berdonasi" ? (
        <main id="konten" className="flex-1">
          <CaraBerdonasiPage
            onBackToHome={() => handleNavigate("/")}
            onNavigate={handleNavigate}
          />
        </main>
      ) : (
        <main id="konten" className="flex-1">
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

          {/* 2c. Struktur Organisasi DKM */}
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
          <WakafPembangunanSection
            onOpenWakaf={() => setIsInfaqOpen(true)}
            onNavigate={handleNavigate}
          />

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
      <InfaqModal
        open={isInfaqOpen}
        onOpenChange={setIsInfaqOpen}
        onShowGuide={() => {
          setIsInfaqOpen(false);
          handleNavigate("/cara-berdonasi");
        }}
      />
      <LayananModal open={isLayananOpen} onOpenChange={setIsLayananOpen} />
    </div>
  );
}

export default App;
