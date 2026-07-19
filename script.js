// ================================
// KhetHub Smart Irrigation Dashboard
// script.js
// ================================

// ---------- Dark Mode Toggle ----------
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});

// ---------- Water Usage Chart ----------
const waterCtx = document.getElementById("waterChart").getContext("2d");

const waterChart = new Chart(waterCtx, {
    type: "bar",
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Water Usage (Liters)",
            data: [1200, 1100, 1350, 980, 1500, 1250, 1180],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// ---------- Soil Moisture Chart ----------
const moistureCtx = document.getElementById("moistureChart").getContext("2d");

const moistureChart = new Chart(moistureCtx, {
    type: "line",
    data: {
        labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
        datasets: [{
            label: "Soil Moisture %",
            data: [82, 78, 72, 68, 70, 74],
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 40,
                max: 100
            }
        }
    }
});

// ---------- Irrigation Control ----------
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const systemStatus = document.getElementById("systemStatus");
const pumpStatus = document.getElementById("pumpStatus");

startBtn.addEventListener("click", () => {
    systemStatus.textContent = "Irrigation Running";
    pumpStatus.textContent = "ON";
    pumpStatus.style.color = "green";

    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
    systemStatus.textContent = "Idle";
    pumpStatus.textContent = "OFF";
    pumpStatus.style.color = "red";

    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// Initial button state
stopBtn.disabled = true;

// ---------- Live Sensor Simulation ----------
const moistureEl = document.getElementById("moisture");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const tankEl = document.getElementById("tank");

// Random sensor value generator
function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSensors() {
    const moisture = randomValue(55, 85);
    const temperature = randomValue(27, 35);
    const humidity = randomValue(60, 85);
    const tank = randomValue(65, 95);

    moistureEl.textContent = `${moisture}%`;
    temperatureEl.textContent = `${temperature}°C`;
    humidityEl.textContent = `${humidity}%`;
    tankEl.textContent = `${tank}%`;

    updateAIRecommendation(moisture);
}

// Update every 5 seconds
setInterval(updateSensors, 5000);

// ---------- AI Recommendation ----------
function updateAIRecommendation(moisture) {
    const statusBadge = document.querySelector(".status-badge");
    const aiParagraph = document.querySelector(".ai-card p");

    if (moisture < 60) {
        statusBadge.textContent = "Low Moisture";
        statusBadge.style.background = "#ef4444";

        aiParagraph.innerHTML =
            `Soil moisture is currently at <strong>${moisture}%</strong>.
             Immediate irrigation is <strong>recommended</strong> to avoid crop stress.
             Suggested irrigation duration: <strong>18 minutes</strong>.`;
    } else if (moisture < 75) {
        statusBadge.textContent = "Moderate Moisture";
        statusBadge.style.background = "#16a34a";

        aiParagraph.innerHTML =
            `Soil moisture is currently at <strong>${moisture}%</strong>.
             Irrigation is <strong>not required immediately</strong>.
             The next irrigation cycle is recommended in <strong>6 hours</strong>.`;
    } else {
        statusBadge.textContent = "Optimal Moisture";
        statusBadge.style.background = "#2563eb";

        aiParagraph.innerHTML =
            `Soil moisture is currently at <strong>${moisture}%</strong>.
             Soil moisture is <strong>optimal</strong>.
             Irrigation should be postponed to conserve water.`;
    }
}

// ---------- Real-Time Clock ----------
function updateClock() {
    const now = new Date();

    let clockEl = document.getElementById("liveClock");

    // Create clock element if not exists
    if (!clockEl) {
        clockEl = document.createElement("div");
        clockEl.id = "liveClock";
        clockEl.style.fontWeight = "600";
        clockEl.style.marginTop = "10px";

        document.querySelector(".header").appendChild(clockEl);
    }

    clockEl.textContent = now.toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();

// ---------- Dashboard Loaded Message ----------
window.addEventListener("load", () => {
    console.log("KhetHub Smart Irrigation Dashboard Loaded Successfully 🚀🌱");
});