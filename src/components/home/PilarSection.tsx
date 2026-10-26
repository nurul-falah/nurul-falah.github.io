import React from "react";
import { ShieldCheck, Flame, Users, Milestone, Sparkles, CheckCircle2 } from "lucide-react";
import masjidData from "@/data/masjid.json";

export function PilarSection() {
  const { pillars } = masjidData;

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Flame: <Flame className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Milestone: <Milestone className="w-6 h-6" />,
  };

  const colorStyles: Record<
    string,
    {
      badgeBg: string;
      badgeText: string;
      iconBg: string;
      borderHover: string;
      bulletColor: string;
      accentLine: string;
    }
  > = {
    emerald: {
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-700 border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-700",
      borderHover: "hover:border-emerald-400 group-hover:border-emerald-300",
      bulletColor: "text-emerald-600",
      accentLine: "from-emerald-500 to-teal-400",
    },
    amber: {
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-800 border-amber-200",
      iconBg: "bg-amber-100 text-amber-700",
      borderHover: "hover:border-amber-400 group-hover:border-amber-300",
      bulletColor: "text-amber-600",
      accentLine: "from-amber-500 to-yellow-400",
    },
    blue: {
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-700 border-blue-200",
      iconBg: "bg-blue-100 text-blue-700",
      borderHover: "hover:border-blue-400 group-hover:border-blue-300",
      bulletColor: "text-blue-600",
      accentLine: "from-blue-500 to-cyan-400",
    },
    indigo: {
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-700 border-indigo-200",
      iconBg: "bg-indigo-100 text-indigo-700",
      borderHover: "hover:border-indigo-400 group-hover:border-indigo-300",
      bulletColor: "text-indigo-600",
      accentLine: "from-indigo-500 to-purple-400",
    },
  };

  return (
    <section id="pilar" className="pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[#059669] font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          {pillars.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
          {pillars.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
          {pillars.subtitle}
        </p>

        {/* Statement Quote Banner */}
        <div className="mt-5 inline-block bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-emerald-100 px-5 py-3 rounded-2xl shadow-md border border-emerald-800/40 text-xs sm:text-sm font-medium">
          💡 <span className="text-amber-300 font-semibold">{pillars.quote}</span>
        </div>
      </div>

      {/* 3 Pillars Grid Cards */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.items.map((pillar) => {
          const style = colorStyles[pillar.color] || colorStyles.emerald;

          return (
            <div
              key={pillar.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${style.borderHover}`}
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${style.accentLine}`} />

              <div>
                {/* Header: Icon, Number & Badge */}
                <div className="flex items-center justify-between mb-4 mt-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105 ${style.iconBg}`}>
                    {iconMap[pillar.icon] || <Sparkles className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-slate-400 transition-colors">
                      {pillar.number}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.badgeBg} ${style.badgeText}`}>
                      {pillar.badge}
                    </span>
                  </div>
                </div>

                {/* Pillar Title & Tagline */}
                <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-emerald-900 transition-colors">
                  {pillar.name}
                </h3>
                <div className="text-xs font-semibold text-slate-500 mb-3.5">
                  {pillar.tagline}
                </div>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  {pillar.desc}
                </p>

                {/* Practical Points */}
                <div className="space-y-2.5 mb-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Aksi &amp; Karakter Nyata:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {pillar.points.map((pt, idx) => {
                      const [title, ...rest] = pt.split(":");
                      const detail = rest.join(":");
                      return (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${style.bulletColor}`} />
                          <span className="leading-snug">
                            <strong className="text-slate-900">{title}:</strong>
                            <span className="text-slate-600">{detail}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Bottom Footer Micro Indicator */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ Komitmen DKM
                </span>
                <span className="font-mono text-slate-400">Pilar {pillar.number}/03</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PilarSection;
