import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  HeartHandshake,
  Landmark,
  Package,
  Printer,
  Share2,
  ShieldAlert,
} from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

const REKENING = {
  bankName: "Bank Syariah Indonesia (BSI)",
  bankCode: "045",
  accountNumber: "7203516578",
  accountHolder: "MASJID NURUL FALAH SUKATANI",
} as const;

const STEPS = [
  "Transfer ke rekening BSI 7203516578 a.n. MASJID NURUL FALAH SUKATANI.",
  "Pada berita transfer, tuliskan nama donatur (atau 'Hamba Allah') dan keperluan, misalnya 'wakaf pembangunan' atau 'infaq'.",
  "Konfirmasi kepada panitia melalui tombol kontak di situs ini agar donasi segera tercatat di jurnal dan didoakan.",
  "Pencatatan akan muncul di Laporan Kas Bangunan Masjid atau Laporan Kas Infaq Kotak Amal, sesuai peruntukannya.",
] as const;

export interface CaraBerdonasiPageProps {
  onBackToHome: () => void;
  onNavigate: (path: string) => void;
}

export function CaraBerdonasiPage({ onBackToHome, onNavigate }: CaraBerdonasiPageProps) {
  const { tx } = useI18n();
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const copyText = (value: string, mark: (copied: boolean) => void) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(value);
    mark(true);
    window.setTimeout(() => mark(false), 2000);
  };

  const openLedger = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    onNavigate(`/pendanaan${hash}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-16 text-start">
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 px-3.5 py-1.5 rounded-lg transition-colors border border-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
            <span>{tx("Kembali ke Beranda")}</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              title={tx("Cetak Halaman")}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (!navigator.clipboard) return;
                navigator.clipboard.writeText(window.location.href);
                setCopiedLink(true);
                window.setTimeout(() => setCopiedLink(false), 2000);
              }}
              title={tx("Salin Tautan")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{tx("Tersalin!")}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{tx("Bagikan")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <header className="relative bg-gradient-to-b from-emerald-950 via-[#064e3b] to-emerald-900 text-white pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,rgb(6_78_59/0)_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-amber-200 text-xs font-semibold tracking-wide uppercase border border-amber-300/30 mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            {tx("Rekening resmi")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {tx("Cara Berdonasi")}
          </h1>
          <p className="text-base sm:text-lg text-emerald-50 leading-relaxed">
            {tx(
              "Setiap rupiah atau bahan bangunan yang diamanahkan dicatat di jurnal kas DKM dan dapat dilihat di portal ini. Mohon hanya memakai rekening resmi di bawah ini. DKM tidak meminta donasi melalui rekening atas nama pribadi.",
            )}
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-6">
        <section
          id="rekening-resmi"
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 scroll-mt-36"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-700/20">
              <Landmark className="h-6 w-6 text-amber-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{tx("Rekening resmi")}</h2>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              {tx(
                "Bank Syariah Indonesia (BSI), kode bank 045, nomor rekening 7203516578, atas nama MASJID NURUL FALAH SUKATANI.",
              )}
            </p>
            <p>{tx("Kegunaan: operasional, infaq, dan wakaf pembangunan.")}</p>
            <p>
              {tx(
                "Sistem Kas Satu Pintu (AD Pasal 13) menempatkan rekening ini sebagai saluran resmi penyimpanan dana masjid.",
              )}
            </p>
          </div>

          <div className="mt-6 p-5 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/20 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-3">
              <span className="font-bold text-slate-900">{REKENING.bankName}</span>
              <div className="flex items-center gap-1.5 bg-white border border-emerald-200 px-2.5 py-1 rounded-lg">
                <span className="text-[11px] text-slate-500 font-medium">{tx("Kode:")}</span>
                <span className="text-xs font-mono font-bold text-emerald-800">{REKENING.bankCode}</span>
                <button
                  type="button"
                  onClick={() => copyText(REKENING.bankCode, setCopiedCode)}
                  className="text-emerald-700 hover:text-emerald-900 p-0.5 cursor-pointer"
                  title={tx("Salin Kode Bank")}
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1">
                {tx("Nomor Rekening")}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-emerald-300/80 rounded-xl p-3">
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#064e3b] tracking-wider">
                  {REKENING.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => copyText(REKENING.accountNumber, setCopiedAccount)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-sm transition cursor-pointer"
                >
                  {copiedAccount ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedAccount ? tx("Tersalin!") : tx("Salin No. Rek")}</span>
                </button>
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                {tx("Atas Nama Rekening")}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wide">
                {REKENING.accountHolder}
              </span>
            </div>
          </div>
        </section>

        <section
          id="transfer-dalam-negeri"
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 scroll-mt-36"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
            {tx("Langkah transfer dalam negeri")}
          </h2>
          <ol className="space-y-4">
            {STEPS.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-900 text-sm font-bold">
                  {index + 1}
                </span>
                {step === STEPS[2] ? (
                  <a href="#kontak" className="underline decoration-emerald-300 underline-offset-4 hover:decoration-emerald-700">
                    {tx(step)}
                  </a>
                ) : (
                  <span>{tx(step)}</span>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            <a
              href="/pendanaan#bangunan-masjid"
              onClick={(event) => openLedger(event, "#bangunan-masjid")}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[#047857] font-semibold text-sm transition"
            >
              {tx("Laporan Kas Bangunan Masjid")}
            </a>
            <a
              href="/pendanaan#kotak-amal"
              onClick={(event) => openLedger(event, "#kotak-amal")}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[#047857] font-semibold text-sm transition"
            >
              {tx("Laporan Kas Infaq Kotak Amal")}
            </a>
          </div>
        </section>

        <section
          id="wakaf-material"
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 scroll-mt-36"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {tx("Donasi bahan bangunan (wakaf material)")}
            </h2>
          </div>
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              {tx("Bahan dapat diserahkan ke posko panitia pembangunan di Kp. Sukatani, Desa Wangunsari.")}
            </p>
            <p>
              {tx(
                "Panitia menerima antara lain semen, besi beton D16/D19, pasir pasang/cor, batu split, dan bondek.",
              )}
            </p>
            <p>
              {tx(
                "Mohon berkoordinasi dulu dengan panitia agar jenis, volume, dan waktu pengiriman sesuai kebutuhan lapangan.",
              )}
            </p>
            <p>{tx("Material yang diterima dicatat di jurnal.")}</p>
          </div>
        </section>

        <section
          id="bukan-rekening-ini"
          className="bg-rose-50 rounded-2xl border border-rose-200 shadow-sm p-6 sm:p-8 scroll-mt-36"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-800">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-rose-950">
              {tx("Yang tidak diminta melalui rekening ini")}
            </h2>
          </div>
          <div className="space-y-4 text-rose-950 leading-relaxed text-sm sm:text-base">
            <p>
              {tx(
                "Zakat fitrah, zakat maal, dan fidyah dikelola terpisah oleh UPZ (AD Pasal 12); jangan mengirim zakat ke rekening pembangunan kecuali ada pengumuman resmi.",
              )}
            </p>
            <p>{tx("DKM tidak memungut donasi dengan rekening pribadi pengurus.")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CaraBerdonasiPage;
