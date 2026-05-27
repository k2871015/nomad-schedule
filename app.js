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

    // Weather Simulation (Could be replaced with real API fetch)
    const locations = ['Seoul', 'Bali', 'Chiang Mai', 'Lisbon', 'Medellin'];
    const locationEl = document.getElementById('location');
    if (locationEl) {
        locationEl.textContent = `${locations[Math.floor(Math.random() * locations.length)]}, World`;
    }

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
