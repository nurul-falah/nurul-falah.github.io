import React, { useState } from "react";
import { HeartHandshake, Menu, X, TrendingUp } from "lucide-react";

export interface NavbarProps {
  onOpenInfaq?: () => void;
}

export function Navbar({ onOpenInfaq }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Program Rutin", shortLabel: "Program", href: "#program" },
    { label: "Program Jangka Panjang", shortLabel: "Roadmap", href: "#program-panjang", highlight: true },
    { label: "Desain Masjid", shortLabel: "Desain", href: "#desain-masjid" },
    { label: "Wakaf Pembangunan", shortLabel: "Wakaf", href: "#wakaf-pembangunan", highlight: true },
    { label: "Skema Pendanaan", shortLabel: "Pendanaan", href: "#pendanaan" },
    { label: "Rekap Tugas", shortLabel: "Tugas", href: "#rekap-tugas" },
  ];

  const handleInfaqClick = () => {
    setMobileMenuOpen(false);
    if (onOpenInfaq) {
      onOpenInfaq();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#beranda" className="flex items-center gap-2.5 sm:gap-3 group text-left shrink-0">
            <img
              src="./favicon.svg"
              alt="Logo Masjid Nurul Falah"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="font-bold text-base sm:text-lg leading-tight text-[#064e3b]">Masjid Nurul Falah &amp; RKM</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide">
                Sukatani, Desa Wangunsari
              </div>
            </div>
          </a>

          {/* Right Group: Desktop & Tablet Nav Links & CTA Button */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            <nav className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-slate-600">
              {navLinks.map((link) => {
                if (link.highlight) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="px-2.5 xl:px-3 py-2 rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition flex items-center gap-1 font-bold whitespace-nowrap"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-2.5 xl:px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA Infaq Button */}
            <button
              type="button"
              onClick={handleInfaqClick}
              className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs xl:text-sm shadow-sm hover:shadow-md transition cursor-pointer active:scale-95 ml-1 whitespace-nowrap shrink-0"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Infaq / Wakaf</span>
            </button>
          </div>

          {/* Tablet (md to lg) Navigation Bar with compact labels */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            <nav className="flex items-center gap-0.5 text-xs font-semibold text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-2 py-1.5 rounded-lg transition whitespace-nowrap ${
                    link.highlight
                      ? "text-emerald-800 bg-emerald-50 font-bold"
                      : "hover:text-emerald-700 hover:bg-emerald-50"
                  }`}
                  title={link.label}
                >
                  {link.shortLabel}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={handleInfaqClick}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-xs transition cursor-pointer active:scale-95 ml-1 shrink-0"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
              <span>Infaq</span>
            </button>
          </div>

          {/* Mobile Menu Toggle (below md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-emerald-700" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-2 text-center animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition text-center ${
                  link.highlight
                    ? "text-emerald-800 bg-emerald-50 font-bold"
                    : "text-slate-700 hover:bg-emerald-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 px-2">
              <button
                type="button"
                onClick={handleInfaqClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-medium text-sm shadow cursor-pointer active:scale-95 text-center"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Infaq &amp; Wakaf</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
