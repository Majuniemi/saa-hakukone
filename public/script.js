
async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherDataContainer = document.getElementById('weatherData');

    try {
        const response = await axios.get(`/weather/${cityInput}`);
        const weatherData = response.data;

        weatherDataContainer.innerHTML = `
            <h2>Säätila kaupungissa: ${cityInput}</h2>
            <p>Lämpötila: ${weatherData.main.temp}°C</p>
            <p>Säätila: ${weatherData.weather[0].description}</p>
            <p>Kosteus: ${weatherData.main.humidity}%</p>
            <p>Tuuli: ${weatherData.wind.speed} m/s</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDataContainer.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    }
}
