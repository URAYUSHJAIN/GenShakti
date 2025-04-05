import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

import SustainableSuggestions from "./Sustainable-Suggestions";

const SustainableDashboard = () => {
  // Carbon Footprint Calculator State
  const [activities, setActivities] = useState({
    transportation: 0,
    energy: 0,
    waste: 0,
  });

  // Sustainable Suggestions State
  const [userPreferences, setUserPreferences] = useState({
    transportation: "",
    energy: "",
    waste: "",
  });

  // Impact Forecasting State
  const [selectedPractices, setSelectedPractices] = useState([]);

  // Recycling Recommendations State
  const [wasteTypes, setWasteTypes] = useState({
    plastic: false,
    paper: false,
    glass: false,
    organic: false,
  });

  // Sustainable Farming State
  const [farmingPractices, setFarmingPractices] = useState({
    cropRotation: false,
    agroforestry: false,
    organicFarming: false,
    precisionAgriculture: false,
  });

  // Energy Efficiency State
  const [energyImprovements, setEnergyImprovements] = useState({
    insulation: false,
    smartThermostats: false,
    ledLighting: false,
    energyEfficientAppliances: false,
  });

  // Transportation Alternatives State
  const [transportationMix, setTransportationMix] = useState({
    car: 60,
    publicTransport: 20,
    bicycle: 10,
    walking: 10,
  });

  // Water Conservation State
  const [waterUsage, setWaterUsage] = useState({
    shower: 50,
    laundry: 20,
    dishes: 15,
    lawn: 30,
    other: 10,
  });

  const [conservationMethods, setConservationMethods] = useState({
    lowFlowFixtures: false,
    rainwaterHarvesting: false,
    xeriscaping: false,
    grayWaterSystem: false,
  });

  // Avatar State
  const [avatarData, setAvatarData] = useState({
    footprint: 100,
    level: 1,
    appearance: "neutral",
    userInput: "",
  });

  // Carbon Footprint Calculator Functions
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setActivities((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const calculateFootprint = () => {
    return Object.values(activities).reduce((sum, value) => sum + value, 0);
  };

  // Sustainable Suggestions Functions
  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setUserPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const generateSuggestions = () => {
    const suggestions = {
      transportation:
        userPreferences.transportation === "car"
          ? "Consider carpooling or using public transport to reduce emissions."
          : "Great choice! Keep using sustainable transportation methods.",
      energy:
        userPreferences.energy === "high"
          ? "Try using energy-efficient appliances and turning off lights when not in use."
          : "You're doing well! Consider adding solar panels for even more sustainability.",
      waste:
        userPreferences.waste === "high"
          ? "Start composting organic waste and recycling more to reduce landfill waste."
          : "Excellent! Keep up your waste reduction efforts.",
    };
    return suggestions;
  };

  // Impact Forecasting Functions
  const practices = [
    { name: "Solar Panels", impact: 2000 },
    { name: "Electric Vehicle", impact: 1500 },
    { name: "Composting", impact: 500 },
    { name: "Rainwater Harvesting", impact: 800 },
  ];

  const handlePracticeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPractices((prev) => [...prev, value]);
    } else {
      setSelectedPractices((prev) =>
        prev.filter((practice) => practice !== value)
      );
    }
  };

  const calculateImpact = () => {
    return practices
      .filter((practice) => selectedPractices.includes(practice.name))
      .reduce((total, practice) => total + practice.impact, 0);
  };

  // Recycling Recommendations Functions
  const handleWasteTypeChange = (e) => {
    const { name, checked } = e.target;
    setWasteTypes((prev) => ({ ...prev, [name]: checked }));
  };

  const generateRecyclingRecommendations = () => {
    const recommendations = [];
    if (wasteTypes.plastic) {
      recommendations.push(
        "Set up separate bins for different types of plastics (PET, HDPE, etc.)"
      );
    }
    if (wasteTypes.paper) {
      recommendations.push(
        "Create a paper recycling station and educate on proper paper recycling techniques"
      );
    }
    if (wasteTypes.glass) {
      recommendations.push(
        "Establish a glass recycling program and partner with local recycling facilities"
      );
    }
    if (wasteTypes.organic) {
      recommendations.push(
        "Start a composting program for organic waste to create nutrient-rich soil"
      );
    }
    return recommendations.length > 0
      ? recommendations
      : ["Select waste types to get personalized recommendations"];
  };

  // Sustainable Farming Functions
  const handleFarmingPracticeChange = (e) => {
    const { name, checked } = e.target;
    setFarmingPractices((prev) => ({ ...prev, [name]: checked }));
  };

  const generateFarmingRecommendations = () => {
    const recommendations = [];
    if (farmingPractices.cropRotation) {
      recommendations.push(
        "Implement a diverse crop rotation plan to improve soil health and reduce pest pressure"
      );
    }
    if (farmingPractices.agroforestry) {
      recommendations.push(
        "Integrate trees and shrubs into crop and animal farming systems for improved biodiversity"
      );
    }
    if (farmingPractices.organicFarming) {
      recommendations.push(
        "Transition to organic farming methods, avoiding synthetic pesticides and fertilizers"
      );
    }
    if (farmingPractices.precisionAgriculture) {
      recommendations.push(
        "Adopt precision agriculture technologies to optimize resource use and reduce waste"
      );
    }
    return recommendations.length > 0
      ? recommendations
      : ["Select farming practices to get personalized recommendations"];
  };

  // Energy Efficiency Functions
  const handleEnergyImprovementChange = (e) => {
    const { name, checked } = e.target;
    setEnergyImprovements((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateEnergySavings = () => {
    let savings = 0;
    if (energyImprovements.insulation) savings += 15;
    if (energyImprovements.smartThermostats) savings += 10;
    if (energyImprovements.ledLighting) savings += 5;
    if (energyImprovements.energyEfficientAppliances) savings += 20;
    return savings;
  };

  // Transportation Alternatives Functions
  const handleTransportationMixChange = (e) => {
    const { name, value } = e.target;
    setTransportationMix((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const calculateEmissions = () => {
    const emissions = {
      car: transportationMix.car * 0.2,
      publicTransport: transportationMix.publicTransport * 0.05,
      bicycle: transportationMix.bicycle * 0,
      walking: transportationMix.walking * 0,
    };
    return Object.values(emissions).reduce((sum, value) => sum + value, 0);
  };

  // Water Conservation Functions
  const handleWaterUsageChange = (e) => {
    const { name, value } = e.target;
    setWaterUsage((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleConservationMethodChange = (e) => {
    const { name, checked } = e.target;
    setConservationMethods((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateWaterSavings = () => {
    let savings = 0;
    if (conservationMethods.lowFlowFixtures) savings += 20;
    if (conservationMethods.rainwaterHarvesting) savings += 15;
    if (conservationMethods.xeriscaping) savings += 10;
    if (conservationMethods.grayWaterSystem) savings += 25;
    return savings;
  };

  // Avatar Functions
  const handleAvatarInputChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAvatarData((prev) => ({
      ...prev,
      userInput: e.target.value,
      footprint: value,
      level: value < 50 ? 3 : value < 75 ? 2 : 1,
      appearance: value < 50 ? "green" : value < 75 ? "improving" : "neutral",
    }));
  };

  // Virtual Carbon Footprint Avatar Component
  const VirtualAvatar = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Your Carbon Footprint Avatar
        </h2>
        <div className="flex items-center justify-center mb-4">
          {avatarData.appearance === "green" && (
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl">
              😊
            </div>
          )}
          {avatarData.appearance === "improving" && (
            <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-white text-4xl">
              🙂
            </div>
          )}
          {avatarData.appearance === "neutral" && (
            <div className="w-32 h-32 bg-gray-500 rounded-full flex items-center justify-center text-white text-4xl">
              😐
            </div>
          )}
        </div>
        <p className="text-center text-lg font-semibold mb-2">
          Level: {avatarData.level}
        </p>
        <div className="mb-4">
          <label
            htmlFor="carbonFootprint"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Your Carbon Footprint (kg CO2e/day)
          </label>
          <input
            type="number"
            id="carbonFootprint"
            name="carbonFootprint"
            value={avatarData.userInput}
            onChange={handleAvatarInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-center text-lg mb-4">
          Current Footprint: {avatarData.footprint.toFixed(2)} kg CO2e/day
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Tips to Improve:
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Try using public transportation more often</li>
            <li>
              Reduce energy consumption by using energy-efficient appliances
            </li>
            <li>Increase recycling and composting efforts</li>
          </ul>
        </div>
      </div>
    );
  };

  // Render the dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        Carbon Modeling
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Carbon Footprint Calculator */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Carbon Footprint Calculator
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Transportation (km/day)
            </label>
            <input
              type="number"
              name="transportation"
              value={activities.transportation}
              onChange={handleActivityChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Energy Consumption (kWh/day)
            </label>
            <input
              type="number"
              name="energy"
              value={activities.energy}
              onChange={handleActivityChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Waste Generation (kg/day)
            </label>
            <input
              type="number"
              name="waste"
              value={activities.waste}
              onChange={handleActivityChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <p className="text-lg font-semibold text-green-800 mb-4">
            Total Carbon Footprint: {calculateFootprint().toFixed(2)} kg
            CO2e/day
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={Object.entries(activities).map(([name, value]) => ({
                  name,
                  value,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(activities).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <SustainableSuggestions />

        {/* Impact Forecasting */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Impact Forecasting
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Select Sustainable Practices:
            </h3>
            {practices.map((practice) => (
              <div key={practice.name} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={practice.name}
                  value={practice.name}
                  checked={selectedPractices.includes(practice.name)}
                  onChange={handlePracticeChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={practice.name}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {practice.name}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Projected Impact:
            </h3>
            <p className="text-2xl font-bold text-green-800">
              {calculateImpact()} kg CO2e/year reduction
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Current", emissions: 5000 },
                { name: "Projected", emissions: 5000 - calculateImpact() },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="emissions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recycling Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Recycling Recommendations
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Select Waste Types:
            </h3>
            {Object.entries(wasteTypes).map(([type, checked]) => (
              <div key={type} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={type}
                  name={type}
                  checked={checked}
                  onChange={handleWasteTypeChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={type}
                  className="ml-2 block text-sm text-gray-900 capitalize"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Recommendations:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {generateRecyclingRecommendations().map(
                (recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Sustainable Farming */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Sustainable Farming Practices
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Select Current Practices:
            </h3>
            {Object.entries(farmingPractices).map(([practice, checked]) => (
              <div key={practice} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={practice}
                  name={practice}
                  checked={checked}
                  onChange={handleFarmingPracticeChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={practice}
                  className="ml-2 block text-sm text-gray-900 capitalize"
                >
                  {practice.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Recommendations:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {generateFarmingRecommendations().map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Energy Efficiency */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Energy Efficiency Optimization
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Select Implemented Improvements:
            </h3>
            {Object.entries(energyImprovements).map(
              ([improvement, checked]) => (
                <div key={improvement} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={improvement}
                    name={improvement}
                    checked={checked}
                    onChange={handleEnergyImprovementChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={improvement}
                    className="ml-2 block text-sm text-gray-900 capitalize"
                  >
                    {improvement.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Projected Energy Savings:
            </h3>
            <p className="text-2xl font-bold text-green-800">
              {calculateEnergySavings()}% reduction
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { name: "Current", consumption: 100 },
                {
                  name: "Projected",
                  consumption: 100 - calculateEnergySavings(),
                },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="consumption" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transportation Alternatives */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Transportation Alternatives
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Adjust Your Transportation Mix:
            </h3>
            {Object.entries(transportationMix).map(([mode, percentage]) => (
              <div key={mode} className="mb-2">
                <label
                  htmlFor={mode}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {mode.replace(/([A-Z])/g, " $1").trim()} (%)
                </label>
                <input
                  type="range"
                  id={mode}
                  name={mode}
                  min="0"
                  max="100"
                  value={percentage}
                  onChange={handleTransportationMixChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600">{percentage}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Estimated Emissions:
            </h3>
            <p className="text-2xl font-bold text-green-800">
              {calculateEmissions().toFixed(2)} kg CO2e/day
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(transportationMix).map(
                  ([name, value]) => ({ name, value })
                )}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(transportationMix).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                    }
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Water Conservation */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Water Conservation Strategies
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Current Water Usage:
            </h3>
            {Object.entries(waterUsage).map(([category, amount]) => (
              <div key={category} className="mb-2">
                <label
                  htmlFor={category}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {category.replace(/([A-Z])/g, " $1").trim()} (gallons/day)
                </label>
                <input
                  type="range"
                  id={category}
                  name={category}
                  min="0"
                  max="100"
                  value={amount}
                  onChange={handleWaterUsageChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600">{amount} gallons</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Conservation Methods:
            </h3>
            {Object.entries(conservationMethods).map(
              ([method, implemented]) => (
                <div key={method} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={method}
                    name={method}
                    checked={implemented}
                    onChange={handleConservationMethodChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={method}
                    className="ml-2 block text-sm text-gray-900 capitalize"
                  >
                    {method.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Projected Water Savings:
            </h3>
            <p className="text-2xl font-bold text-green-800">
              {calculateWaterSavings()}% reduction
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={Object.entries(waterUsage).map(([name, value]) => ({
                name,
                value,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Virtual Carbon Footprint Avatar */}
        <VirtualAvatar />
      </div>
    </div>
  );
};

export default SustainableDashboard;
