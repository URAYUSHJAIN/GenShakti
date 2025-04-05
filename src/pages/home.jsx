import { Link } from "react-router-dom";
import Carousel from "./ClickableSlider";
import heroImage from "/src/assets/img/hero.webp";
import solarplant from "../assets/img/solar plant.jpg";
import windturbines from "../assets/img/wind turbine.jpg";
import OptimalSiteIdentification from "../assets/img/Optimal Site Identification.webp";
import RealTimeDataIntegration from "../assets/img/real-time data integration.webp";
import CarbonModeling from "../assets/img/CarbonModeling.webp";

function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Email submitted successfully!");
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-8">
      <div className="container mx-auto px-4 -mt-14">
        {/* Renewable Energy Section */}
        <section className="relative h-[100vh] flex flex-col mt-[73px]">
          <div>
            <div className="relative h-[100vh] flex flex-col items-center justify-center">
              {/* Text Content */}
              <div className="h-[100vh] bg-[#91ACA5] absolute w-full z-[-1] rounded-[10px] overflow-hidden">
                <img
                  className="h-full w-full lg:scale-100 -mt-20 scale-75 object-cover"
                  src={heroImage}
                  alt="Renewable Energy Illustration"
                />
              </div>
              <div className="h-[100vh] w-full flex items-end justify-start p-4 sm:p-6 md:p-10">
                <div className="text-center flex flex-col items-start justify-end lg:text-left">
                  <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-7xl tracking-[5px] font-bold text-[--lvl0]">
                    A Future Built on <b className="text-[--lvl1] px-10 py-2 rounded-full bg-[--lvl3]">Renewable</b> <b className="text-[--lvl4]">Energy</b>
                  </h1>
                  <p className="mt-6 text-base px-4 sm:text-lg md:text-xl font-medium text-gray-700">
                    Harness the power of AI for sustainable energy planning
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-center lg:justify-start">
                    <Link
                      to="/site"
                      className="inline-flex px-6 py-3 text-white bg-[--lvl4] rounded-[100px] focus:outline-none focus:bg-[--lvl3] hover:bg-[--lvl3] hover:text-black"
                      aria-label="Navigate to Smart Site Selection"
                    >
                      Smart Site Selection
                    </Link>
                    <Link
                      to="/roadmap"
                      className="inline-flex px-6 py-3 text-white bg-[--lvl4] rounded-[100px] focus:outline-none focus:bg-[--lvl3] hover:bg-[--lvl3] hover:text-black"
                      aria-label="Navigate to Carbon Modeling"
                    >
                      Road Map
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="relative p-4 sm:p-8 md:p-12 lg:p-20 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Transforming Energy Planning with AI
            </h2>
            <p className="text-gray-600 mb-4">
              GENSHAKTI combines cutting-edge artificial intelligence with
              renewable energy expertise to revolutionize how we plan and
              implement sustainable energy solutions.
            </p>
            <p className="text-gray-600 mb-6">
              By leveraging advanced algorithms and real-time data analysis, we
              help governments, businesses, and communities transition to
              renewable energy efficiently and effectively.
            </p>
            <Link
              to="/about us"
              className="text-green-600 font-bold hover:underline"
            >
              Learn More About Us
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <img
              src={solarplant}
              alt="Solar panels installation"
              className="rounded-lg border-2 border-[--lvl4]"
            />
            <img
              src={windturbines}
              alt="Wind turbines"
              className="rounded-lg border-2 border-[--lvl4]"
            />
          </div>
        </div>
      </section>
      <section className="mb-16 px-4 sm:px-8 md:px-12 lg:px-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border-2 border-[--lvl4]">
            <Link to="/site">
              <h3 className="text-xl font-semibold mb-4">
                Smart Site Selection
              </h3>
              <img
                src={OptimalSiteIdentification}
                alt="OptimalSiteIdentification"
                className="w-full h-auto rounded-lg mb-4"
              />
              <p>
                Identify optimal locations for renewable energy projects using
                AI-driven analysis.
              </p>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[--lvl4]">
            <Link to="/carbon modeling">
              <h3 className="text-xl font-semibold mb-4">Carbon Modeling</h3>
              <img
                src={CarbonModeling}
                alt="Carbon Modeling"
                className="w-full h-auto rounded-lg mb-4"
              />
              <p>
                Simulate and reduce carbon emissions with advanced predictive
                modeling.
              </p>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[--lvl4]">
            <Link to="/real time data integration">
              <h3 className="text-xl font-semibold mb-4">
                Real Time Data Integration
              </h3>
              <img
                src={RealTimeDataIntegration}
                alt="Real-Time Data Integration"
                className="w-full h-auto rounded-lg mb-4"
              />
              <p>
                Monitor and analyze live data for better energy planning and
                management.
              </p>
            </Link>
          </div>
        </div>
      </section>
      <section className="relative w-full h-[60vh] px-4 overflow-hidden">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Roadmap by GENSHAKTI
        </h2>
        <Carousel />
      </section>
    </div>
  );
}

export default Home;