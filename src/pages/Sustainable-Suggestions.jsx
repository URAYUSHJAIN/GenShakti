// src/AiGenerator.js
import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";

const SustainableSuggestions = () => {
  const [transport, setTransport] = useState("");
  const [energy, setEnergy] = useState("");
  const [waste, setWaste] = useState("");
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const client = new HfInference("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");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Suggest 5 short and crisp points for sustainable development to reduce carbon emission based on the following parameters:\nTransport preference: ${transport}\nEnergy consumption: ${energy}\nWaste generation: ${waste}. make sure to display only main key points and the points should be practically more possible in India. `;

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

      setOutput(boldedPoints);
    } catch (error) {
      console.error("Error generating text:", error);
      setOutput(["Error generating text. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-[650px] overflow-auto">
      <h1 className="text-2xl font-semibold text-green-700 mb-4">
        Sustainable Development Suggestions
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Transport Preference:
          <select
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select</option>
            <option value="car">Car</option>
            <option value="public transport">Public Transport</option>
            <option value="bicycle">Bicycle</option>
          </select>
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Energy Consumption:
          <select
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Waste Generation:
          <select
            value={waste}
            onChange={(e) => setWaste(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-green-700 rounded-lg"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {output.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Personalized Suggestions:
          </h2>
          <ul>
            {output.map((point, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SustainableSuggestions;
