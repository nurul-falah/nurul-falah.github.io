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
  /** Additional named members of the division, shown under the lead. */
  members?: string[];
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

const LINE = "bg-emerald-300";

function PersonName({ contactKey, light = false }: { contactKey: string | null; light?: boolean }) {
  const name = resolveName(contactKey);
  if (name) {
    return <span className={`font-bold ${light ? "text-white" : "text-slate-900"}`}>{name}</span>;
  }
  return (
    <span
      className={`inline-block italic font-medium text-xs px-2 py-0.5 rounded-md border border-dashed ${
        light ? "text-emerald-100 border-emerald-300/60" : "text-slate-600 bg-white border-slate-300"
      }`}
      title={structure.placeholderNote}
    >
      {structure.placeholder}
    </span>
  );
}

function TierLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-[11px] font-bold uppercase tracking-wider text-emerald-800 ${className}`}>{children}</div>
  );
}

/* ---------- Nodes ---------- */

function ForumNode() {
  const { forum } = structure;
  return (
    <div className="bg-gradient-to-r from-[#064e3b] via-emerald-900 to-slate-900 text-white rounded-2xl px-5 py-4 shadow-sm flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-emerald-800/90 border border-emerald-600/50 text-amber-300 flex items-center justify-center shrink-0">
        <Users className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="font-bold text-amber-300 text-sm uppercase tracking-wider">{forum.name}</div>
        <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed mt-0.5">{forum.desc}</p>
      </div>
    </div>
  );
}

function AdvisoryNode() {
  const { advisory } = structure;
  return (
    <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl px-4 py-3.5 flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
        <Landmark className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">{advisory.name}</div>
        {advisory.members.map((m, idx) => (
          <div key={idx} className="text-sm leading-snug mt-0.5">
            <PersonName contactKey={m.contactKey} />
          </div>
        ))}
        <p className="text-xs text-slate-700 leading-relaxed mt-1.5">{advisory.desc}</p>
      </div>
    </div>
  );
}

function ExecutiveNode({ member, lead = false }: { member: OrgPosition; lead?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-4 border flex flex-col gap-2 ${
        lead
          ? "bg-gradient-to-br from-emerald-50 to-white border-emerald-400 shadow-md ring-4 ring-emerald-50"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            lead ? "bg-[#064e3b] text-amber-300" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {iconMap[member.icon ?? ""] ?? <UserRound className="w-5 h-5" />}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">{member.role}</div>
          <div className={lead ? "text-base leading-snug" : "text-sm leading-snug"}>
            <PersonName contactKey={member.contactKey} />
          </div>
        </div>
      </div>
      {member.duty && <p className="text-xs text-slate-600 leading-relaxed">{member.duty}</p>}
    </div>
  );
}

function DivisionCard({ d }: { d: OrgDivision }) {
  const style = colorStyles[d.color] ?? colorStyles.emerald;
  return (
    <div
      id={`bidang-${d.id}`}
      className={`group/card relative h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${style.borderHover}`}
    >
      <div className={`absolute top-0 left-5 right-5 h-1 rounded-b-full bg-gradient-to-r ${style.accentLine}`} />
      <div className="flex items-center gap-3 mb-2.5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg}`}>
          {iconMap[d.icon] ?? <Users className="w-6 h-6" />}
        </div>
        <h4 className="text-base font-extrabold text-slate-900 leading-tight">{d.name}</h4>
      </div>
      <span className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full border mb-3 leading-snug ${style.badgeText}`}>
        {d.scope}
      </span>
      <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 mb-3">
        <div className="text-[11px] font-semibold text-slate-600">{d.lead.role}</div>
        <div className="text-sm leading-snug">
          <PersonName contactKey={d.lead.contactKey} />
        </div>
        {d.members && d.members.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-200">
            <div className="text-[11px] font-semibold text-slate-600 mb-1">Anggota</div>
            <ul className="flex flex-wrap gap-1.5">
              {d.members.map((name) => (
                <li
                  key={name}
                  className="text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-md px-2 py-0.5"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ul className="space-y-1.5 text-xs text-slate-700">
        {d.duties.map((duty) => (
          <li key={duty} className="flex items-start gap-1.5">
            <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${style.bulletColor}`} />
            <span>{duty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Mobile / tablet tree (below lg) ---------- */

/** One branch of the stacked tree: a spine on the left and an elbow into the node. */
function TreeItem({
  children,
  dashed = false,
  continues = false,
}: {
  children: React.ReactNode;
  dashed?: boolean;
  /** Keep the spine running past this item (the trunk continues to the next tier). */
  continues?: boolean;
}) {
  return (
    <li className="group/tree relative pl-8 pt-3">
      <span
        aria-hidden="true"
        className={`absolute left-3 top-0 bottom-0 w-0.5 ${LINE} ${continues ? "" : "group-last/tree:bottom-auto group-last/tree:h-9"}`}
      />
      <span
        aria-hidden="true"
        className={`absolute left-3 top-9 w-5 ${dashed ? "border-t-2 border-dashed border-amber-400" : `h-0.5 ${LINE}`}`}
      />
      {children}
    </li>
  );
}

function MobileTree() {
  const { advisory, executive } = structure;
  const [ketua, ...staff] = executive.members;
  return (
    <div className="lg:hidden">
      <ForumNode />
      <ul aria-label={`Di bawah ${structure.forum.name}`}>
        <TreeItem dashed continues>
          <TierLabel className="mb-1.5 text-amber-800">Garis nasihat</TierLabel>
          <AdvisoryNode />
        </TreeItem>
      </ul>
      {/* Spine continues into the Pengurus Harian panel */}
      <div aria-hidden="true" className={`ml-3 w-0.5 h-4 ${LINE}`} />
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-3 sm:p-4">
        <TierLabel className="mb-0.5">{executive.name}</TierLabel>
        <p className="text-xs text-slate-600 mb-3">{executive.desc}</p>
        <ExecutiveNode member={ketua} lead />
        <ul aria-label={`Di bawah ${ketua.role}`}>
          {staff.map((m) => (
            <TreeItem key={m.role}>
              <ExecutiveNode member={m} />
            </TreeItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Desktop chart (lg and up) ---------- */

function DesktopChart() {
  const { executive } = structure;
  const [ketua, sekretaris, bendahara] = executive.members;
  return (
    <div className="hidden lg:block">
      <div className="max-w-xl mx-auto">
        <ForumNode />
      </div>
      <div aria-hidden="true" className={`w-0.5 h-8 mx-auto ${LINE}`} />

      <div className="relative rounded-3xl border border-emerald-200 bg-emerald-50/40 px-6 pb-6">
        {/* Panel header on the left; trunk keeps running through the centre */}
        <div className="grid grid-cols-[1fr_2px_1fr]">
          <div className="pt-4 pb-4 pr-6">
            <TierLabel>{executive.name}</TierLabel>
            <p className="text-xs text-slate-600 mt-0.5 max-w-sm">{executive.desc}</p>
          </div>
          <div aria-hidden="true" className={LINE} />
          <div />
        </div>

        {/* Ketua + advisory (dotted) line */}
        <div className="grid grid-cols-[1fr_minmax(0,20rem)_1fr] xl:grid-cols-[1fr_minmax(0,22rem)_1fr] items-stretch">
          <div />
          <div className="flex flex-col">
            <ExecutiveNode member={ketua} lead />
            <div aria-hidden="true" className={`flex-1 w-0.5 mx-auto ${LINE}`} />
          </div>
          <div className="flex items-start min-w-0">
            {/* dashed advisory line, aligned with the middle of the Ketua card */}
            <div className="flex-1 min-w-12 relative mt-11">
              <div aria-hidden="true" className="border-t-2 border-dashed border-amber-400" />
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider text-amber-800 whitespace-nowrap">
                nasihat
              </span>
            </div>
            <div className="w-60 xl:w-72 shrink-0">
              <AdvisoryNode />
            </div>
          </div>
        </div>

        {/* Staff positions hanging off the trunk */}
        <div className="grid grid-cols-[1fr_2px_1fr] items-stretch">
          <div className="flex items-center pt-6">
            <div className="flex-1" />
            <div className="w-72 shrink-0">
              {sekretaris && <ExecutiveNode member={sekretaris} />}
            </div>
            <div aria-hidden="true" className={`w-12 h-0.5 ${LINE}`} />
          </div>
          <div aria-hidden="true" className={LINE} />
          <div className="flex items-center pt-6">
            <div aria-hidden="true" className={`w-12 h-0.5 ${LINE}`} />
            <div className="w-72 shrink-0">
              {bendahara && <ExecutiveNode member={bendahara} />}
            </div>
            <div className="flex-1" />
          </div>
        </div>
        {/* Trunk leaves the panel towards the divisions */}
        <div aria-hidden="true" className={`absolute left-1/2 -translate-x-1/2 -bottom-px w-0.5 h-6 ${LINE}`} />
      </div>
      <div aria-hidden="true" className={`w-0.5 h-6 mx-auto ${LINE}`} />
    </div>
  );
}

/* ---------- Divisions: bus connector on desktop, tree on mobile ---------- */

function Divisions() {
  const { divisions } = structure;
  return (
    <div>
      {/* Mobile: spine from Pengurus Harian into the list */}
      <div aria-hidden="true" className={`lg:hidden ml-3 w-0.5 h-4 ${LINE}`} />
      <div className="lg:text-center pl-8 lg:pl-0 relative">
        <span aria-hidden="true" className={`lg:hidden absolute left-3 top-0 bottom-0 w-0.5 ${LINE}`} />
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-emerald-200 px-3.5 py-1.5 shadow-sm">
          <Network className="w-3.5 h-3.5 text-emerald-700" />
          <h3 className="text-sm font-extrabold text-slate-900">Bidang-Bidang Pelaksana</h3>
        </div>
      </div>
      <div className="relative lg:mt-6">
        {/* Desktop bus bar spanning the centres of the first and last column */}
        <span aria-hidden="true" className={`hidden lg:block absolute -top-6 left-[12.5%] right-[12.5%] h-0.5 ${LINE}`} />
        <ul className="grid lg:grid-cols-4 gap-x-4 lg:gap-x-5 lg:gap-y-0">
          {divisions.map((d) => (
            <li key={d.id} className="group/tree relative pl-8 pt-3 lg:pl-0 lg:pt-0">
              {/* mobile spine + elbow */}
              <span
                aria-hidden="true"
                className={`lg:hidden absolute left-3 top-0 bottom-0 w-0.5 ${LINE} group-last/tree:bottom-auto group-last/tree:h-9`}
              />
              <span aria-hidden="true" className={`lg:hidden absolute left-3 top-9 w-5 h-0.5 ${LINE}`} />
              {/* desktop drop from bus */}
              <span aria-hidden="true" className={`hidden lg:block absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-0.5 ${LINE}`} />
              <DivisionCard d={d} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export interface StrukturOrganisasiSectionProps {
  onOpenAdArt: () => void;
}

export function StrukturOrganisasiSection({ onOpenAdArt }: StrukturOrganisasiSectionProps) {
  return (
    <section
      id="struktur-organisasi"
      className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left scroll-mt-20"
    >
      {/* Section header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          <Network className="w-3.5 h-3.5" />
          {structure.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{structure.title}</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{structure.subtitle}</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-700 mb-6">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className={`inline-block w-6 h-0.5 ${LINE}`} /> Garis komando
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="inline-block w-6 border-t-2 border-dashed border-amber-400" /> Garis nasihat
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="italic text-[11px] px-1.5 rounded border border-dashed border-slate-300 text-slate-600">
            {structure.placeholder}
          </span>
          Belum ditetapkan
        </span>
      </div>

      <DesktopChart />
      <MobileTree />
      <Divisions />

      {/* Notes & source */}
      <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>{structure.source}</p>
            <p>{structure.term}</p>
            <p className="italic text-slate-600">{structure.placeholderNote}</p>
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
