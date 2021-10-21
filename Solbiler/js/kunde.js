
document.getElementById("rental-car").innerHTML = sessionStorage.getItem("car");
document.getElementById("rental-from").innerHTML = sessionStorage.getItem("dateFrom");
document.getElementById("rental-to").innerHTML = sessionStorage.getItem("dateTo");
document.getElementById("rental-days").innerHTML = sessionStorage.getItem("days");
document.getElementById("rental-price").innerHTML = sessionStorage.getItem("price");
document.getElementById("extrasListParagraph").innerText = sessionStorage.getItem("extrasList")




