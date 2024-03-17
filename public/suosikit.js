const button = document.getElementById('button');
const refresh = document.getElementById('refresh');
const input = document.getElementById('cityInput');
const remove = document.getElementById('remove');
const citySpan = document.querySelector('#city');
const temperatureSpan = document.querySelector('#temperature');
const weatherDescriptionSpan = document.querySelector('#weatherDescription');
let favorites = JSON.parse(localStorage.getItem('favorites'));


button.addEventListener('click', handleClick);

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleClick();
    }
});

function handleClick() {
    let cityToAdd = document.getElementById('cityInput').value;
    if (cityToAdd !== '') {
        cityToAdd = cityToAdd.charAt(0).toUpperCase() + cityToAdd.slice(1);
        favorites.push(cityToAdd);
        saveFavorites();
    }
    refreshFavorites();
    input.value = '';
};

remove.addEventListener('click', () => {
    let cityToRemove = document.getElementById('removeCity').value;
    cityToRemove = cityToRemove.charAt(0).toUpperCase() + cityToRemove.slice(1);
    if (favorites.includes(cityToRemove)) {
        const index = favorites.indexOf(cityToRemove);
        favorites.splice(index, 1);
        saveFavorites();
    }
    refreshFavorites();
    removeCity.value = '';
});

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

function refreshFavorites() {
    weatherDataSpan.innerHTML = '';
    for (let i = 0; i < favorites.length; i++) {
        getWeather(favorites[i]);
    }
};

refreshFavorites();

async function getWeather(city) {
    let cityInput = city;
    try {
        const response = await axios.get(`/weather/${cityInput}`);
        const weatherData = response.data;
        const weatherDataSpan = document.querySelector('#weatherDataSpan');

        const newWeatherDiv = document.createElement('div');
        newWeatherDiv.setAttribute('class', 'weatherData');
        newWeatherDiv.innerHTML = `
            <div id="weatherDataDiv">    
                <div id="weatherDataLeft">
                    <div>
                        <h2>${cityInput}</h2>
                    </div>
                </div>
                <div id="weatherDataRight">
                    <div id="temperatureDiv">
                        <p>${weatherData.main.temp} C°</p>
                    </div>
                    <div id="weatherDescriptionDiv">
                        <p>${weatherData.weather[0].description}</p>
                    </div>
                </div>
            </div>
        `;

        weatherDataSpan.appendChild(newWeatherDiv);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};