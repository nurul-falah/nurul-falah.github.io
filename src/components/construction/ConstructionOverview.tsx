import React from "react";
import { Wallet, HardHat, ListChecks, CalendarRange, Info } from "lucide-react";
import {
  construction,
  formatPercent,
  formatRupiah,
  formatRupiahShort,
} from "@/lib/construction";
import { statusStyle } from "./phaseStyle";

export interface ConstructionOverviewProps {
  onSelectPhase?: (phase: number) => void;
}

const { fund, phases, counts, period, physicalPercent, totalPhaseBudget } = construction;

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  percent,
  barClass,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  sub: React.ReactNode;
  percent?: number;
  barClass?: string;
  note?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 flex flex-col gap-2 min-w-0">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-200">
        <Icon className="w-4 h-4 text-amber-300 shrink-0" />
        {label}
      </div>
      <div className="text-2xl sm:text-[1.7rem] font-extrabold text-white font-mono leading-none break-words">
        {value}
      </div>
      <div className="text-xs text-emerald-100/80">{sub}</div>
      {typeof percent === "number" && (
        <div className="w-full bg-emerald-950/70 h-2 rounded-full overflow-hidden mt-auto">
          <div
            className={`h-full rounded-full ${barClass ?? "bg-amber-400"}`}
            style={{ width: `${Math.min(100, Math.max(percent, 0.8))}%` }}
          />
        </div>
      )}
      {note && <div className="text-[11px] leading-snug text-emerald-200/70">{note}</div>}
    </div>
  );
}

export function ConstructionOverview({ onSelectPhase }: ConstructionOverviewProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#064e3b] to-emerald-900 text-white p-4 sm:p-6 shadow-lg border border-emerald-800/40 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1">
            Ringkasan Pembangunan
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold leading-tight">
            Peta Jalan {counts.total} Tahap Pembangunan Masjid
          </h4>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
            <CalendarRange className="w-3.5 h-3.5 text-amber-300" />
            {period.start} – {period.end}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 font-mono">
            Total {formatRupiahShort(totalPhaseBudget)}
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Kpi
          icon={Wallet}
          label="Dana Terhimpun"
          value={`${formatPercent(fund.percent)}%`}
          sub={
            <>
              <b className="text-white font-mono">{formatRupiah(fund.raised)}</b> dari{" "}
              <span className="font-mono">{formatRupiah(fund.target)}</span>
            </>
          }
          percent={fund.percent}
          barClass="bg-gradient-to-r from-amber-400 to-amber-500"
          note={<>Data kas per {fund.lastUpdate}</>}
        />
        <Kpi
          icon={HardHat}
          label="Progres Fisik (estimasi)"
          value={`${formatPercent(physicalPercent)}%`}
          sub="Seluruh tahap, dibobot sesuai anggaran tiap tahap"
          percent={physicalPercent}
          barClass="bg-gradient-to-r from-emerald-400 to-emerald-300"
          note="Dari progres per tahap; angka Tahap 2 belum diverifikasi lapangan."
        />
        <Kpi
          icon={ListChecks}
          label="Status Tahapan"
          value={
            <>
              {counts.done}
              <span className="text-emerald-300/70 text-lg">/{counts.total}</span>
            </>
          }
          sub={`${counts.done} selesai · ${counts.ongoing} berjalan · ${counts.planned} rencana`}
          note={
            <div className="flex gap-1.5 pt-1">
              {phases.map((p) => (
                <span
                  key={p.phase}
                  className={`h-2 flex-1 rounded-full ${statusStyle[p.status].segment}`}
                  title={`Tahap ${p.phase}: ${p.status}`}
                />
              ))}
            </div>
          }
        />
      </div>

      {/* Budget map: each segment = phase budget share, fill = phase progress */}
      <div className="rounded-2xl bg-black/20 border border-white/10 p-3.5 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
          <span className="font-bold text-white">Peta Anggaran per Tahap</span>
          <span className="text-emerald-200/80">
            Lebar = porsi anggaran · Isi = progres pekerjaan
          </span>
        </div>

        <div className="relative pt-5">
          {/* Fund marker */}
          <div
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left: `${Math.min(fund.percent, 100)}%` }}
          >
            <span className="absolute top-0 -left-[5px] whitespace-nowrap text-[10px] font-bold text-amber-300 leading-none">
              ▼ Dana terhimpun {formatRupiahShort(fund.raised)}
            </span>
            <span className="absolute top-3.5 bottom-0 left-0 w-0.5 bg-amber-300 rounded-full" />
          </div>
          <div className="flex h-5 w-full rounded-lg overflow-hidden bg-emerald-950/80 gap-[2px]">
            {phases.map((p) => (
              <button
                key={p.phase}
                type="button"
                onClick={() => onSelectPhase?.(p.phase)}
                className="relative h-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                style={{ width: `${p.budgetShare}%` }}
                title={`Tahap ${p.phase} · ${p.targetBudget} · ${p.progressPercent}%`}
                aria-label={`Tahap ${p.phase}`}
              >
                <span
                  className={`absolute inset-y-0 left-0 ${statusStyle[p.status].segment}`}
                  style={{ width: `${p.progressPercent}%` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Phase tiles / legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {phases.map((p) => {
            const st = statusStyle[p.status];
            const Icon = st.icon;
            return (
              <button
                key={p.phase}
                type="button"
                onClick={() => onSelectPhase?.(p.phase)}
                className={`text-left rounded-xl border p-2.5 transition hover:border-white/40 cursor-pointer min-w-0 ${st.tile} ${
                  p.phase === phases.length && phases.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-100">
                    Tahap {p.phase}
                  </span>
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      p.status === "Selesai"
                        ? "text-emerald-300"
                        : p.status === "Dalam Proses"
                        ? "text-amber-300"
                        : "text-slate-400"
                    }`}
                  />
                </div>
                <div className="font-mono font-bold text-sm text-white leading-tight">
                  {formatRupiahShort(p.budget)}
                </div>
                <div className="text-[10px] text-emerald-200/80 mt-0.5">
                  {formatPercent(p.budgetShare)}% anggaran · {p.quarter}
                </div>
                <div className="text-[10px] font-semibold mt-1 text-white/90">
                  {p.status === "Rencana" ? "Rencana" : `${p.progressPercent}% · ${st.label}`}
                </div>
              </button>
            );
          })}
        </div>

        <p className="flex items-start gap-1.5 text-[11px] text-emerald-200/80 leading-snug">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-300" />
          <span>
            Penanda ▼ hanya membandingkan dana terhimpun dengan kebutuhan kumulatif. Penggunaan
            dana per tahap: <b className="text-amber-200">Belum dikonfirmasi</b>.
          </span>
        </p>
      </div>
    </div>
  );
}

export default ConstructionOverview;
