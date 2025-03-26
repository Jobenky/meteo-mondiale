document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    const lightButton = document.querySelector(".light-mode-btn");
    const darkButton = document.querySelector(".dark-mode-btn");
    const themeToggle = document.getElementById("theme-toggle");
    const themeOptions = document.querySelector(".theme-options");

    // Fonksyon pou chanje mode la
    function setTheme(mode) {
        if (mode === "dark") {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light-mode");
        }
    }

    // Montre opsyon yo lè moun pase souri sou bouton an
    themeToggle.addEventListener("mouseenter", () => {
        themeOptions.style.display = "block";
    });

    // Fè opsyon yo disparèt lè moun retire souri li
    themeToggle.addEventListener("mouseleave", () => {
        setTimeout(() => {
            themeOptions.style.display = "none";
        }, 500);
    });

    // Asire opsyon yo rete vizib si moun antre souri sou yo
    themeOptions.addEventListener("mouseenter", () => {
        themeOptions.style.display = "block";
    });

    // Fè opsyon yo disparèt si souri a soti nèt
    themeOptions.addEventListener("mouseleave", () => {
        setTimeout(() => {
            themeOptions.style.display = "none";
        }, 500);
    });

    // Bouton klike pou chanje mode la
    if (lightButton && darkButton) {
        lightButton.addEventListener("click", () => {
            setTheme("light");
            themeOptions.style.display = "none"; // Fè opsyon yo disparèt apre chwa
        });
        darkButton.addEventListener("click", () => {
            setTheme("dark");
            themeOptions.style.display = "none"; // Fè opsyon yo disparèt apre chwa
        });
    }

    // Si yo klike sou bouton prensipal la, montre opsyon yo
    themeToggle.addEventListener("click", () => {
        themeOptions.style.display = themeOptions.style.display === "block" ? "none" : "block";
    });

    const menuToggle = document.getElementById("menu-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");
    
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle("show-menu"); 
        });
    
        
        document.addEventListener("click", (event) => {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("show-menu");
            }
        });
    }

    
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");

    if (searchBtn && cityInput) {
        searchBtn.addEventListener("click", () => {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        });
    }

    const API_KEY = "b98c3538c6edba28479472678e93b265";
    const API_URL = "https://api.openweathermap.org/data/2.5/";
    
    async function getWeather(city) {
        try {
            
            document.getElementById("city-name").textContent = "🔄 Recherche...";
            
            const response = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
    
            if (!response.ok) {
                throw new Error("❌ Ville non trouvée !");
            }
    
            const data = await response.json();
    
            
            if (!data || !data.name) {
                throw new Error("❌ Erreur: Données invalides !");
            }
    
            displayWeather(data);
        } catch (error) {
            document.getElementById("city-name").textContent = error.message;
        }
    }
    
    function displayWeather(data) {
        document.getElementById("city-name").textContent = data.name;
        document.getElementById("temperature").textContent = `🌡 Température : ${data.main.temp}°C`;
        document.getElementById("condition").textContent = `🌥 Conditions : ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `💧 Humidité : ${data.main.humidity}%`;
        document.getElementById("wind-speed").textContent = `💨 Vent : ${data.wind.speed} km/h`;
    
        const weatherIcon = document.getElementById("weather-icon");
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">`;
    }    
});

const API_KEY = "b98c3538c6edba28479472678e93b265";
    const API_URL = "https://api.openweathermap.org/data/2.5/";

    async function getForecast(city) {
        try {
            const response = await fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
            if (!response.ok) throw new Error("Ville non trouvée");
            const data = await response.json();
            displayForecast(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayForecast(data) {
        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";

        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "short" });
            const temp = day.main.temp;
            const condition = day.weather[0].description;
            const icon = day.weather[0].icon;

            const dayElement = document.createElement("div");
            dayElement.classList.add("forecast-day");
            dayElement.innerHTML = `
                <p><strong>${date}</strong></p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                <p>🌡 ${temp}°C</p>
                <p>${condition}</p>
            `;
            forecastContainer.appendChild(dayElement);
        });
    }

    document.getElementById("btn-prevision").addEventListener("click", () => {
        const city = document.getElementById("city-input").value.trim();
        if (city) {
            getForecast(city);
        } else {
            alert("Entrez une ville");
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const historyBtn = document.getElementById("history-btn");
        const historyList = document.getElementById("history-list");
    
        // Ranmase tout rechèch meteo ki te fèt
        let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    
        // Fonksyon pou mete rechèch nan lokal storage
        function saveSearchHistory(city) {
            if (!searchHistory.includes(city)) {
                searchHistory.push(city);
                localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
                updateHistoryUI();
            }
        }
    
        // Fonksyon pou mete lis istorik la sou paj la
        function updateHistoryUI() {
            historyList.innerHTML = ""; // Vide lis la
            searchHistory.forEach(city => {
                let li = document.createElement("li");
                li.textContent = city;
                li.classList.add("history-item");
    
                
                li.addEventListener("click", () => {
                    getWeather(city);       
                    getForecast(city);      
                });
    
                historyList.appendChild(li);
            });
        }
    
        historyBtn.addEventListener("click", () => {
            historyList.classList.toggle("show");
        });
    
        updateHistoryUI();
    });
    
    
    
    

