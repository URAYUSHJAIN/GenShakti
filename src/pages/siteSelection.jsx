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

    const prompt = `You are a geographic data API. Your task: output exactly 5 latitude,longitude coordinate pairs for optimal ${energyType} energy sites in India requiring ${landAcres} acres of land.${remarks ? ` Additional context: ${remarks}` : ''}

Rules for site selection:
- SOLAR: Pick locations with highest annual solar irradiance (Rajasthan, Gujarat, Tamil Nadu, Andhra Pradesh, Madhya Pradesh).
- WIND: Pick locations with strongest consistent winds (coastal Tamil Nadu, Gujarat coast, Karnataka, Rajasthan, Maharashtra).
- HYBRID: Pick locations suitable for both solar panels and wind turbines.

CRITICAL: Your ENTIRE response must be ONLY 5 lines. Each line must contain ONLY two decimal numbers separated by a comma. The format is: latitude,longitude
No text. No labels. No numbering. No explanations. No blank lines.

Example of correct response:
26.9124,70.9000
23.0225,72.5714
11.1271,78.6569
15.9129,79.7400
24.5854,73.7125`;

    try {
      const coordsText = await generateAIResponse(prompt);

      console.log("AI raw response:", coordsText);

      // Robust parser: extract all number pairs that look like coordinates
      const coordRegex = /(-?\d{1,3}\.?\d*)\s*[,\s]\s*(-?\d{1,3}\.?\d*)/g;
      const matches = [...coordsText.matchAll(coordRegex)];

      const parsedCoords = matches
        .map(match => {
          let num1 = parseFloat(match[1]);
          let num2 = parseFloat(match[2]);

          // Determine which is lat and which is lon
          // India lat: 8-37, lon: 68-97
          let lat, lon;
          if (num1 >= 8 && num1 <= 37 && num2 >= 68 && num2 <= 97) {
            lat = num1; lon = num2; // lat,lon format
          } else if (num2 >= 8 && num2 <= 37 && num1 >= 68 && num1 <= 97) {
            lat = num2; lon = num1; // lon,lat format
          } else {
            return null; // Not valid India coordinates
          }
          return { lat, lon };
        })
        .filter(coord => coord !== null);

      // Remove duplicates (same coords within 0.01 degree)
      const uniqueCoords = parsedCoords.filter((coord, idx, arr) =>
        idx === arr.findIndex(c =>
          Math.abs(c.lat - coord.lat) < 0.01 && Math.abs(c.lon - coord.lon) < 0.01
        )
      ).slice(0, 5);

      if (uniqueCoords.length === 0) {
        setError('Failed to parse valid coordinates from AI response. Please try again.');
        setLoading(false);
        return;
      }

      setCoordinates(uniqueCoords);

      const infoPromises = uniqueCoords.map(async (coord) => {
        const infoPrompt = `Give brief info about the location at ${coord.lat}°N, ${coord.lon}°E in India for a ${energyType} energy project on ${landAcres} acres of land.

Respond in this exact format (fill in the brackets):
Location Name: [nearest city or region name]
Climate: [one line about climate suitability for ${energyType} energy]
Benefits: [2-3 key benefits, comma separated]
Estimated Cost: [rough cost range in INR crores for ${landAcres} acres ${energyType} setup]

No extra text. Just fill the 4 fields above.`;

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
