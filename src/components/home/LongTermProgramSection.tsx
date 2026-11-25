import React from "react";
import { Milestone, Hammer, BookMarked, CheckCircle2, Sparkles, Compass } from "lucide-react";
import masjidData from "@/data/masjid.json";
import { PEMBINAAN_STATUS, pembinaanPrograms } from "@/data/pembinaanPrograms";
import { useI18n } from "@/i18n/LanguageProvider";

export interface LongTermProgramSectionProps {
  onOpenWakaf?: () => void;
  onOpenLayanan?: () => void;
}

export function LongTermProgramSection({ onOpenWakaf, onOpenLayanan }: LongTermProgramSectionProps) {
  const { tx } = useI18n();

  return (
    <section id="program-panjang" className="scroll-mt-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-start">
      <div className="bg-gradient-to-br from-slate-900 via-[#064e3b] to-emerald-950 rounded-3xl text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-emerald-800/40">
        
        {/* Accent background lights */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Section */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-300 font-semibold text-xs uppercase tracking-wider bg-emerald-900/80 px-3.5 py-1.5 rounded-full border border-emerald-600/50 inline-flex items-center gap-1.5 mb-3">
            <Milestone className="w-3.5 h-3.5" /> {tx("Visi Strategis 3 - 10 Tahun")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{tx("Program Jangka Panjang")}</h2>
          <p className="text-emerald-200 text-sm mt-3 leading-relaxed">
            {tx("Roadmap DKM Nurul Falah Sukatani yang menitikberatkan pada proses alamiah pembinaan karakter masyarakat yang madani melalui kegiatan sosial berdasarkan konsep Islam yang sesungguhnya.")}
          </p>
        </div>

        {/* Dua {tx("Pilar")} Utama */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 mb-10">
          
          {/* PILAR 1: DAKWAH DAN SYI'AR */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 flex flex-col justify-between hover:border-emerald-400/50 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
                  <BookMarked className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-400/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30">
                  {tx("Pilar I: Dakwah dan Syi'ar")}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{tx("Ekspansi Kegiatan Keagamaan & Pembinaan Warga")}</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-5">
                {tx("Mengintensifkan pembinaan ruhani secara alamiah sedari dini melalui kegiatan belajar materi ajaran islam mulai dari membaca alqur'an sampai seluruh cabang ilmu yang terkandung dalam rukun agama islam.")}
              </p>

              {/* Rincian Program Dakwah */}
              <ul className="space-y-3.5 text-xs text-slate-200 mb-6">
                {pembinaanPrograms.map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white">{tx(item.title)}</b>
                      <p className="text-slate-300 text-[11px]">{tx(item.desc)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* {tx("Target")} Realisasi */}
            <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/20 mt-2 flex items-center justify-between text-xs">
              <div>
                <div className="text-emerald-300 font-bold">{tx("Status Program")}</div>
                <div className="text-[11px] text-emerald-200">{tx(PEMBINAAN_STATUS)}</div>
              </div>
              <button
                type="button"
                onClick={onOpenLayanan}
                className="px-3 py-1.5 bg-[#059669] hover:bg-emerald-500 rounded-lg text-white font-semibold transition text-xs cursor-pointer"
              >
                {tx("Daftar Relawan Pengajar")}
              </button>
            </div>
          </div>

          {/* PILAR 2: WADAH & MEDIA */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 flex flex-col justify-between hover:border-amber-400/50 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <Hammer className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
                  {tx("Pilar II: Wadah & Media")}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{tx("Pembangunan & Revitalisasi Sarana Masjid")}</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-5">
                {tx("Meningkatkan kualitas dan pengoptimalan kegunaan lahan masjid untuk tempat ibadah, kegiatan belajar dan kegiatan sosial.")}
              </p>

              {/* Rincian Sarana & Prasarana */}
              <ul className="space-y-3.5 text-xs text-slate-200 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-xs">{tx("Revitalisasi struktur bangunan")}</div>
                    <p className="text-slate-300 text-[11px]">{tx("Konstruksi lanjutan untuk area ibadah dan pembelajaran yang lebih berkualitas")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-xs">{tx("Optimalisasi lahan untuk persiapan struktur bangunan jangka panjang")}</div>
                    <p className="text-slate-300 text-[11px]">{tx("Penataan sarana TPA & Tahfidz & Layanan Sosial masyarakat")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-xs">{tx("Acuan resmi bangunan")}</div>
                    <p className="text-slate-300 text-[11px]">
                      {tx("Tapak 24 × 17 m (408 m²), dua lantai penuh, pelayanan 300 kepala keluarga. RAB Tahap 1 struktur beton {budget}: foot plat 150 × 150 cm, 36 titik, beton K-250, sloof, kolom, dak lantai 2, dan ring balk.", { budget: masjidData.plan.tahap1Budget })}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Progress Donasi Pembangunan */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/10 mt-2">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300 font-medium">{tx("Progres Wakaf Pembangunan")}</span>
                <span className="text-amber-300 font-bold font-mono">{masjidData.financial.buildingFundTarget}</span>
              </div>
              <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full" style={{ width: `${masjidData.financial.progressPercent}%` }}></div>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>{tx("Terkumpul:")} <b className="text-white font-mono">{masjidData.financial.buildingFundAllocated}</b> ({masjidData.financial.progressPercent}%)</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://burubur.github.io/drftr/?project=masjid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:underline font-bold flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" /> CAD
                  </a>
                  <button
                    type="button"
                    onClick={onOpenWakaf}
                    className="text-amber-300 hover:underline font-bold cursor-pointer"
                  >
                    {tx("+ Wakaf Pembangunan")}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default LongTermProgramSection;
