let batteriesContainer = document.getElementById("batteries")

// save your sheet ID and name of the tab as variables for use
let sheetID = "1MEz7HBp6-saFyZN1zCtLOwFqbh9Bc0L3wUUxj5kspPk";
let tabName = 'Sheet1'

// format them into Ben's uri
let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`

console.log(opensheet_uri);


fetch(opensheet_uri)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
		//do something with the data here

        let dataArr = [];

        for (let datapoint of data){

            let dataDay = parseFloat(datapoint.day);
            let hrsSleep = parseFloat(datapoint.hrs_sleep);
            let ease = parseFloat(datapoint.ease_out_of_bed);


            // add this object to our blank array
            dataArr.push([dataDay, hrsSleep, ease]);


            let battContainer = document.createElement("DIV");
            let battInner = document.createElement("DIV");
            
            battContainer.classList.add("batt");
            battInner.classList.add("batt-inner");

            let size = map(hrsSleep, 0, 8, 0, 100);
            let transparency = map(ease, 1, 10, 0, 1);
            let sat = map(ease, 1, 10, 0, 100)
            let animationSpeed = map(ease, 1, 10, 3, 0.2);
            let blurVal = map(ease, 1, 10, 15, 0)

            
            battInner.style.width = size + "%";

            // battInner.style.opacity = transparency;
            battInner.style.backgroundColor = `hsl(210, ${sat}%, 50%)`

            // battInner.style.animation = `blink ${animationSpeed}s linear infinite both alternate`;
            battInner.style.filter = `blur(${blurVal}px)`

            if (size > 100){
                battInner.style.width = "100%";
                battContainer.style.width = `calc(300px * ${size/100})`
            }


            battContainer.appendChild(battInner);
            batteriesContainer.appendChild(battContainer);


            


            // battInner.style.width = 

            // batteriesContainer.innerHTML += `<div class="batt" style="><div class="batt-inner"></div></div>`

        }

        
        console.log(dataArr);

        

    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    });





    function map(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }