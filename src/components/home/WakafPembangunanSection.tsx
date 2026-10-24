import React, { useState } from "react";
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
  Camera,
  ChevronDown,
  ZoomIn,
  X,
} from "lucide-react";
import masjidData from "@/data/masjid.json";
import tahap1UditchPhoto from "@/assets/construction/tahap-1-pembuatan-uditch.jpg";
import tahap1Photo from "@/assets/construction/tahap-1-saluran-sanitasi.jpg";
import tahap1InstalasiLanjutanPhoto from "@/assets/construction/tahap-1-instalasi-lanjutan.jpg";
import tahap1HasilInstalasiPhoto from "@/assets/construction/tahap-1-hasil-instalasi.jpg";
import tahap2PengirimanPhoto from "@/assets/construction/tahap-2-pengiriman-baja-ringan.jpg";
import tahap2Photo from "@/assets/construction/tahap-2-perakitan-rangka.jpg";

const phaseImageMap: Record<string, string> = {
  "tahap-1-pembuatan-uditch.jpg": tahap1UditchPhoto,
  "tahap-1-saluran-sanitasi.jpg": tahap1Photo,
  "tahap-1-instalasi-lanjutan.jpg": tahap1InstalasiLanjutanPhoto,
  "tahap-1-hasil-instalasi.jpg": tahap1HasilInstalasiPhoto,
  "tahap-2-pengiriman-baja-ringan.jpg": tahap2PengirimanPhoto,
  "tahap-2-perakitan-rangka.jpg": tahap2Photo,
};

export interface WakafSectionProps {
  onOpenWakaf?: () => void;
}

const financial = masjidData.financial;
const account = masjidData.bankAccounts[0];
const phaseIcons = [Droplets, Layers, Sparkles, Building2, Hammer];

const buildingItems = [
  { label: "Pondasi & Struktur Beton", pct: 35 },
  { label: "Dinding & Fasad", pct: 25 },
  { label: "Atap & Interior", pct: 20 },
  { label: "Plumbing, Listrik & Finishing", pct: 20 },
];

export function WakafPembangunanSection({ onOpenWakaf }: WakafSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openPhotoPhases, setOpenPhotoPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    desc?: string;
  } | null>(null);

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
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
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
        <div className="px-6 sm:px-8 py-6 space-y-6">
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
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[#064e3b] flex items-center gap-1.5">
                <span className="w-1 h-4 bg-emerald-600 rounded-full inline-block" />
                Fase & Rencana Tahapan Pembangunan
              </h4>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200">
                5 Tahapan Terencana
              </span>
            </div>

            <div className="grid gap-2.5">
              {masjidData.constructionPhases.map((phase, i) => {
                const Icon = phaseIcons[i] || Hammer;
                const isCompleted = phase.status === "Selesai";
                const isInProgress = phase.status === "Dalam Proses";
                const photos = (phase as { photos?: { title: string; desc: string; filename: string }[] }).photos;
                const isPhotosOpen = !!openPhotoPhases[phase.phase];

                return (
                  <div
                    key={phase.phase}
                    className={`flex flex-col gap-3 p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? "bg-emerald-50/70 border-emerald-300/80 shadow-2xs"
                        : isInProgress
                        ? "bg-amber-50/50 border-amber-200/90 shadow-2xs"
                        : "bg-white/90 border-emerald-100/90 shadow-2xs"
                    }`}
                  >
                    {/* Top Row: Phase Info & Status Badge */}
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
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : (
                            phase.phase
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                              {phase.title}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200/80">
                              <Icon className="w-3 h-3 text-emerald-700" />
                              {phase.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {phase.desc}
                          </p>
                        </div>
                      </div>

                      {/* Right: Status Badge */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <span className="sm:hidden text-[11px] text-slate-400 font-medium">
                          Status:
                        </span>
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Selesai
                          </span>
                        ) : isInProgress ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs">
                            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            Dalam Proses
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <CircleDot className="w-3.5 h-3.5 text-slate-400" />
                            Rencana
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accordion: Foto Kegiatan */}
                    {photos && photos.length > 0 && (
                      <div className={`mt-1 pt-2.5 border-t ${isCompleted ? "border-emerald-200/80" : "border-amber-200/70"}`}>
                        <button
                          type="button"
                          onClick={() => togglePhotos(phase.phase)}
                          className={`w-full flex items-center justify-between py-2 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                            isCompleted
                              ? "bg-emerald-100/60 hover:bg-emerald-100/90 border-emerald-200/80 text-emerald-900"
                              : "bg-amber-100/60 hover:bg-amber-100/90 border-amber-200/80 text-amber-900"
                          }`}
                          aria-expanded={isPhotosOpen}
                        >
                          <span className="flex items-center gap-2">
                            <Camera className={`w-4 h-4 ${isCompleted ? "text-emerald-700" : "text-amber-700"}`} />
                            <span className="font-bold">Foto Kegiatan</span>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                              isCompleted
                                ? "bg-emerald-200/90 text-emerald-950 border-emerald-300/60"
                                : "bg-amber-200/90 text-amber-950 border-amber-300/60"
                            }`}>
                              {photos.length} Foto
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
                          <div className="mt-2.5 space-y-2.5">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {photos.map((p, pIdx) => {
                                const photoUrl = p.filename && phaseImageMap[p.filename]
                                  ? phaseImageMap[p.filename]
                                  : `./images/construction/${p.filename}`;
                                return (
                                  <div
                                    key={pIdx}
                                    className={`group rounded-xl overflow-hidden border bg-white shadow-2xs hover:shadow-md transition ${
                                      isCompleted ? "border-emerald-300/80" : "border-amber-300/80"
                                    }`}
                                  >
                                    <div
                                      className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer"
                                      onClick={() =>
                                        setSelectedImage({
                                          url: photoUrl,
                                          title: p.title,
                                          desc: p.desc,
                                        })
                                      }
                                    >
                                      <img
                                        src={photoUrl}
                                        alt={p.title}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-lg">
                                          <ZoomIn className={`w-3.5 h-3.5 ${isCompleted ? "text-emerald-300" : "text-amber-300"}`} /> Klik untuk perbesar
                                        </span>
                                      </div>
                                    </div>
                                    <div className={`p-3 ${isCompleted ? "bg-emerald-50/40" : "bg-amber-50/40"}`}>
                                      <div className="text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                                        <span>{p.title}</span>
                                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                          isCompleted ? "text-emerald-800 bg-emerald-100" : "text-amber-800 bg-amber-100"
                                        }`}>
                                          Dokumentasi Lapangan
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-600 leading-relaxed">
                                        {p.desc}
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
                );
              })}

            </div>
          </div>

          {/* Estimasi Biaya Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#064e3b]/5 border border-emerald-200 rounded-2xl px-5 py-4">
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-0.5">
                Total Estimasi Kebutuhan Dana
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#064e3b]">
                {masjidData.financial.buildingFundTarget}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Sudah terkumpul:{" "}
                <strong className="text-emerald-700">
                  {masjidData.financial.buildingFundAllocated}
                </strong>{" "}
                ({masjidData.financial.progressPercent}%)
              </div>
            </div>
            <div className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Dana dikelola secara transparan oleh DKM Nurul Falah dan dapat
              dikonfirmasi langsung kepada pengurus masjid.
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
                <h3 className="font-bold text-base">Progress Dana Pembangunan</h3>
              </div>

              {/* Big Numbers */}
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-1">
                    Terkumpul
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {financial.buildingFundAllocated}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs mb-1">Target</div>
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
                  <b className="text-white">{financial.progressPercent}%</b> tercapai
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Update: {financial.lastUpdate}
                </span>
              </div>
            </div>
          </div>

          {/* Alokasi Dana */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hammer className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-[#064e3b]">
                Rencana Alokasi Dana
              </h3>
            </div>
            <div className="space-y-3.5">
              {buildingItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-bold text-slate-700">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
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

      {/* Lightbox Modal Foto Kegiatan */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/70">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-sm text-white">{selectedImage.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Tutup preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 bg-black/50 flex-1 overflow-auto flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-md"
              />
            </div>
            {selectedImage.desc && (
              <div className="p-4 bg-slate-950 text-xs text-slate-300 border-t border-white/10 leading-relaxed">
                {selectedImage.desc}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default WakafPembangunanSection;
