// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
var zipcode = "";
var error = "";
var error2 = "";
var city = "";
var kTemp = "";
var kelvin = "";
var fahrenheit = "";
var celsius = "";
var condition = "";
var weatherImg = "";

var input = document.getElementById("zipcode");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("getZipCode").click();
  }
});

function getZipCode() {
    var zipcode = document.getElementById('zipcode').value;
    console.log(zipcode);

    if (zipcode !== '') {
        apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&APPID=725c230d9f8717d24b757396af6fdb56';
        showTheData(apiURL);
        console.log(apiURL);
    }
    else {
        var error = 'Please enter in a zip code';
        document.getElementById('error').innerHTML = error;
        console.log(error);
    }
}

function showTheData() {
    fetch(apiURL)
        .then(function (response) {
            if (response.status !== 200) {
                // make the promise be rejected if we didn't get a 200 response
                throw new Error("Not 200 response")
            } else {
                // go the desired response
                return response.json();
            }
        })
        .then(function (myJson) {
            document.getElementById('error').innerHTML = "";
            console.log(JSON.stringify(myJson));

            //Hide the img at the top of the page
            document.getElementById('mainImg').style.display = 'none';
            
            //Diplay the div that holds all the weather info
            document.getElementById('WeatherStuff').style.display = 'block';

            city = JSON.stringify(myJson.name);
            console.log(city);
            document.getElementById('city').innerHTML = city.replace(/\"/g, "");

            kTemp = JSON.stringify(myJson.main.temp);
            console.log(kTemp);

            //Call function to display/convert Kelvin to F and C 
            //pass kTemp into it for calculations
            convertTemp(kTemp);
            document.getElementById('kTemp').innerHTML = kelvin;
            document.getElementById('fTemp').innerHTML = fahrenheitDisplay;
            document.getElementById('cTemp').innerHTML = celsius;

            condition = JSON.stringify(myJson.weather[0].description).replace(/\"/g, "");
            console.log(condition);
            document.getElementById('condition').innerHTML = condition;

            //Call function to display img
            getTemperatureImg(fahrenheit);
            console.log(fahrenheit);
            document.getElementById('weatherImg').src = weatherImg;
        }).catch(function (error) {
            var error2 = 'No Results Found';
            document.getElementById('error').innerHTML = error2;
            console.log('Request failed2', error);
        });
}

function convertTemp(kTemp) {
    kelvin = Math.round(kTemp) + "°" + " K";
    fahrenheit = Math.round(9 / 5 * (parseInt(kTemp) - 273) + 32);
    fahrenheitDisplay = fahrenheit + "°" + " F";
    celsius = Math.round(parseInt(kTemp) - 273.15) + "°" + " C";
}

function getTemperatureImg(fahrenheit) {
    var temp = parseInt(fahrenheit);
    console.log(temp);
    console.log(typeof temp);
    if (temp <= 32) {
        weatherImg = "/img/ColdBinx.png";
    }
    else if (temp > 32 && temp < 65) {
        weatherImg = "/img/SpringBinx.png";
    }
    else if (temp >= 65) {
        weatherImg = "/img/SummerBinx.png";
    }
}