import { CheckCircle2, Clock, CircleDot, type LucideIcon } from "lucide-react";
import type { PhaseStatus } from "@/lib/construction";

export interface StatusStyle {
  label: string;
  icon: LucideIcon;
  /** Chip on light backgrounds */
  chip: string;
  /** Numbered dot on the timeline rail */
  dot: string;
  /** Progress bar fill */
  bar: string;
  /** Card surface */
  card: string;
  /** Segment colour on dark overview */
  segment: string;
  /** Tile on dark overview */
  tile: string;
}

export const statusStyle: Record<PhaseStatus, StatusStyle> = {
  Selesai: {
    label: "Selesai",
    icon: CheckCircle2,
    chip: "bg-emerald-100 text-emerald-800 border-emerald-300",
    dot: "bg-emerald-600 text-white ring-emerald-100",
    bar: "bg-emerald-500",
    card: "border-emerald-200 bg-white",
    segment: "bg-emerald-400",
    tile: "border-emerald-400/50 bg-emerald-500/15",
  },
  "Dalam Proses": {
    label: "Sedang Berjalan",
    icon: Clock,
    chip: "bg-amber-100 text-amber-800 border-amber-300",
    dot: "bg-amber-500 text-white ring-amber-100",
    bar: "bg-amber-400",
    card: "border-amber-300 bg-amber-50/40 ring-1 ring-amber-200/70",
    segment: "bg-amber-400",
    tile: "border-amber-400/70 bg-amber-400/15 ring-1 ring-amber-300/40",
  },
  Rencana: {
    label: "Rencana",
    icon: CircleDot,
    chip: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-white text-slate-500 border-2 border-slate-300 ring-slate-50",
    bar: "bg-slate-300",
    card: "border-slate-200 bg-white",
    segment: "bg-white/25",
    tile: "border-white/10 bg-white/5",
  },
};
