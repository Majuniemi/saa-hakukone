const button = document.getElementById('button');
const input = document.getElementById('cityInput');


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

        weatherDataContainer.innerHTML = `
            <h2>Säätila kaupungissa: ${cityInput}</h2>
            <p>Lämpötila: ${weatherData.main.temp}°C</p>
            <p>Tuntuu kuin: ${weatherData.main.feels_like}°C</p>
            <p>Säätila: ${weatherData.weather[0].description}</p>
            <p>Kosteus: ${weatherData.main.humidity}%</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDataContainer.innerHTML = `<h3>Error fetching weather data. Please try again later.</h3>`;
    }
    input.value = '';
}