import './App.css';
import React, { useState } from 'react';
import axios from 'axios';


const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const openWeatherApiKey = ''; // Reemplaza con tu clave de OpenWeather
  const weatherApiKey = ''; // Reemplaza con tu clave de WeatherAPI

  const getWeatherData = async () => {
    try {
      const openWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`
      );
      const weatherApiResponse = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&aqi=no`
      );

      setWeatherData({
        openWeather: openWeatherResponse.data,
        weatherAPI: weatherApiResponse.data,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };
 
return (
    <div className="weather-app">
      <h1 className="title">Weather Comparison App</h1>
      <div> Esta aplicación mostrará el estado del clima actual en una ubicación dada utilizando las APIs de dos servicios de clima, como OpenWeather y WeatherAPI.</div>
      <div className="input-container">
        <div class="input-wrapper">
          <input type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Busca una ciudad..." name="text" class="input"/>
            <button onClick={getWeatherData} className="get-weather-btn">
          Buscar
        </button>
        </div>
        
      </div>
      {weatherData && (
        <div className="weather-data">
          <br></br><br></br>
          <div class="date"></div>
          <div class="columns is-desktop">
            <div class="column">
              <div class='card'>
              <div class='cardtitle'>OpenWeather</div>
                <h2>{city}</h2>
                    <div class='cardtemp'>{weatherData.openWeather.main.temp}°</div>
                    <div>{weatherData.openWeather.weather[0].description}</div>
                    <div >Humedad: {weatherData.openWeather.main.humidity}%</div>
                    <div class='padd'>Max Temp: {weatherData.openWeather.main.temp_max}°C{/* Temperatura máxima desde OpenWeather */}</div>
                    
              </div>
            </div>
            <div class="column">
              <div class='card'>
                    
                    <div class='cardtitle'>WeatherAPI</div>
                    <h2>{city}</h2>
                    <div class='cardtemp'>{weatherData.weatherAPI.current.temp_c}°</div>
                    <div>{weatherData.weatherAPI.current.condition.text}</div>
                    <div>Humedad: {weatherData.weatherAPI.current.humidity}%</div>
                    <div className="padd">
                      {weatherData.weatherAPI.forecast.forecastday.map((day, index) => (
                        <div key={index} className="forecast-day">
                          {/* {weatherData.weatherAPI.forecast.forecastday[0].day.maxtemp_c}°C */}
                          <div>Max Temp: {day.day.maxtemp_c}°C</div> {/* Muestra la temperatura máxima */}
                        </div>
                        
                      ))}
                    </div>
              </div>
            </div>
          </div>
          <table className="weather-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Temperature (°C)</th>
                <th>Condition</th>
                <th>Humidity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OpenWeather</td>
                <td>{weatherData.openWeather.main.temp}°C</td>
                <td>{weatherData.openWeather.weather[0].description}</td>
                <td>{weatherData.openWeather.main.humidity}%</td>
              </tr>
              <tr>
                <td>WeatherAPI</td>
                <td>{weatherData.weatherAPI.current.temp_c}°</td>
                <td>{weatherData.weatherAPI.current.condition.text}</td>
                <td>{weatherData.weatherAPI.current.humidity}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <br></br>
    </div>
  );
};

export default App;