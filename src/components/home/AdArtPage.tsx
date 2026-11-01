import React, { useState, useMemo } from "react";
import {
  Scale,
  BookOpen,
  ShieldCheck,
  Search,
  Printer,
  Share2,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Sparkles,
  ChevronRight,
  Check,
  Building2,
  Gavel,
} from "lucide-react";
import { adArtData, AdArtBab } from "@/data/adArt";

export interface AdArtPageProps {
  onBackToHome: () => void;
}

export function AdArtPage({ onBackToHome }: AdArtPageProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "AD" | "ART" | "HIGHLIGHT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const adBabs = useMemo(() => adArtData.babs.filter((b) => b.part === "AD"), []);
  const artBabs = useMemo(() => adArtData.babs.filter((b) => b.part === "ART"), []);

  const filteredBabs = useMemo(() => {
    return adArtData.babs
      .filter((bab) => {
        if (activeTab === "AD" && bab.part !== "AD") return false;
        if (activeTab === "ART" && bab.part !== "ART") return false;
        if (activeTab === "HIGHLIGHT") {
          return bab.pasals.some((p) => p.highlight);
        }
        return true;
      })
      .map((bab) => {
        const q = searchQuery.trim().toLowerCase();
        const pasals = bab.pasals.filter((pasal) => {
          if (activeTab === "HIGHLIGHT" && !pasal.highlight) return false;
          if (!q) return true;
          const matchBab =
            bab.title.toLowerCase().includes(q) || bab.babNumber.toLowerCase().includes(q);
          const matchPasal =
            pasal.number.toLowerCase().includes(q) ||
            pasal.title.toLowerCase().includes(q) ||
            (pasal.badge && pasal.badge.toLowerCase().includes(q));
          const matchItems = pasal.items.some(
            (it) =>
              it.text.toLowerCase().includes(q) ||
              (it.subItems && it.subItems.some((sub) => sub.toLowerCase().includes(q)))
          );
          return matchBab || matchPasal || matchItems;
        });

        return {
          ...bab,
          pasals,
        };
      })
      .filter((bab) => bab.pasals.length > 0);
  }, [activeTab, searchQuery]);

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/ad-art`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToBab = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Sub-Header Action Bar (Sticky below Navbar or top on print-hidden) */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-2xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-semibold text-xs sm:text-sm transition cursor-pointer border border-slate-200/80"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda Utama</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-2xs transition cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tautan Disalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Bagikan Link AD/ART</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-sm transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Dokumen Konstitusi */}
      <div className="bg-gradient-to-br from-[#064e3b] via-slate-900 to-emerald-950 text-white pt-12 pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-emerald-800/40 print:bg-white print:text-slate-900 print:border-b-2 print:border-slate-900 print:py-6">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 print:hidden">
            <Scale className="w-3.5 h-3.5" />
            <span>{adArtData.subtitle}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            {adArtData.title}
          </h1>
          <div className="text-emerald-200 font-semibold text-sm sm:text-base mt-1.5 print:text-slate-700">
            ({adArtData.subtitle})
          </div>
          <p className="text-amber-300 font-bold text-sm sm:text-lg mt-2.5 print:text-slate-800">
            {adArtData.organization}
          </p>
          <p className="text-emerald-200/90 text-xs sm:text-sm mt-1.5 max-w-2xl mx-auto print:text-slate-600">
            {adArtData.address}
          </p>

          {/* Quick Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8 text-left print:hidden">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5">
              <div className="text-[11px] text-emerald-200 font-medium">Anggaran Dasar (AD)</div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">7 Bab • 14 Pasal</div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">Aturan Dasar Organisasi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5">
              <div className="text-[11px] text-emerald-200 font-medium">Anggaran Rumah Tangga</div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">6 Bab • 17 Pasal</div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">Tata Tertib &amp; Aturan Pelaksana</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5">
              <div className="text-[11px] text-amber-200 font-medium">Doktrin Nilai Dasar</div>
              <div className="text-lg sm:text-xl font-black text-amber-300 mt-0.5">3 Pilar Utama</div>
              <div className="text-[10px] text-amber-200/80 mt-0.5">Murni • Mandiri • Berkelanjutan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5">
              <div className="text-[11px] text-emerald-200 font-medium">Status Dokumen</div>
              <div className="text-lg sm:text-xl font-black text-emerald-300 mt-0.5">Aktif &amp; Mengikat</div>
              <div className="text-[10px] text-emerald-200/80 mt-0.5">{adArtData.establishedDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Daftar Isi & Navigasi Cepat (Hidden on Print) */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-5 lg:sticky lg:top-36 print:hidden">
            {/* Search & Filter Box */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pencarian Cepat Pasal</span>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik kata kunci (mis: musyawarah, kas)..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>

              {/* Filter Kategori */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {[
                  { id: "ALL", label: "Semua Pasal" },
                  { id: "HIGHLIGHT", label: "★ Pasal Inti" },
                  { id: "AD", label: "Anggaran Dasar" },
                  { id: "ART", label: "Rumah Tangga" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer text-center ${
                      activeTab === tab.id
                        ? "bg-emerald-700 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table of Contents (Daftar Isi) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs max-h-[60vh] overflow-y-auto space-y-4 text-left">
              <div>
                <button
                  type="button"
                  onClick={() => scrollToBab("mukadimah")}
                  className="w-full text-left text-xs font-bold text-emerald-800 hover:text-emerald-600 flex items-center justify-between py-1 cursor-pointer"
                >
                  <span>📜 MUKADIMAH</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 mb-2">
                  Bagian I: Anggaran Dasar (AD)
                </div>
                <ul className="space-y-1">
                  {adBabs.map((bab) => (
                    <li key={bab.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("ALL");
                          setTimeout(() => scrollToBab(bab.id), 50);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 transition flex items-start gap-2 cursor-pointer"
                      >
                        <span className="font-mono font-bold text-[10px] text-emerald-700 shrink-0 mt-0.5">
                          {bab.babNumber}
                        </span>
                        <span className="line-clamp-1 font-medium">{bab.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 mb-2">
                  Bagian II: Rumah Tangga (ART)
                </div>
                <ul className="space-y-1">
                  {artBabs.map((bab) => (
                    <li key={bab.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("ALL");
                          setTimeout(() => scrollToBab(bab.id), 50);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-900 transition flex items-start gap-2 cursor-pointer"
                      >
                        <span className="font-mono font-bold text-[10px] text-amber-700 shrink-0 mt-0.5">
                          {bab.babNumber}
                        </span>
                        <span className="line-clamp-1 font-medium">{bab.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => scrollToBab("pengesahan")}
                  className="w-full text-left text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center justify-between py-1 cursor-pointer"
                >
                  <span>✒️ LEMBAR PENGESAHAN</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Document Column */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 text-left">
            
            {/* 1. MUKADIMAH CARD */}
            {(activeTab === "ALL" || searchQuery.trim() === "") && activeTab !== "AD" && activeTab !== "ART" && activeTab !== "HIGHLIGHT" && (
              <div
                id="mukadimah"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden scroll-mt-36"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600" />
                <div className="text-center mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-2 font-serif">
                    {adArtData.mukadimah.bismillah}
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-slate-900">
                    MUKADIMAH
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>{adArtData.mukadimah.opening}</p>

                  <blockquote className="bg-emerald-50/80 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-2xl text-emerald-950 italic font-medium">
                    &ldquo;{adArtData.mukadimah.quranQuote.text}&rdquo;
                    <footer className="mt-2 font-bold not-italic text-emerald-800 text-xs">
                      — {adArtData.mukadimah.quranQuote.source}
                    </footer>
                  </blockquote>

                  {adArtData.mukadimah.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* 2. BAB & PASAL LIST */}
            {filteredBabs.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <div className="text-base font-bold text-slate-800">
                  Tidak ditemukan pasal yang sesuai
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Coba ubah kata kunci pencarian atau pilih tab &ldquo;Semua Pasal&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("ALL");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              filteredBabs.map((bab: AdArtBab, idx) => {
                const isAD = bab.part === "AD";
                const prevPart = idx > 0 ? filteredBabs[idx - 1].part : null;
                const showPartDivider = bab.part !== prevPart;

                return (
                  <React.Fragment key={bab.id}>
                    {showPartDivider && (
                      <div className="pt-2">
                        <div
                          className={`rounded-2xl p-4 sm:p-5 border flex items-center justify-between ${
                            isAD
                              ? "bg-emerald-900 text-white border-emerald-700"
                              : "bg-slate-900 text-white border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                                isAD
                                  ? "bg-emerald-700 text-amber-300"
                                  : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                              }`}
                            >
                              {isAD ? <Building2 className="w-5 h-5" /> : <Gavel className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                                {isAD ? "Bagian Pertama • Aturan Dasar Organisasi" : "Bagian Kedua • Tata Tertib & Aturan Pelaksana"}
                              </div>
                              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                                {isAD
                                  ? "ANGGARAN DASAR (AD)"
                                  : "ANGGARAN RUMAH TANGGA (ART)"}
                              </h2>
                            </div>
                          </div>
                          <span className="hidden sm:inline-block text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-emerald-100">
                            {isAD ? "Aturan Dasar Organisasi" : "Tata Tertib Organisasi"}
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      id={bab.id}
                      className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden scroll-mt-36"
                    >
                      {/* Bab Header */}
                      <div
                        className={`px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isAD ? "bg-emerald-50/50" : "bg-amber-50/40"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-md ${
                                isAD
                                  ? "bg-emerald-700 text-white"
                                  : "bg-amber-600 text-white"
                              }`}
                            >
                              {bab.part} • {bab.babNumber}
                            </span>
                            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                              {bab.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{bab.summary}</p>
                        </div>
                      </div>

                      {/* Pasal List inside Bab */}
                      <div className="p-6 sm:p-7 divide-y divide-slate-100 space-y-6">
                        {bab.pasals.map((pasal) => (
                          <div
                            key={`${bab.id}-${pasal.number}`}
                            className={`pt-6 first:pt-0 ${
                              pasal.highlight
                                ? "bg-gradient-to-r from-emerald-50/60 via-amber-50/30 to-transparent -mx-4 px-4 py-4 rounded-2xl border border-emerald-200/70"
                                : ""
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                                  {pasal.number}
                                </span>
                                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                                  {pasal.title}
                                </h4>
                              </div>
                              {pasal.badge && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                  <Sparkles className="w-3 h-3 text-amber-700" />
                                  {pasal.badge}
                                </span>
                              )}
                            </div>

                            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                              {pasal.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2.5">
                                  <span className="font-mono text-xs font-bold text-slate-400 mt-0.5 shrink-0">
                                    ({itemIdx + 1})
                                  </span>
                                  <div className="flex-1 space-y-2">
                                    <p className="text-slate-800 font-medium">{item.text}</p>
                                    {item.subItems && item.subItems.length > 0 && (
                                      <ul className="space-y-1.5 pl-1 pt-1">
                                        {item.subItems.map((sub, subIdx) => (
                                          <li
                                            key={subIdx}
                                            className="flex items-start gap-2 text-xs text-slate-600 bg-white/80 p-2 rounded-xl border border-slate-100"
                                          >
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>{sub}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}

            {/* 3. LEMBAR PENGESAHAN */}
            <div
              id="pengesahan"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs scroll-mt-36"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Pengesahan Organisasi
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                    Lembar Penetapan &amp; Pengurus DKM Nurul Falah
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Ditetapkan di Kp. Sukatani, Desa Wangunsari, Kec. Cisolok, Kab. Sukabumi pada{" "}
                    <b>{adArtData.establishedDate}</b> ({adArtData.hijriDate}).
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Berlaku &amp; Mengikat</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {adArtData.signatories.map((sig, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        {sig.role}
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {sig.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{sig.status}</div>
                    </div>
                    <div className="mt-6 pt-3 border-t border-dashed border-slate-300 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <span>Tanda Tangan Sah</span>
                      <span className="text-emerald-700 font-bold">✓ DKM</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdArtPage;

