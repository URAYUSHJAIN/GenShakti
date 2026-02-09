import { useState, useEffect } from 'react';
import { generateAIResponse } from "../utils/aiProvider";
import { MapContainer, TileLayer, Marker, Tooltip, Circle } from "react-leaflet";
import L from 'leaflet';
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

    const prompt = `Generate exactly 5 optimal locations in India for ${energyType} energy (Land: ${landAcres} acres). ${remarks}

Return ONLY coordinate pairs, one per line, in this exact format:
longitude,latitude

Example format:
78.9629,20.5937
77.1025,28.7041

Requirements:
- Solar: high solar irradiance areas
- Wind: areas with consistent strong winds  
- Hybrid: suitable for both solar and wind
- Output ONLY numbers and commas, NO text, NO labels, NO explanations`;

    try {
      const coordsText = await generateAIResponse(prompt);
      
      // Extract all numbers from the response
      const coordsArray = coordsText
        .split(/[\n\r]+/)
        .map(line => line.trim())
        .filter(line => line && /^-?\d+\.?\d*,-?\d+\.?\d*$/.test(line));
      
      const parsedCoords = coordsArray
        .map(coord => {
          const [lon, lat] = coord.split(',').map(Number);
          return { lon, lat };
        })
        .filter(coord => !isNaN(coord.lon) && !isNaN(coord.lat) && 
                         coord.lat >= 8 && coord.lat <= 37 && 
                         coord.lon >= 68 && coord.lon <= 97); // India bounds
      
      if (parsedCoords.length === 0) {
        setError('Failed to parse valid coordinates from AI response. Please try again.');
        setLoading(false);
        return;
      }
      
      setCoordinates(parsedCoords);

      const infoPromises = parsedCoords.map(async (coord) => {
        const infoPrompt = `For coordinates ${coord.lat}°N, ${coord.lon}°E in India (${energyType} energy, ${landAcres} acres):

Location Name: 
[City/Region name]

Climate:
[Brief climate suitability for ${energyType}]

Benefits:
[2-3 key benefits]

Estimated Cost:
[Cost range in INR for ${landAcres} acres]`;

        try {
          const infoText = await generateAIResponse(infoPrompt);

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
          
          return { coord, name: name || 'Unknown Location', info };
        } catch (error) {
          console.error('Error fetching location info:', error);
          return { 
            coord, 
            name: 'Location Info Unavailable', 
            info: 'Could not load details for this location. Please try again.' 
          };
        }
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
