document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");

    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });
});