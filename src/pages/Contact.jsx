import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    feedbackType: "", // For feedback section
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("contact"); // Toggle between 'contact' and 'feedback'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      section: activeTab === "contact" ? "Contact Us" : "Feedback",
    });
    setFormData({
      name: "",
      email: "",
      organization: "",
      message: "",
      feedbackType: "",
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // Generate 35 particles (5x7 grid for roughly equal spacing) with leaf and clover emojis
  const particleCount = 35;
  const particles = Array.from({ length: particleCount }, (_, index) => {
    const row = Math.floor(index / 7); // 7 columns
    const col = index % 7;
    const top = `${(row + 1) * 14}%`; // Vertical spacing (100% / 7 rows ≈ 14%)
    const left = `${col * 14}%`; // Horizontal spacing (100% / 7 cols ≈ 14%)
    const animDelay = Math.random() * 2; // Random delay up to 2s
    const animDuration = `${2 + Math.random() * 2}s`; // 2-4s duration
    const emoji = index % 2 === 0 ? "🍃" : "🍀"; // Alternate between leaf and clover

    return (
      <span
        key={index}
        className="absolute text-2xl opacity-40 animate-bounce-emoji"
        style={{
          top,
          left,
          animationDelay: `${animDelay}s`,
          animationDuration: animDuration,
        }}
      >
        {emoji}
      </span>
    );
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Bouncing Leaf and Clover Particles */}
      <div className="absolute inset-0 pointer-events-none">{particles}</div>

      <div className="max-w-lg mx-auto relative z-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 animate-pulse">
          Contact
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-4 py-2 font-semibold rounded-lg ${
              activeTab === "contact"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Us
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-lg ${
              activeTab === "feedback"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </div>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-r-lg animate-bounce-in">
            <p className="font-medium">Thank you!</p>
            <p>We will get back to you soon.</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[--lvl4] rounded-xl p-8 space-y-6 animate-float relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-50 pointer-events-none"></div>

          {activeTab === "contact" ? (
            <>
              <div className="relative z-10">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:scale-105 transform"
                  placeholder="Enter your name"
                />
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:scale-105 transform"
                  placeholder="your@email.com"
                />
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:scale-105 transform"
                  placeholder="Your organization (optional)"
                />
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 resize-none transition-all duration-200 hover:scale-105 transform"
                  placeholder="How can we assist you?"
                ></textarea>
              </div>
            </>
          ) : (
            <>
              <div className="relative z-10">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:scale-105 transform"
                  placeholder="Enter your name"
                />
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:scale-105 transform"
                  placeholder="your@email.com"
                />
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="feedbackType"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Feedback Type
                </label>
                <select
                  id="feedbackType"
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:scale-105 transform"
                >
                  <option value="">Select feedback type</option>
                  <option value="positive">Positive Feedback</option>
                  <option value="negative">Negative Feedback</option>
                  <option value="suggestion">Suggestion</option>
                </select>
              </div>

              <div className="relative z-10">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors hover:text-green-600"
                >
                  Feedback
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 resize-none transition-all duration-200 hover:scale-105 transform"
                  placeholder="Share your feedback here..."
                ></textarea>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden"
          >
            <span className="relative z-10">
              Send {activeTab === "contact" ? "Message" : "Feedback"}
            </span>
            <div className="absolute inset-0 bg-green-500 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm animate-fade-in">
          <p>We typically respond within 24-48 hours</p>
        </div>
      </div>

      {/* Custom TailwindCSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes bounceEmoji {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(
              ${Math.random() * 20 - 10}px,
              ${Math.random() * 20 - 10}px
            );
          }
          50% {
            transform: translate(
              ${Math.random() * 20 - 10}px,
              ${Math.random() * 20 - 10}px
            );
          }
          75% {
            transform: translate(
              ${Math.random() * 20 - 10}px,
              ${Math.random() * 20 - 10}px
            );
          }
        }
        .animate-bounce-emoji {
          animation: bounceEmoji 3s ease-in-out infinite;
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Contact;
