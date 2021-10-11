var toiletSkabelon = document.getElementById("toilet-skabelon");
var toiletliste = document.getElementById("toilet-liste");
var jsonFil = "https://api.jsonbin.io/v3/b/61372a9fdfe0cf16eb567501";



fetch("https://api.jsonbin.io/v3/b/61372a9fdfe0cf16eb567501", {
    headers: {
    "X-Master-Key": "$2b$10$A0AwlK4vKaImkWDDJb2c9.K8W1yZAnbJOJ6R.q6d9/ZCh6YSBBgxm",
            "X-Bin-Meta": false
        }
    })
    .then(function (data) {
        return data.json();
    })
    .then(function (toiletter) {
        for (var toilet of toiletter.features) {
            var toiletNode = toiletSkabelon.content.cloneNode(true);

            toiletNode.querySelector(".status").innerText = toilet.properties.status;
            toiletNode.querySelector(".addresse").innerText = toilet.properties.adresse;
            toiletNode.querySelector(".postnummer-by").innerText = toilet.properties.postnr_+ "" + toilet.properties.by_;
           

            toiletListe.appendChild(toiletNode);

        }


    });
