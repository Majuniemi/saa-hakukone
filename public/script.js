const button = document.getElementById('button');
const input = document.getElementById('cityInput');
let longitude = 65.0591;
let latitude = 25.4604;
let marker = null;
const citySpan = document.querySelector('#city');
const temperatureSpan = document.querySelector('#temperature');
const feelsLikeSpan = document.querySelector('#feelsLike');
const weatherDescriptionSpan = document.querySelector('#weatherDescription');
const humiditySpan = document.querySelector('#humidity');
const windSpan = document.querySelector('#wind');
const cloudinessSpan = document.querySelector('#cloudiness');
const pressureSpan = document.querySelector('#pressure');
const visibilitySpan = document.querySelector('#visibility');
const iconSpan = document.querySelector('img');

function handleClick() {
    getWeather();
}

getWeather();

async function getWeather() {
    let cityInput = document.getElementById('cityInput').value;
    if (cityInput === '') {
        cityInput = 'Oulu';
    }

    try {
        const response = await axios.get(`/weather/${cityInput}`);
        const weatherData = response.data;
        const windSpeed = getWindSpeed(weatherData.wind.speed);
        const windDirection = getWindDirection(weatherData.wind.deg);
        longitude = weatherData.coord.lat;
        latitude = weatherData.coord.lon;
        console.log(longitude, latitude);

        citySpan.innerHTML = cityInput;
        temperatureSpan.innerHTML = weatherData.main.temp;
        feelsLikeSpan.innerHTML = weatherData.main.feels_like;
        weatherDescriptionSpan.innerHTML = weatherData.weather[0].description;
        humiditySpan.innerHTML = weatherData.main.humidity;
        windSpan.innerHTML = windSpeed + ' ' + windDirection;
        cloudinessSpan.innerHTML = weatherData.clouds.all;
        pressureSpan.innerHTML = weatherData.main.pressure;
        visibilitySpan.innerHTML = weatherData.visibility;
        iconSpan.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

        map.setView([longitude, latitude], 15);

        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([longitude, latitude], { icon: stationIcon }).addTo(map);
        L.marker

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDataContainer.innerHTML = `<h3>Error fetching weather data. Please try again later.</h3>`;
    }
    input.value = '';
}

function getWindSpeed(speed) {
    if (speed < 3) {
        return "vähäinen";
    } else if (speed > 3 && speed < 8) {
        return "kohtalainen";
    } else {
        return "kova";
    }
}

function getWindDirection(direction) {
    if (direction >= 303.75 || direction < 33.75) {
        return "pohjoistuuli";
    } else if (direction >= 33.75 && direction < 123.75) {
        return "itätuuli";
    } else if (direction >= 123.75 && direction < 213.75) {
        return "etelätuuli";
    } else if (direction >= 213.75 && direction < 303.75) {
        return "länsituuli";
    }
}

var map = L.map('map').setView([longitude, latitude], 13)

L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=GdSPu31pwUy9cLlOnBAA', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

button.addEventListener('click', handleClick);

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleClick();
    }
});

var stationIcon = L.icon({
    iconUrl: 'https://cdn1.iconfinder.com/data/icons/science-metallic-vol-2/64/meteorological-station-512.png',
    iconSize: [90, 90], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});