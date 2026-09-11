// ============ DATA ============
const songs = [
  {
    title: "Piki Piki Breakbeat",
    artist: "Rian DTM",
    src: "lagu1.mp3",
    cover: "foto.jpg",
    duration: "3:45",
    lyrics: [
      "🎵 Intro 🎵",
      "",
      "Piki piki di malam ini",
      "Breakbeat menghentak penuh energi",
      "Gerakkan badan ikuti irama",
      "Lupakan sejenak semua masalah",
      "",
      "🎶 Chorus 🎶",
      "",
      "Piki piki kita menari",
      "Di bawah cahaya bulan malam ini",
      "Breakbeat mengalun tanpa henti",
      "Biar musik yang bicara",
      "",
      "🎵 Verse 2 🎵",
      "",
      "Langkah kaki mengikuti beat",
      "Tangan menggapai langit malam",
      "Semua bersatu dalam irama",
      "Musik menyatukan kita semua",
      "",
      "🎶 Chorus 🎶",
      "",
      "Piki piki kita menari",
      "Di bawah cahaya bulan malam ini",
      "Breakbeat mengalun tanpa henti",
      "Biar musik yang bicara",
      "",
      "🎵 Outro 🎵"
    ]
  },
  {
    title: "dj breakbeat no debat",
    artist: "artis kedua",
    src: "lagu2.mp3",
    cover: "foto.jpg",
    duration: "4:12",
    lyrics: [
      "🎵 Intro 🎵",
      "",
      "Lirik baris pertama",
      "Lirik baris kedua",
      "Lirik baris ketiga",
      "",
      "🎶 Chorus 🎶",
      "",
      "Chorus baris pertama",
      "Chorus baris kedua",
      "",
      "🎵 Outro 🎵"
    ]
  },
  {
    title: "dj breakbeat",
    artist: "Artis Ketiga",
    src: "lagu3.mp3",
    cover: "foto.jpg",
    duration: "3:28",
    lyrics: [
      "🎵 Intro 🎵",
      "",
      "Lirik lagu ketiga",
      "Baris kedua di sini",
      "Baris ketiga di sini",
      "",
      "🎶 Chorus 🎶",
      "",
      "Chorus lagu ketiga",
      "Baris chorus kedua",
      "",
      "🎵 Outro 🎵"
    ]
  },
  {
    title: "dj breakbeat ty debat",
    artist: "artis keempat",
    src: "lagu4.mp3",
    cover: "foto.jpg",
    duration: "07:10",
    lyrics: ["tidak tersedia"]
  }
];

// ============ ELEMENTS ============
const audio = new Audio();
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const currentTimeEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const volumeFill = document.getElementById('volumeFill');
const volumeIcon = document.getElementById('volumeIcon');
const playlistEl = document.getElementById('playlist');
const coverRing = document.getElementById('coverRing');
const coverGlow = document.getElementById('coverGlow');
const soundWaves = document.getElementById('soundWaves');
const equalizer = document.getElementById('equalizer');
const particles = document.getElementById('particles');
const playerCard = document.getElementById('playerCard');
const searchInput = document.getElementById('searchInput');
const playlistCount = document.getElementById('playlistCount');
const lyricsTitle = document.getElementById('lyricsTitle');
const lyricsArtist = document.getElementById('lyricsArtist');
const lyricsCover = document.getElementById('lyricsCover');
const lyricsContent = document.getElementById('lyricsContent');
const lyricsBody = document.getElementById('lyricsBody');
const lyricsToggle = document.getElementById('lyricsToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

// ============ STATE ============
let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// ============ FUNCTIONS ============

function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function loadSong(index) {
  currentIndex = index;
  const song = songs[index];

  audio.src = song.src;
  audio.load();
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;

  // Update lyrics
  lyricsTitle.textContent = song.title;
  lyricsArtist.textContent = song.artist;
  lyricsCover.src = song.cover;
  renderLyrics(song.lyrics);

  // Reset progress
  progressFill.style.width = '0%';
  progressThumb.style.left = '0%';
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';

  updatePlaylist();
}

function renderLyrics(lyrics) {
  lyricsContent.innerHTML = '';
  lyrics.forEach((line, index) => {
    const p = document.createElement('p');
    p.className = 'lyric-line';
    p.textContent = line || '\u00A0';
    p.dataset.index = index;
    lyricsContent.appendChild(p);
  });
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(err => {
      console.error("Error:", err);
    });
  }
}

function updatePlayState() {
  if (isPlaying) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
}

function setPlayingAnimation(playing) {
  particles.classList.toggle('active', playing);
  equalizer.classList.toggle('playing', playing);
  cover.classList.toggle('playing', playing);
  cover.classList.toggle('paused', !playing);
  coverRing.classList.toggle('playing', playing);
  coverRing.classList.toggle('paused', !playing);
  coverGlow.classList.toggle('playing', playing);
  soundWaves.classList.toggle('playing', playing);
  playerCard.classList.toggle('playing', playing);
  playButton.classList.toggle('playing', playing);
}

function nextSong() {
  if (isShuffle) {
    let random;
    do {
      random = Math.floor(Math.random() * songs.length);
    } while (random === currentIndex && songs.length > 1);
    loadSong(random);
  } else {
    loadSong((currentIndex + 1) % songs.length);
  }
  if (isPlaying) audio.play();
}

function prevSong() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  loadSong((currentIndex - 1 + songs.length) % songs.length);
  if (isPlaying) audio.play();
}

function updateProgress() {
  const { currentTime, duration } = audio;
  if (!duration || isNaN(duration)) return;
  const percent = (currentTime / duration) * 100;
  progressFill.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(currentTime);
}

function seek(e) {
  if (!audio.duration || isNaN(audio.duration)) return;
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
}

function setVolume(e) {
  const rect = volumeBar.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.volume = percent;
  volumeFill.style.width = `${percent * 100}%`;
}

function renderPlaylist(filter = '') {
  playlistEl.innerHTML = '';
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(filter.toLowerCase()) ||
    song.artist.toLowerCase().includes(filter.toLowerCase())
  );

  playlistCount.textContent = `${filtered.length} Songs`;

  filtered.forEach((song) => {
    const originalIndex = songs.indexOf(song);
    const item = document.createElement('div');
    item.className = `playlist-item ${originalIndex === currentIndex ? 'active' : ''}`;
    item.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <div class="playlist-item-info">
        <div class="playlist-item-title">${song.title}</div>
        <div class="playlist-item-artist">${song.artist}</div>
      </div>
      <span class="playlist-item-duration">${song.duration}</span>
      <div class="mini-eq">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    item.addEventListener('click', () => {
      loadSong(originalIndex);
      audio.play().catch(err => console.error("Error:", err));
    });
    playlistEl.appendChild(item);
  });
}

function updatePlaylist() {
  const items = playlistEl.querySelectorAll('.playlist-item');
  items.forEach((item) => {
    const itemTitle = item.querySelector('.playlist-item-title').textContent;
    const isActive = songs[currentIndex].title === itemTitle;
    item.classList.toggle('active', isActive);
  });
}

// ============ EVENT LISTENERS ============

playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle('active', isRepeat);
});

progressBar.addEventListener('click', seek);
volumeBar.addEventListener('click', setVolume);

volumeIcon.addEventListener('click', () => {
  audio.muted = !audio.muted;
  volumeFill.style.width = audio.muted ? '0%' : `${audio.volume * 100}%`;
});

// Search
searchInput.addEventListener('input', (e) => {
  renderPlaylist(e.target.value);
});

// Lyrics toggle
lyricsToggle.addEventListener('click', () => {
  lyricsBody.classList.toggle('open');
  lyricsToggle.classList.toggle('open');
});

// Mobile menu
mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Header scroll effect
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Audio events
audio.addEventListener('play', () => {
  isPlaying = true;
  updatePlayState();
  setPlayingAnimation(true);
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  updatePlayState();
  setPlayingAnimation(false);
});

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextSong();
  }
});

audio.addEventListener('error', () => {
  console.error("Audio error - file mungkin tidak ditemukan");
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'Space':
      e.preventDefault();
      togglePlay();
      break;
    case 'ArrowRight':
      audio.currentTime += 5;
      break;
    case 'ArrowLeft':
      audio.currentTime -= 5;
      break;
  }
});

// ============ INIT ============
audio.volume = 0.8;
loadSong(0);
renderPlaylist();
coverRing.classList.add('paused');
