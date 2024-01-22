const playlistSongs = document.getElementById("playlist-songs");
const playOrPause = document.getElementById("play-or-pause");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const playDisplay = document.getElementById("player-display");
const albumImage = document.getElementById("albumImage");

const allSongs = [
  {
    id: 0,
    title: "Vector to the Heavens",
    artist: "下村陽子",
    duration: "5:46",
    "album-art": "http://p2.music.126.net/0InbrvpuHNKxjikrcKARBg==/6020925673903851.jpg",
    src: "http://music.163.com/song/media/outer/url?id=28381618.mp3"
  },
  {
    id: 1,
    title: "Serie de Fragmento",
    artist: "Novectacle",
    duration: "5:27",
    "album-art": "http://p1.music.126.net/i1BVCMzbHGf6Tw0EfnEFbA==/109951165241032555.jpg",
    src: "http://music.163.com/song/media/outer/url?id=1325166263.mp3"
  },

  {
    id: 2,
    title: "Requiem for the Innocence",
    artist: "Novectacle",
    duration: "5:11",
    "album-art": "http://p1.music.126.net/i1BVCMzbHGf6Tw0EfnEFbA==/109951165241032555.jpg",
    src: "http://music.163.com/song/media/outer/url?id=1325166262.mp3"
  },
  {
    id: 3,
    title: "メインテーマ",
    artist: "大谷幸",
    duration: "3:36",
    "album-art": "https://p2.music.126.net/bQm2c8r4ogcIqWEveDCMGw==/8939029533925581.jpg",
    src: "http://music.163.com/song/media/outer/url?id=28919149.mp3"
  },
  {
    id: 4,
    title: "十二幻梦曲 (Acoustic Version)",
    artist: "贾鹏芳",
    duration: "2:05",
    "album-art": "https://p2.music.126.net/QwZfOdfBTH0lNE0poRZ3uA==/126443837207358.jpg",
    src: "http://music.163.com/song/media/outer/url?id=103737.mp3"
  },
  {
    id: 5,
    title: "Majula",
    artist: "桜庭統",
    duration: "3:19",
    "album-art": "https://p2.music.126.net/Ij53fepPfwMWa-u3h-44Bg==/109951163849029707.jpg",
    src: "http://music.163.com/song/media/outer/url?id=1344959815.mp3"
  },
  {
    id: 6,
    title: "Never More",
    artist: "平田志穂子",
    duration: "6:29",
    "album-art": "https://p1.music.126.net/AsdH9OLG05lHTU4t2PL02A==/588238720872277.jpg",
    src: "http://music.163.com/song/media/outer/url?id=402009.mp3"
  },
  {
    id: 7,
    title: "Gwyn, Lord of Cinder",
    artist: "桜庭統",
    duration: "3:38",
    "album-art": "https://p1.music.126.net/QXntMnFQnmTXdhLQkBVgig==/109951163849025337.jpg",
    src: "http://music.163.com/song/media/outer/url?id=509038.mp3"
  },
  {
    id: 8,
    title: "逆転裁判3・終幕",
    artist: "岩垂徳行",
    duration: "3:42",
    "album-art": "https://p2.music.126.net/5dMOmAQO8YtlMib9IoSXDA==/5851600883154880.jpg",
    src: "http://music.163.com/song/media/outer/url?id=4919686.mp3"
  },
  {
    id: 9,
    title: "The First Hunter",
    artist: "齋藤司",
    duration: "5:10",
    "album-art": "https://p2.music.126.net/JwfkKggx9mfvtmeVkAIUxg==/7854911069468664.jpg",
    src: "http://music.163.com/song/media/outer/url?id=31284176.mp3"
  },
  {
    id: 10,
    title: "Glass Walls",
    artist: "Nik Ammar",
    duration: "3:19",
    "album-art": "https://p2.music.126.net/4mvHLTnDqrt9uH3FBaCl2Q==/528865120667809.jpg",
    src: "http://music.163.com/song/media/outer/url?id=30496492.mp3"
  }
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  _currentSong: null,
  _isPlaying: false,
  songCurrentTime: 0,

  set currentSong(value) {
    this._currentSong = value;
    if (this._currentSong === null) {
      playDisplay.style.backgroundImage = "";
      playOrPause.classList.remove("playing");
      albumImage.setAttribute('src', "./album/album-art.jpg");
    }
    else
      albumImage.setAttribute('src', `${this.currentSong['album-art']}`);
  },
  get currentSong() { return this._currentSong },
  get isPlaying() { return this._isPlaying; },
  set isPlaying(value) {
    this._isPlaying = value
    changeButton(value);
  }
};


const renderSongs = (array) => {
  const songsHTML = array.map((song) => {
    // onclick="playSong(${song.id})"
    return `
      <li id="song-${song.id}" class="playlist-song">
      
        <button class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
        </button>

        <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>

      </li>
      `;
  }).join("");
  playlistSongs.innerHTML = songsHTML;
  document.querySelectorAll(".playlist-song-info").forEach((songElement, index) => {
    songElement.addEventListener("dblclick", () => { dbClickInfo(index) });
  });
};

const playSong = (id) => {
  //检查播放列表是否为空
  if (id === undefined) {
    alert("播放列表为空！");
    return;
  }
  //检查播放id是否正确
  const song = userData?.songs.find((song) => song.id === id);
  if (song === undefined) {
    alert(`播放错误，当前播放id:${id}`);
    return;
  }

  audio.src = song.src;
  audio.title = song.title;
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id)
    audio.currentTime = 0;
  else
    audio.currentTime = userData.songCurrentTime;

  const lastId = userData.currentSong?.id;
  userData.currentSong = song;
  playOrPause?.classList.add("playing");
  playDisplay.style.backgroundImage = "url('./album/album-art.jpg')";
  highlightCurrentSong(lastId);
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
  if (!userData.isPlaying)
    userData.isPlaying = true;
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  audio.pause();
  if (userData.isPlaying)
    userData.isPlaying = false;
};

/**
 * 获取当前歌曲在歌曲列表中的位置
 * @returns 当前播放歌曲的位置
 */
const getCurrentSongIndex = () => userData?.songs.indexOf(userData.currentSong);

/**
 * 播放下一首，若当前播放歌曲为null则播放第一首
 */
const playNextSong = () => {
  let nextSong = userData?.currentSong === null ? userData?.songs[0] :
    userData.songs[(getCurrentSongIndex() + 1) % userData?.songs.length];
  playSong(nextSong?.id);
};

/**
 * 播放上一首，若当前播放歌曲为null则播放最后一首
 */
const playPreviousSong = () => {
  let previousSong = null;
  if (userData.currentSong === null)
    previousSong = userData?.songs[userData.songs.length - 1];
  else {
    const previousSongIndex = getCurrentSongIndex() - 1;
    previousSong = userData.songs[previousSongIndex < 0 ? userData.songs.length - 1 : previousSongIndex];
  }
  playSong(previousSong?.id);
};

/**
 * 取消上个曲子的高亮，将当前播放歌曲高亮。
 * @param {number} lastId 上一个播放的歌曲的id，不传则只高亮当前播放歌曲
 */
const highlightCurrentSong = (lastId) => {
  if (lastId !== undefined) {
    const lastEl = document.getElementById(`song-${lastId}`);
    lastEl.removeAttribute("aria-current");
  }
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
  if (songToHighlight !== lastId && songToHighlight !== null)
    songToHighlight.setAttribute('aria-current', 'true');
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById('player-song-title');
  const songArtist = document.getElementById('player-song-artist');
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";

};

const shuffle = () => {
  if (userData.songs.length === 0) {
    alert("播放列表为空！");
    return;
  }
  userData?.songs.sort(() => Math.random() - 0.5);
  renderSongs(userData?.songs);
  highlightCurrentSong();
};

const setPlayButtonAccessibleText = () => {
  const song = userData.currentSong || userData?.songs[0];
  playOrPause.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");
};

const deleteSong = (id) => {
  if (id === userData?.currentSong?.id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      renderSongs(userData?.songs);
      setPlayButtonAccessibleText();
      resetButton.remove();
    });

  }

};

function changeButton(isPlaying) {
  const buttonSvg = isPlaying ?
    `<svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 6.54013e-07H4.75V19H0V6.54013e-07Z" />
      <path d="M11.4 0H16.15V19H11.4V0Z" />
    </svg>`:
    `<svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L16.1852 9.5L1.88952e-07 19L0 0Z" />
    </svg>`;
  playOrPause.innerHTML = buttonSvg;
}

function dbClickInfo(index) {
  const idToplay = userData.songs[index].id;
  if (idToplay === userData.currentSong?.id && userData.isPlaying)
    return;
  playSong(userData.songs[index].id);
}



playOrPause.addEventListener("click", () => {
  userData.isPlaying ? pauseSong() :
    playSong(userData?.currentSong === null ? userData?.songs[0]?.id : userData?.currentSong.id);
});
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);
renderSongs(userData?.songs);
audio.addEventListener("ended", () => {
  playNextSong();
});


