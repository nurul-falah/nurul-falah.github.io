import React from "react";
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  HandCoins,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { RoutineProgramSection } from "@/components/home/RoutineProgramSection";
import { PEMBINAAN_STATUS, pembinaanPrograms } from "@/data/pembinaanPrograms";
import { useI18n } from "@/i18n/LanguageProvider";

export interface ProgramMasjidPageProps {
  onNavigate: (path: string) => void;
}

const WORK_AREAS = [
  "Ibadah harian",
  "Pendidikan Al-Qur'an dan kajian",
  "Layanan sosial warga",
] as const;

const PEMBINAAN_ICONS = [BookOpen, Users, Sparkles, BookMarked] as const;

const SOCIAL_ITEMS = [
  {
    icon: HeartHandshake,
    text: "Pelayanan jenazah (fardu kifayah) oleh Bidang Sosial bersama para Ketua RT, termasuk perlengkapan pemulasaraan (keranda, kafan, pemandian).",
  },
  {
    icon: HandCoins,
    text: "UPZ (zakat fitrah dan zakat maal) serta pelaksanaan kurban Iduladha oleh Bidang Imarah.",
  },
  {
    icon: Landmark,
    text: "Baitul Mal warga termasuk pinjaman kebajikan tanpa riba (qardhul hasan).",
  },
  {
    icon: ShieldCheck,
    text: "Jaring pengaman sosial.",
  },
] as const;

export function ProgramMasjidPage({ onNavigate }: ProgramMasjidPageProps) {
  const { tx } = useI18n();

  const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-slate-50 text-slate-800 text-start">
      <header className="relative bg-pattern text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/90 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-100 hover:text-white mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
            <span>{tx("Kembali ke Beranda")}</span>
          </button>

          <p className="text-amber-300 font-semibold text-xs uppercase tracking-wider">
            {tx("Masjid Nurul Falah Sukatani")}
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
            {tx("Program Masjid")}
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg leading-relaxed max-w-3xl mt-4">
            {tx(
              "Masjid Nurul Falah Sukatani merawat tiga wilayah kerja yang saling menopang: ibadah harian, pendidikan Al-Qur'an dan kajian, serta layanan sosial warga.",
            )}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {WORK_AREAS.map((area) => (
              <li
                key={area}
                className="text-xs sm:text-sm font-semibold text-emerald-50 bg-emerald-800/70 border border-emerald-500/40 px-3 py-1.5 rounded-full"
              >
                {tx(area)}
              </li>
            ))}
          </ul>

          <nav aria-label={tx("Program Masjid")} className="mt-8 flex flex-wrap gap-2">
            <a href="#program" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20">
              {tx("Program Rutin")}
            </a>
            <a href="#pembinaan" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20">
              {tx("Bidang Pembinaan")}
            </a>
            <a href="#layanan-sosial" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20">
              {tx("Layanan Sosial dan Keumatan")}
            </a>
            <a href="#ibadah" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20">
              {tx("Ibadah Harian dan Syiar")}
            </a>
          </nav>
        </div>
      </header>

      <RoutineProgramSection />

      <section id="pembinaan" className="scroll-mt-20 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-8">
          <span className="text-[#059669] font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {tx("Bidang Pembinaan")}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{tx("Program Jangka Panjang")}</h2>
        </div>

        <ul className="grid sm:grid-cols-2 gap-6">
          {pembinaanPrograms.map((item, index) => {
            const Icon = PEMBINAAN_ICONS[index] ?? Sparkles;
            return (
              <li key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{tx(item.title)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{tx(item.desc)}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <div>
            <div className="text-sm font-bold text-emerald-900">{tx("Status Program")}</div>
            <p className="text-sm text-emerald-800 mt-0.5">{tx(PEMBINAAN_STATUS)}</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" />
        </div>
      </section>

      <section id="layanan-sosial" className="scroll-mt-20 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-8">
          <span className="text-[#059669] font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {tx("Layanan sosial warga")}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{tx("Layanan Sosial dan Keumatan")}</h2>
        </div>

        <ul className="grid sm:grid-cols-2 gap-6">
          {SOCIAL_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.text} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-800 text-base leading-relaxed">{tx(item.text)}</h3>
              </li>
            );
          })}
        </ul>

        <a
          href="/ad-art"
          onClick={(event) => go(event, "/ad-art")}
          className="mt-6 block rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-950 leading-relaxed hover:bg-amber-100 transition"
        >
          {tx("Dana zakat tidak dicampur ke kas pembangunan (AD Pasal 12).")}
        </a>
      </section>

      <section id="ibadah" className="scroll-mt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-8">
          <span className="text-[#059669] font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {tx("Ibadah harian")}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">{tx("Ibadah Harian dan Syiar")}</h2>
        </div>

        <ul className="grid lg:grid-cols-3 gap-6">
          <li className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-800 text-base leading-relaxed">
              {tx("Salat lima waktu berjamaah")}{" "}
              <a
                href="/jadwal"
                onClick={(event) => go(event, "/jadwal")}
                className="text-[#047857] underline underline-offset-2 hover:text-emerald-900"
              >
                ({tx("jadwal salat otomatis di beranda")})
              </a>
            </h3>
          </li>
          <li className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-800 text-base leading-relaxed">
              {tx("Salat Jumat berjamaah, termasuk teras utara sebagai area salat darurat selama konstruksi.")}
            </h3>
          </li>
          <li className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-slate-800 text-base leading-relaxed">
              {tx("Syiar Ramadan dan hari besar Islam (PHBI) oleh Bidang Imarah.")}
            </h3>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ProgramMasjidPage;
