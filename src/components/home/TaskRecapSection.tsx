import React, { useState } from "react";
import {
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  BarChart3,
} from "lucide-react";
import masjidData from "@/data/masjid.json";

export function TaskRecapSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "Selesai" | "WIP" | "Belum">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "Tinggi" | "Rendah" | "none">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const taskRecap = (masjidData as any).taskRecap || {
    title: "Rekap Pelaksanaan Tugas",
    badge: "Transparansi & Akuntabilitas DKM",
    subtitle: "Daftar rekapitulasi realisasi agenda kerja, pembenahan fasilitas, dan rencana aksi DKM Masjid Nurul Falah Sukatani.",
    tasks: [],
  };

  const tasks: Array<{ id: number; task: string; status: "Selesai" | "WIP" | "Belum"; priority: string }> =
    taskRecap.tasks;

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "Selesai").length;
  const wipCount = tasks.filter((t) => t.status === "WIP").length;
  const pendingCount = tasks.filter((t) => t.status === "Belum").length;
  const percentage = Math.round((completedCount / (totalTasks || 1)) * 100);

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all"
        ? true
        : priorityFilter === "none"
        ? !t.priority
        : t.priority === priorityFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      t.task.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <section id="rekap-tugas" className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Container Accordion Utama */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        
        {/* Accordion Header / Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left cursor-pointer transition bg-gradient-to-r from-slate-50 via-white to-emerald-50/40 hover:bg-slate-100/70"
          aria-expanded={isOpen}
        >
          <div className="space-y-2 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200/80">
              <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{taskRecap.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>{taskRecap.title}</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {totalTasks} Agenda
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              {taskRecap.subtitle}
            </p>
          </div>

          {/* Progress Pill & Expand Chevron */}
          <div className="flex items-center gap-4 self-start md:self-center shrink-0">
            {/* Mini Progress Card */}
            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-2xs flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Realisasi Selesai
                </div>
                <div className="text-base font-extrabold text-emerald-700 font-mono">
                  {completedCount}/{totalTasks} ({percentage}%)
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200 shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>

            {/* Expand / Collapse Button */}
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                isOpen
                  ? "bg-emerald-600 text-white border-emerald-700 rotate-180"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </button>

        {/* Accordion Content Body */}
        {isOpen && (
          <div className="border-t border-slate-200 p-6 sm:p-8 bg-slate-50/60 animate-in fade-in duration-200">
            
            {/* Quick Stat Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {totalTasks}
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Agenda</div>
                  <div className="text-xs font-bold text-slate-800">100% Agenda Kerja</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-emerald-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Selesai</div>
                  <div className="text-xs font-bold text-emerald-900">{completedCount} Tugas ({percentage}%)</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                  <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Sedang Berjalan (WIP)</div>
                  <div className="text-xs font-bold text-amber-900">{wipCount} Tugas</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                  <AlertCircle className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Belum Dikerjakan</div>
                  <div className="text-xs font-bold text-slate-700">{pendingCount} Tugas</div>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-5">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari tugas / agenda kegiatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-xs">
                <span className="text-[10px] font-bold text-slate-400 px-2 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Status:
                </span>
                {[
                  { id: "all", label: `Semua (${totalTasks})` },
                  { id: "Selesai", label: `Selesai (${completedCount})` },
                  { id: "WIP", label: `WIP (${wipCount})` },
                  { id: "Belum", label: `Belum (${pendingCount})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setStatusFilter(f.id as any)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                      statusFilter === f.id
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                      <th className="py-3 px-4 font-bold w-12 text-center text-slate-500">No.</th>
                      <th className="py-3 px-4 font-bold">Agenda Kegiatan</th>
                      <th className="py-3 px-4 font-bold w-32 text-center">Status</th>
                      <th className="py-3 px-4 font-bold w-32 text-center">Prioritas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTasks.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 text-xs font-medium">
                          Tidak ada agenda tugas yang cocok dengan pencarian / filter ini.
                        </td>
                      </tr>
                    ) : (
                      filteredTasks.map((t, idx) => {
                        let statusBadge = (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
                            Selesai
                          </span>
                        );

                        if (t.status === "WIP") {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              <Clock className="w-3 h-3 text-amber-700 shrink-0 animate-pulse" />
                              WIP
                            </span>
                          );
                        } else if (t.status === "Belum") {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                              <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />
                              Belum
                            </span>
                          );
                        }

                        let priorityBadge = <span className="text-slate-300 text-[11px]">-</span>;
                        if (t.priority === "Tinggi") {
                          priorityBadge = (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              Tinggi
                            </span>
                          );
                        } else if (t.priority === "Rendah") {
                          priorityBadge = (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              Rendah
                            </span>
                          );
                        }

                        return (
                          <tr
                            key={t.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              idx % 2 === 1 ? "bg-slate-50/30" : "bg-white"
                            }`}
                          >
                            <td className="py-2.5 px-4 text-center font-mono text-slate-400 text-[11px]">
                              {idx + 1}
                            </td>
                            <td className="py-2.5 px-4 font-medium text-slate-800">
                              {t.task}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              {statusBadge}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              {priorityBadge}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Summary */}
              <div className="py-2.5 px-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                <span>
                  Menampilkan <b>{filteredTasks.length}</b> dari total <b>{totalTasks}</b> agenda
                </span>
                <span className="font-semibold text-emerald-800">
                  {completedCount} Selesai • {wipCount} Sedang Dikerjakan (WIP) • {pendingCount} Belum
                </span>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

export default TaskRecapSection;
