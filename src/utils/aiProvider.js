const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
const MODEL = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai";

// In dev, requests go through the Vite proxy to avoid CORS.
// In production, requests go directly to the HF API.
const BASE_URL = import.meta.env.DEV
  ? "/hf-api"
  : "https://router.huggingface.co";

/**
 * Sends a prompt to the Zephyr-7B model via Hugging Face Inference API
 * and returns the generated text.
 * @param {string} prompt - The user prompt to send.
 * @returns {Promise<string>} The generated text response.
 */
export const generateAIResponse = async (prompt) => {
  if (!HF_API_KEY) {
    throw new Error("HuggingFace API key is not set. Please add VITE_HF_API_KEY to your .env file.");
  }

  const response = await fetch(
    `${BASE_URL}/v1/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HF API Error:", response.status, errorText);
    throw new Error(`AI request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
