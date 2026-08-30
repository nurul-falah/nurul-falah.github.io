import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Copy, Check, HeartHandshake, Landmark, MessageCircle } from "lucide-react";
import masjidData from "@/data/masjid.json";

export interface InfaqModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InfaqModal({ open, onOpenChange }: InfaqModalProps) {
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const account = masjidData.bankAccounts[0];

  const handleCopyAccount = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && account) {
      navigator.clipboard.writeText(account.accountNumber);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && account?.bankCode) {
      navigator.clipboard.writeText(account.bankCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (!account) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-lg">
        <DialogHeader>
          <div className="mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200">
              <HeartHandshake className="h-3.5 w-3.5 text-emerald-600" />
              <span>Infaq &amp; Wakaf</span>
            </span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-[#064e3b]">
            Rekening Resmi Masjid
          </DialogTitle>
          <DialogDescription>
            Salurkan donasi, infaq, waqaf terbaik anda melalui rekening resmi kami:
          </DialogDescription>
        </DialogHeader>

        {/* BSI Bank Account Card */}
        <div className="my-4 p-5 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/20 shadow-sm space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-700/20">
                <Landmark className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <span className="font-bold text-base text-slate-900 block leading-tight">
                  {account.bankName}
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  Bank Syariah Indonesia
                </span>
              </div>
            </div>

            {account.bankCode && (
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                <span className="text-[11px] text-slate-500 font-medium">Kode:</span>
                <span className="text-xs font-mono font-bold text-emerald-800">{account.bankCode}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-emerald-700 hover:text-emerald-900 transition-colors p-0.5"
                  title="Salin Kode Bank"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            )}
          </div>

          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1">
              Nomor Rekening
            </span>
            <div className="flex items-center justify-between bg-white border border-emerald-300/80 rounded-xl p-3 sm:p-3.5 shadow-sm">
              <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#064e3b] tracking-wider">
                {account.accountNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-sm transition active:scale-95 cursor-pointer"
              >
                {copiedAccount ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin No. Rek</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
              Atas Nama Rekening
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wide">
              {account.accountHolder}
            </span>
          </div>
        </div>

        {/* Footer WhatsApp Confirmation */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>Konfirmasi transfer donasi Anda ke panitia:</span>
          <a
            href={masjidData.contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#047857] font-semibold transition-colors shadow-sm"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>Konfirmasi WhatsApp</span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InfaqModal;
