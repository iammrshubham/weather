async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '73fef714f5c9c91be7d15ee11a6763ab'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            const temp = data.main.temp;
            let tempClass = '';
            let videoId = '';

            if (temp > 30) {
                tempClass = 'high-temp';
                videoId = 'high-temp-video';
            } else if (temp >= 15 && temp <= 30) {
                tempClass = 'medium-temp';
                videoId = 'medium-temp-video';
            } else {
                tempClass = 'low-temp';
                videoId = 'low-temp-video';
            }

            document.getElementById('weather-result').className = tempClass;
            document.getElementById('weather-result').innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;

            // Hide all videos
            document.getElementById('high-temp-video').style.display = 'none';
            document.getElementById('medium-temp-video').style.display = 'none';
            document.getElementById('low-temp-video').style.display = 'none';

            // Show the relevant video
            document.getElementById(videoId).style.display = 'block';

        } else {
            document.getElementById('weather-result').className = '';
            document.getElementById('weather-result').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('weather-result').className = '';
        document.getElementById('weather-result').innerHTML = `<p>Unable to retrieve weather data. Please try again later.</p>`;
    }
}
