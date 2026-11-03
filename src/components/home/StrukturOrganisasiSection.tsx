import React from "react";
import {
  Network,
  Users,
  Landmark,
  UserCheck,
  ScrollText,
  HandCoins,
  BookOpen,
  Wrench,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Info,
  UserRound,
} from "lucide-react";
import masjidData from "@/data/masjid.json";

type ContactKey = keyof typeof masjidData.contacts;

interface OrgPosition {
  role: string;
  /** Key into masjidData.contacts; null when the name has not been announced yet. */
  contactKey: string | null;
  icon?: string;
  duty?: string;
}

interface OrgDivision {
  id: string;
  name: string;
  scope: string;
  color: string;
  icon: string;
  lead: OrgPosition;
  duties: string[];
}

interface OrganizationStructure {
  badge: string;
  title: string;
  subtitle: string;
  placeholder: string;
  placeholderNote: string;
  source: string;
  term: string;
  forum: { name: string; desc: string };
  advisory: { name: string; desc: string; members: OrgPosition[] };
  executive: { name: string; desc: string; members: OrgPosition[] };
  divisions: OrgDivision[];
}

const structure = masjidData.organizationStructure as OrganizationStructure;

function resolveName(contactKey: string | null): string | null {
  if (!contactKey) return null;
  const contact = masjidData.contacts[contactKey as ContactKey];
  return typeof contact === "object" && contact && "name" in contact ? contact.name : null;
}

const iconMap: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-5 h-5" />,
  ScrollText: <ScrollText className="w-5 h-5" />,
  HandCoins: <HandCoins className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
};

const colorStyles: Record<
  string,
  { badgeText: string; iconBg: string; borderHover: string; bulletColor: string; accentLine: string }
> = {
  emerald: {
    badgeText: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-700",
    borderHover: "hover:border-emerald-400",
    bulletColor: "text-emerald-600",
    accentLine: "from-emerald-500 to-teal-400",
  },
  amber: {
    badgeText: "bg-amber-50 text-amber-800 border-amber-200",
    iconBg: "bg-amber-100 text-amber-700",
    borderHover: "hover:border-amber-400",
    bulletColor: "text-amber-600",
    accentLine: "from-amber-500 to-yellow-400",
  },
  blue: {
    badgeText: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100 text-blue-700",
    borderHover: "hover:border-blue-400",
    bulletColor: "text-blue-600",
    accentLine: "from-blue-500 to-cyan-400",
  },
  indigo: {
    badgeText: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconBg: "bg-indigo-100 text-indigo-700",
    borderHover: "hover:border-indigo-400",
    bulletColor: "text-indigo-600",
    accentLine: "from-indigo-500 to-purple-400",
  },
};

function PersonName({ contactKey, light = false }: { contactKey: string | null; light?: boolean }) {
  const name = resolveName(contactKey);
  if (name) {
    return <span className={`font-bold ${light ? "text-white" : "text-slate-900"}`}>{name}</span>;
  }
  return (
    <span
      className={`italic font-medium ${light ? "text-emerald-200/80" : "text-slate-400"}`}
      title={structure.placeholderNote}
    >
      {structure.placeholder}
    </span>
  );
}

function Connector() {
  return <div className="w-px h-6 sm:h-8 bg-emerald-300 mx-auto" aria-hidden="true" />;
}

export interface StrukturOrganisasiSectionProps {
  onOpenAdArt: () => void;
}

export function StrukturOrganisasiSection({ onOpenAdArt }: StrukturOrganisasiSectionProps) {
  const { forum, advisory, executive, divisions } = structure;

  return (
    <section
      id="struktur-organisasi"
      className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left scroll-mt-20"
    >
      {/* Section header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 text-[#059669] font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          <Network className="w-3.5 h-3.5" />
          {structure.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{structure.title}</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{structure.subtitle}</p>
      </div>

      {/* Tier 1: Musyawarah Pleno */}
      <div className="max-w-xl mx-auto bg-gradient-to-r from-[#064e3b] via-emerald-900 to-slate-900 text-white rounded-2xl px-5 py-4 shadow-sm flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-800/90 border border-emerald-600/50 text-amber-300 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold text-amber-300 text-sm uppercase tracking-wider">{forum.name}</div>
          <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed mt-0.5">{forum.desc}</p>
        </div>
      </div>

      <Connector />

      {/* Tier 2: Dewan Penasehat (advisory line) */}
      <div className="max-w-xl mx-auto bg-amber-50/60 border border-dashed border-amber-300 rounded-2xl px-5 py-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <Landmark className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-slate-900">{advisory.name}</div>
          <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{advisory.desc}</p>
          <ul className="mt-2 space-y-1 text-xs">
            {advisory.members.map((m, idx) => (
              <li key={idx} className="flex flex-wrap gap-x-1.5">
                <span className="text-slate-500">{m.role}:</span>
                <PersonName contactKey={m.contactKey} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Connector />

      {/* Tier 3: Pengurus Harian */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7">
        <div className="text-center mb-5">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">{executive.name}</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{executive.desc}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {executive.members.map((m, idx) => {
            const isLead = idx === 0;
            return (
              <div
                key={m.role}
                className={`rounded-2xl p-4 border flex flex-col gap-2 transition ${
                  isLead
                    ? "bg-gradient-to-br from-emerald-50 to-white border-emerald-300"
                    : "bg-slate-50 border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    {iconMap[m.icon ?? ""] ?? <UserRound className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">{m.role}</div>
                    <div className="text-sm leading-snug">
                      <PersonName contactKey={m.contactKey} />
                    </div>
                  </div>
                </div>
                {m.duty && <p className="text-xs text-slate-600 leading-relaxed">{m.duty}</p>}
              </div>
            );
          })}
        </div>
      </div>

      <Connector />

      {/* Tier 4: Bidang Pelaksana */}
      <div className="text-center mb-5">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Bidang-Bidang Pelaksana</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {divisions.map((d) => {
          const style = colorStyles[d.color] ?? colorStyles.emerald;
          return (
            <div
              key={d.id}
              id={`bidang-${d.id}`}
              className={`group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${style.borderHover}`}
            >
              <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${style.accentLine}`} />
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${style.iconBg}`}>
                  {iconMap[d.icon] ?? <Users className="w-6 h-6" />}
                </div>
                <h4 className="text-base font-extrabold text-slate-900 leading-tight">{d.name}</h4>
              </div>
              <span className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full border mb-3 ${style.badgeText}`}>
                {d.scope}
              </span>
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs mb-3">
                <div className="text-slate-500">{d.lead.role}</div>
                <div className="text-sm">
                  <PersonName contactKey={d.lead.contactKey} />
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {d.duties.map((duty) => (
                  <li key={duty} className="flex items-start gap-1.5">
                    <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${style.bulletColor}`} />
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Notes & source */}
      <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>{structure.source}</p>
            <p>{structure.term}</p>
            <p className="italic text-slate-500">{structure.placeholderNote}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenAdArt}
          className="inline-flex items-center justify-center gap-1.5 shrink-0 px-4 py-2.5 rounded-xl bg-[#064e3b] hover:bg-emerald-800 text-white text-xs font-bold transition"
        >
          Baca AD/ART Lengkap <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}

export default StrukturOrganisasiSection;
