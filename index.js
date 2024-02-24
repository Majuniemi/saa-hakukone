const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// API endpoint for fetching weather data
app.get('/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const apiKey = process.env.API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.cod === '404') {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
