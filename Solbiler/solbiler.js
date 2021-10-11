var dateFromField = document.getElementById("date-from");
var dateToField = document.getElementById("date-to");


var carsList = document.getElementById("cars-list");


var carTemplate = document.getElementById("car-template");


var searchButton = document.getElementById("search-button");


var todaysDate = new Date().toISOString().split("T")[0];


dateFromField.value = todaysDate;
dateToField.value = todaysDate;


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

  
  carsList.appendChild(carNode);
}

function handleSearch(event) {
  
  event.preventDefault();

 
  carsList.innerHTML = "";

  
  var requiredPersonCount = document.getElementById("person-count").value;

 
  var requiredLuggageCount = document.getElementById("luggage-count").value;

  var rentalPeriodInDays = calculatePeriodInDays();
    
  fetch("https://api.jsonbin.io/v3/b/61387e669548541c29ae1184", {
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