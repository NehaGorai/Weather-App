import React, { useState } from 'react';
import axios from 'axios';
import { WiThermometer, WiCloud, WiHumidity, WiStrongWind } from 'react-icons/wi';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      alert('write city name');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447829172150-e5deb8972256?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Weather App</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter city"
            className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4 text-center"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg w-full hover:bg-gray-800"
          >
            Get Weather
          </button>
        </div>
        {weather && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg shadow-md flex items-center">
              <WiThermometer size={40} className="text-red-500 mr-4" />
              <div>
                <p className="text-xl font-semibold">Temperature</p>
                <p className="text-lg">{weather.main.temp}°C</p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
              <WiCloud size={40} className="text-gray-600 mr-4" />
              <div>
                <p className="text-xl font-semibold">Weather</p>
                <p className="text-lg capitalize">{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center">
              <WiHumidity size={40} className="text-blue-500 mr-4" />
              <div>
                <p className="text-xl font-semibold">Humidity</p>
                <p className="text-lg">{weather.main.humidity}%</p>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center">
              <WiStrongWind size={40} className="text-green-600 mr-4" />
              <div>
                <p className="text-xl font-semibold">Wind Speed</p>
                <p className="text-lg">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
