import axios from "axios";

const API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407";
const API_KEY = "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";

export const generateRoadmap = async (consumption, targetReduction) => {
  const prompt = `Generate a step-by-step roadmap maximum of 10 steps and the steps should be short and crisp to reduce household energy consumption from ${consumption} KWh by ${targetReduction}%. Each step should be practical and actionable, provide a practical roadmap with a minimum of 7 steps and a maximum of 10 steps to achieve this reduction. The roadmap should include specific actions, estimated savings, and any necessary investments or changes.Each step should be crisp and short (not more than 30 words) practical and actionable also the currency should be indian. Display only the steps and strictly do not display the replica of the prompt. Format the response as a numbered list.`;
  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data[0].generated_text
      .split("\n")
      .filter((step) => step.trim())
      .map((step) => step.replace(/^\d+\.\s*/, "").trim());
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error("Failed to generate roadmap");
  }
};
