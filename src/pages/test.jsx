// src/AiGenerator.js
import React, { useState } from "react";
import { generateAIResponse } from "../utils/aiProvider";

const AiGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await generateAIResponse(prompt);
      setOutput(result);
    } catch (error) {
      console.error("Error generating text:", error);
      setOutput("Error generating text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Text Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {output && (
        <div>
          <h2>Generated Output:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default AiGenerator;
