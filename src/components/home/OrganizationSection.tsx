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
          Informasi kegiatan di lingkungan masjid dan RKM
        </p>

        <div className="grid sm:grid-cols-3 gap-4 text-left text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-800 mb-0.5">{contacts.dkmLeader.role}</div>
              <div className="text-slate-600">{contacts.dkmLeader.name}</div>
            </div>
            <a
              href={`https://wa.me/${contacts.dkmLeader.whatsapp}?text=Assalamu%27alaikum%20${encodeURIComponent(contacts.dkmLeader.name)}%20(${encodeURIComponent(contacts.dkmLeader.role)})`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#047857] hover:text-emerald-800 font-mono mt-3 flex items-center gap-1.5 font-semibold transition hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> {contacts.dkmLeader.phone}
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-800 mb-0.5">{contacts.secretariat.role}</div>
              <div className="text-slate-600">{contacts.secretariat.name}</div>
            </div>
            <a
              href={`https://wa.me/${contacts.secretariat.whatsapp}?text=Assalamu%27alaikum%20${encodeURIComponent(contacts.secretariat.name)}%20(${encodeURIComponent(contacts.secretariat.role)})`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#047857] hover:text-emerald-800 font-mono mt-3 flex items-center gap-1.5 font-semibold transition hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> {contacts.secretariat.phone}
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-800 mb-0.5">{contacts.funeralService.role}</div>
              <div className="text-slate-600">{contacts.funeralService.name}</div>
            </div>
            <a
              href={`https://wa.me/${contacts.funeralService.whatsapp}?text=Assalamu%27alaikum%20${encodeURIComponent(contacts.funeralService.name)}%20(${encodeURIComponent(contacts.funeralService.role)})`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#047857] hover:text-emerald-800 font-mono mt-3 flex items-center gap-1.5 font-semibold transition hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> {contacts.funeralService.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrganizationSection;
