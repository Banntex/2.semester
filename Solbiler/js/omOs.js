function countUp(element) {
    let currentNumber = 0;
    const finalNumber = Number(element.innerText);
    const totalTime = 4000;
    const increment = Math.round(finalNumber / (totalTime / 60))
    function updateNumber() {
        currentNumber += increment;
        element.innerText = currentNumber;
        if (currentNumber < finalNumber - increment) {
            requestAnimationFrame(updateNumber);
        } else { 
            element.innerText = finalNumber;
        }
    }
    
    requestAnimationFrame(updateNumber);
    
}
const countElements = document.querySelectorAll(".count");
for (const countElement of countElements){
    countUp(countElement)
}
