export interface AdArtPasal {
  number: string;
  title: string;
  highlight?: boolean;
  badge?: string;
  items: Array<{
    text: string;
    subItems?: string[];
  }>;
}

export interface AdArtBab {
  id: string;
  part: "AD" | "ART";
  babNumber: string;
  title: string;
  summary: string;
  pasals: AdArtPasal[];
}

export interface AdArtDocument {
  title: string;
  subtitle: string;
  organization: string;
  address: string;
  establishedDate: string;
  hijriDate: string;
  mukadimah: {
    bismillah: string;
    opening: string;
    quranQuote: {
      text: string;
      source: string;
    };
    body: string[];
  };
  babs: AdArtBab[];
  signatories: Array<{
    role: string;
    name: string;
    status: string;
  }>;
}

export const adArtData: AdArtDocument = {
  title: "Anggaran Dasar & Anggaran Rumah Tangga (AD/ART)",
  subtitle: "Aturan Dasar & Tata Tertib Organisasi",
  organization: "Dewan Kemakmuran Masjid (DKM) & Rukun Kematian Muslim (RKM) Masjid Nurul Falah Sukatani",
  address: "Kp. Sukatani, RT 05 RW 03, Desa Wangunsari, Kecamatan Cisolok, Kabupaten Sukabumi, Provinsi Jawa Barat 43366",
  establishedDate: "1 November 2026 M",
  hijriDate: "21 Jumadil Awal 1448 H",
  mukadimah: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    opening:
      "Segala puji bagi Allah Subhanahu wa Ta'ala, Tuhan semesta alam yang telah memerintahkan hamba-Nya untuk memakmurkan rumah-rumah-Nya di muka bumi, sebagaimana firman-Nya dalam Al-Qur'an:",
    quranQuote: {
      text: "Hanyalah yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian, serta tetap mendirikan shalat, menunaikan zakat dan tidak takut (kepada siapapun) selain kepada Allah, maka merekalah orang-orang yang diharapkan termasuk golongan orang-orang yang mendapat petunjuk.",
      source: "QS. At-Taubah: 18",
    },
    body: [
      "Masjid bukan sekadar bangunan fisik tempat bersujud, melainkan pusat peradaban, pembinaan akhlak dan generasi, pemberdayaan ekonomi umat, serta jaring pengaman sosial masyarakat. Demi mewujudkan tata kelola masjid yang Murni dalam niat dan adab, Mandiri dalam kehormatan dan ekonomi, serta Tumbuh Berkelanjutan dalam pembinaan sumber daya manusia dan pembangunan fisik yang terukur, maka diperlukan pedoman organisasi yang jelas, adil, transparan, dan mengikat seluruh elemen pengurus serta jamaah.",
      "Dengan mengharap ridha dan pertolongan Allah Subhanahu wa Ta'ala, jamaah dan pengurus Masjid Nurul Falah Sukatani menetapkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Dewan Kemakmuran Masjid (DKM) & Rukun Kematian Muslim (RKM) Masjid Nurul Falah Sukatani sebagai berikut:",
    ],
  },
  babs: [
    // ==================== ANGGARAN DASAR (AD) ====================
    {
      id: "ad-bab-1",
      part: "AD",
      babNumber: "BAB I",
      title: "Nama, Waktu, dan Kedudukan",
      summary: "Identitas resmi kelembagaan DKM & RKM Nurul Falah serta kedudukan hukumnya di Kp. Sukatani.",
      pasals: [
        {
          number: "Pasal 1",
          title: "Nama Organisasi",
          items: [
            {
              text: "Organisasi ini bernama Dewan Kemakmuran Masjid (DKM) Masjid Nurul Falah Sukatani, yang terintegrasi secara kelembagaan dengan Rukun Kematian Muslim (RKM) Nurul Falah Sukatani, selanjutnya dalam AD/ART ini disebut DKM Nurul Falah.",
            },
          ],
        },
        {
          number: "Pasal 2",
          title: "Waktu Pendirian",
          items: [
            {
              text: "DKM Nurul Falah didirikan oleh masyarakat Muslim Kp. Sukatani untuk jangka waktu yang tidak ditentukan selama Masjid Nurul Falah berdiri dan berfungsi sebagai tempat ibadah serta pusat kegiatan umat.",
            },
          ],
        },
        {
          number: "Pasal 3",
          title: "Kedudukan",
          items: [
            {
              text: "DKM Nurul Falah berkedudukan di Masjid Nurul Falah, beralamat di Kp. Sukatani, RT 05 RW 03, Desa Wangunsari, Kecamatan Cisolok, Kabupaten Sukabumi, Provinsi Jawa Barat, Kode Pos 43366.",
            },
          ],
        },
      ],
    },
    {
      id: "ad-bab-2",
      part: "AD",
      babNumber: "BAB II",
      title: "Asas, Aqidah, dan Doktrin Nilai Dasar",
      summary: "Landasan syariat Islam dan penguncian 3 Pilar Nilai Dasar (Murni, Mandiri, Tumbuh Berkelanjutan).",
      pasals: [
        {
          number: "Pasal 4",
          title: "Asas dan Aqidah",
          items: [
            {
              text: "DKM Nurul Falah berasaskan Islam yang berpedoman pada Al-Qur'an dan As-Sunnah sesuai dengan pemahaman Ahlussunnah wal Jama'ah.",
            },
            {
              text: "Dalam kehidupan berbangsa dan bernegara, DKM Nurul Falah mematuhi hukum dan peraturan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia sepanjang tidak bertentangan dengan syariat Islam.",
            },
          ],
        },
        {
          number: "Pasal 5",
          title: "Doktrin 3 (Tiga) Pilar Nilai Dasar",
          highlight: true,
          badge: "Fondasi Utama",
          items: [
            {
              text: "1. MURNI (Integritas Niat & Kebersihan Adab):",
              subItems: [
                "Mengelola dan memakmurkan masjid semata-mata lillahi ta'ala.",
                "Bebas Politisasi: Menolak segala bentuk politik praktis, barter suara, maupun kesepakatan transaksional dengan partai politik atau calon legislatif/eksekutif yang menggadaikan independensi masjid dan marwah warga.",
                "Musyawarah Beradab: Mengedepankan musyawarah yang santun, terjadwal, fokus pada solusi, dan berkeadilan; serta menolak segala bentuk penghakiman sepihak, fitnah, caci maki, atau intimidasi personal.",
                "Transparansi Total: Pelaporan keuangan dan program kerja wajib terbuka 100% melalui papan informasi (mading) masjid dan portal web resmi (https://nurul-falah.github.io).",
              ],
            },
            {
              text: "2. MANDIRI (Kedaulatan Marwah & Berdikari):",
              subItems: [
                "Pantang Mengemis (Anti-Nyapir): Dilarang keras menghimpun dana dengan cara meminta-minta di jalan raya (nyapir) atau cara-cara lain yang merendahkan martabat dan kehormatan umat Islam.",
                "Mengutamakan kemandirian melalui swadaya gotong royong jamaah serta kemitraan wakaf dan infaq umat yang terhormat.",
              ],
            },
            {
              text: "3. TUMBUH BERKELANJUTAN (Pertumbuhan SDM & Pembangunan Taktis):",
              subItems: [
                "Menempatkan pembangunan manusia (pemakmuran ibadah, pendidikan Al-Qur'an anak-anak, kaderisasi imam muda, majelis ilmu, dan kepedulian sosial) di atas sekadar kemegahan fisik bangunan.",
                "Melaksanakan pembangunan fisik masjid secara bertahap, rasional, terukur, bebas dari jeratan utang yang membebani jamaah, dan mendahulukan sarana fungsional agar ibadah warga tidak pernah terhenti.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ad-bab-3",
      part: "AD",
      babNumber: "BAB III",
      title: "Visi, Misi, dan Fungsi",
      summary: "Arah strategis peradaban umat meliputi Idarah, Imarah, Ri'ayah, serta Ijtima'iyah & Muamalah.",
      pasals: [
        {
          number: "Pasal 6",
          title: "Visi",
          items: [
            {
              text: "Terwujudnya Masjid Nurul Falah Sukatani sebagai pusat peradaban umat yang Murni dalam adab dan niat, Mandiri dalam ekonomi dan marwah, serta Tumbuh Berkelanjutan dalam membina generasi rabbani dan masyarakat madani.",
            },
          ],
        },
        {
          number: "Pasal 7",
          title: "Misi",
          items: [
            {
              text: "Idarah (Tata Kelola & Administrasi): Menyelenggarakan manajemen organisasi, administrasi, dan keuangan masjid secara satu pintu, modern, transparan, dan akuntabel.",
            },
            {
              text: "Imarah (Pemakmuran & Pendidikan): Menghidupkan shalat berjamaah lima waktu, pembinaan baca-tulis Al-Qur'an (TPA) anak-anak setiap hari, kaderisasi imam dan pengajar muda, serta kajian rutin bagi bapak-bapak, ibu-ibu, dan remaja.",
            },
            {
              text: "Ri'ayah (Pembangunan & Pemeliharaan Fisik): Melaksanakan pembangunan dan pemeliharaan Masjid Nurul Falah 2 lantai beserta sarana pendukungnya (sanitasi, tempat wudhu, selasar ibadah) secara bertahap dan berkualitas.",
            },
            {
              text: "Ijtima'iyah & Muamalah (Sosial, RKM & Baitul Mal): Mengelola layanan fardhu kifayah pengurusan jenazah (RKM), penyaluran zakat/infaq (UPZ), serta pinjaman kebajikan warga tanpa riba (Qardhul Hasan melalui Baitul Mal).",
            },
          ],
        },
      ],
    },
    {
      id: "ad-bab-4",
      part: "AD",
      babNumber: "BAB IV",
      title: "Kedaulatan, Keanggotaan, dan Kepengurusan",
      summary: "Definisi jamaah dan susunan struktur organisasi DKM & RKM Nurul Falah.",
      pasals: [
        {
          number: "Pasal 8",
          title: "Jamaah",
          items: [
            {
              text: "Jamaah Masjid Nurul Falah adalah seluruh warga Muslim yang berdomisili di lingkungan Kp. Sukatani (khususnya RT 05 RW 03 Desa Wangunsari dan sekitarnya) serta kaum Muslimin yang secara aktif mengikuti kegiatan ibadah dan kemakmuran di Masjid Nurul Falah.",
            },
          ],
        },
        {
          number: "Pasal 9",
          title: "Struktur Organisasi",
          items: [
            {
              text: "Dewan Penasehat / Pembina: Tokoh agama, sesepuh masyarakat, dan aparatur lingkungan setempat yang memberikan nasihat syar'i dan pertimbangan kebijaksanaan.",
            },
            {
              text: "Pengurus Harian (Pelaksana): Terdiri atas Ketua DKM, Sekretaris DKM, dan Bendahara DKM.",
            },
            {
              text: "Bidang-Bidang Pelaksana:",
              subItems: [
                "Bidang Imarah (Dakwah, Ibadah, Pendidikan TPA & Remaja/Risma)",
                "Bidang Ri'ayah (Pembangunan, Pemeliharaan Sarana & Kebersihan/Marbot)",
                "Bidang Sosial & RKM (Pelayanan Jenazah / Fardhu Kifayah)",
                "Bidang Zakat & Baitul Mal (UPZ & Pinjaman Kebajikan Warga)",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ad-bab-5",
      part: "AD",
      babNumber: "BAB V",
      title: "Musyawarah dan Pengambilan Keputusan",
      summary: "Jenis-jenis forum musyawarah resmi serta syarat mutlak keabsahan musyawarah.",
      pasals: [
        {
          number: "Pasal 10",
          title: "Jenis Musyawarah",
          items: [
            {
              text: "Musyawarah Tahunan (Musyawarah Ramadhan): Forum evaluasi tahunan, penyampaian laporan pertanggungjawaban program dan keuangan, serta penetapan rencana kerja tahun berjalan yang diselenggarakan setiap bulan Ramadhan.",
            },
            {
              text: "Musyawarah Pleno / Pemilihan Pengurus: Forum tertinggi untuk memilih atau menetapkan Ketua DKM pada akhir masa jabatan atau apabila terjadi kekosongan jabatan.",
            },
            {
              text: "Musyawarah Pengurus / Rapat Koordinasi: Rapat berkala antar pengurus untuk membahas pelaksanaan program kerja dan teknis pembangunan.",
            },
            {
              text: "Musyawarah Khusus Warga: Pertemuan bersama jamaah untuk membahas agenda strategis tertentu yang membutuhkan kesepakatan bersama warga.",
            },
          ],
        },
        {
          number: "Pasal 11",
          title: "Keabsahan Musyawarah",
          highlight: true,
          badge: "Ketentuan Krusial",
          items: [
            {
              text: "Setiap musyawarah resmi mengatasnamakan DKM Nurul Falah WAJIB diketahui, disetujui, dan diundang secara sah oleh Ketua DKM (atau pejabat yang diberikan mandat tertulis oleh Ketua DKM).",
            },
            {
              text: "Pertemuan yang diadakan secara mendadak, sepihak, tanpa pemberitahuan agenda yang jelas, atau tanpa koordinasi dan persetujuan Ketua DKM dinyatakan TIDAK SAH dan keputusannya tidak mengikat organisasi.",
            },
          ],
        },
      ],
    },
    {
      id: "ad-bab-6",
      part: "AD",
      babNumber: "BAB VI",
      title: "Keuangan dan Kekayaan Organisasi",
      summary: "Sumber pendanaan halal dan penerapan Sistem Kas Satu Pintu (BSI 7203516578).",
      pasals: [
        {
          number: "Pasal 12",
          title: "Sumber Dana",
          items: [
            {
              text: "Swadaya Jamaah Sukatani: Infaq kotak amal Jum'at/pengajian (penggabungan kas bapak-bapak dan ibu-ibu), iuran sukarela warga, iuran RKM, serta gotong royong tenaga dan material.",
            },
            {
              text: "Donatur & Wakaf Umat: Wakaf tunai, wakaf material, dan infaq jariyah dari para muhsinin/simpatisan luar maupun dalam daerah yang tidak mengikat.",
            },
            {
              text: "Dana Zakat dan Sosial (UPZ & Baitul Mal): Dana zakat fitrah, zakat maal, dan fidyah yang dikelola khusus sesuai syariat bagi para mustahiq.",
            },
          ],
        },
        {
          number: "Pasal 13",
          title: "Sistem Kas Satu Pintu, Keterbukaan Uang Fisik, & Status Aset Wakaf",
          highlight: true,
          badge: "Hak Keuangan Jamaah",
          items: [
            {
              text: "Kesiapan Menunjukkan Uang Fisik: Pengurus DKM maupun RKM wajib bersedia menunjukkan uang fisik kas dan/atau bukti mutasi rekening kapan pun diminta oleh warga, dengan sikap terbuka dan tanpa merasa tersinggung, karena mengetahui keamanan keuangan adalah hak bagi setiap jamaah.",
            },
            {
              text: "Seluruh dana infaq operasional dan pembangunan masjid (baik dari jamaah bapak-bapak maupun ibu-ibu) disatukan dalam satu kesatuan kas DKM Nurul Falah.",
            },
            {
              text: "Penyimpanan dana wajib mengutamakan rekening bank syariah resmi atas nama masjid (Bank Syariah Indonesia / BSI No. Rek. 7203516578 a.n. MASJID NURUL FALAH SUKATANI).",
            },
            {
              text: "Status Mutlak Aset Wakaf & Infaq: Seluruh lahan, bangunan, material, inventaris, maupun dana yang telah diserahkan kepada DKM/RKM Nurul Falah sebagai wakaf atau infaq otomatis berstatus milik Allah SWT untuk kemaslahatan umat, sehingga tidak dapat ditarik kembali atau diklaim kepemilikan pribadinya oleh siapapun (baik oleh donatur, ahli waris, maupun pengurus) dalam kondisi apapun.",
            },
          ],
        },
      ],
    },
    {
      id: "ad-bab-7",
      part: "AD",
      babNumber: "BAB VII",
      title: "Perubahan Anggaran Dasar dan Penutup",
      summary: "Mekanisme kuorum dan mufakat untuk perubahan Anggaran Dasar.",
      pasals: [
        {
          number: "Pasal 14",
          title: "Perubahan Anggaran Dasar",
          items: [
            {
              text: "Perubahan terhadap Anggaran Dasar ini hanya dapat dilakukan melalui Musyawarah Tahunan atau Musyawarah Khusus yang dihadiri oleh sekurang-kurangnya 2/3 (dua pertiga) pengurus aktif dan perwakilan tokoh jamaah, serta disetujui secara mufakat.",
            },
          ],
        },
      ],
    },

    // ==================== ANGGARAN RUMAH TANGGA (ART) ====================
    {
      id: "art-bab-1",
      part: "ART",
      babNumber: "BAB I",
      title: "Hak, Kewajiban, dan Adab Jamaah & Pengurus",
      summary: "Hak dan kewajiban jamaah serta kriteria integritas pengurus DKM.",
      pasals: [
        {
          number: "Pasal 1",
          title: "Hak dan Kewajiban Jamaah",
          items: [
            {
              text: "Hak Jamaah:",
              subItems: [
                "Menggunakan fasilitas Masjid Nurul Falah untuk ibadah, pengajian, dan kegiatan keislaman sesuai tata tertib masjid.",
                "Mendapatkan pelayanan sosial keagamaan, termasuk layanan RKM (pengurusan jenazah) dan akses program Baitul Mal sesuai ketentuan yang berlaku.",
                "Memperoleh informasi laporan keuangan dan perkembangan pembangunan secara transparan melalui mading masjid dan portal web resmi.",
                "Meminta pengurus DKM atau RKM untuk menunjukkan uang fisik kas maupun bukti saldo rekening guna memastikan keamanan keuangan masjid.",
                "Menyampaikan saran, masukan, atau pertanyaan secara santun, beradab, dan konstruktif di dalam forum resmi maupun langsung kepada pengurus.",
              ],
            },
            {
              text: "Kewajiban & Adab Jamaah:",
              subItems: [
                "Menjaga kesucian, kebersihan, ketertiban, dan fasilitas masjid.",
                "Memperhatikan Maklumat Resmi: Setiap informasi, laporan keuangan, skema pembangunan, dan maklumat yang telah ditempelkan di Papan Informasi (Mading) Masjid dan/atau dipublikasikan di Portal Web Resmi dianggap telah disampaikan secara sah kepada seluruh warga. Warga wajib membaca dan melakukan tabayyun sebelum menyimpulkan sesuatu.",
                "Menjaga Adab & Bebas Asap Rokok: Menjaga ketenangan saat shalat dan pengajian anak-anak berlangsung, menjaga kebersihan area wudhu dan toilet, serta dilarang merokok di dalam ruang ibadah maupun area teras masjid.",
                "Memelihara ukhuwah Islamiyah, kerukunan warga, serta mematuhi keputusan musyawarah yang telah ditetapkan secara sah.",
                "Menghindari ghibah, provokasi, penyebaran berita yang belum terkonfirmasi (tabayyun), atau tindakan yang memecah belah jamaah.",
              ],
            },
          ],
        },
        {
          number: "Pasal 2",
          title: "Syarat Pengurus DKM",
          items: [
            {
              text: "Beragama Islam, berakhlak mulia, dan menjaga shalat lima waktu.",
            },
            {
              text: "Jujur (shiddiq), dapat dipercaya (amanah), komunikatif (tabligh), dan memiliki kecakapan (fathanah) sesuai bidang tugasnya.",
            },
            {
              text: "Berkomitmen memegang teguh 3 Pilar Nilai Dasar (Murni, Mandiri, Tumbuh Berkelanjutan).",
            },
            {
              text: "Tidak menggunakan jabatan DKM untuk kepentingan politik praktis atau keuntungan pribadi.",
            },
          ],
        },
      ],
    },
    {
      id: "art-bab-2",
      part: "ART",
      babNumber: "BAB II",
      title: "Tugas Pokok dan Wewenang Pengurus",
      summary: "Rincian tupoksi Ketua, Sekretaris, Bendahara, dan Bidang-Bidang serta disiplin koordinasi.",
      pasals: [
        {
          number: "Pasal 3",
          title: "Ketua DKM",
          items: [
            {
              text: "Memimpin, mengoordinasikan, dan mengendalikan seluruh kebijakan strategis serta kegiatan DKM & RKM Nurul Falah.",
            },
            {
              text: "Menetapkan visi, tahapan prioritas pembangunan, serta mengesahkan pengangkatan/pergantian pengurus bidang dan marbot.",
            },
            {
              text: "Memberikan persetujuan atas penyelenggaraan musyawarah resmi dan pengeluaran dana strategis/pembangunan.",
            },
            {
              text: "Mengingat kesibukan kerja profesional Ketua DKM, pelaksanaan teknis harian di lapangan didelegasikan kepada Sekretaris dan Ketua-Ketua Bidang sesuai porsi tanggung jawab masing-masing dengan tetap berada dalam garis koordinasi Ketua DKM.",
            },
            {
              text: "Keabsahan Koordinasi Daring/Virtual: Mengingat seluruh pengurus DKM/RKM mengabdi secara sukarela tanpa gaji (non-profit) dan memiliki kewajiban mencari nafkah bagi keluarganya, maka koordinasi, arahan kebijakan, maupun rapat yang dilakukan secara daring/virtual (melalui WhatsApp, telepon, atau dokumen digital) memiliki kekuatan hukum yang sama sahnya dengan kehadiran fisik.",
            },
          ],
        },
        {
          number: "Pasal 4",
          title: "Sekretaris DKM",
          highlight: true,
          badge: "Disiplin Koordinasi",
          items: [
            {
              text: "Menjalankan administrasi kesekretariatan, surat-menyurat, arsip, serta pengumuman/maklumat resmi kepada warga.",
            },
            {
              text: "Kewajiban Penyampaian Informasi: Sekretaris wajib meneruskan secara utuh, akurat, dan tepat waktu setiap penjelasan, skema pendanaan, dan arahan kebijakan dari Ketua DKM kepada pengurus lain serta warga agar tidak terjadi kesalahpahaman (miskomunikasi).",
            },
            {
              text: "Kepatuhan Koordinasi: Sekretaris dilarang menginisiasi atau memaksakan penyelenggaraan musyawarah warga tanpa persetujuan Ketua DKM, terlebih apabila Ketua DKM telah menginstruksikan penundaan demi menjaga kondusivitas dan meredam potensi konflik warga.",
            },
            {
              text: "Mencatat notulensi setiap musyawarah resmi dan mempublikasikan hasilnya di mading masjid.",
            },
          ],
        },
        {
          number: "Pasal 5",
          title: "Bendahara DKM",
          items: [
            {
              text: "Menerima, menyimpan, membukukan, dan mengeluarkan dana kas DKM atas sepengetahuan dan persetujuan Ketua DKM.",
            },
            {
              text: "Menyusun laporan keuangan berkala (bulanan/tahunan) yang memisahkan dengan jelas antara Pos Dana Pembangunan/Renovasi Masjid, Pos Dana Operasional/Infaq Umum Masjid, dan Pos Dana Sosial / RKM / Baitul Mal / UPZ.",
            },
            {
              text: "Mempublikasikan laporan posisi saldo, pemasukan, dan pengeluaran secara rutin di mading fisik masjid dan menyerahkan datanya untuk diperbarui di portal digital.",
            },
            {
              text: "Bersama pengurus DKM atau RKM bersedia menunjukkan uang fisik disaat ada warga yang meminta, tanpa merasa tersinggung, karena mengetahui keamanan keuangan adalah hak bagi setiap jamaah.",
            },
          ],
        },
        {
          number: "Pasal 6",
          title: "Bidang Imarah (Dakwah, Pendidikan & Ibadah)",
          items: [
            {
              text: "Mengatur jadwal imam rawatib, khatib Jum'at, muadzin, serta pemeliharaan syiar Ramadhan dan Hari Besar Islam (PHBI) secara efisien tanpa memberatkan warga dengan pungutan minimal.",
            },
            {
              text: "Mengelola kegiatan rutin:",
              subItems: [
                "TPA / Belajar Mengaji Anak-Anak (Setiap hari ba'da Maghrib – Isya), termasuk pelatihan shalat berjamaah Maghrib, kaderisasi imam shalat Isya, dan Training of Trainers (ToT) pengajar Al-Qur'an muda.",
                "Kajian Mingguan Bapak-Bapak (Setiap malam Kamis ba'da Maghrib – Isya).",
                "Kajian Mingguan Ibu-Ibu (Setiap hari Jum'at pukul 07.00 – 09.00 WIB).",
                "Kajian Bulanan / Tabligh Gabungan (1x sebulan).",
              ],
            },
          ],
        },
        {
          number: "Pasal 7",
          title: "Bidang Ri'ayah (Pembangunan, Pemeliharaan, Audio & Inventaris)",
          items: [
            {
              text: "Merencanakan dan mengawasi pelaksanaan tahapan pembangunan fisik Masjid Nurul Falah sesuai blueprint teknis dan kemampuan kas.",
            },
            {
              text: "Memelihara instalasi listrik, tata suara (sound system indoor & outdoor), sarana wudhu, toilet, saluran irigasi/sanitasi, dan perlengkapan ibadah.",
            },
            {
              text: "Mengoordinasikan tugas Marbot Masjid dalam menjaga kebersihan harian, pembukaan/penutupan masjid, dan kesiapan sarana sebelum waktu shalat.",
            },
            {
              text: "Tata Tertib Pengeras Suara (Audio Indoor & Outdoor): Penggunaan pengeras suara luar (outdoor) diatur secara tertib dan santun (untuk adzan, iqomah, pengumuman penting/kematian RKM, dan syiar yang terukur) serta hanya boleh dioperasikan oleh petugas yang berwenang.",
            },
            {
              text: "Perlindungan Inventaris Masjid & RKM: Seluruh inventaris masjid dan RKM (keranda, meja portabel UPZ, peralatan audio, lemari, perkakas bangunan) adalah harta wakaf/umat yang wajib dicatat, dirawat, dan dilarang dibawa pulang atau digunakan untuk kepentingan pribadi tanpa izin resmi pengurus.",
            },
          ],
        },
        {
          number: "Pasal 8",
          title: "Bidang Pelayanan Jenazah (RKM) & Baitul Mal / UPZ",
          items: [
            {
              text: "Rukun Kematian Muslim (RKM): Mengelola perlengkapan pemulasaraan jenazah (keranda, kain kafan, pemandian, liang lahat) dan mengoordinasikan fardhu kifayah saat ada warga yang wafat, dengan pelaporan yang terintegrasi di bawah DKM.",
            },
            {
              text: "Unit Pengumpul Zakat (UPZ): Menghimpun, mendata mustahiq secara objektif dan adil, serta mendistribusikan zakat fitrah dan zakat maal sesuai ketentuan syariat:",
              subItems: [
                "Penentuan daftar Mustahiq (penerima zakat) ditetapkan secara objektif melalui musyawarah pengurus berdasarkan kriteria syariat (asnaf zakat), bebas dari nepotisme atau pilih kasih.",
              ],
            },
            {
              text: "Baitul Mal (Pinjaman Warga): Mengelola dana kebajikan untuk membantu pinjaman darurat warga tanpa bunga/riba (Qardhul Hasan) dengan ketentuan:",
              subItems: [
                "Pinjaman bersifat Qardhul Hasan (0% bunga/riba), diprioritaskan khusus untuk kebutuhan darurat/mendesak warga jamaah sesuai kemampuan kas sosial.",
                "Setiap pinjaman wajib dicatat secara tertulis dan peminjam tidak diperkenankan mengajukan pinjaman baru sebelum pinjaman sebelumnya dilunasi.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "art-bab-3",
      part: "ART",
      babNumber: "BAB III",
      title: "Masa Jabatan, Penyelesaian Pelanggaran Etika, dan Pergantian Pengurus",
      summary: "Periode khidmat 10 tahun, tata cara musyawarah etik bersama MUI (anti-tradisi barbar), perlindungan marwah pengurus, dan kebebasan generasi berikutnya.",
      pasals: [
        {
          number: "Pasal 9",
          title: "Masa Jabatan & Kewajiban Estafet Program",
          items: [
            {
              text: "Masa khidmat kepengurusan DKM Nurul Falah adalah 10 (sepuluh) tahun untuk satu periode dan dapat dipilih kembali melalui musyawarah.",
            },
            {
              text: "Pengurus melaksanakan amanah secara sukarela (tathawwu') sebagai amal shalih.",
            },
            {
              text: "Siapa pun pengurus yang terpilih pada periode baru wajib menjaga kesinambungan dan melanjutkan program kerja jangka panjang yang telah dirintis oleh kepengurusan sebelumnya.",
            },
          ],
        },
        {
          number: "Pasal 10",
          title: "Berakhirnya Jabatan dan Pergantian Terhormat",
          highlight: true,
          badge: "Perlindungan Marwah",
          items: [
            {
              text: "Jabatan pengurus berakhir karena: (a) Habis masa periode kepengurusan; (b) Mengundurkan diri atas permintaan sendiri; (c) Meninggal dunia atau berhalangan tetap; atau (d) Diberhentikan melalui mekanisme organisasi yang sah karena melanggar syariat atau AD/ART secara berat.",
            },
            {
              text: "Perlindungan Marwah & Larangan Kudeta Sepihak: Evaluasi atau pergantian Ketua DKM maupun pengurus HANYA dapat dilakukan melalui Musyawarah Resmi yang dijadwalkan secara terbuka, diberitahukan sekurang-kurangnya 7 (tujuh) hari sebelumnya, dihadiri oleh pihak yang bersangkutan untuk memberikan penjelasan (hak jawab), serta dilaksanakan secara adil dan terhormat.",
            },
            {
              text: "Setiap upaya penggulingan, penyidangan sepihak, atau pemaksaan pergantian pengurus melalui rapat mendadak tanpa kehadiran dan persetujuan yang bersangkutan adalah BATAL DEMI HUKUM ORGANISASI dan merupakan pelanggaran berat terhadap adab kemasjidan.",
            },
            {
              text: "Kebebasan Menerima Amanah Generasi Berikutnya: Jabatan di dalam DKM adalah amanah sukarela dan tidak boleh dipaksakan kepada siapapun (termasuk keluarga atau keturunan pengurus sebelumnya) apabila penunjukan tersebut tidak disertai dukungan ikhlas dan jaminan tata krama musyawarah yang sehat dari warga.",
            },
            {
              text: "Masa Transisi & Mekanisme Pengunduran Diri yang Manusiawi: Apabila seorang pengurus terbukti melakukan kesalahan fatal yang mengharuskan pergantian kepengurusan, proses pergantian wajib dilakukan secara manusiawi dan beradab melalui pemberian masa tenggang/transisi (1 hingga 3 bulan). Pengurus yang bersangkutan diberikan kesempatan untuk menyelesaikan laporan pertanggungjawaban serta mengundurkan diri atas kesadaran sendiri secara terhormat, guna menghindari stigma pengusiran sepihak dan menjaga keharmonisan sosial warga.",
            },
          ],
        },
        {
          number: "Pasal 11",
          title: "Penyelesaian Pelanggaran Etika Pengurus & Peniadaan Tradisi Barbar",
          highlight: true,
          badge: "Mediasi MUI & Keadilan",
          items: [
            {
              text: "Larangan Tradisi Barbar, Komplotan, & Main Hakim Sendiri: Apabila terdapat seorang pengurus DKM atau RKM yang melakukan kekhilafan individu, seperti melontarkan bahasa atau ucapan yang dinilai kurang etis bagi warga, maka dilarang keras melakukan penghakiman massa, penggalangan komplotan, penghasutan, petisi liar, keributan sepihak, intimidasi, demonstrasi/gerudukan, atau tradisi barbar di lingkungan masjid maupun kampung.",
            },
            {
              text: "Wajib Melalui Musyawarah Resmi yang Dihadiri MUI: Tata cara menyikapi atau mengadili dugaan pelanggaran etika pengurus WAJIB ditempuh melalui forum Musyawarah Resmi yang tertib dan WAJIB dihadiri oleh perwakilan Majelis Ulama Indonesia (MUI) setempat sebagai penengah (mediator) serta pemberi pertimbangan hukum syar'i yang netral dan objektif.",
            },
            {
              text: "Sanksi Proporsional & Tolok Ukur Kesalahan (Bukan Pidana Fatal = Tidak Boleh Diturunkan): Pengurus yang terbukti melakukan kekhilafan lisan atau etika TIDAK SERTA-MERTA DIBERHENTIKAN dari jabatannya, melainkan dipertimbangkan secara adil dan bijaksana berdasarkan bobot kesalahan individu tersebut:",
              subItems: [
                "Kekhilafan Lisan / Etika Ringan: Diselesaikan melalui tabayyun, nasihat/teguran kekeluargaan, permohonan maaf terbuka, dan ishlah (perdamaian) yang disaksikan oleh MUI.",
                "Pelanggaran Sedang / Berulang: Diberikan teguran tertulis dan pembinaan adab di bawah bimbingan Dewan Penasehat serta MUI.",
                "Pelanggaran Administratif & Perdata Ringan: Tidak dapat dijadikan alasan untuk menurunkan pengurus dari jabatannya, melainkan diselesaikan secara musyawarah dan pemulihan keadaan.",
                "Pelanggaran Fatal (Pidana Terbukti / Penggelapan Kas / Khianat Syariat Berat): Dipertimbangkan sanksi pengunduran diri secara terhormat melalui masa transisi beradab atas rekomendasi MUI dalam Musyawarah Resmi.",
              ],
            },
            {
              text: "Pertanggungjawaban Bersifat Individual: Kekhilafan seorang pengurus merupakan tanggung jawab pribadi individu yang bersangkutan dan tidak dapat dijadikan alasan untuk merombak atau menjatuhkan kepengurusan DKM/RKM secara keseluruhan.",
            },
            {
              text: "Penanganan Persoalan 100% Baru & Jaminan Perlindungan Marwah: Apabila ditemukan persoalan yang 100% baru dan belum pernah terjadi sebelumnya, maka pengurus DKM atau warga berhak meminta diadakannya Musyawarah Resmi untuk membahas kasus tersebut secara jernih dan mencarikan solusi yang tidak merugikan satu sama lain, dengan ketentuan:",
              subItems: [
                "Tetap melindungi marwah dan kehormatan masing-masing individu agar tidak menjadi faktor yang membebani warga yang berkeinginan menjadi anggota atau pengurus DKM/RKM karena hak harga dirinya dilindungi oleh AD/ART ini.",
                "Apabila sanksi diperlukan, maka sanksi ditentukan secara proporsional sesuai tingkat kesalahan; misalnya jika kesalahan tersebut bukan merupakan tindak korupsi/penggelapan kas, maka sanksinya cukup berbentuk Surat Peringatan (SP) saja.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "art-bab-4",
      part: "ART",
      babNumber: "BAB IV",
      title: "Tata Tertib Musyawarah Beradab",
      summary: "Prosedur undangan H-3, alokasi waktu agenda, serta larangan keras menyerang pribadi (ad hominem) dan intimidasi.",
      pasals: [
        {
          number: "Pasal 12",
          title: "Prosedur Penyelenggaraan & Mengikatnya Keputusan Musyawarah",
          highlight: true,
          badge: "SOP Musyawarah",
          items: [
            {
              text: "Undangan & Agenda Tertulis: Undangan musyawarah wajib disampaikan minimal 3 (tiga) hari sebelum pelaksanaan (kecuali keadaan darurat bencana/kematian) dengan mencantumkan daftar agenda dan alokasi waktu yang jelas.",
            },
            {
              text: "Struktur Acara Musyawarah: Setiap musyawarah wajib dipimpin oleh pimpinan rapat/moderator yang menjaga ketertiban acara dengan urutan baku:",
              subItems: [
                "1. Pembukaan dan pembacaan ayat suci Al-Qur'an / doa awal majelis;",
                "2. Pembacaan tata tertib dan susunan agenda beserta batas waktu masing-masing sesi;",
                "3. Pemaparan materi/laporan oleh Ketua DKM atau pengurus terkait tanpa interupsi sebelum sesi pemaparan selesai;",
                "4. Sesi tanya jawab dan diskusi solusi yang terarah pada pokok bahasan;",
                "5. Pengambilan kesimpulan / mufakat yang dicatat secara tertulis beserta tindak lanjutnya;",
                "6. Doa penutup (kafaratul majelis) dan mushafahah (bersalam-salaman).",
              ],
            },
            {
              text: "Konsekuensi Ketidakhadiran (Absen = Menerima Keputusan): Warga atau pengurus yang telah diundang secara sah pada Musyawarah Resmi (termasuk Musyawarah Tahunan Ramadhan) namun memilih tidak hadir tanpa alasan syar'i, dianggap menyetujui dan wajib tunduk pada seluruh keputusan yang diambil dalam musyawarah tersebut, serta tidak berhak menggugat atau membuat forum tandingan di luar musyawarah.",
            },
          ],
        },
        {
          number: "Pasal 13",
          title: "Larangan di Dalam Musyawarah",
          highlight: true,
          badge: "Adab Majelis",
          items: [
            {
              text: "Membahas urusan pribadi atau menyerang kehormatan personal (ad hominem) pengurus maupun warga di luar agenda kerja organisasi.",
            },
            {
              text: "Berbicara dengan nada tinggi, mencaci maki, menghina, mengintimidasi, atau memotong pembicaraan sebelum diberikan izin oleh pimpinan musyawarah.",
            },
            {
              text: "Mengubah forum musyawarah menjadi ajang pencarian kesalahan atau pengadilan sepihak terhadap pengurus yang telah bekerja secara sukarela.",
            },
            {
              text: "Apabila seorang peserta melanggar ketentuan di atas dan telah diperingatkan sebanyak 2 (dua) kali oleh pimpinan musyawarah namun tetap tidak mengindahkan, pimpinan musyawarah berhak mencabut hak bicara peserta tersebut atau menutup/menunda jalannya musyawarah demi menjaga kehormatan masjid.",
            },
          ],
        },
      ],
    },
    {
      id: "art-bab-5",
      part: "ART",
      babNumber: "BAB V",
      title: "Pedoman Program Jangka Panjang, Pembangunan, dan Pendanaan",
      summary: "Kewajiban melanjutkan program jangka panjang lintas pengurus dengan sistem evaluasi konstruktif-berdasar, tahapan pembangunan anti-mangkrak, dan kode etik pendanaan.",
      pasals: [
        {
          number: "Pasal 14",
          title: "Kewajiban Melanjutkan Program Jangka Panjang & Sistem Evaluasi Konstruktif",
          highlight: true,
          badge: "Estafet & Evaluasi Objektif",
          items: [
            {
              text: "Kewajiban Keberlanjutan Lintas Kepengurusan: Siapa pun yang menjabat sebagai Pengurus DKM maupun RKM wajib melanjutkan Program Kerja Jangka Panjang (Visi Strategis 3–10 Tahun) yang telah ditetapkan, sehingga pergantian pengurus tidak menghentikan pembangunan masjid maupun program pembinaan umat yang sedang berjalan.",
            },
            {
              text: "Lingkup Program Jangka Panjang yang Wajib Dilanjutkan:",
              subItems: [
                "Program Kajian & Pembinaan SDM Jangka Panjang: Pelatihan baca-tulis Al-Qur'an anak-anak setiap hari, pembiasaan shalat berjamaah Maghrib, kaderisasi imam shalat Isya bagi generasi muda, pelatihan pengajar Al-Qur'an (ToT), serta kajian rutin mingguan bapak-bapak, ibu-ibu, dan kajian bulanan.",
                "Program Pembangunan & Revitalisasi Masjid: Penyelesaian tahapan pembangunan fisik Masjid Nurul Falah 2 lantai beserta fasilitas sanitasi, tempat wudhu, dan sarana belajar sesuai blueprint teknis.",
                "Program Layanan Sosial & Keumatan: Pengelolaan kas satu pintu, pelayanan jenazah RKM, UPZ, serta Baitul Mal pinjaman warga.",
              ],
            },
            {
              text: "Sistem Evaluasi dan Perbaikan yang Objektif, Konstruktif, dan Berdasar: Agar pelaksanaan program jangka panjang tetap objektif dan relevan, setiap penyesuaian atau penyempurnaan program wajib melalui mekanisme evaluasi berkala yang memenuhi prinsip:",
              subItems: [
                "Konstruktif (Membangun): Evaluasi bertujuan mencari solusi perbaikan dan meningkatkan efektivitas program, bukan mencari-cari kesalahan pengurus sebelumnya atau menyerang kehormatan pribadi.",
                "Berdasar Data & Fakta (Evidence-Based): Setiap usulan perbaikan wajib memiliki landasan yang jelas, terukur, dan berbasis data nyata di lapangan (laporan keuangan, rekap realisasi tugas, kehadiran jamaah, atau kajian teknis konstruksi), bukan berdasarkan asumsi sepihak atau sentimen subjektif.",
                "Terdokumentasi & Mufakat: Hasil evaluasi dan tindak lanjut perbaikan disepakati dalam musyawarah resmi serta dicatat secara terbuka sebagai pedoman bersama.",
              ],
            },
          ],
        },
        {
          number: "Pasal 15",
          title: "Prinsip Pembangunan Bertahap & Anti-Mangkrak",
          highlight: true,
          badge: "Strategi Pembangunan",
          items: [
            {
              text: "Pembangunan Masjid Nurul Falah 2 Lantai (Luas Lahan 500 m², Total Bangunan 344 m²) wajib dilaksanakan secara taktis dan bertahap sesuai ketersediaan dana riil di kas masjid:",
              subItems: [
                "Tahap 1: Pembangunan Jalur Sanitasi / Irigasi Air & Akses Lingkungan;",
                "Tahap 2: Pembangunan Teras Masjid Sisi Utara (Area Ibadah & Jum'atan Sementara);",
                "Tahap 3: Pembangunan Area Wudhu Terpisah dan Kamar Mandi/Toilet;",
                "Tahap 4: Pembangunan Struktur Bangunan Utama 2 Lantai (Pondasi, Kolom, Sloof, & Dak Mezzanine);",
                "Tahap 5: Pembangunan Dinding, Fasad, Mihrab, dan Penyelesaian Akhir (Finishing).",
              ],
            },
            {
              text: "Larangan Pembongkaran Prematur: Bangunan utama masjid yang lama DILARANG DIBONGKAR sebelum area ibadah darurat (Teras Sisi Utara) dan sarana sanitasi/wudhu selesai dibangun serta sebelum dana untuk struktur utama mencukupi, guna memastikan kegiatan shalat berjamaah warga tidak terputus dan pembangunan tidak mangkrak di tengah jalan.",
            },
          ],
        },
        {
          number: "Pasal 16",
          title: "Kode Etik Penghimpunan Dana",
          items: [
            {
              text: "Penghimpunan dana pembangunan wajib menjaga kemuliaan Islam dan harga diri warga Kp. Sukatani.",
            },
            {
              text: "Larangan Mutlak: Pengurus maupun panitia pembangunan dilarang:",
              subItems: [
                "Meminta-minta sumbangan di pinggir jalan raya dengan jaring/kotak (nyapir);",
                "Mengajukan atau menerima bantuan yang disertai syarat dukungan politik praktis/suara pemilu;",
                "Menetapkan pungutan wajib dengan nominal paksaan yang memberatkan warga kurang mampu (termasuk penghapusan batas minimal infaq PHBI).",
              ],
            },
            {
              text: "Seluruh konfirmasi wakaf dan infaq digital diarahkan ke rekening resmi masjid dan dilengkapi dengan fasilitas QRIS/kode pembayaran yang sah.",
            },
          ],
        },
      ],
    },
    {
      id: "art-bab-6",
      part: "ART",
      babNumber: "BAB VI",
      title: "Penutup",
      summary: "Penanganan persoalan baru dengan perlindungan marwah individu dan mulai berlakunya AD/ART.",
      pasals: [
        {
          number: "Pasal 17",
          title: "Ketentuan Penutup & Penanganan Persoalan Baru",
          items: [
            {
              text: "Hal-hal teknis operasional yang belum diatur secara rinci dalam Anggaran Rumah Tangga ini akan ditetapkan melalui Keputusan Pengurus DKM Nurul Falah sepanjang tidak bertentangan dengan jiwa dan pasal-pasal AD/ART ini.",
            },
            {
              text: "Apabila terdapat persoalan yang 100% baru dan tidak pernah terjadi sebelumnya, pengurus DKM atau warga berhak meminta diadakan musyawarah resmi untuk membahas kasus tersebut dan mencarikan solusi yang tidak merugikan satu sama lain. Jika sanksi diperlukan, maka sanksi ditentukan sesuai tingkat kesalahan (misalnya jika tidak korupsi, sanksinya cukup berbentuk Surat Peringatan saja), dengan tetap melindungi marwah masing-masing individu agar warga tidak terbebani untuk menjadi anggota atau pengurus DKM/RKM.",
            },
            {
              text: "Anggaran Dasar dan Anggaran Rumah Tangga ini mulai berlaku sejak tanggal ditetapkan.",
            },
          ],
        },
      ],
    },
  ],
  signatories: [
    {
      role: "Ketua DKM",
      name: "Bpk. Burhan Mubarok, S.Kom",
      status: "Penanggung Jawab Utama",
    },
    {
      role: "Sekretaris DKM",
      name: "Bpk. Jejen Jaelani, S.Pd",
      status: "Administrasi & Kesekretariatan",
    },
    {
      role: "Bidang Imarah",
      name: "Bpk. Badar Rustandi",
      status: "Dakwah & Kemakmuran",
    },
    {
      role: "Koordinator RKM",
      name: "Bpk. Dede Dzulkipli",
      status: "Pelayanan Sosial & Jenazah",
    },
  ],
};

