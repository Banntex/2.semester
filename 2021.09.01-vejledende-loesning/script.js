const cars = [
  {
    name: "VW Beetle",
    imageSrc: "fiat-500.jpg",
    category: "Budget",
    personCount: 4,
    luggageCount: 0,
    price: "DKK 899,75",
  },
  {
    name: "Ford Mustang",
    imageSrc: "ford-mustang-400x200.jpg",
    category: "Mellemklasse",
    personCount: 5,
    luggageCount: 3,
    price: "DKK 1699,75",
  },
  {
    name: "VW California",
    imageSrc: "vw-california-400x200.jpg",
    category: "Minivan",
    personCount: 7,
    luggageCount: 4,
    price: "DKK 1899,75",
  },
];

const carsList = document.getElementById("cars-list");
const carTemplate = document.getElementById("car-template");

for (const car of cars) {
  const carNode = carTemplate.content.cloneNode(true);

  carNode.querySelector("img").src = car.imageSrc;
  carNode.querySelector("img").alt = `Billede af ${car.name}`;
  carNode.querySelector("h1").innerText = car.name;
  carNode.querySelector(".category").innerText = car.category;
  carNode.querySelector(".person-count").innerText = car.personCount;
  carNode.querySelector(".luggage-count").innerText = car.luggageCount;
  carNode.querySelector(".price").innerText = car.price;

  carsList.appendChild(carNode);
}
