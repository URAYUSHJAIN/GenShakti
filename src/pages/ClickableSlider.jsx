import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: "Step 1 - Find the Best Location",
    description: [
      "Use mapping tools to find ideal sites for renewable energy.",
      "Consider sunlight or wind availability to optimize energy.",
      "Minimize environmental impact while selecting locations.",
    ],
  },
  {
    title: "Step 2 - Recommend the Spot",
    description: [
      "Show the best locations with clear benefits for energy savings.",
      "Explain why it’s eco-friendly and efficient.",
      "Focus on reducing carbon footprint.",
    ],
  },
  {
    title: "Step 3 - Install the System",
    description: [
      "Set up solar panels or turbines in eco-friendly ways.",
      "Ensure maximum energy generation with minimal disruption.",
      "Follow safety and sustainability regulations.",
    ],
  },
  {
    title: "Step 4 - Monitor & Train",
    description: [
      "Give users real-time monitoring tools.",
      "Offer easy-to-follow training on system use.",
      "Promote energy savings and sustainability.",
    ],
  },
  {
    title: "Step 5 - Collect Feedback",
    description: [
      "Ask users for feedback on system performance.",
      "Improve future installations based on their input.",
      "Show the long-term impact on savings and the planet.",
    ],
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automate slide transition every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    <div
      className="relative w-full max-w-[800px] mx-auto overflow-visible"
      style={{ perspective: '1000px' }}
    >
      {slides.map((slide, index) => {
        // Calculate offset from current slide, handling wrapping
        let offset = index - currentIndex;
        if (offset < -1) offset += slides.length;
        if (offset > 1) offset -= slides.length;

        // Define styles based on offset for 3D effect
        let style = {};
        if (offset === 0) {
          style = {
            transform: 'translateX(-50%) scale(1) rotateY(0deg)',
            zIndex: 2,
            opacity: 1,
          };
        } else if (offset === -1) {
          style = {
            transform: 'translateX(-150%) scale(0.8) rotateY(-30deg)',
            zIndex: 1,
            opacity: 0.7,
          };
        } else if (offset === 1) {
          style = {
            transform: 'translateX(50%) scale(0.8) rotateY(30deg)',
            zIndex: 1,
            opacity: 0.7,
          };
        } else {
          style = { opacity: 0 }; // Hide non-adjacent slides
        }

        return (
          <div
            key={index}
            className="absolute w-full left-1/2 h-[40vh] p-6 border-2 border-[--lvl4] rounded-lg bg-white transition duration-500 ease-in-out md:w-1/2"
            style={style}
          >
            <h2 className="text-xl font-semibold text-[--lvl4] mb-4">
              {slide.title}
            </h2>
            <ul className="list-disc ml-5 text-gray-600">
              {slide.description.map((desc, descIndex) => (
                <li key={descIndex} className="mb-2">{desc}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
