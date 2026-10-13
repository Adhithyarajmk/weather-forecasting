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

let locationResults = document.getElementById("location-results");

console.log(weatherForm);
console.log(cityInput);
console.log(temperature);

// cityName.textContent = "Kochi";

// temperature.textContent = "30 °C";

// weatherDescription.textContent = "Partly Cloudy";

weatherForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
    } else {
    errorMessage.textContent = "";
    cityName.textContent = city;

    getCoordinates(city);
}
});
async function getCoordinates(city) {    /*async allows the function to use await*/

    try {

        let url = "https://geocoding-api.open-meteo.com/v1/search?name="
            + encodeURIComponent(city)
            + "&count=10&language=en&format=json";

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to search for locations.");
        }

        let data = await response.json();

        // Clear previous search results
        locationResults.innerHTML = "";

        if (!data.results || data.results.length === 0) {

            errorMessage.textContent = "City not found.";
            return;

        }

        errorMessage.textContent = "";

        // Display every matching location
        data.results.forEach(function(place) {

            let locationOption = document.createElement("div");

            locationOption.className = "location-option";

            locationOption.textContent =
                place.name + ", " +
                (place.admin1 ? place.admin1 + ", " : "") +
                (place.country || "Unknown country");

            // Select a location when clicked
            locationOption.addEventListener("click", function() {

                selectLocation(place);

            });

            locationResults.appendChild(locationOption);

        });

    } catch (error) {

        errorMessage.textContent = error.message;
        console.log(error);

    }

}

function selectLocation(place) {

    let latitude = place.latitude;
    let longitude = place.longitude;

    cityName.textContent =
        place.name + ", " + (place.country || "");

    locationResults.innerHTML = "";

    errorMessage.textContent = "";

    console.log("Selected location:", place.name);
    console.log("Country:", place.country);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    getWeather(latitude, longitude);

}
async function getWeather(latitude, longitude) {

    try {

        let weatherUrl =
            "https://api.open-meteo.com/v1/forecast?latitude="
            + latitude
            + "&longitude="
            + longitude
            + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto";

        let response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        let weatherData = await response.json();

        // Get current weather information
        let current = weatherData.current;

        // Display the weather information
        temperature.textContent = current.temperature_2m + " °C";

        feelsLike.textContent = current.apparent_temperature + " °C";

        humidity.textContent = current.relative_humidity_2m + "%";

        windSpeed.textContent = current.wind_speed_10m + " km/h";

        weatherDescription.textContent =
            getWeatherDescription(current.weather_code);

        console.log("Weather data:", weatherData);

    } catch (error) {

        errorMessage.textContent = error.message;

        console.log(error);

    }
}

function getWeatherDescription(code) {

    if (code === 0) {
        return "Clear sky";
    } 
    else if (code === 1) {
        return "Mainly clear";
    } 
    else if (code === 2) {
        return "Partly cloudy";
    } 
    else if (code === 3) {
        return "Overcast";
    } 
    else if (code === 45 || code === 48) {
        return "Foggy";
    } 
    else if (code >= 51 && code <= 67) {
        return "Drizzle or rain";
    } 
    else if (code >= 71 && code <= 77) {
        return "Snowfall";
    } 
    else if (code >= 80 && code <= 82) {
        return "Rain showers";
    } 
    else if (code >= 95) {
        return "Thunderstorm";
    } 
    else {
        return "Unknown weather";
    }

}