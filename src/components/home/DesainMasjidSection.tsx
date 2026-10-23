import React, { useState } from "react";
import { Compass, Layers, Maximize2, Users, ZoomIn, X } from "lucide-react";
import masjidData from "@/data/masjid.json";

const specs = masjidData.specs;

const highlights = [
  {
    icon: Layers,
    label: "2 Lantai",
    desc: "Lantai dasar & mezanin",
    color: "emerald",
  },
  {
    icon: Maximize2,
    label: `${specs.buildingAreaM2} m²`,
    desc: "Luas bangunan total",
    color: "amber",
  },
  {
    icon: Users,
    label: `${specs.capacity} Jamaah`,
    desc: "Kapasitas penuh",
    color: "blue",
  },
  {
    icon: Compass,
    label: "Kiblat",
    desc: `Azimuth ${masjidData.coordinates.qiblaAzimuth}°`,
    color: "rose",
  },
];

const colorMap: Record<string, string> = {
  emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30 text-emerald-700",
  amber: "from-amber-500/20 to-amber-600/10 border-amber-400/30 text-amber-700",
  blue: "from-blue-500/20 to-blue-600/10 border-blue-400/30 text-blue-700",
  rose: "from-rose-500/20 to-rose-600/10 border-rose-400/30 text-rose-700",
};

const cadLink = "https://burubur.github.io/drftr/?project=masjid";

export function DesainMasjidSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      id="desain-masjid"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          <Compass className="w-3.5 h-3.5" />
          Rancang Bangun & Arsitektur
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#064e3b] tracking-tight mb-3">
          Desain Masjid
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Rancangan arsitektur Masjid Nurul Falah Sukatani — bangunan permanen 2
          lantai yang dirancang untuk menjadi pusat ibadah, pendidikan, dan
          layanan sosial umat.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* CAD Preview Card */}
        <div className="lg:col-span-3 group relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-gradient-to-br from-slate-900 via-[#064e3b] to-emerald-950">
          {/* Glow accents */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-8 text-center">
            {/* CAD Preview Frame */}
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
              title="Lihat desain penuh"
            >
              <div className="relative w-full" style={{ paddingBottom: "60%" }}>
                <iframe
                  src={cadLink}
                  title="CAD Desain Masjid Nurul Falah"
                  className="absolute inset-0 w-full h-full border-0 rounded-2xl pointer-events-none"
                  loading="lazy"
                />
                {/* Overlay click catcher */}
                <div className="absolute inset-0 flex items-end justify-end p-3">
                  <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Buka Penuh
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={cadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-sm shadow transition active:scale-95"
              >
                <Compass className="w-4 h-4" />
                Buka Desain CAD
              </a>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition active:scale-95"
              >
                <Maximize2 className="w-4 h-4" />
                Tampilan Layar Penuh
              </button>
            </div>
          </div>
        </div>

        {/* Specs & Highlights */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h3 className="text-base font-bold text-[#064e3b] mb-1">
              Spesifikasi Bangunan
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Masjid permanen dua lantai dibangun di atas lahan seluas{" "}
              <strong>{specs.landAreaM2} m²</strong> untuk mewadahi seluruh
              kegiatan ibadah dan sosial jamaah Sukatani.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                const cls = colorMap[item.color] ?? colorMap.emerald;
                return (
                  <div
                    key={item.label}
                    className={`rounded-xl bg-gradient-to-br ${cls} border p-3.5 flex flex-col gap-1`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-slate-900 font-extrabold text-sm leading-tight">
                      {item.label}
                    </div>
                    <div className="text-slate-500 text-[11px]">{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floor breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-3">
            <h3 className="text-base font-bold text-[#064e3b] mb-1">
              Distribusi Lantai
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Lantai Dasar</span>
              <span className="font-bold text-emerald-700 font-mono">
                {specs.groundFloorM2} m²
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                style={{
                  width: `${(specs.groundFloorM2 / specs.buildingAreaM2) * 100}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Lantai Mezanin</span>
              <span className="font-bold text-amber-600 font-mono">
                {specs.mezzanineFloorM2} m²
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
                style={{
                  width: `${(specs.mezzanineFloorM2 / specs.buildingAreaM2) * 100}%`,
                }}
              />
            </div>
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-sm font-bold">
              <span className="text-slate-700">Total Bangunan</span>
              <span className="text-[#064e3b] font-mono">
                {specs.buildingAreaM2} m²
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 shadow hover:bg-white transition"
              title="Tutup"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
            <div className="relative w-full" style={{ paddingBottom: "65%" }}>
              <iframe
                src={cadLink}
                title="CAD Desain Masjid Nurul Falah - Fullscreen"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DesainMasjidSection;
