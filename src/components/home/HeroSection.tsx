import React from "react";
import { Compass, Calendar, ShieldCheck, Eye } from "lucide-react";

export interface HeroSectionProps {
  onOpenInfaq?: () => void;
}

export function HeroSection({ onOpenInfaq }: HeroSectionProps) {
  return (
    <section id="beranda" className="relative bg-pattern text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/90 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Pusat Dakwah & Kegiatan Umat Sukatani
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Membangun Generasi Madani, Memakmurkan Masjid{" "}
              <span className="text-amber-300">Nurul Falah</span>
            </h1>

            <p className="text-emerald-100 text-base sm:text-lg max-w-2xl leading-relaxed">
              Wadah informasi, publikasi syiar Islam, kajian rutin, layanan sosial, dan transparansi kegiatan ibadah bersama warga lingkungan Sukatani.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#program-panjang"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm shadow-lg shadow-amber-500/30 transition flex items-center gap-2"
              >
                <Compass className="w-4 h-4" /> Rencana & Pembangunan Masjid
              </a>
              <a
                href="#agenda"
                className="px-6 py-3 rounded-xl bg-emerald-800/70 hover:bg-emerald-800 border border-emerald-500/40 text-white font-semibold text-sm transition flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Jadwal Kajian
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-800/60 text-center sm:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">450+</div>
                <div className="text-xs text-emerald-200">Jamaah Aktif</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">2 Pilar</div>
                <div className="text-xs text-emerald-200">Program Jangka Panjang</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-xs text-emerald-200">Kas Transparan</div>
              </div>
            </div>
          </div>

          {/* Highlight Card (Hero Right) */}
          <div className="lg:col-span-5 text-left">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/20 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <span className="bg-amber-500 text-slate-950 font-bold text-xs uppercase px-2.5 py-1 rounded-md tracking-wider">
                  Program Strategis 2026-2028
                </span>
                <span className="text-xs text-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Visi Madani
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">Perluasan Ruang Ibadah & Sentra Tahfidz Sukatani</h3>
              <p className="text-slate-200 text-sm mb-4 line-clamp-2">
                Proyek pembangunan ruang sholat lantai dua dan pembinaan 100 santri penghafal Al-Qur'an bersertifikat.
              </p>

              <div className="space-y-2 bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/20 text-xs text-emerald-100 mb-5">
                <div className="flex items-center justify-between">
                  <span>Progress Wakaf Pembangunan:</span>
                  <span className="font-bold text-amber-300 font-mono">12% (Rp 56 Jt / Rp 450 Jt)</span>
                </div>
                <div className="w-full bg-emerald-900/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: "12%" }}></div>
                </div>
              </div>

              <a
                href="#program-panjang"
                className="w-full py-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs uppercase rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <Eye className="w-4 h-4 text-emerald-700" /> Pelajari Program Jangka Panjang
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
