var sangSkabelon = document.getElementById("sang-skabelon");
var sangListe = document.getElementById("sang-liste");
var sangListe1 = document.getElementById("daarlig-sange");

var jsonFil = "./songs.json";
var jsonFil1 = "./songs2.json";

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
      sangNode.querySelector(".release-titel").innerText = sang.release;

      sangListe.appendChild(sangNode);
      
    }


  });

  fetch(jsonFil1)
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
      sangNode.querySelector(".release-titel").innerText = sang.release;

      sangListe1.appendChild(sangNode);
      
    }


  });

