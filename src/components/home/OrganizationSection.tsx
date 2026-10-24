import React from "react";
import { Phone, Users } from "lucide-react";
import masjidData from "@/data/masjid.json";

export function OrganizationSection() {
  const contacts = masjidData.contacts as any;

  const contactList = [
    contacts.dkmLeader,
    contacts.secretary,
    contacts.secretariat,
    contacts.funeralService,
  ].filter(Boolean);

  return (
    <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 text-center">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Sekretariat Masjid &amp; RKM</h3>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mb-6">
          Informasi kepengurusan, kegiatan dakwah, dan pelayanan sosial di lingkungan Masjid Nurul Falah &amp; RKM Sukatani
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left text-xs">
          {contactList.map((contact, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="font-bold text-slate-800 mb-0.5">{contact.role}</div>
                <div className="text-slate-600 font-medium">{contact.name}</div>
              </div>
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Assalamu%27alaikum%20${encodeURIComponent(contact.name)}%20(${encodeURIComponent(contact.role)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#047857] hover:text-emerald-800 font-mono mt-3 flex items-center gap-1.5 font-semibold transition hover:underline"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" /> {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrganizationSection;
