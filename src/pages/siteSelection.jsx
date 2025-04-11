import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MapContainer, TileLayer, Marker, Tooltip, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";




const svgIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
`;

// Create a custom Leaflet icon
const customIcon = L.divIcon({
  html: svgIcon,
  className: 'custom-marker-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});


const genAI = new GoogleGenerativeAI("AIzaSyD9KbgvwDkOZDi-X3yXSPZ2_vmLaP0Htq8");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to calculate radius in meters from acres
const calculateRadius = (acres) => {
  const areaInSquareMeters = acres * 4046.86; // 1 acre = 4046.86 m²
  return Math.sqrt(areaInSquareMeters / Math.PI); // Radius of circle
};

const generateUrl = (lat, lon) => {
  return `https://www.google.com/maps/@${lat},${lon},15z/data=!3m1!1e3`;
};

function App() {
  const [energyType, setEnergyType] = useState('SOLAR');
  const [landAcres, setLandAcres] = useState('');
  const [remarks, setRemarks] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [locationInfo, setLocationInfo] = useState({});
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!landAcres || landAcres < 10 || landAcres > 1000) {
      setError('Please enter land area between 10 and 1000 acres');
      return;
    }

    setError('');
    setLoading(true);

    const prompt = `Generate coordinates (longitude, latitude) only in India that are optimal for constructing the specified renewable energy source based on the following user inputs:
    Energy Type: ${energyType}
    Land Area: ${landAcres} acres
    Remarks: ${remarks}
    Consider the environmental and climatic conditions necessary for the energy source: For Solar: prioritize areas with high solar irradiance. For Wind: prioritize areas with consistent and strong wind speeds. For Hybrid: prioritize areas suitable for both solar and wind energy. Also, consider regions where land of the specified size is likely to be available within the given budget. Output only the coordinates in the format {Longitude},{Latitude}, without any additional text.`;

    try {
      const result = await model.generateContent(prompt);
      const coordsText = result.response.text();
      const coordsArray = coordsText.split('\n').map(coord => coord.trim()).filter(coord => coord);
      const parsedCoords = coordsArray.map(coord => {
        const [lon, lat] = coord.split(',').map(Number);
        return { lon, lat };
      });
      setCoordinates(parsedCoords);

      const infoPromises = parsedCoords.map(async (coord) => {
        const infoPrompt = `Provide detailed information about the location at coordinates ${coord.lat},${coord.lon} in India for ${energyType} energy production. Format the response as follows:

Location Name: [Name of the location]

Climatic Conditions:
[Technical description of the climatic conditions suitable for ${energyType} energy]

Benefits:
[Benefits of building a ${energyType} energy source at this location]

Costing Breakdown:
[Detailed breakdown of the estimated costs for constructing and operating a ${energyType} energy source on ${landAcres} acres of land]

Ensure each section is clearly separated anf also get me the tst without astrixs.`;

        const infoResult = await model.generateContent(infoPrompt);
        const infoText = infoResult.response.text();


        const lines = infoText.split('\n');
        let name = '';
        let info = '';
        lines.forEach(line => {
          if (line.startsWith('Location Name:')) {
            name = line.replace('Location Name:', '').trim();
          } else {
            info += line + '\n';
          }
        });
        
        return { coord, name, info };
      });
      const infos = await Promise.all(infoPromises);
      const infoMap = infos.reduce((acc, { coord, name, info }) => {
        acc[`${coord.lon},${coord.lat}`] = { name, info };
        return acc;
      }, {});
      setLocationInfo(infoMap);
    } catch (err) {
      setError('Error generating content. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (coordinates.length > 0 && locationInfo[`${coordinates[0].lon},${coordinates[0].lat}`]) {
      setSelectedCoord(`${coordinates[0].lon},${coordinates[0].lat}`);
    }
  }, [coordinates, locationInfo]);

  return (
    <div className="app-container">
      <h1 className='text-[--lvl4]'>Smart Site Selection</h1>
      {/* Energy Type Tabs */}
      <h2 className='text-center text-xl mb-4'>Choose type of energy</h2>
      <div className="tabs">
        {['SOLAR', 'WIND', 'HYBRID'].map((type) => (
          <button
            key={type}
            className={`tab  text-[--lvl1] ${energyType === type ? 'active' : ''}`}
            onClick={() => setEnergyType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Land Area Input */}
      <div className="input-group">
        <label>Land Area (acres):</label>
        <input
          type="number"
          min="10"
          max="1000"
          value={landAcres}
          onChange={(e) => setLandAcres(e.target.value)}
          placeholder="Enter between 10-1000 acres"
        />
      </div>

      {/* Remarks Input */}
      <div className="input-group">
        <label>Remarks:</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter your remarks here..."
          rows="4"
        />
      </div>

      {/* Generate Button */}
      <button 
        onClick={handleGenerate} 
        disabled={loading}
        className="generate-btn"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Content Container */}
      {coordinates.length > 0 && (
        <div className="content-container">
          <div className="map-container">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((coord, index) => (
        <Marker
          key={index}
          position={[coord.lat, coord.lon]}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              setSelectedCoord(`${coord.lon},${coord.lat}`);
            },
          }}
        >
          <Tooltip>{locationInfo[`${coord.lon},${coord.lat}`]?.name || 'Unknown Location'}</Tooltip>
          <Circle
            center={[coord.lat, coord.lon]}
            radius={calculateRadius(landAcres)}
            color="blue"
            fillColor="blue"
            fillOpacity={0.2}
          />
        </Marker>
      ))}
    </MapContainer>
          </div>
          <div className="info-panel">
            {selectedCoord && locationInfo[selectedCoord] ? (
              <div>
                <h2>{locationInfo[selectedCoord].name}</h2>
                <a 
                  href={generateUrl(selectedCoord.split(',')[1], selectedCoord.split(',')[0])} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  View in Google Maps Satellite
                </a>
                <pre>{locationInfo[selectedCoord].info}</pre>
              </div>
            ) : (
              <p>Select a location on the map to view details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
