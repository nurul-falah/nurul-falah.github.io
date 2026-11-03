/**
 * Single source of truth for construction & building-fund numbers.
 * Every percentage shown on the site is derived here from masjid.json,
 * so no component hardcodes a progress figure.
 */
import masjidData from "@/data/masjid.json";

export type PhaseStatus = "Selesai" | "Dalam Proses" | "Rencana";

export interface PhaseMedia {
  title: string;
  desc: string;
  filename: string;
  poster?: string;
}

export interface ConstructionPhase {
  phase: number;
  title: string;
  desc: string;
  badge: string;
  status: PhaseStatus;
  timeline: string;
  quarter: string;
  targetBudget: string;
  milestone: string;
  progressPercent: number;
  /** false = scope/schedule/budget is still a planning estimate, not confirmed by DKM. */
  scheduleConfirmed?: boolean;
  photos?: PhaseMedia[];
  videos?: PhaseMedia[];
}

export interface PhaseView extends ConstructionPhase {
  budget: number;
  /** Share of the total construction budget, 0–100. */
  budgetShare: number;
  /** Cumulative budget before this phase starts (for stacked bars). */
  budgetOffset: number;
}

/** "Rp 57.391.000" → 57391000 */
export function parseRupiah(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

/** 57391000 → "Rp 57.391.000" */
export function formatRupiah(value: number): string {
  return "Rp " + Math.round(value).toLocaleString("id-ID");
}

/** 57391000 → "Rp 57,4 jt" */
export function formatRupiahShort(value: number): string {
  const jt = value / 1_000_000;
  const text = jt.toLocaleString("id-ID", { maximumFractionDigits: jt >= 100 ? 0 : 1 });
  return `Rp ${text} jt`;
}

/** 9.565 → "9,6" */
export function formatPercent(value: number, digits = 1): string {
  return value.toLocaleString("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

const rawPhases = masjidData.constructionPhases as unknown as ConstructionPhase[];

const totalPhaseBudget = rawPhases.reduce((s, p) => s + parseRupiah(p.targetBudget), 0);

let offset = 0;
export const phases: PhaseView[] = rawPhases.map((p) => {
  const budget = parseRupiah(p.targetBudget);
  const view: PhaseView = {
    ...p,
    budget,
    budgetShare: totalPhaseBudget ? (budget / totalPhaseBudget) * 100 : 0,
    budgetOffset: offset,
  };
  offset += budget;
  return view;
});

const fin = masjidData.financial;
const fundRaised = parseRupiah(fin.buildingFundAllocated);
const fundTarget = parseRupiah(fin.buildingFundTarget);

/** Weighted by each phase's budget: Σ(budget × progress) / Σ budget. */
const weightedPhysical = totalPhaseBudget
  ? phases.reduce((s, p) => s + p.budget * p.progressPercent, 0) / totalPhaseBudget
  : 0;

/** "Agustus - September 2026" → "Agustus 2026" (borrows the year when the start has none). */
function periodStart(timeline: string): string {
  const [start = "", end = ""] = timeline.split(" - ");
  if (/\d{4}/.test(start)) return start.trim();
  const year = end.match(/\d{4}/)?.[0];
  return year ? `${start.trim()} ${year}` : start.trim();
}

const count = (s: PhaseStatus) => phases.filter((p) => p.status === s).length;

export const construction = {
  phases,
  fund: {
    raised: fundRaised,
    target: fundTarget,
    /** Dana terhimpun ÷ target, 0–100 (not rounded). */
    percent: fundTarget ? (fundRaised / fundTarget) * 100 : 0,
    lastUpdate: fin.lastUpdate,
  },
  totalPhaseBudget,
  /** True when the sum of phase budgets equals the published fund target. */
  budgetMatchesTarget: totalPhaseBudget === fundTarget,
  /** Budget-weighted physical progress across all phases, 0–100. */
  physicalPercent: weightedPhysical,
  counts: {
    total: phases.length,
    done: count("Selesai"),
    ongoing: count("Dalam Proses"),
    planned: count("Rencana"),
  },
  period: {
    start: periodStart(phases[0]?.timeline ?? ""),
    end: phases[phases.length - 1]?.timeline.split(" - ").pop() ?? "",
  },
};

/** Tasks in Rekap Tugas explicitly tagged "Fase N - …" for a given phase. */
export function tasksForPhase(phase: number) {
  const prefix = new RegExp(`^(Fase|Tahap)\\s*${phase}\\s*-\\s*`, "i");
  return masjidData.taskRecap.tasks
    .filter((t) => prefix.test(t.task))
    .map((t) => ({ ...t, label: t.task.replace(prefix, "") }));
}
