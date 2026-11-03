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
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import masjidData from "@/data/masjid.json";
import {
  construction,
  formatPercent,
  formatRupiah,
  formatRupiahShort,
} from "@/lib/construction";
import { ConstructionOverview } from "@/components/construction/ConstructionOverview";
import { PhaseTimeline, type GalleryItem } from "@/components/construction/PhaseTimeline";
import { statusStyle } from "@/components/construction/phaseStyle";

export type { GalleryItem };

export interface WakafSectionProps {
  onOpenWakaf?: () => void;
}

const account = masjidData.bankAccounts[0];

export function WakafPembangunanSection({ onOpenWakaf }: WakafSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openPhotoPhases, setOpenPhotoPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });
  const [galleryState, setGalleryState] = useState<{
    items: GalleryItem[];
    currentIndex: number;
  } | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<"all" | "Selesai" | "Dalam Proses" | "Rencana">("all");

  const scrollToPhase = (phaseNumber: number) => {
    setOpenPhotoPhases((prev) => ({ ...prev, [phaseNumber]: true }));
    setPhaseFilter("all");
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
      } else if (e.key === "ArrowRight") {
        nextGalleryImage();
      } else if (e.key === "ArrowLeft") {
        prevGalleryImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryState]);

  const togglePhotos = (phaseNumber: number) => {
    setOpenPhotoPhases((prev) => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber],
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
          Jariyah Terbaik Anda
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#064e3b] tracking-tight mb-3">
          Wakaf Pembangunan Masjid
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Bersama kita wujudkan rumah Allah yang kokoh dan layak. Setiap rupiah
          yang Anda wakafkan menjadi amal jariyah yang terus mengalir manfaatnya.
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
                Proposal Pembangunan Masjid
              </div>
              <div className="text-emerald-200 text-xs mt-0.5">
                Masjid Nurul Falah Sukatani — Permanen 2 Lantai
              </div>
            </div>
          </div>
          <a
            href={masjidData.contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#064e3b] font-bold text-xs shadow transition active:scale-95 shrink-0"
            title="Hubungi kami untuk mendapatkan proposal lengkap"
          >
            <FileText className="w-4 h-4" />
            Minta Proposal Lengkap
          </a>
        </div>

        {/* Proposal Body */}
        <div className="px-4 sm:px-8 py-6 space-y-6">
          {/* Latar Belakang */}
          <div>
            <h4 className="text-sm font-bold text-[#064e3b] mb-2 flex items-center gap-1.5">
              <span className="w-1 h-4 bg-emerald-500 rounded-full inline-block" />
              Latar Belakang
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Masjid Nurul Falah Sukatani berdiri sebagai pusat ibadah, pendidikan Al-Qur'an, dan
              layanan sosial bagi warga Kp. Sukatani dan sekitarnya. Bangunan yang ada saat ini
              belum mampu menampung seluruh jamaah dan kegiatan yang terus berkembang. Untuk itu,
              DKM bersama warga menggagas pembangunan masjid permanen 2 lantai yang mampu
              mengakomodasi seluruh kebutuhan umat secara lebih layak dan berkelanjutan.
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
                value: "Permanen 2 Lantai",
                color: "text-amber-700",
                bg: "bg-amber-50 border-amber-200",
              },
              {
                icon: Maximize2,
                label: "Luas Lahan",
                value: `${masjidData.specs.landAreaM2} m²`,
                color: "text-blue-700",
                bg: "bg-blue-50 border-blue-200",
              },
              {
                icon: Users,
                label: "Kapasitas",
                value: `${masjidData.specs.capacity} Jamaah`,
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
                    {item.value}
                  </div>
                  <div className="text-[11px] text-slate-500">{item.label}</div>
                </div>
              );
            })}
          </div>

          {/* Tujuan Pembangunan */}
          <div>
            <h4 className="text-sm font-bold text-[#064e3b] mb-3 flex items-center gap-1.5">
              <span className="w-1 h-4 bg-amber-400 rounded-full inline-block" />
              Tujuan Pembangunan
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
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h4 className="text-sm font-bold text-[#064e3b] flex items-center gap-1.5">
                <span className="w-1 h-4 bg-emerald-600 rounded-full inline-block" />
                Tahapan &amp; Garis Waktu Pembangunan
              </h4>
              <span className="self-start sm:self-auto text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {construction.counts.total} Tahap · {construction.period.start} – {construction.period.end}
              </span>
            </div>

            <ConstructionOverview onSelectPhase={scrollToPhase} />

            <PhaseTimeline
              onOpenGallery={openGallery}
              openMedia={openPhotoPhases}
              onToggleMedia={togglePhotos}
              filter={phaseFilter}
              onFilterChange={setPhaseFilter}
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            Dana dikelola secara transparan oleh DKM Nurul Falah dan dapat dikonfirmasi langsung
            kepada pengurus masjid. Jadwal &amp; anggaran bertanda <b>Belum dikonfirmasi</b> masih
            berupa perkiraan perencanaan dan dapat berubah.
          </p>
        </div>
      </div>
      {/* ── END PROPOSAL SUBSECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Progress & Fund Allocation */}
        <div className="flex flex-col gap-6 min-w-0">
          {/* Kebutuhan Dana per Tahap */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hammer className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-[#064e3b]">Kebutuhan Dana per Tahap</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {construction.phases.map((p) => {
                const st = statusStyle[p.status];
                return (
                  <button
                    key={p.phase}
                    type="button"
                    onClick={() => scrollToPhase(p.phase)}
                    className="w-full text-left py-2.5 flex items-center gap-3 hover:bg-slate-50 rounded-lg px-1 -mx-1 transition cursor-pointer"
                  >
                    <span className={`w-6 h-6 rounded-full ring-2 flex items-center justify-center text-[10px] font-extrabold shrink-0 ${st.dot}`}>
                      {p.phase}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-slate-700 truncate">{p.title}</span>
                        <span className="font-mono font-bold text-slate-800 shrink-0">{formatRupiahShort(p.budget)}</span>
                      </span>
                      <span className="mt-1 block w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <span className={`block h-full rounded-full ${st.bar}`} style={{ width: `${p.budgetShare}%` }} />
                      </span>
                      <span className="mt-0.5 flex justify-between text-[10px] text-slate-400">
                        <span>{p.quarter} · {st.label}</span>
                        <span>{formatPercent(p.budgetShare)}%</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Total</span>
              <span className="font-mono font-extrabold text-[#064e3b]">{formatRupiah(construction.totalPhaseBudget)}</span>
            </div>
            {!construction.budgetMatchesTarget && (
              <p className="mt-2 text-[11px] text-orange-700">
                Total anggaran tahap berbeda dengan target {formatRupiah(construction.fund.target)}. Belum dikonfirmasi.
              </p>
            )}
          </div>

          {/* Posisi Dana */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#064e3b] to-emerald-950 text-white p-5 sm:p-6 shadow-xl border border-emerald-800/40 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">Posisi Dana Pembangunan</h3>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 mb-3">
                <div>
                  <div className="text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-1">Terkumpul</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono">{formatRupiah(construction.fund.raised)}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs mb-1">Target</div>
                  <div className="text-lg font-bold font-mono text-amber-300">{formatRupiah(construction.fund.target)}</div>
                </div>
              </div>
              <div className="w-full bg-slate-700/60 h-3 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
                  style={{ width: `${construction.fund.percent}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-4">
                <span>
                  <b className="text-white">{formatPercent(construction.fund.percent)}%</b> tercapai
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Update: {construction.fund.lastUpdate}
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <dt className="text-emerald-200/80 text-[11px]">Terpakai Tahap 1–2</dt>
                  <dd className="font-semibold text-amber-200 mt-0.5">Belum dikonfirmasi</dd>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <dt className="text-emerald-200/80 text-[11px]">Sisa dana</dt>
                  <dd className="font-semibold text-amber-200 mt-0.5">Belum dikonfirmasi</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Right: Bank Account + CTA */}
        <div className="flex flex-col gap-6">
          {/* Bank Account Card */}
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/20 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-[#064e3b]">Rekening Wakaf Resmi</h3>
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
                    {account.purpose}
                  </span>
                </div>
              </div>
              {account.bankCode && (
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                  <span className="text-[11px] text-slate-500 font-medium">Kode:</span>
                  <span className="text-xs font-mono font-bold text-emerald-800">
                    {account.bankCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-emerald-700 hover:text-emerald-900 transition-colors p-0.5"
                    title="Salin Kode Bank"
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
                Nomor Rekening
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
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Salin No. Rek</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Account Holder */}
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                Atas Nama Rekening
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wide">
                {account.accountHolder}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-3">
            <h3 className="font-bold text-sm text-[#064e3b] mb-3">
              Langkah Selanjutnya
            </h3>
            <button
              type="button"
              onClick={onOpenWakaf}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow transition active:scale-95 cursor-pointer"
            >
              <HeartHandshake className="w-5 h-5 text-amber-300" />
              Wakaf Sekarang
            </button>
            <a
              href={masjidData.contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#047857] font-semibold text-sm transition"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              Konfirmasi via WhatsApp
            </a>
            <p className="text-center text-[11px] text-slate-400 leading-relaxed pt-1">
              Setelah transfer, harap konfirmasi kepada panitia agar donasi Anda
              dapat segera tercatat dan didoakan. Jazākumullāhu khairan.
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

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-xs text-slate-400 font-mono">
                    {galleryState.currentIndex + 1} / {galleryState.items.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGalleryState(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title="Tutup preview (Esc)"
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
                  const diff = touchStart - e.changedTouches[0].clientX;
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
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition active:scale-90 z-20 cursor-pointer"
                    title="Foto Sebelumnya (←)"
                    aria-label="Foto Sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}

                {/* Active Photo */}
                <img
                  key={activeItem.url}
                  src={activeItem.url}
                  alt={activeItem.title}
                  className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-all duration-200"
                />

                {/* Next Button */}
                {hasMultiple && (
                  <button
                    type="button"
                    onClick={nextGalleryImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition active:scale-90 z-20 cursor-pointer"
                    title="Foto Selanjutnya (→)"
                    aria-label="Foto Selanjutnya"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>

              {/* Footer: Description & Thumbnails */}
              <div className="p-3 sm:p-4 bg-slate-950 border-t border-white/10 space-y-3">
                {activeItem.desc && (
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {activeItem.desc}
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
                    <span className="text-[11px] text-slate-400 pl-2 hidden sm:inline">
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
