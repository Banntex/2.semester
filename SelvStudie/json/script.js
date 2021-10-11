var toiletSkabelon = document.getElementById("toilet-skabelon");
var toiletListe = document.getElementById("toilet-liste");


var jsonFil = "https://api.jsonbin.io/v3/b/6137462f470d33259403deea";
var jsonFil1 = "$2b$10$A0AwlK4vKaImkWDDJb2c9.K8W1yZAnbJOJ6R.q6d9/ZCh6YSBBgxm";

fetch(jsonFil, {headers: {
    "X-Master-Key": jsonFil1,
    "X-Bin-Meta": false,
  },
} )
.then(function(data){
    return data.json();
})


  .then(function (toiletter) {
    for (var toilet of toiletter.features) {
      var sangNode = toiletSkabelon.content.cloneNode(true);

      sangNode.querySelector(".status").innerText = toilet.properties.status;
      sangNode.querySelector(".addresse").innerText = toilet.properties.adresse;
      sangNode.querySelector(".postnummer-by").innerText = toilet.properties.postnr_ + " " + toilet.properties.by_;
        sangNode.querySelector(".distrikt").innerText = toilet.properties.distrikt;
      
      toiletListe.appendChild(sangNode);
      
    }


  });
