const recentMusicID = document.querySelector('.playing-music');
const trackCover = document.querySelector('.cover');
const trackBandName = document.querySelector('.band-name');
const trackAlbum = document.querySelector('.album-name');
const trackTitle = document.querySelector('.title');

const currentMins = document.querySelector('.current-time-mins');
const currentSeconds = document.querySelector('.current-time-seconds');
const trackMins = document.querySelector('.track-mins');
const trackSeconds = document.querySelector('.track-seconds');
const trackRange = document.querySelector('.range');

const backBtn = document.querySelector('.back');
const forwardBtn = document.querySelector('.forward');
const playBtn = document.querySelector('.play');
const volume = document.querySelector('#volumeMusic');

const currentTrack = document.createElement('audio');

let isPlaying = false;
let TrackIndex = 0;

const songs = [
  {
    bandName: 'Mesin Tempur',
    albumName: 'Hip Hop Sux! (2021)',
    img: 'assets/images/icon.png',
    songName: 'Supir Angkot Goblog',
    duration: '0:29',
    music: 'assets/sounds/mesinTempur_supirAngkotGoblog.m4a',
  },
  //   yang diatas untuk percobaan. jangan lupa di hapus
  {
    bandName: 'Mesin Tempur',
    albumName: 'Hip Hop Sux! (2021)',
    img: 'assets/images/icon.png',
    songName: 'Hip Hop Sux!',
    duration: '2:33',
    music: 'assets/sounds/mesinTempur_hipHopSux.m4a',
  },
  {
    bandName: 'Mesin Tempur',
    albumName: 'Hip Hop Sux! (2021)',
    img: 'assets/images/icon.png',
    songName: 'Mari Membaca',
    duration: '1:21',
    music: 'assets/sounds/mesinTempur_mariMembaca.m4a',
  },
  {
    bandName: 'Mesin Tempur',
    albumName: 'Hip Hop Sux! (2021)',
    img: 'assets/images/icon.png',
    songName: 'Supir Angkot Goblog',
    duration: '0:29',
    music: 'assets/sounds/mesinTempur_supirAngkotGoblog.m4a',
  },
  {
    bandName: 'Mesin Tempur',
    albumName: 'Hip Hop Sux! (2021)',
    img: 'assets/images/icon.png',
    songName: 'Aku Death Metal',
    duration: '1:16',
    music: 'assets/sounds/mesinTempur_akuDeathMetal.m4a',
  },
];

loadTrack(TrackIndex);
setInterval(fullTime, 1000);

function loadTrack(TrackIndex) {
  recentMusicID.id = 'id' + TrackIndex;
  currentTrack.src = songs[TrackIndex].music;
  currentTrack.load();

  trackCover.src = songs[TrackIndex].img;
  trackBandName.textContent = songs[TrackIndex].bandName;
  trackAlbum.textContent = songs[TrackIndex].albumName;
  trackTitle.textContent = songs[TrackIndex].songName;
}

function play() {
  isPlaying = true;
  currentTrack.play();
  playBtn.src = 'assets/images/play.svg';
}

function pause() {
  isPlaying = false;
  currentTrack.pause();
  playBtn.src = 'assets/images/pause.svg';
}

function playAndPause() {
  isPlaying ? pause() : play();
}

// playBtn.addEventListener('click', playAndPause());

function fullTime() {
  const mins = String(Math.floor(currentTrack.duration / 60)).padStart(2, '0');
  const seconds = String(Math.ceil(currentTrack.duration - mins * 60)).padStart(2, '0');
  const currMins = String(Math.floor(currentTrack.currentTime / 60)).padStart(2, '0');
  const currSeconds = String(Math.abs(Math.floor(currMins * 60 - currentTrack.currentTime))).padStart(2, '0');

  trackMins.textContent = mins;
  trackSeconds.textContent = seconds;
  currentMins.textContent = currMins;
  currentSeconds.textContent = currSeconds;

  trackRange.value = currentTrack.currentTime;
  trackRange.max = Math.ceil(currentTrack.duration);

  if (currentTrack.ended) {
    nextSong();
  }
}

function seek() {
  currentTrack.currentTime = trackRange.value;
}

function nextSong() {
  if (TrackIndex >= songs.length - 1) {
    TrackIndex = 0;
  } else {
    TrackIndex++;
  }

  loadTrack(TrackIndex);
  play();
}

function backSong() {
  if (TrackIndex <= 0) {
    TrackIndex = songs.length - 1;
  } else {
    TrackIndex--;
  }

  loadTrack(TrackIndex);
  play();
}

function volumeMusic() {
  currentTrack.volume = volume.value / 10;
}

// ==================== di bawah ini yang masih bingung

const divPlaylistMusic = document.querySelector('.playlist-music');
songs.forEach((song, index) => {
  const songElement = loadPlaylist(song, index);
  divPlaylistMusic.innerHTML += songElement;
});

function loadPlaylist(song, index) {
  return `
    <div class="music" id="${index}" onclick="selectFromPlaylist(${index})" >
      <div class="music-detail">
        <img src="assets/images/icon.png" alt="icon" class="icon-music">
        <div class="music-name">
          <p>${song.songName}</p>
          <p>Mesin tempur</p>
        </div>
      </div>
      <div class="duration">${song.duration}</div>
    </div>
    <hr>
  `;
}

function selectFromPlaylist(index) {
  TrackIndex = index;
  const playingMusicID = recentMusicID.id;
  console.log(playingMusicID);

  // yang kepakai cuma dibawah ini
  loadTrack(TrackIndex);
  play();
}

function currentPlaylist(x) {
  x.classList.add('recent-playlist');
  const classMusic = x.className;

  const iconCurentMusic = document.createElement('img');
  iconCurentMusic.src = 'assets/images/currentMusic.svg';
  const musicNameClass = x.querySelector('.music-name');
  musicNameClass.insertBefore(iconCurentMusic, musicNameClass.children[1]);
}
