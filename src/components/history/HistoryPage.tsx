import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldAlert,
  AlertTriangle,
  History as HistoryIcon,
  Compass,
  Sparkles,
  Share2,
  Printer,
  Check,
} from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export interface HistoryPageProps {
  onBackToHome: () => void;
}

export function HistoryPage({ onBackToHome }: HistoryPageProps) {
  const { tx } = useI18n();

  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-20 selection:bg-amber-600 selection:text-white">
      {/* 1. Header Sticky Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-amber-700 bg-slate-100 hover:bg-amber-50 px-3.5 py-1.5 rounded-lg transition-colors border border-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
            <span>{tx("Kembali ke Beranda")}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-semibold border border-amber-300">
              {tx("Dokumen Riwayat Sukatani")}
            </span>
            <button
              onClick={handlePrint}
              title={tx("Cetak Halaman")}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title={tx("Salin Tautan")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{tx("Tersalin!")}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{tx("Bagikan")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero / Header Statement */}
      <header className="relative bg-gradient-to-b from-amber-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide uppercase border border-amber-500/30 mb-4">
            <HistoryIcon className="w-3.5 h-3.5" />
            {tx("Catatan Sejarah & Rekam Jejak Sukatani")}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-serif">
            {tx("Riwayat, Landasan Sikap & Jejak Perjuangan")}
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {tx("Catatan autentik, latar belakang inisiatif kepengurusan, transparansi kendala, serta rekam jejak dinamika sosial warga Sukatani sebagai cermin bagi generasi mendatang.")}
          </p>

          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> {tx("Dokumen Catatan Musyawarah & Riwayat")}
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" /> {tx("DKM Nurul Falah Sukatani")}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Main Long-form Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-8">
        
        {/* {tx("Latar Belakang")} & Pernyataan Sikap Awal */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
              01
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {tx("Latar Belakang & Penegasan Posisi")}
              </h2>
              <p className="text-xs text-slate-500">{tx("Maksud keterlibatan, keterbatasan waktu, dan niat luhur")}</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <div className="p-4 bg-amber-50/70 border-s-4 border-amber-600 rounded-e-xl">
              <p className="font-medium text-amber-950">
                {tx("“Saya tidak mengusulkan diri untuk menjadi ketua DKM, saya hanya mengisi kekosongan saja.”")}
              </p>
            </div>

            <p>
              {tx("Struktur organisasi telah dirumuskan dan disusun untuk memastikan tata kelola berjalan teratur. Undangan musyawarah resmi pada bulan Ramadhan telah disebarkan, namun saat itu tidak dihadiri oleh para pihak terkait.")}
            </p>

            <p>
              {tx("Meskipun telah diinfokan kepada sekretaris agar menahan langkah sementara demi meredam potensi konflik dan menjaga ketenteraman warga, inisiatif musyawarah tetap dipaksakan berjalan. Ketika pertemuan tersebut terlaksana, pembahasan justru melebar dan teralihkan pada urusan pribadi, bukan berfokus pada substansi rencana pembangunan serta kemakmuran masjid.")}
            </p>

            <p>
              {tx("Banyak hal seputar skema pendanaan mandiri dan tahapan (fase) pembangunan yang telah dijelaskan secara rinci kepada sekretaris sebagai pokok ikhtiar, namun pesan-pesan penting tersebut belum tersampaikan secara utuh kepada seluruh warga.")}
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mt-4 space-y-2">
              <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                {tx("Refleksi & Keyakinan Niat Baik:")}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                <li>{tx("Apa pun yang telah terjadi, kami meyakini kuat bahwa semua didasari niat baik.")}</li>
                <li>{tx("Hal-hal yang kurang baik terjadi murni akibat miskomunikasi dan perbedaan persepsi antar sesama.")}</li>
                <li>
                  {tx("Keterbatasan waktu 24 jam sehari di samping kewajiban bekerja di perusahaan luar membuat banyak ide sulit disampaikan secara virtual, sehingga pertemuan langsung dengan warga menjadi momentum penting untuk bertanggung jawab secara terhormat.")}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* {tx("Tata Tertib & Agenda Musyawarah Konstruktif")} */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-serif text-lg">
              02
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {tx("Tata Tertib & Agenda Musyawarah Konstruktif")}
              </h2>
              <p className="text-xs text-slate-500">{tx("Membangun mufakat beradab, bukan kegaduhan tanpa arah")}</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              {tx("Pertemuan warga harus dipastikan berlangsung tertib, santun, dan melahirkan kesimpulan konkrit yang dapat ditindaklanjuti secara nyata, bukan sekadar perkumpulan tanpa arah atau ajang keributan.")}
            </p>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" /> {tx("Susunan Agenda Musyawarah (~2 Jam 20 Menit)")}
              </h3>
              <ol className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <span className="font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded text-xs">{tx("10 Menit")}</span>
                  <div>
                    <strong className="text-white">{tx("Pemaparan Visi & Misi DKM Nurul Falah Sukatani")}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded text-xs">{tx("30 Menit")}</span>
                  <div>
                    <strong className="text-white">{tx("Pemaparan Riwayat DKM & Evaluasi Program")}</strong>
                    <p className="text-slate-400 text-xs mt-1">
                      {tx("Membahas program terlaksana, program tertunda, serta identifikasi kendala:")}
                    </p>
                    <ul className="list-disc list-inside text-slate-300 text-xs mt-1 ms-2 space-y-0.5">
                      <li>{tx("Komunikasi yang tidak sampai kepada khalayak")}</li>
                      <li>{tx("Maklumat resmi yang belum diperhatikan secara saksama")}</li>
                      <li>{tx("Undangan musyawarah yang tidak dihadiri")}</li>
                      <li>{tx("Kegiatan nyata di lapangan yang perlu terus diakselerasi")}</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded text-xs">{tx("30 Menit")}</span>
                  <div>
                    <strong className="text-white">{tx("Pemaparan Program Kerja Prioritas Pembangunan Masjid")}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded text-xs">{tx("30 Menit")}</span>
                  <div>
                    <strong className="text-white">{tx("Tanya Jawab & Diskusi Konstruktif")}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded text-xs">{tx("30 Menit")}</span>
                  <div>
                    <strong className="text-white">{tx("Musyawarah Mufakat & Keputusan Bersama")}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded text-xs">{tx("10 Menit")}</span>
                  <div>
                    <strong className="text-white">{tx("Doa Penutup & Silaturahmi Berjabat Tangan")}</strong>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Paradigma Pembangunan Masjid & Anti-Nyapir */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold font-serif text-lg">
              03
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {tx("Prinsip Pembangunan: Izzah, Martabat & Makmur")}
              </h2>
              <p className="text-xs text-slate-500">{tx("Menjaga kehormatan umat, menolak mental meminta-minta di jalan")}</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-slate-50/50">
              <h4 className="font-bold text-slate-900 mb-1">
                {tx("Tanya: “Kenapa masjid belum dibangun secara instan?”")}
              </h4>
              <p className="text-slate-600 text-sm">
                <strong>{tx("Jawab:")}</strong> {tx("Proses pembangunan hakikatnya sudah dimulai bertahap sejak tahun lalu secara terukur, cermat, dan berkesinambungan.")}
              </p>
            </div>

            <div className="border border-amber-200 rounded-xl p-4 sm:p-5 bg-amber-50/40">
              <h4 className="font-bold text-amber-950 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                {tx("Tanya: “Kenapa tidak langsung merobohkan bangunan utama?”")}
              </h4>
              <p className="text-slate-700 text-sm mb-3">
                <strong>{tx("Jawab:")}</strong> {tx("Selama mengemban amanah kepengurusan, kami menolak membiarkan masjid mangkrak di tengah jalan. Kami berketetapan teguh menjaga kehormatan (izzah) umat:")}
              </p>
              <div className="p-4 bg-white rounded-lg border border-amber-200 space-y-2 text-xs sm:text-sm text-slate-800">
                <p className="font-semibold text-rose-900">
                  {tx("Pantang sampai harus “nyapir-nyapir” (mengemis meminta sumbangan) di jalanan atau mengemis ke partai politik yang ujung-ujungnya harus menggadaikan atau menjual suara rakyat.")}
                </p>
                <p className="text-slate-600 italic">
                  {tx("“Malu kita terhadap saudara umat lain; tidak ada dalam riwayat mereka meminta-minta atau mengemis di tengah jalan raya demi tempat ibadah.”")}
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                <strong>{tx("Filosofi Kemakmuran:")}</strong> Gagasan hakiki masjid bukan semata-mata berlomba memegahkan fisik bangunan,
                melainkan bagaimana <em>ngisian masjid</em> (memakmurkan shalat berjamaah, membina ta&apos;lim, dan memberdayakan warga).
              </p>
            </div>

            <div className="text-xs text-slate-500 italic border-s-2 border-slate-300 ps-3">
              {tx("Keterbatasan: Ketua DKM memiliki keterbatasan dan kesibukan profesional, sehingga tidak dapat menjelaskan semua hal satu per satu secara perorangan setiap saat. Jika warga mengharapkan sosok pemimpin yang serba sempurna tanpa cela, mungkin malaikatlah yang harus memimpin.")}
            </div>
          </div>
        </section>

        {/* Pesan Untuk Generasi Penerus */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold font-serif text-lg">
              04
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {tx("Amanat Untuk Generasi Penerus")}
              </h2>
              <p className="text-xs text-slate-500">{tx("Melindungi kehormatan keluarga dan keberanian memegang prinsip")}</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <div className="p-5 bg-purple-50/70 border-s-4 border-purple-600 rounded-e-xl">
              <h4 className="font-bold text-purple-950 mb-2">{tx("Pesan Kepada Anak Cucu:")}</h4>
              <p className="text-xs sm:text-sm text-purple-900 leading-relaxed">
                {tx("“Jika di kemudian hari anak keturunan kami memutuskan untuk menetap di kampung ini, jangan sekali-kali bersedia ditunjuk memegang jabatan apa pun jika penunjukan tersebut hanya dijadikan ajang pencarian kesalahan, penghinaan, caci maki, ataupun proses penyidangan sepihak yang mengintimidasi keluarga di bawah kedok musyawarah dadakan yang tidak adil.”")}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
              <p className="font-semibold text-slate-900">{tx("Nasihat Bagi Pemimpin Muda Masa Depan:")}</p>
              <p className="text-slate-600">
                {tx("Jangan pernah surut langkah atau takut kepada segelintir pihak yang berbeda pemikiran. Namun pahamilah risikonya: kepemimpinan yang berprinsip kokoh seringkali menghadapi upaya penggulingan sepihak yang tidak terhormat bila tidak dipagari oleh hukum organisasi yang kuat.")}
              </p>
            </div>
          </div>
        </section>

        {/* Kilas Balik {tx("Sosial")}: Flashback Kasus RW */}
        <section className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-100">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold font-serif text-lg">
              05
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {tx("Kilas Balik Dinamika Sosial Sukatani")}
              </h2>
              <p className="text-xs text-rose-600 font-medium">{tx("Rekam jejak masa lalu yang melahirkan kebutuhan mutlak akan AD/ART")}</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              Di masa lampau, saat <strong>Bpk. Sugandi</strong> menjabat sebagai Ketua RW, terjadi sebuah permasalahan berskala kecil.
              Namun warga saat itu berkomplot dan berdemo hingga menumbangkan Ketua RW dari jabatannya. Kejadian serupa berulang pula di era kepemimpinan <strong>Bpk. Oleh</strong>.
            </p>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 text-xs sm:text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                {tx("Dampak Negatif & Trauma Kepemimpinan:")}
              </div>
              <p>
                {tx("Cara-cara anarkis semacam ini menorehkan trauma sosial yang sangat buruk bagi generasi penerus. Warga menjadi enggan tampil mengabdi sebagai ketua lingkungan maupun pengurus organisasi masyarakat karena insentif dan risiko yang dihadapi tidak sebanding.")}
              </p>
            </div>

            <h3 className="font-bold text-slate-900 text-base pt-2">{tx("Solusi Peradaban: Menegakkan Konstitusi Organisasi (AD/ART)")}</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {tx("Peristiwa kelam ini membuktikan bahwa suatu komunitas tidak boleh berjalan atas dasar amuk massa (*mob-rule*). Harus ada aturan main tertulis dan beradab:")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900 block mb-1">{tx("1. Evaluasi & Klasifikasi Objektif")}</strong>
                {tx("Setiap dugaan kekeliruan harus diukur secara adil: apakah kesalahan biasa, perdata, atau pidana, serta apakah sepadan untuk diberhentikan.")}
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900 block mb-1">{tx("2. Tahapan Surat Peringatan (SP)")}</strong>
                {tx("Mengedepankan teguran lisan, tertulis, dan mediasi sebelum melangkah ke sanksi pemakzulan.")}
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900 block mb-1">{tx("3. Masa Transisi Manusiawi")}</strong>
                {tx("Bila terjadi pergantian, berikan tenggang waktu pengunduran diri yang terhormat (1-3 bulan) agar tidak terkesan bar-bar.")}
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900 block mb-1">{tx("4. Larangan Komplotan & Anarkisme")}</strong>
                {tx("Mengharamkan pengerahan massa tanpa hak, demi menjamin martabat seluruh warga dan keluarga pengurus.")}
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home CTA */}
        <div className="pt-6 pb-12 text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
            <span>{tx("Kembali ke Halaman Utama")}</span>
          </button>
        </div>

      </main>
    </div>
  );
}

