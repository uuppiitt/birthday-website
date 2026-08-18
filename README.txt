WEBSITE ULANG TAHUN PREMIUM (VERSI PIN + MUSIK OTOMATIS)

Struktur:
- index.html
- style.css
- script.js
- foto1.jpg
- foto2.jpg
- foto3.jpg
- music1.mp3
- music2.mp3
- music3.mp3

CARA MENGATUR WEBSITE

1. Buka script.js.
2. Cari bagian CONFIG di paling atas.
3. Ubah:
   name: "Sayang"
   menjadi nama pacar kamu.
4. Ubah:
   pin: "18122008"
   menjadi PIN angka yang kamu inginkan (bebas berapa digit).
   Dia akan membuka website dengan menekan tombol angka, bukan mengetik.
5. Ubah daftar songs sesuai lagu kamu, contoh:
   songs: [
     { title: "Nama Lagu 1", artist: "Nama Penyanyi", src: "music1.mp3" },
     { title: "Nama Lagu 2", artist: "Nama Penyanyi", src: "music2.mp3" },
   ]
   Kamu bisa menambah atau mengurangi jumlah lagu sesuka hati,
   tinggal tambah/kurangi item di dalam array ini.
6. Ubah isi letter menjadi surat kamu sendiri.

FOTO
Masukkan 3 foto ke folder yang sama dengan index.html.
Nama file harus:
foto1.jpg
foto2.jpg
foto3.jpg

MUSIK
Masukkan file MP3 ke folder yang sama dengan index.html.
Nama file harus sesuai dengan "src" yang kamu tulis di CONFIG.songs
(default: music1.mp3, music2.mp3, music3.mp3).

Musik akan otomatis diputar begitu PIN yang dimasukkan benar.
Ini bisa terjadi karena browser mengizinkan audio diputar otomatis
selama ada interaksi pengguna sebelumnya (menekan tombol PIN) —
jadi tidak perlu klik tombol play lagi.

Setelah scroll ke bagian "OUR SONG", akan muncul daftar lagu di bawah
tombol play. Pacar kamu bisa klik lagu mana saja untuk berpindah.

APA YANG BERUBAH DARI VERSI SEBELUMNYA
1. Halaman awal sekarang berupa PIN pad (tombol angka 0-9), bukan
   kotak input password teks.
2. Ada background bergerak (efek cahaya/aurora melayang pelan)
   di seluruh halaman, dari lock screen sampai section terakhir.
3. Musik langsung otomatis diputar begitu PIN benar dimasukkan.
4. Ada daftar pilihan lagu di bagian "OUR SONG" untuk ganti-ganti musik.

CARA MEMBUKA
Klik dua kali index.html.
(Disarankan tetap dites lewat server lokal atau hosting seperti di
bawah, karena beberapa browser membatasi autoplay audio saat file
dibuka langsung dari folder/file:// — kalau ini terjadi, musik akan
tetap bisa dijalankan manual lewat tombol play.)

CARA MEMBAGIKAN KE PACAR
Upload seluruh isi folder ke GitHub Pages, Netlify, atau Vercel.
Jangan hanya upload index.html. Semua file harus ikut di-upload.
