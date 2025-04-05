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

const RealTimeEmissions = () => {
  const [data, setData] = useState({
    labels: ["Energy", "Transport", "Industry", "Agriculture", "Buildings"],
    datasets: [
      {
        label: "CO2 Emissions (tons)",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: prevData.labels.map(() => Math.floor(Math.random() * 100)),
          },
        ],
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">Real-Time CO2 Emissions</h2>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
};

const EmissionPredictions = () => {
  const [data, setData] = useState({
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: "Predicted CO2 Emissions (tons)",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const baseValue = Math.random() * 1000;
    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: Array.from({ length: 12 }, () =>
            Math.floor(baseValue + Math.random() * 200 - 100)
          ),
        },
      ],
    }));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">Emission Predictions</h2>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

const AlternativeSolutions = () => {
  const solutions = [
    {
      title: "Switch to Renewable Energy",
      description: "Transition to solar, wind, or hydroelectric power sources.",
    },
    {
      title: "Improve Energy Efficiency",
      description: "Upgrade to energy-efficient appliances and lighting.",
    },
    {
      title: "Reduce Waste",
      description: "Implement recycling and composting programs.",
    },
    {
      title: "Sustainable Transportation",
      description: "Encourage use of electric vehicles or public transport.",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">Alternative Solutions</h2>
      <ul className="space-y-2">
        {solutions.map((solution, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-md">
            <h3 className="font-semibold text-green-700">{solution.title}</h3>
            <p className="text-sm text-gray-600">{solution.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ImpactTracker = () => {
  const [reductionPercentage, setReductionPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReductionPercentage(Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">Impact Tracker</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">CO2 Reduction</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${reductionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {reductionPercentage}% reduction achieved
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Trees Planted</h3>
          <p className="text-3xl font-bold text-green-600">
            {Math.floor(reductionPercentage * 10)}
          </p>
        </div>
      </div>
    </div>
  );
};

const GlobalComparison = () => {
  const [data, setData] = useState([]);
  const countries = ["USA", "China", "India", "Russia", "Japan"];

  useEffect(() => {
    const generateData = () => {
      return countries.map((country) => ({
        country,
        emissions: Math.floor(Math.random() * 1000),
        reduction: Math.floor(Math.random() * 100),
      }));
    };

    setData(generateData());
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">Global Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2 text-left">Country</th>
              <th className="p-2 text-left">Emissions (Mt CO2)</th>
              <th className="p-2 text-left">Reduction (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
              >
                <td className="p-2">{item.country}</td>
                <td className="p-2">{item.emissions}</td>
                <td className="p-2">{item.reduction}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PersonalizedRecommendations = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your sustainable living assistant. How can I help you reduce your carbon footprint today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setLoading(true);

    try {
      const prompt = input;

      const chatCompletion = await client.chatCompletion({
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
      });

      const generatedText = chatCompletion.choices[0].message.content;
      const points = generatedText
        .split("\n")
        .filter((point) => point.trim() !== "");

      const boldedPoints = points.map((point) =>
        point.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      );

      setMessages((prev) => [
        ...prev,
        {
          text: boldedPoints.join("\n"),
          isBot: true,
        },
      ]);
    } catch (error) {
      console.error("Error generating text:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Error generating text. Please try again.",
          isBot: true,
        },
      ]);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div className="bg-white p-4 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
      <div className="h-64 overflow-y-auto mb-4 p-2 border rounded">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.isBot ? "text-left" : "text-right"}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.isBot ? "bg-green-100" : "bg-blue-100"
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for sustainability tips..."
          className="flex-grow p-2 border rounded-l"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-r"
          disabled={loading}
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </form>
    </div>
  );
};

const CarbonReduction = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        Carbon Reduction Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RealTimeEmissions />
        <EmissionPredictions />
        <AlternativeSolutions />
        <ImpactTracker />
        <GlobalComparison />
        <PersonalizedRecommendations />
      </div>
    </div>
  );
};

export default CarbonReduction;
