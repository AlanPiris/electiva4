const songs = [
  { title: "Espresso", artist: "Sabriña Carpentér", img: "images/espresso.jpg", position: 0, favorite: false, plays: null },
  { title: "Ñot Like Us", artist: "Kendrick Lamar", img: "images/not_like_us.jpg", position: 1, favorite: false, plays: null },
  { title: "Birds of a Feather", artist: "Billie Eilish", img: "images/birds_of_a_feather.jpg", position: 2, favorite: false, plays: null },
  { title: "Who", artist: "Jimin", img: "images/who.jpg", position: 3, favorite: false, plays: null },
  { title: "Si Ántes Te Hubiera Conocido", artist: "KAROL G", img: "images/si_antes_te_hubiera_conocido.jpg", position: 4, favorite: false, plays: null }
];

function assignFavorites() {
  const selected = new Set();
  while (selected.size < 2) {
    selected.add(Math.floor(Math.random() * songs.length));
  }
  songs.forEach((song, index) => {
    song.favorite = selected.has(index);
  });
}

function shuffleRanking() {
  // Mezclamos el ranking y limpiamos las reproducciones
  songs.sort(() => Math.random() - 0.5);
  songs.forEach(song => song.plays = null);
  displayRanking();
}

function displayRanking() {
  const rankingList = document.getElementById("ranking");
  rankingList.innerHTML = "";

  songs.forEach((song, index) => {
    const arrow =
      index === 0 ? "" : // Sin flecha ni guion para el TOP
      song.position < index ? "⬆️" :
      song.position > index ? "⬇️" :
      "➖";
    const favorite = song.favorite ? "⭐" : "";
    const playsText = song.plays !== null ? `${song.plays.toLocaleString()} reproducciones` : "";

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${song.img}" alt="${song.title}">
      <div class="song-info">
        <div class="title clickable" data-index="${index}">${index + 1}. ${song.title} ${favorite}</div>
        <div class="artist clickable" data-index="${index}">${song.artist}</div>
        <div class="plays ${song.plays !== null ? "visible" : "hidden"}" id="plays-${index}">${playsText}</div>
      </div>
      <span class="arrow">${arrow}</span>
    `;
    rankingList.appendChild(li);

    li.querySelector(".title").addEventListener("click", () => showPlays(index));
    li.querySelector(".artist").addEventListener("click", () => showPlays(index));
  });
}

function showPlays(index) {
  const song = songs[index];
  const playsElement = document.getElementById(`plays-${index}`);

  // Solo genera reproducciones si no existen
  if (song.plays === null) {
    song.plays = Math.floor(Math.random() * 1000000) + 10000;
    playsElement.textContent = `${song.plays.toLocaleString()} reproducciones`;
    playsElement.classList.remove("hidden");
    playsElement.classList.add("visible");
  }
}

function createImageAndOptions() {
  const container = document.getElementById("ranking");

  // Generar imagen del contenedor
  html2canvas(container, { scale: 2, useCORS: true }).then(canvas => {
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";

    // Crear imagen en PNG
    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    imageContainer.appendChild(img);

    // Crear contenedor de botones
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Botón para descargar PNG
    const downloadPng = document.createElement("button");
    downloadPng.textContent = "Descargar PNG";
    downloadPng.classList.add("btn-primary");
    downloadPng.addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = img.src;
      a.download = "ranking.png";
      a.click();
    });

    // Botón para descargar PDF
    const downloadPdf = document.createElement("button");
    downloadPdf.textContent = "Descargar PDF";
    downloadPdf.classList.add("btn-secondary");
    downloadPdf.addEventListener("click", () => {
      const pdf = new jsPDF("p", "mm", "a4"); // Formato de página A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Ajustar altura proporcionalmente

      // Agregar la imagen al PDF
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ranking.pdf");
    });

    // Añadir botones al contenedor
    buttonContainer.appendChild(downloadPng);
    buttonContainer.appendChild(downloadPdf);
    imageContainer.appendChild(buttonContainer);
  }).catch(error => {
    console.error("Error al generar la imagen o PDF:", error);
    alert("Hubo un problema al generar el PDF. Por favor, inténtalo nuevamente.");
  });
}

document.getElementById("shuffleBtn").addEventListener("click", shuffleRanking);
document.getElementById("createImgBtn").addEventListener("click", createImageAndOptions);

document.addEventListener("DOMContentLoaded", () => {
  assignFavorites();
  displayRanking();
});
