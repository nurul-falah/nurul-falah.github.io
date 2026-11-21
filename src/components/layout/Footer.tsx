import React from "react";
import { MessageCircle } from "lucide-react";
import masjidData from "@/data/masjid.json";
import { useI18n } from "@/i18n/LanguageProvider";

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { tx } = useI18n();
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-[#064e3b] text-slate-300 text-xs pt-12 pb-8 border-t border-[#065f46] text-start print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#065f46]">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3 text-white font-bold text-lg">
              <img
                src="/favicon.svg"
                alt={tx("Logo Masjid Nurul Falah")}
                width={28}
                height={28}
                decoding="async"
                className="w-7 h-7 rounded-lg shadow-sm"
              />
              <span>Masjid Nurul Falah</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              {tx("Pusat ibadah dan pelatihan generasi madani.")}
            </p>
            <div className="text-slate-400">
              <b>{tx("Alamat:")}</b> {masjidData.address.fullAddress}.
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">{tx("Navigasi Utama")}</h4>
            <ul className="space-y-2">
              <li><a href="/" onClick={(e) => handleLinkClick(e, "/")} className="hover:text-amber-300 transition">{tx("Beranda Utama")}</a></li>
              <li><a href="/pilar" onClick={(e) => handleLinkClick(e, "/pilar")} className="hover:text-amber-300 transition">{tx("3 Pilar Nilai Dasar")}</a></li>
              <li><a href="/ad-art" onClick={(e) => handleLinkClick(e, "/ad-art")} className="hover:text-amber-300 transition text-amber-300 font-bold">{tx("AD/ART Organisasi DKM")}</a></li>
              <li><a href="/struktur-organisasi" onClick={(e) => handleLinkClick(e, "/struktur-organisasi")} className="hover:text-amber-300 transition">{tx("Struktur Organisasi")}</a></li>
              <li><a href="/jadwal" onClick={(e) => handleLinkClick(e, "/jadwal")} className="hover:text-amber-300 transition">{tx("Jadwal Shalat Sukatani")}</a></li>
              <li><a href="/desain-masjid" onClick={(e) => handleLinkClick(e, "/desain-masjid")} className="hover:text-amber-300 transition">{tx("Desain Masjid")}</a></li>
              <li><a href="/wakaf-pembangunan" onClick={(e) => handleLinkClick(e, "/wakaf-pembangunan")} className="hover:text-amber-300 transition">{tx("Wakaf Pembangunan")}</a></li>
              <li><a href="/pendanaan" onClick={(e) => handleLinkClick(e, "/pendanaan")} className="hover:text-amber-300 transition">{tx("Skema Pendanaan")}</a></li>
              <li><a href="/rekap-tugas" onClick={(e) => handleLinkClick(e, "/rekap-tugas")} className="hover:text-amber-300 transition">{tx("Rekap Tugas DKM")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">{tx("Kanal Informasi")}</h4>
            <div className="space-y-2">
              <a
                href={masjidData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> {tx("WhatsApp Pengurus DKM")}
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-400">
          <div>{tx("© 2026 DKM Masjid Nurul Falah. Seluruh hak cipta dilindungi.")}</div>
          <div className="text-emerald-300 font-semibold">{tx("Amanah & Transparan Memakmurkan Masjid")}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
