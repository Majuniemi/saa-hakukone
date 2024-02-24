require('dotenv').config();
const axios = require('axios');

async function testWeatherAPI() {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('API key not found in environment variables');
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${apiKey}`);

        if (response.status === 200) {
            console.log('Weather API test passed: Successfully retrieved weather data');
        } else {
            console.error('Weather API test failed: Unexpected response status');
        }
    } catch (error) {
        console.error('Weather API test failed:', error.message);
    }
}

testWeatherAPI();
