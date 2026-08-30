import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Users, MessageCircle } from "lucide-react";
import masjidData from "@/data/masjid.json";

export interface LayananModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LayananModal({ open, onOpenChange }: LayananModalProps) {
  const contacts = masjidData.contacts;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
        <div className="text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-3">
            <Users className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Partisipasi Relawan Dakwah
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Bagi warga Sukatani yang ingin berkontribusi sebagai pengajar tahfidz, panitia pembangunan, atau tim multimedia syiar:
          </p>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="font-bold text-slate-900 mb-1">{contacts.secretariat.role}</div>
              <div className="text-slate-600 mb-2">{contacts.secretariat.name}</div>
              <a
                href="https://wa.me/6285710546122?text=Assalamu%27alaikum%20Bpk.%20Badar%20Rustandi%20(Sekretariat%20DKM)%2C%20saya%20ingin%20mengajukan%20kegiatan%20atau%20pendaftaran%20relawan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#059669] hover:bg-[#047857] text-white rounded-lg font-semibold transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hubungi via WhatsApp ({contacts.secretariat.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LayananModal;
