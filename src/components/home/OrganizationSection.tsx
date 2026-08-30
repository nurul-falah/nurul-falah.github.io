import React from "react";
import { Phone, Users } from "lucide-react";
import masjidData from "@/data/masjid.json";

export function OrganizationSection() {
  const contacts = masjidData.contacts;

  return (
    <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 text-center">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Sekretariat Masjid & RKM</h3>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mb-6">
          Informasi panitia pembangunan, konsultasi zakat/wakaf, atau pengajuan kegiatan warga Sukatani.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 text-left text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-800 mb-0.5">{contacts.dkmLeader.role}</div>
            <div className="text-slate-600">{contacts.dkmLeader.name}</div>
            <div className="text-[#047857] font-mono mt-2 flex items-center gap-1 font-semibold">
              <Phone className="w-3.5 h-3.5" /> {contacts.dkmLeader.phone}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-800 mb-0.5">{contacts.secretariat.role}</div>
            <div className="text-slate-600">{contacts.secretariat.name}</div>
            <div className="text-[#047857] font-mono mt-2 flex items-center gap-1 font-semibold">
              <Phone className="w-3.5 h-3.5" /> {contacts.secretariat.phone}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-800 mb-0.5">{contacts.funeralService.role}</div>
            <div className="text-slate-600">{contacts.funeralService.name}</div>
            <div className="text-[#047857] font-mono mt-2 flex items-center gap-1 font-semibold">
              <Phone className="w-3.5 h-3.5" /> {contacts.funeralService.phone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrganizationSection;
