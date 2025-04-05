import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const apiKey = "AIzaSyBSXHhf3NbiahDw3VT5jzTdMgv9I-1Ctds";

const fetchAIRecommendation = async (prompt) => {
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

const PersonalizedEnergyReport = ({
  userInput,
  report,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Your Personalized Energy Report
      </h2>
      {!report ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="monthlyBill"
              className="block text-sm font-medium text-gray-700"
            >
              Average Monthly Electricity Bill (₹)
            </label>
            <input
              type="number"
              id="monthlyBill"
              name="monthlyBill"
              value={userInput.monthlyBill}
              onChange={onInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="homeSize"
              className="block text-sm font-medium text-gray-700"
            >
              Home Size (sq ft)
            </label>
            <input
              type="number"
              id="homeSize"
              name="homeSize"
              value={userInput.homeSize}
              onChange={onInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location (City, State)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={userInput.location}
              onChange={onInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Generate Report
          </button>
        </form>
      ) : (
        <>
          <p className="mb-2">
            <strong>Potential Cost Savings:</strong> $
            {report.costSavings.toFixed(2)} per year
          </p>
          <p className="mb-2">
            <strong>CO2 Reduction:</strong> {report.co2Reduction.toFixed(2)}{" "}
            tons per year
          </p>
          <p className="mb-4">
            <strong>Recommendation:</strong> {report.recommendation}
          </p>
          <div className="bg-green-100 p-4 rounded">
            <h3 className="font-bold mb-2">Next Steps:</h3>
            <ul className="list-disc pl-5">
              {report.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const AIInvestmentPlanning = ({ plan }) => {
  const chartData = {
    labels: plan.years,
    datasets: [
      {
        label: "Cumulative Savings",
        data: plan.cumulativeSavings,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Investment Cost",
        data: plan.investmentCost,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        AI Investment Planning
      </h2>
      <div className="mb-4">
        <h3 className="font-bold text-lg">Recommended Plan: {plan.name}</h3>
        <p>{plan.description}</p>
      </div>
      <div className="h-64 mb-4">
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p>
            <strong>Initial Investment:</strong>₹
            {plan.initialInvestment.toFixed(2)}
          </p>
          <p>
            <strong>Payback Period:</strong> {plan.paybackPeriod} years
          </p>
        </div>
        <div>
          <p>
            <strong>ROI (10 years):</strong> {plan.roi}%
          </p>
          <p>
            <strong>Total Savings (10 years):</strong> $
            {plan.totalSavings.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const EducationalContent = ({ content }) => {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[--lvl4]">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Learn About Renewable Energy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.map((item, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="mb-2">{item.description}</p>
            <a href={item.link} className="text-blue-500 hover:underline">
              Learn more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const IncentiveRecommendations = ({ incentives }) => {
  const boldedPoints = incentives.map((incentive) =>
    incentive.description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  );

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[--lvl4] h-[650px] overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Available Incentives and Subsidies
      </h2>
      <div className="space-y-4">
        {incentives.map((incentive, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="font-bold">{incentive.name}</h3>
            <p
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: boldedPoints[index] }}
            ></p>
            <p>
              <strong>Potential Savings:</strong> $
              {incentive.potentialSavings.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenewableEnergyCostDashboard = () => {
  const [userInput, setUserInput] = useState({
    monthlyBill: "",
    homeSize: "",
    location: "",
  });
  const [personalizedReport, setPersonalizedReport] = useState(null);
  const [investmentPlan, setInvestmentPlan] = useState(null);
  const [educationalContent, setEducationalContent] = useState([]);
  const [incentives, setIncentives] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generatePersonalizedReport(userInput);
  };

  const generatePersonalizedReport = async (input) => {
    const prompt = `Generate a personalized energy report for a home with a monthly electricity bill of
₹ ${input.monthlyBill}, a size of ${input.homeSize} sq ft, located in ${input.location}. in short in 56 words`;

    const recommendation = await fetchAIRecommendation(prompt);

    setPersonalizedReport({
      costSavings: input.monthlyBill * 12 * 0.3, // Assume 30% savings
      co2Reduction: input.homeSize * 0.01, // Simplified calculation
      recommendation: recommendation,
      nextSteps: [
        "Get a professional solar assessment",
        "Compare quotes from certified installers",
        "Check local regulations and permits",
      ],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const years = Array.from({ length: 10 }, (_, i) => 2024 + i);

        const investmentPrompt =
          "Generate a phased solar installation plan optimized for energy needs and budget in points can keep it short and remove *.";
        const investmentRecommendation = await fetchAIRecommendation(
          investmentPrompt
        );

        setInvestmentPlan({
          name: "Phased Solar Installation",
          description: investmentRecommendation,
          years: years,
          cumulativeSavings: years.map((_, i) =>
            Math.floor(Math.random() * 5000 * (i + 1))
          ),
          investmentCost: years.map((_, i) =>
            i < 3 ? Math.floor(Math.random() * 10000) : 0
          ),
          initialInvestment: Math.random() * 15000 + 10000,
          paybackPeriod: Math.floor(Math.random() * 3) + 5,
          roi: Math.floor(Math.random() * 50) + 100,
          totalSavings: Math.random() * 50000 + 25000,
        });

        setEducationalContent([
          {
            title: "Solar Energy Basics",
            description:
              "Learn about how solar panels work and their benefits for your home.",
            link: "#",
          },
          {
            title: "Wind Power Revolution",
            description:
              "Discover the latest advancements in wind turbine technology.",
            link: "#",
          },
          {
            title: "Geothermal Energy Explained",
            description:
              "Understand how geothermal energy can provide sustainable heating and cooling.",
            link: "#",
          },
          {
            title: "The Future of Energy Storage",
            description:
              "Explore cutting-edge battery technologies for renewable energy systems.",
            link: "#",
          },
        ]);

        setIncentives([
          {
            name: "Federal Solar Investment Tax Credit",
            description:
              "Get a 26% tax credit for installing a solar energy system.",
            potentialSavings: Math.random() * 5000 + 2000,
          },
          {
            name: "State Renewable Energy Rebate",
            description:
              "Receive a rebate for installing qualifying renewable energy systems.",
            potentialSavings: Math.random() * 3000 + 1000,
          },
          {
            name: "Energy Efficient Appliance Tax Rebates",
            description:
              "Get rebates for purchasing energy-efficient appliances.",
            potentialSavings: Math.random() * 1000 + 500,
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-green-50 to-blue-50">
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        Renewable Energy Cost Savings Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PersonalizedEnergyReport
          userInput={userInput}
          report={personalizedReport}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        {investmentPlan && <AIInvestmentPlanning plan={investmentPlan} />}
        <EducationalContent content={educationalContent} />
        <IncentiveRecommendations incentives={incentives} />
      </div>
    </div>
  );
};

export default RenewableEnergyCostDashboard;
