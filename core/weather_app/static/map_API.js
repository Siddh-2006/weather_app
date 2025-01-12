const apiKey = '1fdd6de639604ca3b34151033250801'; // Replace with your Tomorrow.io API key
const map = L.map('map').setView([23.0225, 72.5714], 10); // Example coordinates: Ahmedabad
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function displayMapInfo(lat, lng) {
  const zoom = map.getZoom();
//   document.getElementById('info').innerHTML = `Coordinates: (${lat.toFixed(4)}, ${lng.toFixed(4)}) | Zoom Level: ${zoom}`;
  const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}`;
  fetch(weatherApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("data fetched"); // Log the complete API response

      if (data) {
        console.log('ok'); // Log the timelines data
        if (true) {
          console.log('ok'); // Log the intervals data

          const temperature = data.current.temp_c;
          const humidity =data.current.humidity;
          const popupContent = `<b>Temperature:</b> ${temperature}°C<br><b>Humidity:</b> ${humidity}%`;

          L.marker([lat, lng]).addTo(map)
            .bindPopup(popupContent).openPopup();
        } else {
          console.error('Intervals data is missing or incorrect.');
        }
      } else {
        console.error('Timelines data is missing or incorrect.');
      }
    })
    .catch(error => console.error('Error fetching weather data:', error)); // Corrected catch syntax
}


map.on('click', (e) => {
setTimeout(displayMapInfo(e.latlng.lat, e.latlng.lng), 200);
});

const initialCenter = map.getCenter();
displayMapInfo(initialCenter.lat, initialCenter.lng);

