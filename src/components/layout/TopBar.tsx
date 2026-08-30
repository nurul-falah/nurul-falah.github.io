import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export function TopBar() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${h}:${m}:${s} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#064e3b] text-white text-xs border-b border-[#065f46] py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <MapPin className="w-3.5 h-3.5" /> Kp. Sukatani, RT 05 RW 03, Desa Wangunsari
          </span>
          <span className="hidden sm:inline-block text-emerald-600">•</span>
          <span className="text-amber-300 font-medium">14 Safar 1448 H</span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <span className="text-emerald-200">{timeStr || "00:00:00 WIB"}</span>
          <span className="bg-emerald-800/80 px-2.5 py-0.5 rounded text-[11px] text-amber-200 border border-emerald-700/50 font-sans">
            Menuju Dzuhur: <b className="font-mono text-amber-300">01:24:10</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
