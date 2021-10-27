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

function countHandler(entries, observer) {
    for (const entry of entries) {
        if (entry.isIntersecting){
            countUp(entry.target);
            observer.unobserve(entry.target);
        }
    }
}

function startCarAnimation(entries, observer)
{
    for(const entry of entries)
    {
        if (entry.isIntersecting)
        {
            // SVG is showing on screen
            // the SVG Html Element is in entry.target
            const carSVGElement = entry.target;
            carSVGElement.classList.add("active");
            observer.unobserve(entry.target);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    
    // Delayed call to enable animations to work properly
    setTimeout(function() {

        // Hook car animation
        const carObserver = new IntersectionObserver(startCarAnimation, {
            threshold:0.1
        });

        const carSVG = document.querySelector("#carSVG");        
        carObserver.observe(carSVG);
        
        // Hook count mechanism
        const countObserver = new IntersectionObserver(countHandler, {
            threshold: 0.3
        });

        const countElements = document.querySelectorAll(".count");
        for (const countElement of countElements){
            countObserver.observe(countElement)
        }

    }, 1);
});