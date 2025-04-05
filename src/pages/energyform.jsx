import { useState } from "react";
import { Zap } from "lucide-react";
import { validateInput } from "./flowvalidation";

export const EnergyForm = ({ onSubmit, isLoading }) => {
  const [consumption, setConsumption] = useState("");
  const [reduction, setReduction] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(consumption) && validateInput(reduction, 0, 100)) {
      onSubmit(Number(consumption), Number(reduction));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <div className="flex items-center justify-center mb-6">
        <Zap className="w-8 h-8 text-green-800 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          Energy Reduction Planner
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="consumption"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Monthly Energy Consumption (KWh)
          </label>
          <input
            id="consumption"
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
            min="0"
          />
        </div>

        <div>
          <label
            htmlFor="reduction"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Reduction (%)
          </label>
          <input
            id="reduction"
            type="number"
            value={reduction}
            onChange={(e) => setReduction(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
            min="0"
            max="100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300"
        >
          {isLoading ? "Generating Roadmap..." : "Generate Roadmap"}
        </button>
      </div>
    </form>
  );
};
