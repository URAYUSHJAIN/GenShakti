import React from "react";
import uc1 from "../assets/img/uc1.png";
import uc2 from "../assets/img/uc2.png";
import uc3 from "../assets/img/uc3.png";
import uc4 from "../assets/img/uc4.png";
import uc5 from "../assets/img/uc5.png";
import uc6 from "../assets/img/uc6.png";
import uc7 from "../assets/img/uc7.png";
import uc8 from "../assets/img/uc8.png";

function UseCases() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-[--lvl4] text-center">Use Cases</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">
            Electricity Bill Reduction
          </h2>
          <img
            src={uc1}
            alt="Electricity bill reduction"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Reduce costs by integrating renewable energy sources, making
            electricity more affordable.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">Optimize Location</h2>
          <img
            src={uc2}
            alt="Optimize location"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Identify ideal microgrid sites using geospatial analysis for maximum
            efficiency.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">
            Carbon Footprint Calculator
          </h2>
          <img
            src={uc3}
            alt="Carbon footprint calculator"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Monitor and calculate carbon emissions saved through renewable
            energy use.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">Active Tracker</h2>
          <img
            src={uc4}
            alt="Active tracker"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Real-time monitoring of energy consumption and generation for
            proactive management.
          </p>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">
            EcoSync: Sustainability Hub
          </h2>
          <img
            src={uc5}
            alt="EcoSync sustainability hub"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Centralized platform aggregating sustainability data for
            comprehensive insights.
          </p>
        </div>

        {/* Card 6 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">
            Personalized Energy Report
          </h2>
          <img
            src={uc6}
            alt="Personalized energy report"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Tailored insights into energy usage, highlighting savings and
            efficiency tips.
          </p>
        </div>

        {/* Card 7 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">
            Carbon Reduction and Alternatives
          </h2>
          <img
            src={uc7}
            alt="Carbon reduction"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Explore methods like reforestation and carbon capture to diversify
            reduction strategies.
          </p>
        </div>

        {/* Card 8 */}
        <div className="bg-white p-4 border-2 border-[--lvl4] rounded-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-xl font-semibold mb-2">
            Renewable Energy Capacity Dashboard
          </h2>
          <img
            src={uc8}
            alt="Renewable energy dashboard"
            className="w-full h-[300px] bg-[--lvl4] object-cover rounded-md mb-2"
          />
          <p className="text-sm">
            Visual dashboard displaying renewable energy capacity and
            performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UseCases;
