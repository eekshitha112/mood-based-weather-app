const API_KEY = "a63e3486ff165878386c72ef9ad458be";

// Default coordinates for Hyderabad (in case city fails)
const defaultCoords = {
  lat: 17.385044,
  lon: 78.486671,
};

const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
  const city = input.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  getWeatherByCity(city);
});

function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then((data) => {
      showWeather(data);
    })
    .catch((error) => {
      console.warn("City not found. Using default coordinates.");
      getWeatherByCoords(defaultCoords.lat, defaultCoords.lon);
    });
}

function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showWeather(data);
    })
    .catch((err) => {
      alert("Weather data could not be loaded.");
      console.error(err);
    });
}

function showWeather(data) {
  console.log("🌦️ Weather Data:", data);

  // You can modify this to update your DOM:
  const name = data.name;
  const temp = data.main.temp;
  const weather = data.weather[0].main;

  alert(`📍 ${name}\n🌡️ Temperature: ${temp}°C\n🌥️ Weather: ${weather}`);
}
