const button = document.getElementById('button');
const input = document.getElementById('cityInput');
let longitude = 65;
let latitude = 27;

var map = L.map('map').setView([longitude, latitude], 8)

L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=GdSPu31pwUy9cLlOnBAA', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

button.addEventListener('click', handleClick);

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleClick();
    }
});

function handleClick() {
    getWeather();
}

async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherDataContainer = document.getElementById('weatherData');

    try {
        const response = await axios.get(`/weather/${cityInput}`);
        const weatherData = response.data;
        const windSpeed = getWindSpeed(weatherData.wind.speed);
        const windDirection = getWindDirection(weatherData.wind.deg);
        longitude = weatherData.coord.lat;
        latitude = weatherData.coord.lon;
        console.log(longitude, latitude);

        weatherDataContainer.innerHTML = `
            <h2>Säätila kaupungissa: ${cityInput}</h2>
            <p>Lämpötila: ${weatherData.main.temp}°C</p>
            <p>Tuntuu kuin: ${weatherData.main.feels_like}°C</p>
            <p>Säätila: ${weatherData.weather[0].description}</p>
            <p>Kosteus: ${weatherData.main.humidity}%</p>
            <p>Tuuli: ${windSpeed} ${windDirection}</p>            
        `;
        map.setView([longitude, latitude], 13);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDataContainer.innerHTML = `<h3>Error fetching weather data. Please try again later.</h3>`;
    }
    input.value = '';
}

function getWindSpeed(speed) {
    if (speed < 3) {
        return "Vähäinen";
    } else if (speed > 3 && speed < 8) {
        return "Kohtalainen";
    } else {
        return "Kova";
    }
}

function getWindDirection(direction) {
    if (direction >= 303.75 && direction < 33.75) {
        return "pohjoistuuli";
    } else if (direction >= 33.75 && direction < 123.75) {
        return "itätuuli";
    } else if (direction >= 123.75 && direction < 213.75) {
        return "etelätuuli";
    } else if (direction >= 213.75 && direction < 303.75) {
        return "länsituuli";
    }
}