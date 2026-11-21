import React from "react";
import { ChevronDown, CalendarDays, Wallet } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export interface LedgerEntry {
  no?: string;
  date: string;
  rt?: string;
  description: string;
  masuk: number | null;
  keluar: number | null;
  saldo: number | null;
  groupYear: number;
  groupMonth: number;
  isOpening?: boolean;
}

export interface LedgerReport {
  id: string;
  title: string;
  subtitle: string;
  asOf: string;
  latestBalance: number;
  totalMasuk: number;
  totalKeluar: number;
  openingBalance?: number;
  openingBalanceAsOf?: string;
  sourceNote: string;
  rowCount: number;
  defaultExpandedYears: number[];
  defaultExpandedMonths: string[];
  entries: LedgerEntry[];
}

const MONTHS_ID = [
  "",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function formatRp(n: number | null | undefined): string {
  if (n === null || n === undefined) return "";
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function monthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}`;
}

interface MonthGroup {
  month: number;
  key: string;
  label: string;
  entries: LedgerEntry[];
}

interface YearGroup {
  year: number;
  count: number;
  months: MonthGroup[];
}

function groupEntries(entries: LedgerEntry[]): YearGroup[] {
  const years = new Map<number, Map<number, LedgerEntry[]>>();
  for (const entry of entries) {
    let months = years.get(entry.groupYear);
    if (!months) {
      months = new Map();
      years.set(entry.groupYear, months);
    }
    const list = months.get(entry.groupMonth) ?? [];
    list.push(entry);
    months.set(entry.groupMonth, list);
  }

  return [...years.keys()]
    .sort((a, b) => b - a)
    .map((year) => {
      const months = years.get(year)!;
      const monthGroups = [...months.keys()]
        .sort((a, b) => b - a)
        .map((month) => ({
          month,
          key: monthKey(year, month),
          label: `${MONTHS_ID[month]} ${year}`,
          entries: [...(months.get(month) ?? [])].reverse(),
        }));
      return {
        year,
        count: monthGroups.reduce((sum, m) => sum + m.entries.length, 0),
        months: monthGroups,
      };
    });
}

function Amount({
  value,
  tone,
}: {
  value: number | null;
  tone: "in" | "out" | "saldo";
}) {
  if (value === null) {
    return <span className="text-slate-300">—</span>;
  }
  const color =
    tone === "in"
      ? "text-emerald-700"
      : tone === "out"
        ? "text-red-600"
        : "text-slate-800";
  return <span className={`font-mono font-semibold tabular-nums ${color}`}>{formatRp(value)}</span>;
}

export function KasLedgerSection({
  data,
  variant,
}: {
  data: LedgerReport;
  variant: "kotak" | "bangunan";
}) {
  const { tx, locale } = useI18n();

  const groups = React.useMemo(() => groupEntries(data.entries), [data.entries]);
  const [openYears, setOpenYears] = React.useState<Set<number>>(
    () => new Set(data.defaultExpandedYears),
  );
  const [openMonths, setOpenMonths] = React.useState<Set<string>>(
    () => new Set(data.defaultExpandedMonths),
  );
  const showExtraCols = variant === "bangunan";

  const toggleYear = (year: number) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const toggleMonth = (key: string) => {
    setOpenMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section
      id={data.id}
      data-ledger={data.id}
      className="mb-12 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs scroll-mt-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            {tx(data.subtitle)}
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">{tx(data.title)}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 self-start">
          <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
          {tx("Per {date}", { date: data.asOf })}
        </span>
      </div>

      <div className={`grid grid-cols-2 ${data.openingBalance != null ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-3 mb-5`}>
        <div className="col-span-2 sm:col-span-1 rounded-xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 border border-emerald-200/90 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">{tx("Saldo terakhir")}</div>
          <div className="mt-1 text-xl sm:text-2xl font-black font-mono text-[#064e3b] tabular-nums">
            {formatRp(data.latestBalance)}
          </div>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{tx("Total Masuk")}</div>
          <div className="mt-1 text-base sm:text-lg font-bold font-mono text-emerald-700 tabular-nums">
            {formatRp(data.totalMasuk)}
          </div>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-red-700">{tx("Total Keluar")}</div>
          <div className="mt-1 text-base sm:text-lg font-bold font-mono text-red-600 tabular-nums">
            {formatRp(data.totalKeluar)}
          </div>
        </div>
        {data.openingBalance != null && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 col-span-2 lg:col-span-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{tx("Saldo awal")}</div>
            <div className="mt-1 text-base sm:text-lg font-bold font-mono text-slate-800 tabular-nums">
              {formatRp(data.openingBalance)}
            </div>
            {data.openingBalanceAsOf && (
              <div className="text-[11px] text-slate-500 mt-0.5">Per {data.openingBalanceAsOf}</div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {groups.map((yearGroup) => {
          const yearOpen = openYears.has(yearGroup.year);
          return (
            <div key={yearGroup.year} className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                type="button"
                aria-expanded={yearOpen}
                onClick={() => toggleYear(yearGroup.year)}
                className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 transition text-start cursor-pointer"
              >
                <span className="font-extrabold text-slate-900">{yearGroup.year}</span>
                <span className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                  {tx("{count} entri", { count: yearGroup.count })}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${yearOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              {yearOpen && (
                <div className="border-t border-slate-200 divide-y divide-slate-100">
                  {yearGroup.months.map((monthGroup) => {
                    const monthOpen = openMonths.has(monthGroup.key);
                    return (
                      <div key={monthGroup.key} data-month={monthGroup.key}>
                        <button
                          type="button"
                          aria-expanded={monthOpen}
                          onClick={() => toggleMonth(monthGroup.key)}
                          className="w-full flex items-center justify-between gap-3 px-3.5 py-2 hover:bg-emerald-50/50 transition text-start cursor-pointer"
                        >
                          <span className="text-sm font-bold text-slate-800">{tx(MONTHS_ID[monthGroup.month])} {monthGroup.key.slice(0, 4)}</span>
                          <span className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                            {tx("{count} entri", { count: monthGroup.entries.length })}
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${monthOpen ? "rotate-180" : ""}`}
                            />
                          </span>
                        </button>

                        {monthOpen && (
                          <>
                          <div className="sm:hidden divide-y divide-slate-100 border-t border-slate-100">
                            {monthGroup.entries.map((entry, idx) => (
                              <article
                                key={`card-${monthGroup.key}-${idx}-${entry.date}-${entry.description}`}
                                className={`px-3.5 py-3 ${entry.isOpening ? "bg-slate-50" : "bg-white"}`}
                              >
                                <div className="flex items-baseline justify-between gap-2">
                                  <div className="min-w-0">
                                    {showExtraCols && (entry.no || entry.rt) && (
                                      <div className="text-[10px] font-medium text-slate-500 mb-0.5">
                                        {entry.no ? `${tx("No.")} ${entry.no}` : ""}
                                        {entry.no && entry.rt ? " · " : ""}
                                        {entry.rt ? `${tx("RT")} ${entry.rt}` : ""}
                                      </div>
                                    )}
                                    <div className="text-sm font-semibold text-slate-900 leading-snug">
                                      {entry.description}
                                    </div>
                                    {entry.isOpening && data.openingBalanceAsOf && (
                                      <div className="text-[11px] text-slate-500 font-medium">
                                        Per {data.openingBalanceAsOf}
                                      </div>
                                    )}
                                  </div>
                                  <div className="shrink-0 text-[11px] font-mono text-slate-500 whitespace-nowrap">
                                    {entry.date || "—"}
                                  </div>
                                </div>
                                <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <dt className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{tx("Masuk")}</dt>
                                    <dd className="mt-0.5"><Amount value={entry.masuk} tone="in" /></dd>
                                  </div>
                                  <div>
                                    <dt className="text-[10px] font-bold uppercase tracking-wider text-red-700">{tx("Keluar")}</dt>
                                    <dd className="mt-0.5"><Amount value={entry.keluar} tone="out" /></dd>
                                  </div>
                                  <div className="text-end">
                                    <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{tx("Saldo")}</dt>
                                    <dd className="mt-0.5"><Amount value={entry.saldo} tone="saldo" /></dd>
                                  </div>
                                </dl>
                              </article>
                            ))}
                          </div>
                          <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full min-w-[640px] text-sm border-t border-slate-100">
                              <thead className="sticky top-0 z-10 bg-white">
                                <tr className="text-[10px] uppercase tracking-wider text-slate-500">
                                  {showExtraCols && (
                                    <th className="text-start font-bold px-3 py-2 w-12">{tx("No.")}</th>
                                  )}
                                  <th className="text-start font-bold px-3 py-2 w-28">{tx("Tanggal")}</th>
                                  {showExtraCols && (
                                    <th className="text-start font-bold px-3 py-2 w-16">{tx("RT")}</th>
                                  )}
                                  <th className="text-start font-bold px-3 py-2">
                                    {showExtraCols ? "Nama" : "Keterangan"}
                                  </th>
                                  <th className="text-end font-bold px-3 py-2 w-36">{tx("Masuk")}</th>
                                  <th className="text-end font-bold px-3 py-2 w-36">{tx("Keluar")}</th>
                                  <th className="text-end font-bold px-3 py-2 w-36">{tx("Saldo")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {monthGroup.entries.map((entry, idx) => (
                                  <tr
                                    key={`${monthGroup.key}-${idx}-${entry.date}-${entry.description}`}
                                    className={`border-t border-slate-100 ${entry.isOpening ? "bg-slate-50" : "odd:bg-white even:bg-slate-50/50"}`}
                                  >
                                    {showExtraCols && (
                                      <td className="px-3 py-2 text-slate-500 font-mono text-xs whitespace-nowrap">
                                        {entry.no || "—"}
                                      </td>
                                    )}
                                    <td className="px-3 py-2 text-slate-700 font-mono text-xs whitespace-nowrap">
                                      {entry.date || "—"}
                                    </td>
                                    {showExtraCols && (
                                      <td className="px-3 py-2 text-slate-600 text-xs whitespace-nowrap">
                                        {entry.rt || "—"}
                                      </td>
                                    )}
                                    <td className="px-3 py-2 text-slate-800">
                                      {entry.description}
                                      {entry.isOpening && data.openingBalanceAsOf && (
                                        <span className="block text-[11px] text-slate-500 font-medium">
                                          Per {data.openingBalanceAsOf}
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-3 py-2 text-end whitespace-nowrap">
                                      <Amount value={entry.masuk} tone="in" />
                                    </td>
                                    <td className="px-3 py-2 text-end whitespace-nowrap">
                                      <Amount value={entry.keluar} tone="out" />
                                    </td>
                                    <td className="px-3 py-2 text-end whitespace-nowrap">
                                      <Amount value={entry.saldo} tone="saldo" />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">{tx(data.sourceNote)}</p>
      {locale !== "id" && (
        <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
          {tx("Uraian tiap baris jurnal ditampilkan sesuai catatan asli berbahasa Indonesia, tanpa diubah.")}
        </p>
      )}
    </section>
  );
}
