import React, { useState } from "react";
import { Search, User, MapPin, Bell, UserPlus, Edit3, CalendarX, Calendar } from "lucide-react";
import masjidData from "@/data/masjid.json";

export interface AgendaSectionProps {
  onRegisterEvent?: (eventTitle: string) => void;
}

export function AgendaSection({ onRegisterEvent }: AgendaSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEvents = masjidData.agenda.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="agenda" className="py-16 bg-slate-100/70 border-y border-slate-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[#059669] font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Jadwal Terjadwal
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Rencana Agenda & Publikasi Kegiatan</h2>
            <p className="text-slate-600 text-sm mt-1">Ikuti berbagai kegiatan keislaman dan silaturahmi warga Sukatani</p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kegiatan/ustadz..."
                className="pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44 sm:w-56"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
              {[
                { id: "all", label: "Semua" },
                { id: "kajian", label: "Kajian" },
                { id: "sosial", label: "Sosial" },
                { id: "remaja", label: "Remaja" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-[#064e3b] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              let headerGradient = "bg-gradient-to-r from-emerald-800 to-[#064e3b]";
              let tagStyle = "bg-amber-400 text-slate-900";
              let btnColor = "bg-emerald-50 hover:bg-emerald-100 text-[#047857]";
              let Icon = Bell;

              if (event.themeColor === "rose") {
                headerGradient = "bg-gradient-to-r from-rose-800 to-red-900";
                tagStyle = "bg-white text-rose-800";
                btnColor = "bg-rose-50 hover:bg-rose-100 text-rose-700";
                Icon = UserPlus;
              } else if (event.themeColor === "blue") {
                headerGradient = "bg-gradient-to-r from-blue-800 to-indigo-900";
                tagStyle = "bg-amber-400 text-slate-900";
                btnColor = "bg-blue-50 hover:bg-blue-100 text-blue-700";
                Icon = Edit3;
              }

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className={`h-36 ${headerGradient} p-4 text-white flex flex-col justify-between relative`}>
                      <span className={`self-start text-[11px] font-bold px-2 py-0.5 rounded ${tagStyle}`}>
                        {event.tag}
                      </span>
                      <div>
                        <div className="text-xs text-emerald-200 font-mono">{event.date}</div>
                        <div className="font-bold text-base line-clamp-1">{event.title}</div>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <User className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>Narasumber: <b>{event.speaker}</b></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>Lokasi: {event.location}</span>
                      </div>
                      <p className="text-xs text-slate-500 pt-1">{event.desc}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => onRegisterEvent && onRegisterEvent(event.title)}
                      className={`w-full py-2 ${btnColor} font-semibold rounded-lg text-xs transition flex items-center justify-center gap-1.5 cursor-pointer`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{event.themeColor === "rose" ? "Daftar Pendonor" : event.themeColor === "blue" ? "Gabung Workshop" : "Ingatkan Saya"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <CalendarX className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Tidak ada kegiatan yang sesuai kata kunci pencarian.</p>
          </div>
        )}

      </div>
    </section>
  );
}

export default AgendaSection;
