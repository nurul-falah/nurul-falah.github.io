import React from "react";
import { SunMedium } from "lucide-react";

export function PrayerTimesWidget() {
  const prayers = [
    { name: "Shubuh", time: "04:42", note: "Iqomah +12m" },
    { name: "Syuruq", time: "05:58", note: "Terbit" },
    { name: "Dzuhur", time: "12:02", note: "Iqomah +10m" },
    { name: "Ashar", time: "15:21", note: "Iqomah +10m" },
    { name: "Maghrib", time: "18:04", note: "Iqomah +08m" },
    { name: "Isya", time: "19:14", note: "Iqomah +10m" },
  ];

  return (
    <section id="jadwal" className="relative -mt-16 max-w-6xl mx-auto px-4 sm:px-6 z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <SunMedium className="w-5 h-5 text-amber-500" />
              Jadwal Sholat Hari Ini — Wilayah Sukatani
            </h2>
            <p className="text-xs text-slate-500">
              Waktu otomatis disesuaikan dengan koordinat Sukatani dan Kemenag RI
            </p>
          </div>
        </div>

        {/* Prayer Cards Grid - Uniform Normal Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="prayer-card p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 transition"
            >
              <span className="text-xs font-medium text-slate-500 block mb-1">
                {prayer.name}
              </span>
              <span className="text-xl font-black text-slate-800 font-mono">
                {prayer.time}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">
                {prayer.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PrayerTimesWidget;
