// ==========================================
// EDIT BAGIAN INI
// ==========================================
const CONFIG = {
  name: "Iell",

  // PIN untuk masuk website (hanya angka).
  // Contoh: "18122008"
  pin: "1908",

  // Daftar lagu. Tambah/kurangi item sesuai kebutuhan.
  // "src" harus nama file mp3 yang kamu taruh di folder yang sama dengan index.html.
  songs: [
    { title: "Shape Of My Heart", artist: "Backstreet Boys", src: "music1.mp3" },
    { title: "Kasih Putih", artist: "Glenn Fredly", src: "music2.mp3" },
    { title: "you!", artist: "LANY", src: "music3.mp3" }
  ],

  letter: `Selamat ulang tahun, sayang. ❤️

life is so much more beautiful with you.

May your day be as beautiful as you are. I love youuuu!

May life continue to treat you well and give you everything you deserve. May this birthday bring you closer to all your dreams.

I’ll always be here, supporting you. Happyyyy birthday, my loveeeeeee.
Life feels gentler, brighter, and so much happier with you in it.

Thank you for being my safe haven, my happiness, and the person who makes ordinary days feel special.

May this day bring you the same warmth, love, and joy that you give to everyone around you every day. You deserve all the beautiful things this world has to offer.

Happy Birthdayy love.

May today be a day you remember with a smile.

I Love You. ❤️`
};

const lockScreen = document.getElementById("lockScreen");
const site = document.getElementById("site");
const pinDots = document.getElementById("pinDots");
const pinBox = document.querySelector(".pin-box");
const error = document.getElementById("passwordError");

document.getElementById("nameHero").textContent = CONFIG.name;
document.getElementById("nameLetter").textContent = CONFIG.name;
document.getElementById("nameFinal").textContent = CONFIG.name;

// ===== PIN pad =====
let enteredPin = "";

function renderDots() {
  pinDots.innerHTML = "";
  const count = Math.max(enteredPin.length, 0);
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.className = "filled";
    pinDots.appendChild(dot);
  }
}

function pressDigit(num) {
  if (enteredPin.length >= CONFIG.pin.length) return;
  enteredPin += num;
  renderDots();
  error.textContent = "";

  if (enteredPin.length === CONFIG.pin.length) {
    checkPin();
  }
}

function checkPin() {
  if (enteredPin === CONFIG.pin) {
    // Panggil langsung di sini (masih dalam gesture klik user)
    // supaya browser mengizinkan autoplay musik nanti.
    unlockAnimation();
  } else {
    error.textContent = "PIN belum benar. Coba lagi ❤️";
    pinBox.classList.remove("shake");
    void pinBox.offsetWidth;
    pinBox.classList.add("shake");
    setTimeout(() => {
      enteredPin = "";
      renderDots();
    }, 400);
  }
}

document.querySelectorAll(".pin-btn[data-num]").forEach(btn => {
  btn.addEventListener("click", () => pressDigit(btn.dataset.num));
});

document.getElementById("pinDelete").addEventListener("click", () => {
  enteredPin = enteredPin.slice(0, -1);
  renderDots();
  error.textContent = "";
});

document.getElementById("pinClear").addEventListener("click", () => {
  enteredPin = "";
  renderDots();
  error.textContent = "";
});

document.addEventListener("keydown", e => {
  if (lockScreen.style.display === "none") return;
  if (e.key >= "0" && e.key <= "9") pressDigit(e.key);
  if (e.key === "Backspace") document.getElementById("pinDelete").click();
  if (e.key === "Escape") document.getElementById("pinClear").click();
});

function unlockAnimation() {
  lockScreen.style.transition = "opacity 1s ease, transform 1s ease";
  lockScreen.style.opacity = "0";
  lockScreen.style.transform = "scale(1.08)";

  flowerBurst();
  playMusicOnEntry();

  setTimeout(() => {
    lockScreen.style.display = "none";
    site.classList.remove("hidden");
    requestAnimationFrame(() => site.classList.add("visible"));
    startReveal();
    startPetals();
  }, 1100);
}

function flowerBurst() {
  const symbols = ["🌸", "🌷", "🌺", "🌹", "✿", "❀", "♡"];

  for (let i = 0; i < 120; i++) {
    const el = document.createElement("div");
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.top = "50%";
    el.style.zIndex = "100";
    el.style.pointerEvents = "none";
    el.style.fontSize = `${14 + Math.random() * 28}px`;
    el.style.color = "#f0b9b8";
    el.style.transform = "translate(-50%,-50%)";
    el.style.transition = `transform ${.8 + Math.random() * .8}s cubic-bezier(.1,.8,.2,1), opacity 1.2s`;
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * Math.max(innerWidth, innerHeight) * .65;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${Math.random()*720-360}deg)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 1800);
  }
}

function startReveal() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        if (entry.target.classList.contains("letter-section")) {
          typeLetter();
        }
      }
    });
  }, { threshold: .16 });

  items.forEach(item => observer.observe(item));
}

function typeLetter() {
  const target = document.getElementById("letterText");
  if (target.dataset.done) return;

  let i = 0;
  const text = CONFIG.letter;

  const timer = setInterval(() => {
    target.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(timer);
      target.dataset.done = "true";
    }
  }, 24);
}

// ===== Musik =====
const music = document.getElementById("music");
const musicSource = document.getElementById("musicSource");
const musicButton = document.getElementById("musicButton");
const album = document.querySelector(".album");
const songTitleEl = document.getElementById("songTitle");
const songArtistEl = document.querySelector(".song-info p");
const songListEl = document.getElementById("songList");

let currentSongIndex = 0;

function buildSongList() {
  songListEl.innerHTML = "";
  CONFIG.songs.forEach((song, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "song-item" + (index === currentSongIndex ? " active" : "");
    item.innerHTML = `
      <span>
        <span class="song-item-title">${song.title}</span><br>
        <span class="song-item-artist">${song.artist}</span>
      </span>
      <span class="song-item-mark">♪ playing</span>
    `;
    item.addEventListener("click", () => selectSong(index));
    songListEl.appendChild(item);
  });
}

function selectSong(index) {
  if (index === currentSongIndex) return;
  const wasPlaying = !music.paused;
  currentSongIndex = index;
  loadCurrentSong();
  updateActiveSongItem();

  if (wasPlaying) {
    music.play().catch(() => {});
  }
}

function loadCurrentSong() {
  const song = CONFIG.songs[currentSongIndex];
  musicSource.src = song.src;
  music.load();
  songTitleEl.textContent = song.title;
  if (songArtistEl) songArtistEl.textContent = song.artist;
}

function updateActiveSongItem() {
  document.querySelectorAll(".song-item").forEach((el, i) => {
    el.classList.toggle("active", i === currentSongIndex);
  });
}

function toggleMusic() {
  if (music.paused) {
    music.play().catch(() => {
      alert("Masukkan file mp3 lagu ke folder website terlebih dahulu (lihat README).");
    });
    musicButton.textContent = "❚❚";
    album.style.animationPlayState = "running";
  } else {
    music.pause();
    musicButton.textContent = "▶";
    album.style.animationPlayState = "paused";
  }
}

// Dipanggil tepat setelah PIN benar, masih dalam rangkaian klik user,
// supaya browser mengizinkan audio diputar otomatis.
function playMusicOnEntry() {
  music.play().then(() => {
    musicButton.textContent = "❚❚";
    album.style.animationPlayState = "running";
  }).catch(() => {
    // Kalau browser tetap memblokir autoplay,
    // tombol play di bagian musik tetap bisa dipakai manual.
  });
}

buildSongList();
loadCurrentSong();

// ===== Petals =====
function startPetals() {
  setInterval(() => {
    if (Math.random() > .45) createPetal();
  }, 850);
}

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.textContent = ["✿", "❀", "🌸", "♡"][Math.floor(Math.random() * 4)];
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = 10 + Math.random() * 16 + "px";
  petal.style.opacity = .3 + Math.random() * .7;
  petal.style.animationDuration = 6 + Math.random() * 7 + "s";
  document.getElementById("petals").appendChild(petal);
  setTimeout(() => petal.remove(), 14000);
}

function celebrate() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => firework(), i * 150);
  }

  for (let i = 0; i < 50; i++) {
    setTimeout(createPetal, i * 35);
  }
}

function firework() {
  const container = document.getElementById("fireworks");
  const centerX = 20 + Math.random() * 60;
  const centerY = 25 + Math.random() * 50;

  for (let i = 0; i < 35; i++) {
    const dot = document.createElement("div");
    dot.className = "firework";
    dot.style.left = centerX + "%";
    dot.style.top = centerY + "%";

    const angle = (Math.PI * 2 * i) / 35;
    const distance = 70 + Math.random() * 150;
    dot.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    dot.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    container.appendChild(dot);
    setTimeout(() => dot.remove(), 1600);
  }
}


/* === Polaroid lightbox === */
document.querySelectorAll(".polaroid-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    if (!img || !img.src) return;
    const lightbox = document.getElementById("photoLightbox");
    const target = document.getElementById("lightboxImage");
    const caption = document.getElementById("lightboxCaption");
    if (!lightbox || !target) return;
    target.src = img.src;
    if (caption) caption.textContent = card.dataset.caption || "";
    lightbox.classList.remove("hidden");
  });
});
const closePhoto = document.getElementById("closePhoto");
if (closePhoto) closePhoto.addEventListener("click", () => document.getElementById("photoLightbox").classList.add("hidden"));
const photoLightbox = document.getElementById("photoLightbox");
if (photoLightbox) photoLightbox.addEventListener("click", e => {
  if (e.target === photoLightbox) photoLightbox.classList.add("hidden");
});

/* === Glass bottle rotating quotes === */
const bottle = document.getElementById("quoteBottle");
const quoteTextEl = document.getElementById("quoteText");
const quoteMessages = [
  "Semoga kamu selalu ingat bahwa kamu jauh lebih berharga daripada yang kadang kamu pikirkan.",
  "Aku suka caramu membuat hal-hal sederhana terasa seperti kenangan yang ingin disimpan lama.",
  "Tidak semua hari harus sempurna. Yang penting, selalu ada alasan kecil untuk tersenyum.",
  "Semoga langkahmu selalu membawa kamu ke tempat-tempat yang membuat hati kamu tenang.",
  "Kalau hidup adalah perjalanan panjang, aku berharap kita punya banyak persinggahan indah untuk dikenang.",
  "Hari ini adalah tentang kamu. Jadi izinkan dirimu menerima semua hal baik yang datang.",
  "Terima kasih sudah menjadi bagian dari cerita yang ingin selalu aku ingat.",
  "Semoga versi kamu di masa depan tersenyum ketika mengingat hari ulang tahun ini."
];
let lastQuote = -1;
function showRandomQuote(){
  if(!quoteTextEl) return;
  let n;
  do { n = Math.floor(Math.random()*quoteMessages.length); } while(n === lastQuote && quoteMessages.length > 1);
  lastQuote = n;
  quoteTextEl.classList.remove("quote-pop");
  void quoteTextEl.offsetWidth;
  quoteTextEl.textContent = quoteMessages[n];
  quoteTextEl.classList.add("quote-pop");
  if(bottle){
    bottle.classList.remove("bottle-shake");
    void bottle.offsetWidth;
    bottle.classList.add("bottle-shake");
  }
}
if(bottle) bottle.addEventListener("click", showRandomQuote);
