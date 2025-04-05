import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SimpleMap = ({ data, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-10 gap-1">
        {data.map((value, index) => (
          <div
            key={index}
            className="aspect-square rounded"
            style={{
              backgroundColor: `rgba(0, 128, 0, ${value / 100})`,
            }}
            title={`Value: ${value.toFixed(2)}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const EnergySourceCard = ({ title, data, mapData, aiRecommendation }) => {
  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="mb-4">
        <Bar
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Energy Production (MWh)",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          }}
          options={{ responsive: true }}
        />
      </div>
      {/* <SimpleMap data={mapData} title={`${title} Potential Map`} /> */}
      <div className="mt-4 p-3 bg-green-100 rounded-lg">
        <h4 className="font-semibold mb-2">AI Recommendation:</h4>
        <p className="text-sm">{aiRecommendation}</p>
      </div>
    </div>
  );
};

const EnergyStorageCard = ({ data, recommendation }) => {
  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">Energy Storage Solutions</h2>
      <div className="mb-4">
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Energy Demand (MWh)",
                data: data.demand,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
              {
                label: "Energy Supply (MWh)",
                data: data.supply,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
              },
            ],
          }}
          options={{ responsive: true }}
        />
      </div>
      <div className="mt-4 p-3 bg-green-100 rounded-lg">
        <h4 className="font-semibold mb-2">AI Recommendation:</h4>
        <p className="text-sm">{recommendation}</p>
      </div>
    </div>
  );
};

const RenewableEnergyDashboard = () => {
  const [solarData, setSolarData] = useState({ production: [], map: [] });
  const [windData, setWindData] = useState({ production: [], map: [] });
  const [hydroData, setHydroData] = useState({ production: [], map: [] });
  const [geothermalData, setGeothermalData] = useState({
    production: [],
    map: [],
  });
  const [biomassData, setBiomassData] = useState({ production: [], map: [] });
  const [storageData, setStorageData] = useState({ demand: [], supply: [] });
  const [aiRecommendations, setAiRecommendations] = useState({
    solar: "",
    wind: "",
    hydro: "",
    geothermal: "",
    biomass: "",
    storage: "",
  });

  useEffect(() => {
    // Simulating data fetching
    const fetchData = () => {
      // TODO: Replace these with actual API calls
      setSolarData({
        production: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 1000)
        ),
        map: Array.from({ length: 100 }, () => Math.random() * 100),
      });
      setWindData({
        production: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 1000)
        ),
        map: Array.from({ length: 100 }, () => Math.random() * 100),
      });
      setHydroData({
        production: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 1000)
        ),
        map: Array.from({ length: 100 }, () => Math.random() * 100),
      });
      setGeothermalData({
        production: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 1000)
        ),
        map: Array.from({ length: 100 }, () => Math.random() * 100),
      });
      setBiomassData({
        production: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 1000)
        ),
        map: Array.from({ length: 100 }, () => Math.random() * 100),
      });
      setStorageData({
        demand: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 1000)
        ),
        supply: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 1000)
        ),
      });
    };

    fetchData();
    // Simulating real-time updates
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const energyTypes = [
      "solar",
      "wind",
      "hydro",
      "geothermal",
      "biomass",
      "storage",
    ];
    let currentTypeIndex = 0;

    const fetchRecommendations = async () => {
      const energyType = energyTypes[currentTypeIndex];
      let data = {};

      switch (energyType) {
        case "solar":
          data = solarData;
          break;
        case "wind":
          data = windData;
          break;
        case "hydro":
          data = hydroData;
          break;
        case "geothermal":
          data = geothermalData;
          break;
        case "biomass":
          data = biomassData;
          break;
        case "storage":
          data = storageData;
          break;
        default:
          return;
      }

      try {
        const recommendation = await getAIRecommendation(energyType, data);
        setAiRecommendations((prev) => ({
          ...prev,
          [energyType]: recommendation,
        }));
      } catch (error) {
        console.error(
          `Failed to fetch recommendation for ${energyType}:`,
          error
        );
      }

      currentTypeIndex = (currentTypeIndex + 1) % energyTypes.length;
    };

    const interval = setInterval(fetchRecommendations, 2000); // Fetch recommendations every 2 seconds
    return () => clearInterval(interval);
  }, [
    solarData,
    windData,
    hydroData,
    geothermalData,
    biomassData,
    storageData,
  ]);

  const getAIRecommendation = async (energyType, data) => {
    const apiKey = "AIzaSyBSXHhf3NbiahDw3VT5jzTdMgv9I-1Ctds";
    const prompt = `Provide a recommendation for ${energyType} energy based on the following data. Limit the response to 27 words: ${JSON.stringify(
      data
    )}`;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
          apiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error fetching AI recommendation:", error);
      return "Failed to fetch recommendation.";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-green-50 to-blue-50">
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        Renewable Energy Capacity Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EnergySourceCard
          title="Solar Power Optimization"
          data={solarData.production}
          mapData={solarData.map}
          aiRecommendation={aiRecommendations.solar}
        />
        <EnergySourceCard
          title="Wind Energy Potential"
          data={windData.production}
          mapData={windData.map}
          aiRecommendation={aiRecommendations.wind}
        />
        <EnergySourceCard
          title="Hydropower Feasibility"
          data={hydroData.production}
          mapData={hydroData.map}
          aiRecommendation={aiRecommendations.hydro}
        />
        <EnergySourceCard
          title="Geothermal Energy Exploration"
          data={geothermalData.production}
          mapData={geothermalData.map}
          aiRecommendation={aiRecommendations.geothermal}
        />
        <EnergySourceCard
          title="Biomass Energy Utilization"
          data={biomassData.production}
          mapData={biomassData.map}
          aiRecommendation={aiRecommendations.biomass}
        />
        <EnergyStorageCard
          data={storageData}
          recommendation={aiRecommendations.storage}
        />
      </div>
    </div>
  );
};

export default RenewableEnergyDashboard;
