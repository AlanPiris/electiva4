const songs = [
  { title: "Espresso", artist: "Sabrina Carpenter", img: "images/espresso.jpg", position: 0, favorite: false },
  { title: "Not Like Us", artist: "Kendrick Lamar", img: "images/not_like_us.jpg", position: 1, favorite: false },
  { title: "Birds of a Feather", artist: "Billie Eilish", img: "images/birds_of_a_feather.jpg", position: 2, favorite: false },
  { title: "Who", artist: "Jimin", img: "images/who.jpg", position: 3, favorite: false },
  { title: "Si Antes Te Hubiera Conocido", artist: "KAROL G", img: "images/si_antes_te_hubiera_conocido.jpg", position: 4, favorite: false }
];

function assignFavorites() {
  songs.forEach(song => song.favorite = false);
  const favoriteCount = Math.floor(Math.random() * 2) + 1;
  const selectedFavorites = new Set();

  while (selectedFavorites.size < favoriteCount) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    selectedFavorites.add(randomIndex);
  }

  selectedFavorites.forEach(index => {
    songs[index].favorite = true;
  });
}

function displayRanking() {
  const rankingList = document.getElementById("ranking");
  rankingList.innerHTML = "";

  songs.forEach((song, index) => {
    let arrow = "";
    if (index === 0) arrow = "";
    else if (song.position > index) arrow = `<span class='arrow up'>⬆️</span>`;
    else if (song.position < index) arrow = `<span class='arrow down'>⬇️</span>`;
    else arrow = `<span class='arrow stay'>➖</span>`;

    const favoriteStar = song.favorite ? `<span class='favorite'>⭐</span>` : "";

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${song.img}" alt="${song.title}">
      <div class="song-info">
        <div class="title">${index + 1}. ${song.title} ${favoriteStar}</div>
        <div class="artist">${song.artist}</div>
      </div>
      ${arrow}
    `;
    rankingList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  assignFavorites();
  displayRanking();
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  songs.sort(() => Math.random() - 0.5);
  assignFavorites();
  displayRanking();
});

function createImage() {
  const container = document.getElementById("ranking");

  html2canvas(container, { scale: 2 }).then(canvas => {
    const image = canvas.toDataURL("image/png");
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Ranking generado";
    imgElement.style.marginTop = "20px";
    imageContainer.appendChild(imgElement);

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Descargar Imagen (PNG)";
    downloadButton.onclick = () => {
      const a = document.createElement("a");
      a.href = image;
      a.download = "ranking-musical.png";
      a.click();
      imageContainer.innerHTML = "";
    };

    imageContainer.appendChild(downloadButton);
  });
}
function showPlays(song, rank) {
  const plays = Math.floor(Math.random() * 1000000) + 10000; // Generar reproducciones aleatorias
  const messageContainer = document.getElementById("playsMessageContainer");
  messageContainer.innerHTML = `
    <div class="message">
      <h2>Posición #${rank}: ${song.title}</h2>
      <p>Artista: ${song.artist}</p>
      <p><strong>Reproducciones:</strong> ${plays.toLocaleString()} 🎧</p>
    </div>
  `;
  messageContainer.style.display = "block";

  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 5000);
}


document.getElementById("createImgBtn").addEventListener("click", createImage);
