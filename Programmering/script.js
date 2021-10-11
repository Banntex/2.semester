var sangSkabelon = document.getElementById("sang-skabelon");
var sangListe = document.getElementById("sang-liste");

var jsonFil = "./songs.json";

fetch(jsonFil)
  .then(function (data) {
    return data.json();
  })
  .then(function (sange) {
    for (var sang of sange) {
      var sangNode = sangSkabelon.content.cloneNode(true);

      sangNode.querySelector("img").src = sang.albumCover;
      sangNode.querySelector(".sang-titel").innerText = sang.titel;
      sangNode.querySelector(".kunstner").innerText = sang.kunstner;
      sangNode.querySelector(".album-titel").innerText = sang.album;

      sangListe.appendChild(sangNode);
    }
  });
