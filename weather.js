const apiKey = '54414218fafa39c140ab8fdd014efe03';

// Select DOM elements
const getWeatherBtn = document.getElementById('getWeather');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const locationEl = document.getElementById('location');
const descriptionEl = document.getElementById('description');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

// Add event listener on button click
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    // Encode city name to handle spaces & special characters
    const encodedCity = encodeURIComponent(city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

    // Fetch weather data
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            // Show weather info
            weatherInfo.classList.remove('hidden');
            locationEl.textContent = `${data.name}, ${data.sys.country}`;
            descriptionEl.textContent = `Conditions: ${data.weather[0].description}`;
            temperatureEl.textContent = `Temperature: ${data.main.temp}°C`;
            humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
            windEl.textContent = `Wind: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            alert(error.message);
            weatherInfo.classList.add('hidden');
        });
});
