import React, { useState } from "react";
import {
  Calendar,
  Camera,
  ChevronDown,
  Coins,
  Droplets,
  Layers,
  Sparkles,
  Building2,
  Hammer,
  Target,
  ZoomIn,
  ImageOff,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import {
  construction,
  formatPercent,
  formatRupiah,
  tasksForPhase,
  type PhaseStatus,
  type PhaseView,
} from "@/lib/construction";
import { statusStyle } from "./phaseStyle";
import tahap1UditchPhoto from "@/assets/construction/tahap-1-pembuatan-uditch.jpg";
import tahap1Photo from "@/assets/construction/tahap-1-saluran-sanitasi.jpg";
import tahap1InstalasiLanjutanPhoto from "@/assets/construction/tahap-1-instalasi-lanjutan.jpg";
import tahap1HasilInstalasiPhoto from "@/assets/construction/tahap-1-hasil-instalasi.jpg";
import tahap1JembatanPhoto from "@/assets/construction/tahap-1-jembatan-gang-rt5.jpg";
import tahap1VideoPoster from "@/assets/construction/tahap-1-video-poster.jpg";
import tahap2PengirimanPhoto from "@/assets/construction/tahap-2-pengiriman-baja-ringan.jpg";
import tahap2Photo from "@/assets/construction/tahap-2-perakitan-rangka.jpg";
import tahap2FabrikasiPhoto from "@/assets/construction/tahap-2-fabrikasi-rangka.jpg";

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

const imageUrl = (filename: string) =>
  phaseImageMap[filename] ?? `./images/construction/${filename}`;

const phaseIcons = [Droplets, Layers, Sparkles, Building2, Hammer];

type Filter = "all" | PhaseStatus;

export interface PhaseTimelineProps {
  onOpenGallery: (items: GalleryItem[], index: number) => void;
  /** Phases whose media accordion is open. Controlled so the overview can open one. */
  openMedia: Record<number, boolean>;
  onToggleMedia: (phase: number) => void;
  filter: Filter;
  onFilterChange: (f: Filter) => void;
}

const taskChip: Record<string, string> = {
  Selesai: "bg-emerald-50 text-emerald-700 border-emerald-200",
  WIP: "bg-amber-50 text-amber-700 border-amber-200",
  Belum: "bg-slate-50 text-slate-500 border-slate-200",
};

function MetaItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">{children}</div>
    </div>
  );
}

function PhaseMediaBlock({
  phase,
  open,
  onToggle,
  onOpenGallery,
}: {
  phase: PhaseView;
  open: boolean;
  onToggle: () => void;
  onOpenGallery: PhaseTimelineProps["onOpenGallery"];
}) {
  const photos = phase.photos ?? [];
  const videos = phase.videos ?? [];
  const isDone = phase.status === "Selesai";

  if (photos.length === 0 && videos.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50/80 px-3 py-2 text-[11px] text-slate-500">
        <ImageOff className="w-3.5 h-3.5 shrink-0" />
        <span>
          Dokumentasi foto <b className="font-semibold">(menyusul)</b>
          {phase.status === "Rencana" ? " saat pekerjaan dimulai" : ""}
        </span>
      </div>
    );
  }

  const items: GalleryItem[] = photos.map((p) => ({
    url: imageUrl(p.filename),
    title: p.title,
    desc: p.desc,
    phaseBadge: phase.badge,
  }));
  const accent = isDone
    ? "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-900"
    : "bg-amber-50 hover:bg-amber-100/80 border-amber-200 text-amber-900";

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-2 py-2 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${accent}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          <Camera className="w-4 h-4 shrink-0" />
          <span className="truncate">
            Dokumentasi · {photos.length} foto
            {videos.length > 0 ? ` · ${videos.length} video` : ""}
          </span>
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium shrink-0">
          {open ? "Tutup" : "Lihat"}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="mt-2.5 grid grid-cols-2 lg:grid-cols-3 gap-2.5">
          {items.map((p, i) => (
            <button
              key={p.url + i}
              type="button"
              onClick={() => onOpenGallery(items, i)}
              className="group text-left rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xs hover:shadow-md transition cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={p.url}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-black/60 text-white text-[10px] px-2 py-0.5 opacity-90">
                  <ZoomIn className="w-3 h-3" />
                  <span className="hidden sm:inline">Perbesar</span>
                </span>
              </div>
              <div className="p-2 sm:p-2.5">
                <div className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                  {p.title}
                </div>
                <p className="hidden sm:block text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  {p.desc}
                </p>
              </div>
            </button>
          ))}
          {videos.map((v) => (
            <div
              key={v.filename}
              className="col-span-2 lg:col-span-1 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xs"
            >
              <div className="relative aspect-[4/3] bg-black">
                <video
                  src={`./videos/construction/${v.filename}`}
                  poster={v.poster ? imageUrl(v.poster) : undefined}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  Browser Anda tidak mendukung pemutar video HTML5.
                </video>
              </div>
              <div className="p-2 sm:p-2.5">
                <div className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">{v.title}</div>
                <p className="hidden sm:block text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PhaseTimeline({
  onOpenGallery,
  openMedia,
  onToggleMedia,
  filter,
  onFilterChange,
}: PhaseTimelineProps) {
  const { phases, counts } = construction;
  const visible = phases.filter((p) => filter === "all" || p.status === filter);
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: `Semua (${counts.total})` },
    { id: "Selesai", label: `Selesai (${counts.done})` },
    { id: "Dalam Proses", label: `Berjalan (${counts.ongoing})` },
    { id: "Rencana", label: `Rencana (${counts.planned})` },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="text-sm font-bold text-[#064e3b]">Rincian per Tahap</div>
        <div className="grid grid-cols-4 sm:flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id)}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[10px] sm:text-[11px] whitespace-nowrap ${
                filter === f.id ? "bg-[#064e3b] text-white shadow-xs" : "text-slate-600 hover:bg-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative">
        {visible.map((p, idx) => {
          const st = statusStyle[p.status];
          const StatusIcon = st.icon;
          const PhaseIcon = phaseIcons[p.phase - 1] ?? Hammer;
          const tasks = tasksForPhase(p.phase);
          const isLast = idx === visible.length - 1;
          const unconfirmed = p.scheduleConfirmed === false;

          return (
            <li key={p.phase} id={`fase-${p.phase}`} className="relative flex gap-3 sm:gap-4 pb-4 scroll-mt-24">
              {/* Rail */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-4 flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-sm ${st.dot}`}
                >
                  {p.phase}
                </div>
                {!isLast && <div className="w-0.5 flex-1 mt-1 bg-gradient-to-b from-slate-300 to-slate-200" />}
              </div>

              {/* Card */}
              <div className={`flex-1 min-w-0 rounded-2xl border p-3.5 sm:p-5 shadow-2xs space-y-3 ${st.card}`}>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                    <PhaseIcon className="w-3.5 h-3.5" />
                    {p.badge}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${st.chip}`}>
                    <StatusIcon className={`w-3.5 h-3.5 ${p.status === "Dalam Proses" ? "animate-pulse" : ""}`} />
                    {st.label}
                  </span>
                  {unconfirmed && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-dashed border-orange-300 bg-orange-50 text-orange-700">
                      <AlertTriangle className="w-3 h-3" />
                      Estimasi · Belum dikonfirmasi
                    </span>
                  )}
                </div>

                <h5 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">{p.title}</h5>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl bg-slate-50/90 border border-slate-100 p-3">
                  <MetaItem icon={Calendar} label="Periode">
                    {p.timeline}
                    <span className="block text-[10px] font-mono font-semibold text-emerald-700">{p.quarter}</span>
                  </MetaItem>
                  <MetaItem icon={Coins} label="Anggaran">
                    <span className="font-mono whitespace-nowrap text-[11px] sm:text-[13px]">{formatRupiah(p.budget)}</span>
                    <span className="block text-[10px] font-semibold text-slate-500">
                      {formatPercent(p.budgetShare)}% dari total
                    </span>
                  </MetaItem>
                  <div className="col-span-2 sm:col-span-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      <span>Progres</span>
                      <span
                        className={`text-xs normal-case tracking-normal ${
                          p.status === "Rencana" ? "font-semibold text-slate-500" : "font-mono text-slate-800"
                        }`}
                      >
                        {p.status === "Rencana" ? "Belum dimulai" : `${p.progressPercent}%`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${st.bar}`} style={{ width: `${p.progressPercent}%` }} />
                    </div>
                    {p.status === "Dalam Proses" && (
                      <div className="text-[10px] text-orange-700 mt-1 leading-snug">
                        Angka sementara · belum diverifikasi
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <Target className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600" />
                  <span>
                    <b className="text-slate-800">Lingkup: </b>
                    {p.milestone}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>

                {tasks.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      <ClipboardList className="w-3 h-3" />
                      Terkait di Rekap Tugas
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tasks.map((t) => (
                        <span
                          key={t.id}
                          className={`text-[11px] px-2 py-0.5 rounded-md border ${taskChip[t.status] ?? taskChip.Belum}`}
                        >
                          {t.label} · <b>{t.status}</b>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <PhaseMediaBlock
                  phase={p}
                  open={!!openMedia[p.phase]}
                  onToggle={() => onToggleMedia(p.phase)}
                  onOpenGallery={onOpenGallery}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default PhaseTimeline;
