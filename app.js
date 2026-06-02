document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration & Data ---
    const timezones = [
        { city: 'London', zone: 'Europe/London' },
        { city: 'New York', zone: 'America/New_York' },
        { city: 'Tokyo', zone: 'Asia/Tokyo' },
        { city: 'San Francisco', zone: 'America/Los_Angeles' }
    ];

    const quotes = [
        "The world is your office. Make it count.",
        "Productivity is being able to do things that you were never able to do before.",
        "Focus on being productive instead of busy.",
        "Your work is going to fill a large part of your life.",
        "Work hard, travel harder."
    ];

    // --- DOM Elements ---
    const mainTime = document.getElementById('main-time');
    const mainDate = document.getElementById('main-date');
    const greeting = document.getElementById('greeting');
    const dailyQuote = document.getElementById('daily-quote');
    const timezoneList = document.getElementById('timezone-list');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // --- Core Functions ---

    // Update Main Clock & Greeting
    function updateClock() {
        const now = new Date();
        
        // Time
        mainTime.textContent = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        // Date
        mainDate.textContent = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });

        // Greeting based on time
        const hour = now.getHours();
        if (hour < 12) greeting.textContent = "Good Morning, Nomad";
        else if (hour < 18) greeting.textContent = "Good Afternoon, Nomad";
        else greeting.textContent = "Good Evening, Nomad";
    }

    // Update World Timezones
    function updateWorldTimes() {
        timezoneList.innerHTML = '';
        const now = new Date();

        timezones.forEach(tz => {
            const timeStr = now.toLocaleTimeString('en-US', {
                timeZone: tz.zone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });

            const item = document.createElement('div');
            item.className = 'timezone-item';
            item.innerHTML = `
                <span class="timezone-city">${tz.city}</span>
                <span class="timezone-time">${timeStr}</span>
            `;
            timezoneList.appendChild(item);
        });
    }

    // --- To-do List Logic ---
    let todos = JSON.parse(localStorage.getItem('nomad-todos')) || [];

    function saveTodos() {
        localStorage.setItem('nomad-todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn">&times;</button>
            `;

            // Toggle Complete
            li.querySelector('input').addEventListener('change', () => {
                todos[index].completed = !todos[index].completed;
                saveTodos();
            });

            // Delete
            li.querySelector('.delete-btn').addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
            });

            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            saveTodos();
        }
    });

    // --- Initialization ---
    
    // Set random quote
    dailyQuote.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

    // Intervals
    setInterval(updateClock, 1000);
    setInterval(updateWorldTimes, 1000 * 60); // Update every minute for world times
    
    updateClock();
    updateWorldTimes();
    renderTodos();

    // Update Currency Pulse Live
    async function updateRates() {
        try {
            // Fiat rates (USD base)
            const fiatRes = await fetch('https://open.er-api.com/v6/latest/USD');
            let krwRate = 1354.2;
            let eurRate = 1.082;
            let jpyRate = 0.0065;
            
            if (fiatRes.ok) {
                const fiatData = await fiatRes.json();
                if (fiatData.rates) {
                    if (fiatData.rates.KRW) krwRate = fiatData.rates.KRW;
                    if (fiatData.rates.EUR) eurRate = 1 / fiatData.rates.EUR;
                    if (fiatData.rates.JPY) jpyRate = 1 / fiatData.rates.JPY;
                }
            }
            
            // Bitcoin rate
            let btcRate = 66420;
            try {
                const btcRes = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
                if (btcRes.ok) {
                    const btcData = await btcRes.json();
                    if (btcData.data && btcData.data.amount) {
                        btcRate = parseFloat(btcData.data.amount);
                    }
                }
            } catch (e) {
                console.error("BTC fetch failed:", e);
            }
            
            // Update DOM
            const currencyList = document.getElementById('currency-list');
            if (currencyList) {
                currencyList.innerHTML = `
                    <div class="currency-item"><span>USD/KRW</span> <span class="rate">${krwRate.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}</span></div>
                    <div class="currency-item"><span>EUR/USD</span> <span class="rate">${eurRate.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 4 })}</span></div>
                    <div class="currency-item"><span>BTC/USD</span> <span class="rate">$${btcRate.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span></div>
                    <div class="currency-item"><span>JPY/USD</span> <span class="rate">${jpyRate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })}</span></div>
                `;
            }
        } catch (e) {
            console.error("Rates fetch failed:", e);
        }
    }

    // Update Weather using Geolocation or Free IP Geo
    async function updateWeather() {
        const tempEl = document.getElementById('temp');
        const locationEl = document.getElementById('location');
        const conditionEl = document.getElementById('condition');
        
        let city = 'Seoul';
        let countryCode = 'KR';
        let lat = 37.5665;
        let lon = 126.9780;
        
        try {
            // Fetch IP-based location
            const geoRes = await fetch('https://ipapi.co/json/');
            if (geoRes.ok) {
                const geoData = await geoRes.json();
                if (geoData.city && geoData.latitude && geoData.longitude) {
                    city = geoData.city;
                    countryCode = geoData.country_code || 'World';
                    lat = geoData.latitude;
                    lon = geoData.longitude;
                }
            }
        } catch (e) {
            console.warn("IP geolocation failed, using default location (Seoul).", e);
        }
        
        try {
            // Fetch real weather using Open-Meteo
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            if (weatherRes.ok) {
                const weatherData = await weatherRes.json();
                if (weatherData.current_weather) {
                    const temp = Math.round(weatherData.current_weather.temperature);
                    const code = weatherData.current_weather.weathercode;
                    
                    // Map WMO Weather Interpretation Codes
                    const weatherDescriptions = {
                        0: "Clear Sky",
                        1: "Partly Cloudy", 2: "Partly Cloudy", 3: "Overcast",
                        45: "Foggy", 48: "Depositing Rime Fog",
                        51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
                        61: "Light Rain", 63: "Rainy", 65: "Heavy Rain",
                        71: "Light Snow", 73: "Snowy", 75: "Heavy Snow",
                        80: "Rain Showers", 81: "Showers", 82: "Violent Showers",
                        95: "Thunderstorm", 96: "Thunderstorm", 99: "Heavy Thunderstorm"
                    };
                    
                    const desc = weatherDescriptions[code] || "Mostly Sunny";
                    
                    if (tempEl) tempEl.textContent = `${temp}°C`;
                    if (locationEl) locationEl.textContent = `${city}, ${countryCode}`;
                    if (conditionEl) conditionEl.textContent = desc;
                }
            }
        } catch (e) {
            console.error("Weather fetch failed:", e);
            if (locationEl) locationEl.textContent = `${city}, ${countryCode}`;
        }
    }

    // Call live API functions
    updateWeather();
    updateRates();

    // Auto-update every 10 minutes
    setInterval(updateWeather, 1000 * 60 * 10);
    setInterval(updateRates, 1000 * 60 * 10);

    // --- Cookie Consent Checker ---
    const consent = localStorage.getItem('cookie-consent');
    const banner = document.getElementById('cookie-banner');
    if (consent === 'accepted' && banner) {
        banner.style.display = 'none';
    } else if (banner) {
        banner.style.display = 'flex';
    }
});

// Global function for Cookie Accept button
window.acceptCookies = function() {
    localStorage.setItem('cookie-consent', 'accepted');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.opacity = '0';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
};
