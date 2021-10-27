const url = new URL(window.location.href);

function addVat(price = 0){
    return price * 1.25;
}
function formatPrice(price = 0){
    return price.toLocaleString("da-DK", {
        style: "currency",
        currency: "DKK",
    });
}
 const basePrice = Number(url.searchParams.get("price"));
 const formattedBasePrice = formatPrice(basePrice);
        document.getElementById("rental-car").innerText = url.searchParams.get("car")
        document.getElementById("rental-days").innerText = url.searchParams.get("days")
        document.getElementById("rental-from").innerText = url.searchParams.get("dateFrom")
        document.getElementById("rental-to").innerText = url.searchParams.get("dateTo")
        document.getElementById("rental-price").innerText = formattedBasePrice;
        const priceOutput = document.getElementById("price-incl-extras");
        priceOutput.innerText = formattedBasePrice;
       
        // Add eventlistener to all checkboxes clicks - this should update the total price
        
        const form = document.querySelector("#extraForm");
        form.addEventListener("change", function(event){
            let extraPrice = 0;
            
            /*this.elements.extra.forEach(element => {
                extraPrice += element.checked ? addVat(Number(element.value)) : 0;
            });*/

            console.log("extraPrice");
            for(const item of this.elements.extra) {
                if (item.checked === true) {
                    const numericValue = Number(item.value);
                    extraPrice += addVat(numericValue);
                } 
                else
                {
                    extraPrice += 0;
                }
            }
            priceOutput.innerText = formatPrice(basePrice + extraPrice);
        })
        form.addEventListener("submit", function(event){
            // Beregne prisen for vores ekstraudstyr
            let extraPrice = 0;
            let extrasList = [];
            for (const item of this.elements.extra) {
                if (item.checked === true){
                    const numericValue = Number(item.value);
                    extraPrice += addVat(numericValue);
                    extrasList.push(item.parentNode.innerText);
                }
                
            }
            sessionStorage.setItem("extraPrice", extraPrice);
            sessionStorage.setItem("extrasList", extrasList.join(", "));

            //Gem de tidliger overførte oplysninger om "car"
            sessionStorage.setItem("car", url.searchParams.get("car"));
            sessionStorage.setItem("days", url.searchParams.get("days"));
            sessionStorage.setItem("dateFrom", url.searchParams.get("dateFrom"));
            sessionStorage.setItem("dateTo", url.searchParams.get("dateTo"));
            sessionStorage.setItem("price", url.searchParams.get("price"));
            
        })
      