import React from "react";
import { Landmark, Video, Camera, MessageCircle } from "lucide-react";
import masjidData from "@/data/masjid.json";

export function Footer() {
  return (
    <footer className="bg-[#064e3b] text-slate-300 text-xs pt-12 pb-8 border-t border-[#065f46] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#065f46]">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Landmark className="w-5 h-5 text-amber-400" />
              <span>Masjid Nurul Falah Sukatani</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Pusat ibadah dan pelatihan generasi madani.
            </p>
            <div className="text-slate-400">
              <b>Alamat:</b> {masjidData.address.fullAddress}.
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Navigasi Utama</h4>
            <ul className="space-y-2">
              <li><a href="#beranda" className="hover:text-amber-300 transition">Beranda Utama</a></li>
              <li><a href="#jadwal" className="hover:text-amber-300 transition">Jadwal Sholat Sukatani</a></li>
              <li><a href="#program" className="hover:text-amber-300 transition">Program Rutin</a></li>
              <li><a href="#program-panjang" className="hover:text-amber-300 transition text-amber-200">Program Jangka Panjang</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Kanal Informasi</h4>
            <div className="space-y-2">
              <a
                href={masjidData.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Pengurus DKM
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition">
                <Video className="w-4 h-4 text-red-400" /> Nurul Falah TV Sukatani
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition">
                <Camera className="w-4 h-4 text-pink-400" /> @nurulfalah.sukatani
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-400">
          <div>&copy; 2026 DKM Masjid Nurul Falah Sukatani. Seluruh hak cipta dilindungi.</div>
          <div className="text-emerald-300 font-semibold">Amanah & Transparan Memakmurkan Masjid</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
