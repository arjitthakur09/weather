import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./App.css";

const API_KEY = "63433fe29de64a14815160221252607";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setWeatherData(null);         // clear previous data
    setLoading(true);             // show loading

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setWeatherData(data);
    } catch (err) {
      console.error(err);
      // Optional: show error message in UI
    } finally {
      setLoading(false);         // hide loading
    }
  };

  return (
    <div className="App">
      <h1>Weather Application</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {/* Loading Message */}
      {loading && <p role="status">Loading data…</p>}

      {/* Show weather data */}
      {weatherData && !loading && (
        <div className="weather-cards">
          <WeatherCard label="Temperature" value={`${weatherData.current.temp_c}°C`} />
          <WeatherCard label="Humidity" value={`${weatherData.current.humidity}%`} />
          <WeatherCard label="Wind Speed" value={`${weatherData.current.wind_kph} km/h`} />
          <WeatherCard label="Condition" value={weatherData.current.condition.text} />
        </div>
      )}
    </div>
  );
}

export default App;
