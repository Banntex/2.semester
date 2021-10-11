/* FIND DOM ELEMENTER ------------------------------------------------------- */

/* Find de to dato felter */
var dateFromField = document.getElementById("date-from");
var dateToField = document.getElementById("date-to");

/* Find det element, som skal indeholde listen af biler */
var carsList = document.getElementById("cars-list");

/* Find den skabelon, vi skal kopiere for hver bil vi vil vise */
var carTemplate = document.getElementById("car-template");

/* Find vores "Søg"-knap */
var searchButton = document.getElementById("search-button");

/* SÆT STARTVÆRDIER --------------------------------------------------------- */

/* Dags dato på formen åååå-mm-dd:
 * https://devdocs.io/javascript/global_objects/date/date
 * https://devdocs.io/javascript/global_objects/date/toisostring
 * https://devdocs.io/javascript/global_objects/string/split
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#referring_to_array_elements
 */
var todaysDate = new Date().toISOString().split("T")[0];

/* Når scriptet kører sættes værdien af de to datofelter til dags dato, som er et
 * rimeligt udgangspunkt */
dateFromField.value = todaysDate;
dateToField.value = todaysDate;

/* DEFINÉR FUNKTIONER ------------------------------------------------------- */

/* Beregning af længden af lejeperioden ud fra de valgte datoer */
function calculatePeriodInDays() {
  /* Værdien af de to dato-felter, som er på formen åååå-mm-dd som vi laver til
   * et dato objekt via en Date constructor:
   * https://devdocs.io/javascript/global_objects/date/date */
  var dateFrom = new Date(dateFromField.value);
  var dateTo = new Date(dateToField.value);

  /* Og får en talværdi i millisekunder ud af datoerne med getTime() metoden:
   * https://devdocs.io/javascript/global_objects/date/gettime
   */
  var differenceInMilliseconds = dateTo.getTime() - dateFrom.getTime();

  /* 1000 millisekunder per sekund
   * 60 sekunder per minut
   * 60 minutter per time
   * 24 timer per døgn
   */
  var millisecondsInADay = 1000 * 60 * 60 * 24;

  /* Vi deler differencen med antal millisekunder på et døgn for at få et antal
   * dage og afrunder med Math.round for at sikre at vi får et helt antal dage:
   * https://devdocs.io/javascript/global_objects/math/round
   *
   * ...og lægger 1 til det beregnede tal for at sikre at perioden er inkl
   * start- og slutdato. Dvs. hvis man henter og afleverer samme dag tæller det
   * som én dag.
   */
  var rentalPeriodInDays =
    Math.round(differenceInMilliseconds / millisecondsInADay) + 1;

  return rentalPeriodInDays;
}

/* Beregning af lejeprisen inkl. moms.
 * Bemærk at dailySurcharge parameteren har
 * fået en default værdi hvis den ikke er sat når funktionen kaldes:
 * https://devdocs.io/javascript/functions/default_parameters
 */
function calculateRentalPrice(dailySurcharge = 0, rentalPeriodInDays) {
  var baseRentalPrice = 495;
  var dailyRentalPrice = 100;
  var vatRate = 0.25;

  var resultExclVat =
    baseRentalPrice + rentalPeriodInDays * (dailyRentalPrice + dailySurcharge);
  var resultInclVat = resultExclVat * (1 + vatRate);

  return resultInclVat;
}

/* Pæn formatering af prisen ved hjælp af:
 * https://devdocs.io/javascript/global_objects/number/tolocalestring
 * https://devdocs.io/javascript/global_objects/intl/numberformat/numberformat#parameters
 */
function formatPrice(number) {
  /* Lidt basal fejlhåndtering — hvis noget er gået galt et sted i beregningen
   * vil det samlede resultat være "NaN" — Not a Number:
   * https://devdocs.io/javascript/global_objects/nan
   * https://devdocs.io/javascript/global_objects/number/isnan
   *
   * Det vil for eksempel kunne ske hvis brugeren ikke har valgt datoer eller
   * udfyldt noget i feltet, som ikke er en gyldig dato. I det tilfælde kan vi
   * ikke rigtig vise en pris.
   */
  if (Number.isNaN(number)) {
    return "Ukendt pris";
  } else {
    return number.toLocaleString("da-DK", {
      style: "currency",
      currency: "DKK",
    });
  }
}

/* Definér en funktion der kan oprette en klump HTML om en bil og indsætte den i
 * dokumentet */
function showCar(carObject, rentalPeriodInDays) {
  /* Lav en kopi af vores bil-skabelon:
   * https://devdocs.io/html/element/template
   * https://devdocs.io/dom/node/clonenode
   */
  var carNode = carTemplate.content.cloneNode(true);

  /* Beregn lejeprisen via den funktion, vi har lavet — som har brug for at kende
   * den daglige tillægspris for den pågældende bil, så den sender vi med som
   * argument til funktionen. */
  var rentalPrice = calculateRentalPrice(
    carObject.dailySurcharge,
    rentalPeriodInDays
  );

  /* Fyld den kopierede skabelon med informationer om den bil, vi vil vise */
  carNode.querySelector("img").src = carObject.imageSrc;
  carNode.querySelector("img").alt = `Billede af ${carObject.name}`;
  carNode.querySelector("h1").innerText = carObject.name;
  carNode.querySelector(".category").innerText = carObject.category;
  carNode.querySelector(".person-count").innerText = carObject.personCount;
  carNode.querySelector(".luggage-count").innerText = carObject.luggageCount;
  carNode.querySelector(".price").innerText = formatPrice(rentalPrice);

  /* Tilføj vores kopierede skabelon til dokumentet ved at "tilføje et barn" til
   * vores liste af biler, aka "appendChild" */
  carsList.appendChild(carNode);
}

/* Definér den funktion, vi vil kalde når brugeren klikker på "Søg"-knappen.
 * Browseren sørger selv for at sende event-objektet med som argument til vores
 * funktion, så derfor navngiver vi en "event"-parameter inde i parenteserne */
function handleSearch(event) {
  /* Sørg først for at formularen ikke bliver sendt rigtigt og siden reloader —
   * det er browserens default funktionalitet når brugeren klikker på en <button
   * type="submit"> knap. Det vil vi gerne undgå, så vi kan håndtere formularens
   * data med JavaScript, dvs. "prevent default behaviour" */
  event.preventDefault();

  /* Sørg for at resultatlisten er tom før vi viser nye resultater. Det gør vi
   * ved at sige at dens indre HTML skal være en tom tekststreng */
  carsList.innerHTML = "";

  /* Find den aktuelle værdi af input-feltet til antal personer. Vi henter først
   * værdien ud inde i denne funktion, så vi er sikre på at vi får værdien af
   * feltet som det var præcis da der blev klikket på "Søg"-knappen */
  var requiredPersonCount = document.getElementById("person-count").value;

  /* Find den aktuelle værdi af dropdown-boksen til antal kufferter. Se i
   * HTML-filen hvordan hvert <option> element har en "value" attribut, som
   * indeholder et tal — på den måde får vi et brugbart tal når vi tilgår "value"
   * egenskaben på selve <select> boksen, som vi gør her.  Den tekst der står
   * inde i selve <option>-elementet er bare det, vi vil vise til brugeren, men i
   * koden vil vi hellere have et tal for antal kufferter.
   * Fx:
   * <option value="3">3 kufferter</option>
   */
  var requiredLuggageCount = document.getElementById("luggage-count").value;

  var rentalPeriodInDays = calculatePeriodInDays();

  /* Vi henter listen af biler fra vores API */
  fetch("https://api.jsonbin.io/v3/b/613680e7dfe0cf16eb56267b/latest", {
    headers: {
      "X-Master-Key":
        "$2b$10$PzYYKcfxGW.XclaA1hmhHumsbd0bGqGHZC8Cjh8tl4I005/xe3gbS",
      "X-Bin-Meta": false,
    },
  })
    .then(function (response) {
      /* Vi angiver at svaret er JSON og skal konverteres til JavaScript objekter */
      return response.json();
    })
    .then(function (cars) {
      /* Løb igennem alle bilerne i vores "database" */
      for (var car of cars) {
        /* Check om bilen kan rumme minimum det antal personer og kufferter, som
         * brugeren har angivet. Vi bruger "&&" for at tjekke at begge krav er
         * opfyldt:
         * https://devdocs.io/javascript/operators/logical_and
         *
         * Værdien af input-feltet og dropdown-boksen er tekststrenge, så for en god
         * ordens skyld sender vi dem igennem Number() funktionen, så JavaScript
         * konverterer dem til rigtige tal, så vi kan sammenligne dem med de tal, vi
         * har i vores bil-database.
         * https://devdocs.io/javascript/global_objects/number
         */
        if (
          car.personCount >= Number(requiredPersonCount) &&
          car.luggageCount >= Number(requiredLuggageCount)
        ) {
          /* Hvis bilen opfylder kravene, så kald vores "showCar" funktion og giv den
           * bilen med som argument — så ved den hvilken bil, den skal vise. Og
           * lejeperioden, så den kan beregne lejeprisen. */
          showCar(car, rentalPeriodInDays);
        }
      }
    })
    .catch(function (error) {
      /* Hvis API'et svarer med en fejl viser vi den til brugeren */
      carsList.innerHTML = `<p class="error-message">Noget gik galt: "${error.message}".</p>`;
    });
}

/* HÅNDTÉR EVENTS ----------------------------------------------------------- */

/* Lyt på klik-events på "Søg"-knappen og kald den funktion, vi har defineret.
 * Her sætter vi ikke parenteser efter "handleSearch" fordi vi ikke kalder
 * funktionen her, vi giver bare browseren navnet på den funktion, den skal
 * kalde. Den bliver først kaldt når vores event indtræffer, dvs. der bliver
 * klikket på knappen. */
searchButton.addEventListener("click", handleSearch);
