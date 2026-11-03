import React, { useState } from "react";
import { Download, QrCode, Copy, Check } from "lucide-react";
import masjidData from "@/data/masjid.json";
import { construction } from "@/lib/construction";

export function FinancialReportSection() {
  const [copied, setCopied] = useState(false);
  const fin = masjidData.financial;
  const account = masjidData.bankAccounts[0];

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && account) {
      navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="laporan" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Kas Report Overview */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-[#047857] bg-emerald-50 px-2.5 py-1 rounded">
                Transparansi DKM
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Laporan Keuangan Kas Masjid</h2>
              <p className="text-xs text-slate-500">Update per {fin.lastUpdate}</p>
            </div>
            <button
              type="button"
              onClick={() => alert("Mengunduh ringkasan laporan kas DKM Sukatani...")}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-slate-600 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> PDF Laporan
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl text-center">
              <div className="text-xs text-emerald-800 font-medium">Pemasukan Bulan Ini</div>
              <div className="text-base sm:text-lg font-bold text-[#047857] mt-1 font-mono">{fin.income}</div>
            </div>
            <div className="p-4 bg-rose-50/70 border border-rose-100 rounded-xl text-center">
              <div className="text-xs text-rose-800 font-medium">Pengeluaran Operasional</div>
              <div className="text-base sm:text-lg font-bold text-rose-700 mt-1 font-mono">{fin.expense}</div>
            </div>
            <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-xl text-center">
              <div className="text-xs text-amber-800 font-medium">Saldo Kas Aktif</div>
              <div className="text-base sm:text-lg font-bold text-amber-700 mt-1 font-mono">{fin.balance}</div>
            </div>
          </div>

          {/* Target Renovasi / Program */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Alokasi Dana Khusus Proyek Pembangunan Lantai 2</span>
              <span className="text-[#047857] font-mono">{fin.buildingFundAllocated}</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#059669] h-full rounded-full transition-all duration-500"
                style={{ width: `${construction.fund.percent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between">
              <span>Target Total: <b className="font-mono">{fin.buildingFundTarget}</b></span>
              <span>Target Groundbreaking: Akhir 2026</span>
            </div>
          </div>

          {/* Mutasi Terakhir */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Catatan Transaksi Terakhir</h4>
            <div className="space-y-2 text-xs">
              {fin.recentTransactions.map((tx, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">{tx.title}</span>
                  <span className={`font-bold font-mono ${tx.type === "in" ? "text-emerald-600" : "text-rose-600"}`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Infaq Box & Rekening */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#065f46] to-[#064e3b] text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-300" /> Salurkan Infaq & Wakaf
          </h3>
          <p className="text-emerald-200 text-xs mb-6">
            Dukung operasional harian, program jangka panjang, dan pembangunan fasilitas ibadah Sukatani.
          </p>

          {/* QRIS Standar */}
          <div className="bg-white p-4 rounded-xl text-slate-900 text-center mb-6 max-w-xs mx-auto shadow-md">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              QRIS Standar Pembayaran Nasional
            </div>
            
            <div className="w-44 h-44 mx-auto bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-2 relative">
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="currentColor">
                <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M22,22 h6 v6 h-6 z" fill="#064e3b" />
                <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M72,22 h6 v6 h-6 z" fill="#064e3b" />
                <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M22,72 h6 v6 h-6 z" fill="#064e3b" />
                <rect x="45" y="15" width="8" height="8" fill="#d97706" />
                <rect x="45" y="30" width="8" height="8" fill="#064e3b" />
                <rect x="45" y="65" width="8" height="8" fill="#064e3b" />
                <rect x="60" y="55" width="10" height="10" fill="#064e3b" />
                <rect x="75" y="55" width="15" height="8" fill="#064e3b" />
                <rect x="60" y="70" width="12" height="15" fill="#d97706" />
                <rect x="78" y="75" width="12" height="10" fill="#064e3b" />
              </svg>
              <span className="text-[9px] font-bold text-[#064e3b] mt-1">NURUL FALAH SUKATANI</span>
            </div>

            <div className="text-[10px] text-slate-400 mt-2">Mendukung Seluruh Bank & E-Wallet</div>
          </div>

          {/* Rekening Bank */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700/50 flex items-center justify-between">
              <div>
                <div className="text-emerald-300 font-bold">{account?.bankName} (Kode: {account?.bankCode})</div>
                <div className="font-mono text-sm tracking-wider text-amber-300 font-bold">{account?.accountNumber}</div>
                <div className="text-[10px] text-slate-300">a.n {account?.accountHolder}</div>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[11px] font-semibold transition cursor-pointer flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Tersalin!" : "Salin"}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FinancialReportSection;
