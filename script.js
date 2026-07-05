// Select form
const farmForm = document.getElementById("farmForm");

// Handle form submission
farmForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const farmerName = document.getElementById("farmerName").value.trim();
    const crop = document.getElementById("crop").value;
    const location = document.getElementById("location").value.trim();
    const moisture = parseInt(document.getElementById("moisture").value);

    // Result elements
    const cropResult = document.getElementById("cropResult");
    const locationResult = document.getElementById("locationResult");
    const moistureResult = document.getElementById("moistureResult");
    const recommendation = document.getElementById("recommendation");

    // Display entered data
    cropResult.textContent = crop;
    locationResult.textContent = location;
    moistureResult.textContent = moisture + "%";

    // Generate recommendation
    let message = "";

    if (moisture < 30) {
        message = "🔴 Soil is very dry. Irrigate immediately for about 40–45 minutes.";
    } else if (moisture >= 30 && moisture < 50) {
        message = "🟠 Soil moisture is moderate. Irrigate within the next 24 hours for about 25–30 minutes.";
    } else if (moisture >= 50 && moisture < 70) {
        message = "🟢 Soil moisture is good. No irrigation is needed today.";
    } else {
        message = "🌧️ Soil is very wet. Do not irrigate until the moisture level decreases.";
    }

    recommendation.textContent = message;

    // Welcome alert
    alert(`Hello ${farmerName}!\nYour irrigation recommendation is ready.`);
});