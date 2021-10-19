var dateFromField = document.getElementById("date-from");
var dateToField = document.getElementById("date-to");

var carsList = document.getElementById("cars-list");

var carTemplate = document.getElementById("car-template");

var searchButton = document.getElementById("search-button");

var todaysDate = new Date().toISOString().split("T")[0];

dateFromField.value = todaysDate;
dateToField.value = todaysDate;

function getTotalPrice()
{
  return 0;
}
function calculatePeriodInDays() {
  
  var dateFrom = new Date(dateFromField.value);
  var dateTo = new Date(dateToField.value);

  var differenceInMilliseconds = dateTo.getTime() - dateFrom.getTime();
  
  var millisecondsInADay = 1000 * 60 * 60 * 24;

     var rentalPeriodInDays =
    Math.round(differenceInMilliseconds / millisecondsInADay) + 1;

  return rentalPeriodInDays;
}
function calculateRentalPrice(dailySurcharge = 0, rentalPeriodInDays) {
  var baseRentalPrice = 495;
  var dailyRentalPrice = 100;
  var vatRate = 0.25;

  var resultExclVat =
    baseRentalPrice + rentalPeriodInDays * (dailyRentalPrice + dailySurcharge);
  var resultInclVat = resultExclVat * (1 + vatRate);

  return resultInclVat;
}

function formatPrice(number) {
  
  if (Number.isNaN(number)) {
    return "Ukendt pris";
  } else {
    return number.toLocaleString("da-DK", {
      style: "currency",
      currency: "DKK"
    });
  }
}
function showCar(carObject, rentalPeriodInDays) { 
  var carNode = carTemplate.content.cloneNode(true);
  var rentalPrice = calculateRentalPrice(
    carObject.dailySurcharge,
    rentalPeriodInDays
  );
  carNode.querySelector("img").src = carObject.imageSrc;
  carNode.querySelector("img").alt = `Billede af ${carObject.name}`;
  carNode.querySelector("h1").innerText = carObject.name;
  carNode.querySelector(".category").innerText = carObject.category;
  carNode.querySelector(".person-count").innerText = carObject.personCount;
  carNode.querySelector(".luggage-count").innerText = carObject.luggageCount;
  carNode.querySelector(".price").innerText = formatPrice(rentalPrice);

  const url = new URL("ekstra.html", window.location.origin)
  url.searchParams.append("car", carObject.name);
  url.searchParams.append("days", rentalPeriodInDays);
  url.searchParams.append("price", rentalPrice);

  carNode.querySelector("a").href = url.toString();
  carsList.appendChild(carNode);
}

function handleSearch(event) {
  
  event.preventDefault();

 
  carsList.innerHTML = "";

  
  var requiredPersonCount = document.getElementById("person-count").value;

 
  var requiredLuggageCount = document.getElementById("luggage-count").value;

  var rentalPeriodInDays = calculatePeriodInDays();
    
  fetch("https://api.jsonbin.io/b/61387e669548541c29ae1184/3", {
    headers: {
      "X-Master-Key":
        "$2b$10$A0AwlK4vKaImkWDDJb2c9.K8W1yZAnbJOJ6R.q6d9/ZCh6YSBBgxm",
      "X-Bin-Meta": false,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (cars) {
  
      for (var car of cars) {
        
        if (
          car.personCount >= Number(requiredPersonCount) &&
          car.luggageCount >= Number(requiredLuggageCount)
        ) {
      
          showCar(car, rentalPeriodInDays);
        }
      }
    })
    .catch(function (error) {
      
      carsList.innerHTML = `<p class="error-message">Noget gik galt: "${error.message}".</p>`;
    });
}

searchButton.addEventListener("click", handleSearch);
  // Dette er vores starts indeks på vores array af billeder
  var i = 0; 
  var images = [];
  var time = 3000;

  // Vores arrayliste af billede
  images[0] = 'billeder/i1.jpg'
  images[1] = 'billeder/i2.jpg'
  images[2] = 'billeder/i3.jpg'
  images[3] = 'billeder/i4.jpg'

  // Nu vil vi gerne lave en funktion, som skifter vores billeder med starstværdien 0(i)
  function changeImg(){
      document.slide.src = images[i];
      if(i < images.length - 1){
          i++
      }
      else {
          i = 0;
      }
      setTimeout("changeImg()", time);
  }
  window.onload = changeImg;