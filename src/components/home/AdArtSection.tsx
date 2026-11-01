import React from "react";
import {
  Scale,
  ShieldCheck,
  Gavel,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { adArtData } from "@/data/adArt";

export interface AdArtSectionProps {
  onOpenFullPage: () => void;
}

export function AdArtSection({ onOpenFullPage }: AdArtSectionProps) {
  const highlightedPasals = adArtData.babs.flatMap((bab) =>
    bab.pasals
      .filter((p) => p.highlight)
      .map((p) => ({
        part: bab.part,
        babNumber: bab.babNumber,
        babTitle: bab.title,
        ...p,
      }))
  );

  return (
    <section id="ad-art" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left scroll-mt-20">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#064e3b] via-emerald-900 to-slate-900 p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/90 border border-emerald-600/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>Pedoman Konstitusi &amp; Tata Tertib Organisasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                AD/ART DKM &amp; RKM Masjid Nurul Falah
              </h2>
              <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                Landasan aturan organisasi yang menjamin kemurnian niat (bebas politisasi), kemandirian marwah (pantang mengemis di jalanan), ketertiban musyawarah yang beradab tanpa penghakiman sepihak, serta transparansi kas satu pintu.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenFullPage}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka Halaman Lengkap AD/ART</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] text-emerald-200/90 text-center font-mono">
                7 Bab AD (14 Pasal) • 6 Bab ART (15 Pasal)
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Crucial Articles Grid */}
        <div className="p-6 sm:p-8 bg-slate-50/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Gavel className="w-5 h-5 text-emerald-700" />
                <span>Pokok-Pokok Ketentuan Krusial dalam AD/ART</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pasal-pasal utama yang mengikat tata kelola pengurus, adab musyawarah warga, dan tahapan pembangunan masjid.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenFullPage}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 hover:underline cursor-pointer self-start sm:self-center"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Baca Seluruh 29 Pasal Lengkap &rarr;</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlightedPasals.map((pasal, idx) => (
              <div
                key={idx}
                onClick={onOpenFullPage}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-400 shadow-2xs hover:shadow-md transition flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {pasal.part} • {pasal.number}
                    </span>
                    {pasal.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                        {pasal.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">
                    {pasal.title}
                  </h4>

                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pasal.items.slice(0, 2).map((it, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-3 leading-relaxed">{it.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                  <span>{pasal.babNumber}: {pasal.babTitle}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">Detail &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdArtSection;

