function displayWeather(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `🌡 Température : ${data.main.temp}°C`;
}