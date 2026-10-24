import React from "react";
import {
  Users,
  Sprout,
  HeartHandshake,
  CheckCircle2,
  Coins,
  ArrowRight,
  MessageCircle,
  Copy,
  Check,
  TrendingUp,
  ShieldCheck,
  Wallet,
  Landmark,
} from "lucide-react";
import masjidData from "@/data/masjid.json";

export interface PendanaanSectionProps {
  onOpenWakaf?: () => void;
}

export function PendanaanSection({ onOpenWakaf }: PendanaanSectionProps) {
  const [copied, setCopied] = React.useState(false);
  const account = masjidData.bankAccounts?.[0];

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && account) {
      navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const funding = masjidData.funding;
  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-6 h-6" />,
    Sprout: <Sprout className="w-6 h-6" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  };

  return (
    <section id="pendanaan" className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[#059669] font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 shadow-2xs">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          {funding.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
          {funding.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
          {funding.subtitle}
        </p>
      </div>

      {/* 3 Subsections Grid */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {funding.subsections.map((sub) => {
          let themeClasses = {
            cardBorder: "border-emerald-200/80 hover:border-emerald-400",
            iconBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
            badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
            numberText: "text-emerald-700/60 font-mono",
            pointIcon: "text-emerald-600",
            gradientLine: "from-emerald-500 to-emerald-700",
            amountBg: "bg-gradient-to-r from-emerald-50 to-emerald-100/60 border-emerald-200",
            amountLabelText: "text-emerald-800",
            amountDot: "bg-emerald-500",
            amountValueText: "text-[#064e3b]",
            amountBadgeBg: "bg-emerald-600 text-white",
            amountNoteText: "text-emerald-800/80",
          };

          if (sub.color === "amber") {
            themeClasses = {
              cardBorder: "border-amber-200/80 hover:border-amber-400",
              iconBg: "bg-amber-100 text-amber-900 border-amber-300",
              badge: "bg-amber-50 text-amber-900 border-amber-200",
              numberText: "text-amber-700/60 font-mono",
              pointIcon: "text-amber-600",
              gradientLine: "from-amber-500 to-amber-700",
              amountBg: "bg-gradient-to-r from-amber-50 to-amber-100/60 border-amber-200",
              amountLabelText: "text-amber-900",
              amountDot: "bg-amber-500",
              amountValueText: "text-amber-950",
              amountBadgeBg: "bg-amber-500 text-slate-950 font-extrabold",
              amountNoteText: "text-amber-900/80",
            };
          } else if (sub.color === "blue") {
            themeClasses = {
              cardBorder: "border-blue-200/80 hover:border-blue-400",
              iconBg: "bg-blue-100 text-blue-900 border-blue-300",
              badge: "bg-blue-50 text-blue-900 border-blue-200",
              numberText: "text-blue-700/60 font-mono",
              pointIcon: "text-blue-600",
              gradientLine: "from-blue-500 to-blue-700",
              amountBg: "bg-gradient-to-r from-blue-50 to-blue-100/60 border-blue-200",
              amountLabelText: "text-blue-900",
              amountDot: "bg-blue-500",
              amountValueText: "text-blue-950",
              amountBadgeBg: "bg-blue-600 text-white",
              amountNoteText: "text-blue-800/80",
            };
          }

          return (
            <div
              key={sub.id}
              className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${themeClasses.cardBorder}`}
            >
              {/* Subtle Top Decorative Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${themeClasses.gradientLine}`} />

              <div>
                {/* Header Row: Icon + Number & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs ${themeClasses.iconBg}`}>
                    {iconMap[sub.icon] || <Coins className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${themeClasses.badge}`}>
                      {sub.badge}
                    </span>
                    <span className={`text-xl font-extrabold ${themeClasses.numberText}`}>
                      {sub.number}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors leading-snug">
                  {sub.title}
                </h3>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5 mb-3">
                  {sub.tagline}
                </div>

                {/* Nominal Sementara Callout (if amount exists) */}
                {"amount" in sub && Boolean((sub as any).amount) && (
                  <div className={`mb-4 p-3 sm:p-3.5 rounded-xl border flex flex-col gap-1 shadow-2xs ${themeClasses.amountBg}`}>
                    <div className="flex items-center justify-between gap-1.5">
                      <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 min-w-0 ${themeClasses.amountLabelText}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${themeClasses.amountDot}`}></span>
                        <span className="truncate">{(sub as any).amountLabel || "Nominal Sementara"}</span>
                      </div>
                      <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs shrink-0 whitespace-nowrap ${themeClasses.amountBadgeBg}`}>
                        {(sub as any).amountBadge || "Aktif"}
                      </span>
                    </div>
                    <div className={`text-base sm:text-xl font-bold font-mono tracking-tight mt-0.5 ${themeClasses.amountValueText}`}>
                      {(sub as any).amount}
                    </div>
                    {(sub as any).amountNote && (
                      <div className={`text-[10px] sm:text-[11px] font-medium leading-tight pt-1.5 border-t border-black/5 ${themeClasses.amountNoteText}`}>
                        {(sub as any).amountNote}
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                  {sub.desc}
                </p>

                {/* Highlights / Points */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Bentuk Dukungan:
                  </span>
                  {sub.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${themeClasses.pointIcon}`} />
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Context Badge */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Transparan &amp; Berkelanjutan
                </span>
                <span className="font-semibold text-slate-400">Bagian {sub.number}/03</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cost Center / Pos Kas Masjid */}
      {masjidData.financial?.costCenter && (
        <div className="mb-12 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                Pemisahan Pos Keuangan (Cost Center)
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                Alokasi Saldo Berdasarkan Cost Center
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Total Saldo Kas: <span className="font-mono text-emerald-800">{masjidData.financial.balance}</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 hidden sm:inline-block">
                Amanah &amp; Akuntabel
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Cost Center 1: Kas Infaq Renovasi */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 border border-emerald-200/90 flex flex-col justify-between shadow-2xs hover:border-emerald-400 transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Pos Pembangunan
                  </span>
                  <Landmark className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-sm font-bold text-slate-900">Kas Infaq Renovasi</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Dana khusus yang dialokasikan dan disalurkan langsung untuk pembiayaan konstruksi, material, dan renovasi fisik masjid.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100/90 flex items-baseline justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Saldo Terhimpun:</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#064e3b]">
                  {masjidData.financial.costCenter.infaqRenovasi}
                </span>
              </div>
            </div>

            {/* Cost Center 2: Kas Infaq Umum */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-blue-50 via-white to-blue-50/40 border border-blue-200/90 flex flex-col justify-between shadow-2xs hover:border-blue-400 transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Pos Operasional
                  </span>
                  <Wallet className="w-4 h-4 text-blue-700" />
                </div>
                <div className="text-sm font-bold text-slate-900">Kas Infaq Umum</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Dana operasional rutin untuk kelistrikan, kebersihan, pemeliharaan sarana harian, dan kegiatan taklim/dakwah masjid.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-100/90 flex items-baseline justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Saldo Aktif:</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-900">
                  {masjidData.financial.costCenter.infaqUmum}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Action Banner */}
      <div className="bg-gradient-to-br from-[#064e3b] via-[#047857] to-emerald-950 rounded-2xl text-white p-6 sm:p-8 shadow-xl border border-emerald-700/50 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-600/60">
            <TrendingUp className="w-3.5 h-3.5" />
            Saluran Wakaf &amp; Infaq Resmi
          </div>
          <h4 className="text-xl sm:text-2xl font-bold">
            Turut Berpartisipasi dalam Pembangunan Masjid
          </h4>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Setiap rupiah infaq dan wakaf yang diamanahkan dicatat transparan demi mewujudkan sarana ibadah 2 lantai yang representatif bagi generasi madani di Kp. Sukatani.
          </p>
        </div>

        {/* Bank & CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
          {account && (
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2.5 text-center sm:text-left w-full sm:w-auto">
              <div className="text-[10px] text-emerald-200 font-medium">{account.bankName}</div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                <span className="font-mono font-extrabold text-white text-base tracking-wider">
                  {account.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 hover:bg-white/20 rounded transition text-emerald-200 hover:text-white cursor-pointer"
                  title="Salin Nomor Rekening"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[9px] text-emerald-300/80 truncate max-w-[200px]">
                a.n {account.accountHolder}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenWakaf && (
              <button
                type="button"
                onClick={onOpenWakaf}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg transition active:scale-95 cursor-pointer text-xs sm:text-sm whitespace-nowrap"
              >
                <span>Wakaf Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <a
              href={masjidData.contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl border border-white/20 transition active:scale-95 cursor-pointer text-xs sm:text-sm whitespace-nowrap"
              title="Konfirmasi via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Konfirmasi</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
