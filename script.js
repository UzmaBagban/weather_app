document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;

    fetch(`/weather?location=${location}&date1=${date1}&date2=${date2}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = "<h2>Weather forecast and suggested events:</h2>";
            for (const day of data.days) {
                weatherResult.innerHTML += `<p>${day.datetime} - ${day.conditions}: ${day.events.join(', ')}</p>`;
            }

            // Display weather data tables
            weatherResult.innerHTML += "<h2>Weather data:</h2>";
            for (const day of data.days) {
                // Display date in center
                weatherResult.innerHTML += `<p style="text-align: center">${day.datetime}</p>`;
                // Display weather data in separate tables for each category
                weatherResult.innerHTML += `
                    <table class="weather-table">
                        <tr><th>Temp Max</th><th>Temp Min</th><th>Temp</th></tr>
                        <tr><td>${day.tempmax}</td><td>${day.tempmin}</td><td>${day.temp}</td></tr>
                    </table>
                    <br>`; // Insert line break between tables
                weatherResult.innerHTML += `
                    <table class="weather-table">
                        <tr><th>Dew</th><th>Humidity</th><th>Snow</th></tr>
                        <tr><td>${day.dew}</td><td>${day.humidity}</td><td>${day.snow}</td></tr>
                    </table>
                    
                    <br>`; // Insert line break between tables
                weatherResult.innerHTML += `
                    <table class="weather-table">
                        <tr><th>Pressure</th><th>Cloud Cover</th><th>Visibility</th></tr>
                        <tr><td>${day.pressure}</td><td>${day.cloudcover}</td><td>${day.visibility}</td></tr>
                    </table>
                    <br>`; // Insert line break between tables
                weatherResult.innerHTML += `
                    <table class="weather-table">
                        <tr><th>Sunrise</th><th>Sunset</th><th>Moon Phase</th></tr>
                        <tr><td>${day.sunrise}</td><td>${day.sunset}</td><td>${day.moonphase}</td></tr>
                    </table>
                    <br>`; // Insert line break between tables
                weatherResult.innerHTML += `
                    <table class="weather-table">
                        <tr><th>Snow Depth</th><th>Wind Gust</th><th>Wind Speed</th><th>Wind Dir</th></tr>
                        <tr><td>${day.snowdepth}</td><td>${day.windgust}</td><td>${day.windspeed}</td><td>${day.winddir}</td></tr>
                    </table>
                    <br>`; // Insert line break between tables
                weatherResult.innerHTML += `
                    <table class="weather-table">
                        <tr><th>Solar Radiation</th><th>Solar Energy</th><th>UV Index</th><th>Severe Risk</th></tr>
                        <tr><td>${day.solarradiation}</td><td>${day.solarenergy}</td><td>${day.uvindex}</td><td>${day.severerisk}</td></tr>
                    </table>
                    <br>`; // Insert line break between tables
            }
        })
        .catch(error => console.error('Error:', error));
});
