import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const LiveEcoPulseVisualizer = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: data.energy,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Water Usage (Liters)",
        data: data.water,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Waste Generated (kg)",
        data: data.waste,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Live Eco-Pulse Visualizer
      </h2>
      <div className="h-64">
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-green-100 p-2 rounded">
          <p className="font-bold text-green-700">Energy Trend</p>
          <p>{data.trends.energy}</p>
        </div>
        <div className="bg-blue-100 p-2 rounded">
          <p className="font-bold text-blue-700">Water Trend</p>
          <p>{data.trends.water}</p>
        </div>
        <div className="bg-red-100 p-2 rounded">
          <p className="font-bold text-red-700">Waste Trend</p>
          <p>{data.trends.waste}</p>
        </div>
      </div>
    </div>
  );
};

const AISustainabilityChallenges = ({ challenges, onAcceptChallenge }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        AI-Powered Sustainability Challenges
      </h2>
      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
            <p className="mb-2">{challenge.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Difficulty: {challenge.difficulty}
              </span>
              <span className="text-sm text-gray-600">
                Impact: {challenge.impact}
              </span>
            </div>
            <button
              onClick={() => onAcceptChallenge(challenge)}
              className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Accept Challenge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityImpactLeaderboard = ({ leaderboard }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Community Impact Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-green-100">
              <th className="py-2 px-4 text-left">Rank</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Impact Score</th>
              <th className="py-2 px-4 text-left">Top Achievement</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{entry.user}</td>
                <td className="py-2 px-4">{entry.score}</td>
                <td className="py-2 px-4">{entry.topAchievement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PredictiveResourceOptimization = ({ predictions }) => {
  const chartData = {
    labels: ["Current", "Optimized"],
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: [predictions.energy.current, predictions.energy.optimized],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)"],
      },
      {
        label: "Water Usage (Liters)",
        data: [predictions.water.current, predictions.water.optimized],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Predictive Resource Optimization
      </h2>
      <div className="h-64 mb-4">
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-bold mb-2">Energy Savings</h3>
          <p>Potential Reduction: {predictions.energy.savings}%</p>
          <p>Estimated Cost Savings: ${predictions.energy.costSavings}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-bold mb-2">Water Savings</h3>
          <p>Potential Reduction: {predictions.water.savings}%</p>
          <p>Estimated Cost Savings: ${predictions.water.costSavings}</p>
        </div>
      </div>
      <div className="mt-4 bg-yellow-100 p-4 rounded">
        <h3 className="font-bold mb-2">AI Recommendations</h3>
        <ul className="list-disc pl-5">
          {predictions.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const InteractiveEcoEducationHub = ({ modules, onCompleteModule }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Interactive Eco-Education Hub
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">{module.title}</h3>
            <p className="mb-2">{module.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Duration: {module.duration}
              </span>
              <span className="text-sm text-gray-600">
                Points: {module.points}
              </span>
            </div>
            <button
              onClick={() => onCompleteModule(module)}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Start Module
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PersonalCarbonFootprintAssistant = ({ footprint, onAskQuestion }) => {
  const [question, setQuestion] = useState("");

  const chartData = {
    labels: ["Transport", "Home", "Food", "Purchases"],
    datasets: [
      {
        data: [
          footprint.transport,
          footprint.home,
          footprint.food,
          footprint.purchases,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Personal Carbon Footprint AI Assistant
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">Your Carbon Footprint Breakdown</h3>
          <div className="h-64">
            <Doughnut
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Ask the AI Assistant</h3>
          <div className="mb-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about reducing your carbon footprint..."
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => {
                onAskQuestion(question);
                setQuestion("");
              }}
              className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Ask
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded h-40 overflow-y-auto">
            <h4 className="font-bold mb-2">AI Response:</h4>
            <p>{footprint.aiResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EcoSyncDashboard = () => {
  const [ecoPulseData, setEcoPulseData] = useState({
    labels: [],
    energy: [],
    water: [],
    waste: [],
    trends: { energy: "", water: "", waste: "" },
  });
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [predictions, setPredictions] = useState({
    energy: { current: 0, optimized: 0, savings: 0, costSavings: 0 },
    water: { current: 0, optimized: 0, savings: 0, costSavings: 0 },
    recommendations: [],
  });
  const [ecoModules, setEcoModules] = useState([]);
  const [carbonFootprint, setCarbonFootprint] = useState({
    transport: 0,
    home: 0,
    food: 0,
    purchases: 0,
    aiResponse: "",
  });

  useEffect(() => {
    // Simulating real-time data updates
    const fetchData = () => {
      // Live Eco-Pulse Visualizer data
      setEcoPulseData({
        labels: ["1h ago", "45m ago", "30m ago", "15m ago", "Now"],
        energy: [300, 280, 290, 285, 295],
        water: [150, 155, 140, 160, 145],
        waste: [50, 45, 55, 40, 48],
        trends: {
          energy: "Slight increase in consumption",
          water: "Stable usage",
          waste: "Decreasing trend",
        },
      });

      // AI-Powered Sustainability Challenges
      setChallenges([
        {
          title: "Zero Waste Week",
          description: "Reduce your household waste to zero for one week",
          difficulty: "Hard",
          impact: "High",
        },
        {
          title: "Plant-Based Day",
          description: "Eat only plant-based meals for a day",
          difficulty: "Medium",
          impact: "Medium",
        },
        {
          title: "Energy-Free Evening",
          description: "Spend one evening without using electricity",
          difficulty: "Easy",
          impact: "Low",
        },
      ]);

      // Community Impact Leaderboard
      setLeaderboard([
        {
          user: "EcoWarrior",
          score: 1250,
          topAchievement: "Reduced energy consumption by 30%",
        },
        {
          user: "GreenThumb",
          score: 1100,
          topAchievement: "Planted 100 trees",
        },
        {
          user: "SustainableLife",
          score: 950,
          topAchievement: "Zero waste for 1 month",
        },
        {
          user: "EarthGuardian",
          score: 900,
          topAchievement: "Switched to 100% renewable energy",
        },
        {
          user: "RecycleMaster",
          score: 850,
          topAchievement: "Organized community recycling drive",
        },
      ]);

      // Predictive Resource Optimization
      setPredictions({
        energy: { current: 500, optimized: 400, savings: 20, costSavings: 50 },
        water: { current: 300, optimized: 240, savings: 20, costSavings: 30 },
        recommendations: [
          "Adjust thermostat by 2°C to save energy",
          "Fix leaking faucet in the kitchen",
          "Install low-flow showerheads to reduce water usage",
          "Use natural light when possible to reduce electricity consumption",
        ],
      });

      // Interactive Eco-Education Hub
      setEcoModules([
        {
          title: "Renewable Energy 101",
          description:
            "Learn about different types of renewable energy sources",
          duration: "30 minutes",
          points: 50,
        },
        {
          title: "Sustainable Food Choices",
          description: "Discover how your food choices impact the environment",
          duration: "45 minutes",
          points: 75,
        },
        {
          title: "Home Energy Efficiency",
          description:
            "Tips and tricks to make your home more energy-efficient",
          duration: "60 minutes",
          points: 100,
        },
        {
          title: "Eco-Friendly Transportation",
          description: "Explore sustainable transportation options",
          duration: "40 minutes",
          points: 60,
        },
      ]);

      // Personal Carbon Footprint AI Assistant
      setCarbonFootprint({
        transport: 2.5,
        home: 3.2,
        food: 1.8,
        purchases: 1.5,
        aiResponse:
          "Based on your data, I recommend focusing on reducing your home energy consumption. Try setting your thermostat 2°C higher in summer and 2°C lower in winter. This could reduce your carbon footprint by up to 10%.",
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleAcceptChallenge = (challenge) => {
    console.log(`Accepted challenge: ${challenge.title}`);
    // TODO: Implement challenge acceptance logic
  };

  const handleCompleteModule = (module) => {
    console.log(`Completed module: ${module.title}`);
    // TODO: Implement module completion logic
  };

  const handleAskQuestion = (question) => {
    console.log(`Asked question: ${question}`);
    // TODO: Implement AI response logic
    setCarbonFootprint((prevState) => ({
      ...prevState,
      aiResponse: `Based on your question "${question}", I recommend...`, // Placeholder response
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-green-50 to-blue-50">
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        EcoSync: Real-Time Sustainability Hub
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LiveEcoPulseVisualizer data={ecoPulseData} />
        <AISustainabilityChallenges
          challenges={challenges}
          onAcceptChallenge={handleAcceptChallenge}
        />
        <CommunityImpactLeaderboard leaderboard={leaderboard} />
        <PredictiveResourceOptimization predictions={predictions} />
        <InteractiveEcoEducationHub
          modules={ecoModules}
          onCompleteModule={handleCompleteModule}
        />
        <PersonalCarbonFootprintAssistant
          footprint={carbonFootprint}
          onAskQuestion={handleAskQuestion}
        />
      </div>
    </div>
  );
};

export default EcoSyncDashboard;
