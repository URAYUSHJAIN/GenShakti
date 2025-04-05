import { Link } from "react-router-dom";
import CarbonReduction from "../assets/img/carbon reduction.jpg";
import CostSaving from "../assets/img/cost savings.jpg";
import RenewableCapacity from "../assets/img/Renewable Capacity.jpg";

function Impact() {
  return (
    <div className="container mx-auto px-12 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Impact</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Contributing to SDG 7: Affordable and Clean Energy
        </h2>
        <p className="mb-4">
          GENSHAKTI is committed to advancing Sustainable Development Goal 7,
          which aims to ensure access to affordable, reliable, sustainable, and
          modern energy for all.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carbon Reduction Card */}
          <Link
            to="/Carbon Reduction"
            className="block bg-white p-6 rounded-lg border-2 border-[--lvl4] transition-shadow"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">Carbon Reduction</h3>
              <img
                src={CarbonReduction}
                alt="Carbon Reduction"
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-4xl font-bold text-green-600">500K</p>
              <p>Tons of CO2 emissions avoided</p>
            </div>
          </Link>

          {/* Cost Savings Card */}
          <Link
            to="/Cost Saving"
            className="block bg-white p-6 rounded-lg border-2 border-[--lvl4] transition-shadow"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">Cost Savings</h3>
              <img
                src={CostSaving}
                alt="Cost Savings"
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-4xl font-bold text-green-600">$100M</p>
              <p>Total cost savings for users</p>
            </div>
          </Link>

          {/* Renewable Capacity Card */}
          <Link
            to="/Renewable Capacity"
            className="block bg-white p-6 rounded-lg border-2 border-[--lvl4] transition-shadow"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">Renewable Capacity</h3>
              <img
                src={RenewableCapacity}
                alt="Renewable Capacity"
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-4xl font-bold text-green-600">2 GW</p>
              <p>New renewable energy capacity planned</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Impact;
