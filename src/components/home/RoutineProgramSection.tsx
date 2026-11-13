import React from "react";
import { BookOpen, Users, Sparkles, HandHeart, Calendar } from "lucide-react";
import masjidData from "@/data/masjid.json";

interface ProgramPhoto {
  src: string;
  fallback: string;
  alt: string;
  caption: string;
}

type RoutineProgram = (typeof masjidData.routinePrograms)[number] & {
  photos?: ProgramPhoto[];
};

export function RoutineProgramSection() {
  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    HandHeart: <HandHeart className="w-6 h-6" />,
    Calendar: <Calendar className="w-6 h-6" />,
  };

  const programs = masjidData.routinePrograms as RoutineProgram[];
  const ngajiPhotos = programs.find((prog) => prog.id === "ngaji-anak")?.photos ?? [];

  return (
    <section id="program" className="scroll-mt-20 pt-16 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[#059669] font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Pilar Kemakmuran Rutin
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Program Rutin</h2>
        <p className="text-slate-600 text-sm mt-1">
          Aktivitas harian dan mingguan yang sedang aktif di Masjid Nurul Falah Sukatani.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((prog) => {
          let iconBg = "bg-emerald-100 text-[#047857]";
          let badgeColor = "text-[#047857] bg-emerald-50";

          if (prog.color === "amber") {
            iconBg = "bg-amber-100 text-amber-700";
            badgeColor = "text-amber-700 bg-amber-50";
          } else if (prog.color === "blue") {
            iconBg = "bg-blue-100 text-blue-700";
            badgeColor = "text-blue-700 bg-blue-50";
          } else if (prog.color === "rose") {
            iconBg = "bg-rose-100 text-rose-700";
            badgeColor = "text-rose-700 bg-rose-50";
          }

          return (
            <div
              key={prog.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                  {iconMap[prog.icon] || <Sparkles className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{prog.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">{prog.desc}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-md self-start ${badgeColor}`}>
                {prog.badge}
              </span>
            </div>
          );
        })}
      </div>

      {ngajiPhotos.length > 0 && (
        <div id="dokumentasi-ngaji" className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-[#047857]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Dokumentasi Belajar Mengaji Anak-anak
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Kegiatan harian ba'da Maghrib hingga Isya di serambi masjid.
              </p>
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {ngajiPhotos.map((photo) => (
              <li key={photo.src}>
                <figure className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full">
                  <picture>
                    <source type="image/webp" srcSet={photo.src} />
                    <img
                      src={photo.fallback}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto bg-slate-100"
                    />
                  </picture>
                  <figcaption className="text-xs sm:text-sm text-slate-600 leading-relaxed px-4 py-3">
                    {photo.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default RoutineProgramSection;
