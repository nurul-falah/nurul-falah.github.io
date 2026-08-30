import React from "react";
import { Milestone, Hammer, BookMarked, CheckCircle2, Sparkles, Compass } from "lucide-react";

export interface LongTermProgramSectionProps {
  onOpenWakaf?: () => void;
  onOpenLayanan?: () => void;
}

export function LongTermProgramSection({ onOpenWakaf, onOpenLayanan }: LongTermProgramSectionProps) {
  return (
    <section id="program-panjang" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="bg-gradient-to-br from-slate-900 via-[#064e3b] to-emerald-950 rounded-3xl text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-emerald-800/40">
        
        {/* Accent background lights */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Section */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-300 font-semibold text-xs uppercase tracking-wider bg-emerald-900/80 px-3.5 py-1.5 rounded-full border border-emerald-600/50 inline-flex items-center gap-1.5 mb-3">
            <Milestone className="w-3.5 h-3.5" /> Visi Strategis 3 - 10 Tahun
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Program Jangka Panjang</h2>
          <p className="text-emerald-200 text-sm mt-3 leading-relaxed">
            Roadmap DKM Nurul Falah Sukatani yang menitikberatkan pada proses alamiah pembinaan karakter masyarakat yang madani melalui kegiatan sosial berdasarkan konsep Islam yang sesungguhnya.
          </p>
        </div>

        {/* Dua Pilar Utama */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 mb-10">
          
          {/* PILAR 1: DAKWAH DAN SYI'AR */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 flex flex-col justify-between hover:border-emerald-400/50 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
                  <BookMarked className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-400/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30">
                  Pilar I: Dakwah dan Syi'ar
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Ekspansi Kegiatan Keagamaan & Pembinaan Warga</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-5">
                Mengintensifkan pembinaan ruhani secara alamiah sedari dini melalui kegiatan belajar materi ajaran islam mulai dari membaca alqur'an sampai seluruh cabang ilmu yang terkandung dalam rukun agama islam.
              </p>

              {/* Rincian Program Dakwah */}
              <ul className="space-y-3.5 text-xs text-slate-200 mb-6">
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-white">Pelatihan Baca-Tulis Al-Qur'an:</b>
                    <p className="text-slate-300 text-[11px]">Bimbingan membaca Iqro, tajwid, tahsin tilawah, dan literasi menulis huruf hijaiyah secara sistematis sedari dini.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-white">Pelatihan Shalat Berjamaah Maghrib:</b>
                    <p className="text-slate-300 text-[11px]">Pembiasaan disiplin hadir ke masjid meramaikan shaf shalat Maghrib berjamaah, adab di dalam masjid, dan doa harian.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-white">Pelatihan Imam Shalat Isya:</b>
                    <p className="text-slate-300 text-[11px]">Kaderisasi keberanian adzan, iqomah, kefasihan bacaan surat, dan tata cara memimpin shalat Isya bagi generasi muda.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-white">Pelatihan Mengajar Baca-Tulis Al-Qur'an:</b>
                    <p className="text-slate-300 text-[11px]">Training of Trainers (ToT) bagi para remaja dan kader dakwah untuk menjadi pengajar Al-Qur'an generasi berikutnya.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Target Realisasi */}
            <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/20 mt-2 flex items-center justify-between text-xs">
              <div>
                <div className="text-emerald-300 font-bold">Status Program</div>
                <div className="text-[11px] text-emerald-200">Sudah berjalan tanpa kendala</div>
              </div>
              <button
                type="button"
                onClick={onOpenLayanan}
                className="px-3 py-1.5 bg-[#059669] hover:bg-emerald-500 rounded-lg text-white font-semibold transition text-xs cursor-pointer"
              >
                Daftar Relawan Pengajar
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
                  Pilar II: Wadah & Media
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Pembangunan & Revitalisasi Sarana Masjid</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-5">
                Meningkatkan kualitas dan pengoptimalan kegunaan lahan masjid untuk tempat ibadah, kegiatan belajar dan kegiatan sosial.
              </p>

              {/* Rincian Sarana & Prasarana */}
              <ul className="space-y-3.5 text-xs text-slate-200 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-xs">Revitalisasi struktur bangunan</div>
                    <p className="text-slate-300 text-[11px]">Konstruksi lanjutan untuk area ibadah dan pembelajaran yang lebih berkualitas</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-xs">Optimalisasi lahan untuk persiapan struktur bangunan jangka panjang</div>
                    <p className="text-slate-300 text-[11px]">Penataan sarana TPA &amp; Tahfidz &amp; Layanan Sosial masyarakat</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Progress Donasi Pembangunan */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/10 mt-2">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300 font-medium">Estimasi Kebutuhan Biaya Fisik</span>
                <span className="text-amber-300 font-bold font-mono">Rp 450.000.000</span>
              </div>
              <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full" style={{ width: "12%" }}></div>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Terkumpul: <b className="text-white font-mono">Rp 56.000.000</b> (12%)</span>
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
                    + Wakaf Pembangunan
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
