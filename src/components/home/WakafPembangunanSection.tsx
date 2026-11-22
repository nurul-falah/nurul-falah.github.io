import React, { useState, useEffect } from "react";
import {
  HeartHandshake,
  Landmark,
  Copy,
  Check,
  MessageCircle,
  Target,
  TrendingUp,
  Hammer,
  FileText,
  MapPin,
  Building2,
  Users,
  Maximize2,
  Droplets,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  CircleDot,
  Calendar,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Play,
} from "lucide-react";
import masjidData from "@/data/masjid.json";
import tahap1UditchPhoto from "@/assets/construction/tahap-1-pembuatan-uditch.jpg";
import tahap1Photo from "@/assets/construction/tahap-1-saluran-sanitasi.jpg";
import tahap1InstalasiLanjutanPhoto from "@/assets/construction/tahap-1-instalasi-lanjutan.jpg";
import tahap1HasilInstalasiPhoto from "@/assets/construction/tahap-1-hasil-instalasi.jpg";
import tahap1JembatanPhoto from "@/assets/construction/tahap-1-jembatan-gang-rt5.jpg";
import tahap1VideoPoster from "@/assets/construction/tahap-1-video-poster.jpg";
import tahap2PengirimanPhoto from "@/assets/construction/tahap-2-pengiriman-baja-ringan.jpg";
import tahap2Photo from "@/assets/construction/tahap-2-perakitan-rangka.jpg";
import tahap2FabrikasiPhoto from "@/assets/construction/tahap-2-fabrikasi-rangka.jpg";
import { useI18n } from "@/i18n/LanguageProvider";

export interface GalleryItem {
  url: string;
  title: string;
  desc?: string;
  phaseBadge?: string;
}

const phaseImageMap: Record<string, string> = {
  "tahap-1-pembuatan-uditch.jpg": tahap1UditchPhoto,
  "tahap-1-saluran-sanitasi.jpg": tahap1Photo,
  "tahap-1-instalasi-lanjutan.jpg": tahap1InstalasiLanjutanPhoto,
  "tahap-1-hasil-instalasi.jpg": tahap1HasilInstalasiPhoto,
  "tahap-1-jembatan-gang-rt5.jpg": tahap1JembatanPhoto,
  "tahap-1-video-poster.jpg": tahap1VideoPoster,
  "tahap-2-pengiriman-baja-ringan.jpg": tahap2PengirimanPhoto,
  "tahap-2-perakitan-rangka.jpg": tahap2Photo,
  "tahap-2-fabrikasi-rangka.jpg": tahap2FabrikasiPhoto,
};

export interface WakafSectionProps {
  onOpenWakaf?: () => void;
}

const financial = masjidData.financial;
const account = masjidData.bankAccounts[0];
const phaseIcons = [Building2, Layers, Hammer, Droplets, Sparkles];
const tahap1Total = masjidData.plan.rab.reduce((sum, item) => sum + item.amount, 0);

export function WakafPembangunanSection({ onOpenWakaf }: WakafSectionProps) {
  const { tx, dir } = useI18n();

  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openPhotoPhases, setOpenPhotoPhases] = useState<Record<string, boolean>>({
    sanitasi: true,
    "teras-utara": true,
  });
  const [galleryState, setGalleryState] = useState<{
    items: GalleryItem[];
    currentIndex: number;
  } | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const scrollToPhase = (phaseNumber: number) => {
    setTimeout(() => {
      const el = document.getElementById(`fase-${phaseNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  const openGallery = (items: GalleryItem[], index: number) => {
    setGalleryState({ items, currentIndex: index });
  };

  const nextGalleryImage = () => {
    setGalleryState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.items.length,
      };
    });
  };

  const prevGalleryImage = () => {
    setGalleryState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length,
      };
    });
  };

  useEffect(() => {
    if (!galleryState) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGalleryState(null);
      } else if (e.key === (dir === "rtl" ? "ArrowLeft" : "ArrowRight")) {
        nextGalleryImage();
      } else if (e.key === (dir === "rtl" ? "ArrowRight" : "ArrowLeft")) {
        prevGalleryImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryState, dir]);

  const togglePhotos = (key: string) => {
    setOpenPhotoPhases((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCopyAccount = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && account) {
      navigator.clipboard.writeText(account.accountNumber);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && account?.bankCode) {
      navigator.clipboard.writeText(account.bankCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section
      id="wakaf-pembangunan"
      className="scroll-mt-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 mb-3">
          <HeartHandshake className="w-3.5 h-3.5" />
          {tx("Jariyah Terbaik Anda")}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#064e3b] tracking-tight mb-3">
          {tx("Wakaf Pembangunan Masjid")}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          {tx("Bersama kita wujudkan rumah Allah yang kokoh dan layak. Setiap rupiah yang Anda wakafkan menjadi amal jariyah yang terus mengalir manfaatnya.")}
        </p>
      </div>

      {/* ── PROPOSAL SUBSECTION ── */}
      <div className="mb-8 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 shadow-sm overflow-hidden">
        {/* Proposal Header Bar */}
        <div className="bg-gradient-to-r from-[#064e3b] to-emerald-800 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-white font-extrabold text-base leading-tight">
                {tx("Proposal Pembangunan Masjid")}
              </div>
              <div className="text-emerald-200 text-xs mt-0.5">
                {tx("Masjid Nurul Falah Sukatani — Permanen 2 Lantai")}
              </div>
            </div>
          </div>
          <a
            href={masjidData.contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#064e3b] font-bold text-xs shadow transition active:scale-95 shrink-0"
            title={tx("Hubungi kami untuk mendapatkan proposal lengkap")}
          >
            <FileText className="w-4 h-4" />
            {tx("Minta Proposal Lengkap")}
          </a>
        </div>

        {/* Proposal Body */}
        <div className="px-6 sm:px-8 py-6 space-y-6">
          {/* {tx("Latar Belakang")} */}
          <div>
            <h4 className="text-sm font-bold text-[#064e3b] mb-2 flex items-center gap-1.5">
              <span className="w-1 h-4 bg-emerald-500 rounded-full inline-block" />
              {tx("Latar Belakang")}
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              {tx("Masjid Nurul Falah Sukatani berdiri sebagai pusat ibadah, pendidikan Al-Qur'an, dan layanan sosial bagi warga Kp. Sukatani dan sekitarnya. Bangunan yang ada saat ini belum mampu menampung seluruh jamaah dan kegiatan yang terus berkembang. Untuk itu, DKM bersama warga menggagas pembangunan masjid permanen 2 lantai yang mampu mengakomodasi seluruh kebutuhan umat secara lebih layak dan berkelanjutan.")}
            </p>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: MapPin,
                label: "Lokasi",
                value: "Kp. Sukatani, Cisolok",
                color: "text-emerald-700",
                bg: "bg-emerald-50 border-emerald-200",
              },
              {
                icon: Building2,
                label: "Tipe Bangunan",
                value: "Dua lantai penuh",
                color: "text-amber-700",
                bg: "bg-amber-50 border-amber-200",
              },
              {
                icon: Maximize2,
                label: "Tapak Rencana",
                value: "24 × 17 m (408 m²)",
                color: "text-blue-700",
                bg: "bg-blue-50 border-blue-200",
              },
              {
                icon: Users,
                label: "Pelayanan",
                value: "300 Kepala Keluarga",
                color: "text-rose-700",
                bg: "bg-rose-50 border-rose-200",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`rounded-xl border p-3.5 flex flex-col gap-1.5 ${item.bg}`}
                >
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <div className={`text-xs font-bold leading-tight ${item.color}`}>
                    {tx(item.value)}
                  </div>
                  <div className="text-[11px] text-slate-500">{tx(item.label)}</div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5">
            <h4 className="text-sm font-bold text-[#064e3b] mb-2">
              {tx("Lahan yang tercatat")}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {tx(masjidData.land.statement)}
            </p>
          </div>

          {/* {tx("Tujuan Pembangunan")} */}
          <div>
            <h4 className="text-sm font-bold text-[#064e3b] mb-3 flex items-center gap-1.5">
              <span className="w-1 h-4 bg-amber-400 rounded-full inline-block" />
              {tx("Tujuan Pembangunan")}
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {[
                "Menyediakan tempat ibadah yang nyaman dan representatif bagi seluruh jamaah",
                "Memperluas kapasitas ruang belajar Al-Qur'an, TPA, dan Tahfidz",
                "Menjadi pusat kegiatan sosial, dakwah, dan pembinaan masyarakat",
                "Meningkatkan kualitas sarana wudhu, sanitasi, dan aksesibilitas jamaah",
              ].map((tujuan, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-emerald-200">
                    {i + 1}
                  </span>
                  {tujuan}
                </div>
              ))}
            </div>
          </div>

          {/* Fase Pembangunan */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <h4 className="text-sm font-bold text-[#064e3b] flex items-center gap-1.5">
                <span className="w-1 h-4 bg-emerald-600 rounded-full inline-block" />
                {tx("Urutan Pembangunan pada Acuan Proposal")}
              </h4>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                {tx("Ditetapkan {date}", { date: masjidData.plan.decidedOn })}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {tx("Urutan ini mengikuti acuan proposal yang ditetapkan pada {date}. Tahap 1 adalah struktur beton dengan RAB {budget}. Tahap 2 sampai tahap 5 disebut sesuai urutan itu, tanpa angka anggaran.", {
                date: masjidData.plan.decidedOn,
                budget: masjidData.plan.tahap1Budget,
              })}
            </p>

            <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 text-white shadow-sm border border-emerald-800/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3 pb-2.5 border-b border-emerald-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span className="font-bold text-white tracking-wide text-xs sm:text-sm">
                    {tx("Lima tahap pada acuan proposal")}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-200">
                  {tx("RAB Tahap 1:")} <b className="text-amber-300 font-mono">{masjidData.plan.tahap1Budget}</b>
                </div>
              </div>

              {/* Step Markers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                {masjidData.constructionPhases.map((p) => {
                  const isDone = p.status === "Selesai";
                  const isOngoing = p.status === "Dalam Proses";
                  const pTimeline = p as { timeline?: string; quarter?: string; targetBudget?: string };
                  return (
                    <button
                      key={p.phase}
                      type="button"
                      onClick={() => scrollToPhase(p.phase)}
                      className={`p-2.5 rounded-xl border text-start flex flex-col justify-between transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                        isDone
                          ? "bg-emerald-800/50 border-emerald-400/50 text-emerald-100 hover:border-emerald-300"
                          : isOngoing
                          ? "bg-amber-500/25 border-amber-400/70 text-amber-100 ring-1 ring-amber-400/40 hover:border-amber-300"
                          : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                      }`}
                      title={tx("Klik untuk lompat ke rincian Tahap {n}", { n: p.phase })}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              isDone
                                ? "bg-emerald-500/30 text-emerald-300"
                                : isOngoing
                                ? "bg-amber-400 text-slate-950 font-extrabold"
                                : "bg-white/10 text-slate-300"
                            }`}
                          >
                            {tx("Tahap {n}", { n: p.phase })}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : isOngoing ? (
                            <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
                          ) : (
                            <CircleDot className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                        </div>
                        <div className="font-bold text-xs text-white line-clamp-2">
                          {tx(p.title)}
                        </div>
                        {pTimeline.targetBudget && (
                          <div className="text-[10px] text-amber-300/90 font-mono font-semibold mt-0.5">
                            {pTimeline.targetBudget}
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] text-emerald-200/90 mt-2 line-clamp-1 font-medium flex items-center justify-between">
                        <span>{p.status === "Selesai" ? tx("✓ Selesai") : p.status === "Dalam Proses" ? tx("⚡ Berjalan") : tx("Rencana")}</span>
                        <span className="text-[9px] text-emerald-300/70">{tx("Lihat ↓")}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-xs font-bold text-slate-700 mb-3">
              {tx("Daftar Rincian Tahap:")}
            </div>

            <div className="grid gap-2.5">
              {masjidData.constructionPhases.map((phase) => {
                const Icon = phaseIcons[phase.phase - 1] || Hammer;
                const isCompleted = phase.status === "Selesai";
                const isInProgress = phase.status === "Dalam Proses";
                const photos = (phase as { photos?: { title: string; desc: string; filename: string }[] }).photos;
                const videos = (phase as { videos?: { title: string; desc: string; filename: string; poster?: string }[] }).videos;
                const phaseTimeline = phase as {
                  timeline?: string;
                  quarter?: string;
                  milestone?: string;
                  targetBudget?: string;
                  progressPercent?: number;
                };
                const hasMedia = (photos && photos.length > 0) || (videos && videos.length > 0);
                const isPhotosOpen = !!openPhotoPhases[String(phase.phase)];

                return (
                  <div
                    key={phase.phase}
                    id={`fase-${phase.phase}`}
                    className={`flex flex-col gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-300 scroll-mt-24 ${
                      isCompleted
                        ? "bg-emerald-50/70 border-emerald-300/80 shadow-2xs"
                        : isInProgress
                        ? "bg-amber-50/50 border-amber-200/90 shadow-2xs"
                        : "bg-white/90 border-emerald-100/90 shadow-2xs"
                    }`}
                  >
                    {/* Top Row: Phase Info & {tx("Status")} Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Left: Phase Number & Info */}
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div
                          className={`w-8 h-8 rounded-xl text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0 ${
                            isCompleted
                              ? "bg-emerald-600"
                              : isInProgress
                              ? "bg-amber-500"
                              : "bg-gradient-to-br from-emerald-600 to-emerald-800"
                          }`}
                        >
                          {phase.phase}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                              <Icon className="w-3.5 h-3.5 text-emerald-700" />
                              {tx(phase.badge)}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                              {tx(phase.title)}
                            </span>
                            {phaseTimeline.timeline && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                                <Calendar className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>{tx(phaseTimeline.timeline)}</span>
                                {phaseTimeline.quarter && (
                                  <span className="text-emerald-800 font-bold font-mono">
                                    ({phaseTimeline.quarter})
                                  </span>
                                )}
                              </span>
                            )}
                            {phaseTimeline.targetBudget && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono">
                                <span>{tx("RAB: {budget}", { budget: phaseTimeline.targetBudget })}</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {tx(phase.desc)}
                          </p>
                          {phaseTimeline.milestone && (
                            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                              {tx(phaseTimeline.milestone)}
                            </p>
                          )}

                          {/* Mini Phase Progress Bar */}
                          {typeof phaseTimeline.progressPercent === "number" && phaseTimeline.progressPercent > 0 && (
                            <div className="space-y-1 pt-2">
                              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                                <span>{tx("Progres fisik pekerjaan ini:")}</span>
                                <span className="font-bold font-mono text-emerald-700">{phaseTimeline.progressPercent}%</span>
                              </div>
                              <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isCompleted ? "bg-emerald-500" : "bg-amber-400"
                                  }`}
                                  style={{ width: `${phaseTimeline.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: {tx("Status")} Badge */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <span className="sm:hidden text-[11px] text-slate-400 font-medium">
                          {tx("Status:")}
                        </span>
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            {tx("Selesai")}
                          </span>
                        ) : isInProgress ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs">
                            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            {tx("Dalam Proses")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <CircleDot className="w-3.5 h-3.5 text-slate-400" />
                            {tx("Rencana")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accordion: {tx("Dokumentasi Kegiatan")} */}
                    {hasMedia && (
                      <div className={`mt-1 pt-2.5 border-t ${isCompleted ? "border-emerald-200/80" : "border-amber-200/70"}`}>
                        <button
                          type="button"
                          onClick={() => togglePhotos(String(phase.phase))}
                          className={`w-full flex items-center justify-between py-2 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                            isCompleted
                              ? "bg-emerald-100/60 hover:bg-emerald-100/90 border-emerald-200/80 text-emerald-900"
                              : "bg-amber-100/60 hover:bg-amber-100/90 border-amber-200/80 text-amber-900"
                          }`}
                          aria-expanded={isPhotosOpen}
                        >
                          <span className="flex items-center gap-2">
                            <Camera className={`w-4 h-4 ${isCompleted ? "text-emerald-700" : "text-amber-700"}`} />
                            <span className="font-bold">{tx("Dokumentasi Kegiatan")}</span>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                              isCompleted
                                ? "bg-emerald-200/90 text-emerald-950 border-emerald-300/60"
                                : "bg-amber-200/90 text-amber-950 border-amber-300/60"
                            }`}>
                              {photos?.length || 0} Foto{videos && videos.length > 0 ? ` • ${videos.length} Animasi GIF` : ""}
                            </span>
                          </span>
                          <span className={`flex items-center gap-1 text-[11px] font-medium ${isCompleted ? "text-emerald-800" : "text-amber-800"}`}>
                            <span>{isPhotosOpen ? "Tutup" : "Lihat"}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isPhotosOpen ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                        </button>

                        {isPhotosOpen && (
                          <div className="mt-2.5 space-y-3">
                            {/* Photos Grid */}
                            {photos && photos.length > 0 && (() => {
                              const phaseGalleryItems: GalleryItem[] = photos.map((item) => ({
                                url: item.filename && phaseImageMap[item.filename]
                                  ? phaseImageMap[item.filename]
                                  : `./images/construction/${item.filename}`,
                                title: item.title,
                                desc: item.desc,
                                phaseBadge: phase.badge,
                              }));

                              return (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {phaseGalleryItems.map((p, pIdx) => {
                                    return (
                                      <div
                                        key={pIdx}
                                        className={`group rounded-xl overflow-hidden border bg-white shadow-2xs hover:shadow-md transition ${
                                          isCompleted ? "border-emerald-300/80" : "border-amber-300/80"
                                        }`}
                                      >
                                        <div
                                          className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer"
                                          onClick={() => openGallery(phaseGalleryItems, pIdx)}
                                        >
                                          <img
                                            src={p.url}
                                            alt={tx(p.title)}
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                                            loading="lazy"
                                          />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-lg">
                                            <ZoomIn className={`w-3.5 h-3.5 ${isCompleted ? "text-emerald-300" : "text-amber-300"}`} /> {tx("Klik untuk perbesar")}
                                          </span>
                                        </div>
                                      </div>
                                      <div className={`p-3 ${isCompleted ? "bg-emerald-50/40" : "bg-amber-50/40"}`}>
                                        <div className="text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                                          <span>{tx(p.title)}</span>
                                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                            isCompleted ? "text-emerald-800 bg-emerald-100" : "text-amber-800 bg-amber-100"
                                          }`}>
                                            Dokumentasi Lapangan
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 leading-relaxed">
                                          {p.desc ? tx(p.desc) : null}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}

                            {/* Video / GIF Animation Section (Displayed after photos) */}
                            {videos && videos.length > 0 && (
                              <div className="space-y-2 pt-1 border-t border-slate-200/60">
                                <div className="grid sm:grid-cols-2 gap-3">
                                  {videos.map((vid, vIdx) => {
                                    const videoUrl = `./videos/construction/${vid.filename}`;
                                    const posterUrl = vid.poster && phaseImageMap[vid.poster]
                                      ? phaseImageMap[vid.poster]
                                      : vid.poster
                                      ? `./images/construction/${vid.poster}`
                                      : undefined;
                                    return (
                                      <div
                                        key={vIdx}
                                        className={`group rounded-xl overflow-hidden border bg-white shadow-2xs hover:shadow-md transition ${
                                          isCompleted ? "border-emerald-300/80" : "border-amber-300/80"
                                        }`}
                                      >
                                        <div className="relative aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
                                          <video
                                            src={videoUrl}
                                            poster={posterUrl}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            controls
                                            preload="metadata"
                                            className="w-full h-full object-contain"
                                          >
                                            {tx("Browser Anda tidak mendukung pemutar video HTML5.")}
                                          </video>
                                        </div>
                                        <div className={`p-3 ${isCompleted ? "bg-emerald-50/40" : "bg-amber-50/40"}`}>
                                          <div className="text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                                            <span>{tx(vid.title)}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs ${
                                              isCompleted ? "text-emerald-800 bg-emerald-100 border border-emerald-200" : "text-amber-800 bg-amber-100 border border-amber-200"
                                            }`}>
                                              <Sparkles className="w-2.5 h-2.5" /> {tx("Animasi GIF Loop (600 KB)")}
                                            </span>
                                          </div>
                                          <p className="text-[11px] text-slate-600 leading-relaxed">
                                            {tx(vid.desc)}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}


                  </div>
                );
              })}

            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#064e3b] mb-2 flex items-center gap-1.5">
              <span className="w-1 h-4 bg-amber-400 rounded-full inline-block" />
              {tx("Catatan Pekerjaan Lapangan")}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {tx("Saluran sanitasi dan teras utara adalah pekerjaan yang sudah atau sedang berjalan, beserta fotonya. Catatan ini bukan peta anggaran resmi dan tidak menggantikan RAB Tahap 1. Pada urutan proposal, sanitasi berada di tahap keempat.")}
            </p>
            <div className="grid gap-2.5">
              {masjidData.fieldWork.map((work) => {
                const isCompleted = work.status === "Selesai";
                const isInProgress = work.status === "Dalam Proses";
                const photos = work.photos ?? [];
                const videos = "videos" in work ? work.videos : undefined;
                const isOpen = openPhotoPhases[work.id] !== false;
                const galleryItems: GalleryItem[] = photos.map((item) => ({
                  url: phaseImageMap[item.filename] ?? `./images/construction/${item.filename}`,
                  title: item.title,
                  desc: item.desc,
                  phaseBadge: work.badge,
                }));
                return (
                  <div
                    key={work.id}
                    id={`lapangan-${work.id}`}
                    className={`flex flex-col gap-3 p-3.5 sm:p-4 rounded-xl border ${
                      isCompleted
                        ? "bg-emerald-50/70 border-emerald-300/80"
                        : "bg-amber-50/50 border-amber-200/90"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                            <Camera className="w-3.5 h-3.5" />
                            {tx(work.badge)}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">{tx(work.title)}</span>
                          {work.timeline && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                              <Calendar className="w-3 h-3 text-emerald-600" />
                              {tx(work.timeline)}
                              {work.quarter ? ` (${work.quarter})` : ""}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{tx(work.desc)}</p>
                        {work.milestone && (
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{tx(work.milestone)}</p>
                        )}
                        {work.progressPercent > 0 && (
                          <div className="space-y-1 pt-2">
                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                              <span>{tx("Progres fisik pekerjaan ini:")}</span>
                              <span className="font-bold font-mono text-emerald-700">{work.progressPercent}%</span>
                            </div>
                            <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isCompleted ? "bg-emerald-500" : "bg-amber-400"}`}
                                style={{ width: `${work.progressPercent}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="shrink-0">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {tx("Selesai")}
                          </span>
                        ) : isInProgress ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <Clock className="w-3.5 h-3.5" />
                            {tx("Dalam Proses")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <CircleDot className="w-3.5 h-3.5" />
                            {tx("Rencana")}
                          </span>
                        )}
                      </div>
                    </div>
                    {photos.length > 0 && (
                      <div className={`pt-2.5 border-t ${isCompleted ? "border-emerald-200/80" : "border-amber-200/70"}`}>
                        <button
                          type="button"
                          onClick={() => togglePhotos(work.id)}
                          className={`w-full flex items-center justify-between py-2 px-3 rounded-lg border text-xs font-semibold ${
                            isCompleted
                              ? "bg-emerald-100/60 border-emerald-200/80 text-emerald-900"
                              : "bg-amber-100/60 border-amber-200/80 text-amber-900"
                          }`}
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            {tx("Dokumentasi Kegiatan")}
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-white/70">
                              {tx("{photos} Foto", { photos: photos.length })}
                              {videos && videos.length > 0 ? ` • ${videos.length} ${tx("Animasi")}` : ""}
                            </span>
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="mt-2.5 space-y-3">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {galleryItems.map((photo, photoIndex) => (
                                <div key={photo.url} className="group rounded-xl overflow-hidden border border-slate-200 bg-white">
                                  <button
                                    type="button"
                                    className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden cursor-pointer"
                                    onClick={() => openGallery(galleryItems, photoIndex)}
                                  >
                                    <img src={photo.url} alt={tx(photo.title)} className="w-full h-full object-cover" loading="lazy" />
                                  </button>
                                  <div className="p-3">
                                    <div className="text-xs font-bold text-slate-800 mb-1">{tx(photo.title)}</div>
                                    {photo.desc && <p className="text-[11px] text-slate-600 leading-relaxed">{tx(photo.desc)}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {videos && videos.length > 0 && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                {videos.map((vid) => {
                                  const posterUrl = vid.poster
                                    ? phaseImageMap[vid.poster] ?? `./images/construction/${vid.poster}`
                                    : undefined;
                                  return (
                                    <div key={vid.filename} className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                                      <video
                                        src={`./videos/construction/${vid.filename}`}
                                        poster={posterUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        controls
                                        preload="metadata"
                                        className="w-full aspect-[4/3] object-contain bg-black"
                                      />
                                      <div className="p-3">
                                        <div className="text-xs font-bold text-slate-800 mb-1">{tx(vid.title)}</div>
                                        <p className="text-[11px] text-slate-600 leading-relaxed">{tx(vid.desc)}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#064e3b]/5 border border-emerald-200 rounded-2xl px-5 py-4">
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-0.5">
                {tx("Target RAB Tahap 1")}
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#064e3b]">
                {masjidData.plan.tahap1Budget}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {masjidData.plan.tahap1BudgetWords}
              </div>
            </div>
            <div className="text-xs text-slate-500 leading-relaxed max-w-xs">
              {tx("Angka ini adalah RAB struktur beton. Bilah progres di bawah masih pembaruan {date}.", { date: financial.lastUpdate })}
            </div>
          </div>
        </div>
      </div>
      {/* ── END PROPOSAL SUBSECTION ── */}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Progress & Fund Allocation */}
        <div className="flex flex-col gap-6">
          {/* Progress Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#064e3b] to-emerald-950 text-white p-6 shadow-xl border border-emerald-800/40 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <Target className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">{tx("Progress Dana Pembangunan")}</h3>
              </div>

              {/* Big Numbers */}
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-1">
                    {tx("Terkumpul")}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {financial.buildingFundAllocated}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-slate-400 text-xs mb-1">{tx("Target")}</div>
                  <div className="text-lg font-bold font-mono text-amber-300">
                    {financial.buildingFundTarget}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700/60 h-3 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${financial.progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  <b className="text-white">{tx("{percent}% tercapai", { percent: financial.progressPercent })}</b>
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  {tx("Update: {date}", { date: financial.lastUpdate })}
                </span>
              </div>
            </div>
          </div>

          {/* Alokasi Dana */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hammer className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-[#064e3b]">
                {tx("RAB Tahap 1")}
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              {tx("Enam pos struktur beton. Jumlahnya {budget}.", { budget: masjidData.plan.tahap1Budget })}
            </p>
            <div className="space-y-3.5">
              {masjidData.plan.rab.map((item) => (
                <div key={item.code}>
                  <div className="flex items-center justify-between gap-3 text-xs mb-1">
                    <span className="text-slate-600">
                      {tx("Pos {code}", { code: item.code })} · {tx(item.name)}
                    </span>
                    <span className="font-bold font-mono text-slate-700 shrink-0">{item.label}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                      style={{ width: `${(item.amount / tahap1Total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between text-xs font-bold border-t border-slate-100 pt-3">
                <span className="text-slate-700">{tx("Jumlah Tahap 1")}</span>
                <span className="font-mono text-[#064e3b]">{masjidData.plan.tahap1Budget}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Bank Account + CTA */}
        <div className="flex flex-col gap-6">
          {/* Bank Account Card */}
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/20 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-[#064e3b]">{tx("Rekening Wakaf Resmi")}</h3>
            </div>

            {/* Bank header */}
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-700/20">
                  <Landmark className="h-6 w-6 text-amber-300" />
                </div>
                <div>
                  <span className="font-bold text-base text-slate-900 block leading-tight">
                    {account.bankName}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {tx(account.purpose)}
                  </span>
                </div>
              </div>
              {account.bankCode && (
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                  <span className="text-[11px] text-slate-500 font-medium">{tx("Kode:")}</span>
                  <span className="text-xs font-mono font-bold text-emerald-800">
                    {account.bankCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-emerald-700 hover:text-emerald-900 transition-colors p-0.5"
                    title={tx("Salin Kode Bank")}
                  >
                    {copiedCode ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Account Number */}
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1">
                {tx("Nomor Rekening")}
              </span>
              <div className="flex items-center justify-between bg-white border border-emerald-300/80 rounded-xl p-3 sm:p-3.5 shadow-sm">
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#064e3b] tracking-wider">
                  {account.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>{tx("Tersalin!")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{tx("Salin No. Rek")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Account Holder */}
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                {tx("Atas Nama Rekening")}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wide">
                {account.accountHolder}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-3">
            <h3 className="font-bold text-sm text-[#064e3b] mb-3">
              {tx("Langkah Selanjutnya")}
            </h3>
            <button
              type="button"
              onClick={onOpenWakaf}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow transition active:scale-95 cursor-pointer"
            >
              <HeartHandshake className="w-5 h-5 text-amber-300" />
              {tx("Wakaf Sekarang")}
            </button>
            <a
              href={masjidData.contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#047857] font-semibold text-sm transition"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              {tx("Konfirmasi via WhatsApp")}
            </a>
            <p className="text-center text-[11px] text-slate-400 leading-relaxed pt-1">
              {tx("Setelah transfer, harap konfirmasi kepada panitia agar donasi Anda dapat segera tercatat dan didoakan. Jazākumullāhu khairan.")}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal Foto Kegiatan dengan Navigasi Next/Prev */}
      {galleryState && (() => {
        const activeItem = galleryState.items[galleryState.currentIndex];
        const hasMultiple = galleryState.items.length > 1;

        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 select-none animate-in fade-in duration-200"
            onClick={() => setGalleryState(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-white/10 bg-slate-950/80">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-white truncate">
                    {activeItem.title}
                  </span>
                  {activeItem.phaseBadge && (
                    <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {activeItem.phaseBadge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 ms-2">
                  <span className="text-xs text-slate-400 font-mono">
                    {galleryState.currentIndex + 1} / {galleryState.items.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGalleryState(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title={tx("Tutup preview (Esc)")}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Photo View Area with Left/Right Buttons and Touch Swipe */}
              <div
                className="relative p-2 sm:p-4 bg-black/70 flex-1 overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[420px]"
                onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touchStart === null) return;
                  const raw = touchStart - e.changedTouches[0].clientX;
                  const diff = dir === "rtl" ? -raw : raw;
                  if (diff > 45) {
                    nextGalleryImage();
                  } else if (diff < -45) {
                    prevGalleryImage();
                  }
                  setTouchStart(null);
                }}
              >
                {/* Prev Button */}
                {hasMultiple && (
                  <button
                    type="button"
                    onClick={prevGalleryImage}
                    className="absolute start-2 sm:start-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition active:scale-90 z-20 cursor-pointer"
                    title={tx("Foto Sebelumnya (←)")}
                    aria-label={tx("Foto Sebelumnya")}
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 rtl:-scale-x-100" />
                  </button>
                )}

                {/* Active Photo */}
                <img
                  key={activeItem.url}
                  src={activeItem.url}
                  alt={tx(activeItem.title)}
                  className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-all duration-200"
                />

                {/* Next Button */}
                {hasMultiple && (
                  <button
                    type="button"
                    onClick={nextGalleryImage}
                    className="absolute end-2 sm:end-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition active:scale-90 z-20 cursor-pointer"
                    title={tx("Foto Selanjutnya (→)")}
                    aria-label={tx("Foto Selanjutnya")}
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rtl:-scale-x-100" />
                  </button>
                )}
              </div>

              {/* Footer: Description & Thumbnails */}
              <div className="p-3 sm:p-4 bg-slate-950 border-t border-white/10 space-y-3">
                {activeItem.desc && (
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {tx(activeItem.desc)}
                  </p>
                )}

                {/* Thumbnail Strip */}
                {hasMultiple && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 hide-scrollbar">
                    {galleryState.items.map((thumb, tIdx) => {
                      const isActive = tIdx === galleryState.currentIndex;
                      return (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => setGalleryState((prev) => prev ? { ...prev, currentIndex: tIdx } : null)}
                          className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-150 cursor-pointer ${
                            isActive
                              ? "ring-2 ring-amber-400 scale-105 shadow-md opacity-100"
                              : "opacity-45 hover:opacity-90 ring-1 ring-white/10"
                          }`}
                          title={thumb.title}
                        >
                          <img
                            src={thumb.url}
                            alt={thumb.title}
                            className="w-12 h-9 sm:w-14 sm:h-10 object-cover"
                          />
                        </button>
                      );
                    })}
                    <span className="text-[11px] text-slate-400 ps-2 hidden sm:inline">
                      Gunakan tombol panah ← dan → pada keyboard atau geser layar
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}

export default WakafPembangunanSection;
