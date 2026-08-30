import React, { useState } from "react";
import { Landmark, HeartHandshake, Menu, X, TrendingUp } from "lucide-react";

export interface NavbarProps {
  onOpenInfaq?: () => void;
}

export function Navbar({ onOpenInfaq }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Program Rutin", href: "#program" },
    { label: "Program Jangka Panjang", href: "#program-panjang", highlight: true },
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
          <a href="#beranda" className="flex items-center gap-3 group text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight text-[#064e3b]">Masjid Nurul Falah &amp; RKM</div>
              <div className="text-xs text-slate-500 font-medium tracking-wide">
                Sukatani, Desa Wangunsari
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              if (link.highlight) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition flex items-center gap-1 font-bold"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{link.label}</span>
                  </a>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA Infaq Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handleInfaqClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-sm hover:shadow-md transition cursor-pointer active:scale-95"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Infaq / Wakaf</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
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
