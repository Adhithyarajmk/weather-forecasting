// Select the weather form
let weatherForm = document.getElementById("weather-form");

// Select the city input
let cityInput = document.getElementById("city-input");

// Select the error message
let errorMessage = document.getElementById("error-message");

// Select the city name
let cityName = document.getElementById("city-name");

// Select the temperature
let temperature = document.getElementById("temperature");

// Select the weather description
let weatherDescription = document.getElementById("weather-description");

// Select the feels-like temperature
let feelsLike = document.getElementById("feels-like");

// Select the humidity
let humidity = document.getElementById("humidity");

// Select the wind speed
let windSpeed = document.getElementById("wind-speed");

// Select the forecast container
let forecastContainer = document.getElementById("forecast-container");

console.log(weatherForm);
console.log(cityInput);
console.log(temperature);

cityName.textContent = "Kochi";

temperature.textContent = "30 °C";

weatherDescription.textContent = "Partly Cloudy";

weatherForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let city = cityInput.value;

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
    } else {
    errorMessage.textContent = "";
    cityName.textContent = city;

    getCoordinates(city);
}
});
async function getCoordinates(city) {

    let url = "https://geocoding-api.open-meteo.com/v1/search?name="
        + encodeURIComponent(city)
        + "&count=1&language=en&format=json";

    let response = await fetch(url);

    let data = await response.json();

    if (data.results && data.results.length > 0) {

        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;

        console.log("City:", data.results[0].name);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

    } else {

        console.log("City not found.");

    }
}