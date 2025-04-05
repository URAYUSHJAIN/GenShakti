import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-700 mb-6 animate-fade-in-up">
            <span className="underline">About Us</span> <br /> <br />
            The GenShakti Team 🍃
          </h1>

          <p className="text-lg font-medium text-gray-700 leading-relaxed mb-6 animate-fade-in-up">
            We are <span className="italic">Team GenShakti</span>, a passionate
            group working to transform lives and protect nature by promoting
            sustainable energy solutions. Our mission is to align technology
            with purpose, making{" "}
            <strong>Sustainable Development Goal 7 (SDG 7)</strong> a reality:
            ensuring clean, affordable, and modern energy for everyone.
          </p>
          <p
            className="text-lg font-medium text-gray-700 leading-relaxed mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Our platform bridges human and environmental needs, helping
            communities transition smoothly to renewable energy. By leveraging{" "}
            <strong>open-source tools</strong> and advanced tech like Google
            Earth Engine and Gemini, we predict the best locations for renewable
            installations and model sustainable energy strategies.
          </p>
          <p
            className="text-lg font-medium text-gray-700 leading-relaxed mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            We envision a future where humans thrive in harmony with nature.
            Let’s build it together! 🌍
          </p>
          <div className="mt-8 animate-bounce">
            <a
              href="Home.jsx"
              className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-green-500 transition-transform transform hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
