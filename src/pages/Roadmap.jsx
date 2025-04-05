import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

const RoadmapGenerator = () => {
  const [type, setType] = useState('household');
  const [formData, setFormData] = useState({});
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genAI = new GoogleGenerativeAI('AIzaSyD9KbgvwDkOZDi-X3yXSPZ2_vmLaP0Htq8');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setNodes([]);
    setEdges([]);

    let characteristics = '';
    if (type === 'household') {
      characteristics = `
        - Size: ${formData.size || 'Not specified'}
        - Major appliances: ${formData.appliances || 'Not specified'}
        - Reduction goal: ${formData.reductionGoal || 'Not specified'}%
      `;
    } else if (type === 'business') {
      characteristics = `
        - Type: ${formData.businessType || 'Not specified'}
        - Major equipment: ${formData.equipment || 'Not specified'}
        - Reduction goal: ${formData.reductionGoal || 'Not specified'}%
      `;
    }

    const prompt = `Create a concise and factual roadmap with 5-7 key steps and the amount of power reduction after using them to reduce electricity usage by ${formData.reductionGoal || 'a specified'}% in a ${type} with these details:${characteristics}
    Also add more details to the steps and details about the product to use. Provide the steps as a list without asterisks or numbers.`;

    try {
      const result = await model.generateContent(prompt);
      const roadmapText = result.response.text();
      const steps = roadmapText
        .split('\n')
        .filter((step) => step.trim() !== '')
        .map((step) => step.replace(/^\*\s*/, '').trim());

      const newNodes = steps.map((step, index) => ({
        id: `${index}`,
        data: { label: step },
        position: { x: index * 300, y: 100 },
        style: { width: 200, padding: 10, borderRadius: 5, background: '#f0fdf4', border: '1px solid #15803d' },
      }));

      const newEdges = steps.slice(0, -1).map((_, index) => ({
        id: `e${index}-${index + 1}`,
        source: `${index}`,
        target: `${index + 1}`,
        type: 'smoothstep',
        animated: true,
      }));

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col justify-center'>
    <div className="max-w-4xl mx-4 my-20 p-6 border-2 border-[--lvl4] rounded-lg">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-green-800">
        ⚡  Energy Reduction Roadmap
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <div>
          <label className="block font-medium text-gray-700">Select Type:</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="household">Household</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* Household Inputs */}
        {type === 'household' && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Size of the house:</label>
              <select
                name="size"
                value={formData.size || ''}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select size</option>
                <option value="small">Small (1-2 rooms)</option>
                <option value="medium">Medium (3-4 rooms)</option>
                <option value="large">Large (5+ rooms)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Major appliances:</label>
              <textarea
                name="appliances"
                value={formData.appliances || ''}
                onChange={handleInputChange}
                placeholder="e.g., refrigerator, air conditioner"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        )}

        {/* Business Inputs */}
        {type === 'business' && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Type of business:</label>
              <select
                name="businessType"
                value={formData.businessType || ''}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select type</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Major equipment:</label>
              <textarea
                name="equipment"
                value={formData.equipment || ''}
                onChange={handleInputChange}
                placeholder="e.g., computers, lighting"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        )}

        {/* Reduction Goal */}
        <div>
          <label className="block font-medium text-gray-700">Reduction goal (%):</label>
          <input
            type="number"
            name="reductionGoal"
            value={formData.reductionGoal || ''}
            onChange={handleInputChange}
            min="1"
            max="100"
            placeholder="e.g., 20"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 text-white font-bold rounded-md shadow-md ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Roadmap Visualization */}
    </div>
    {nodes.length > 0 && (
        <div className="mt-8 p-8">
          <h2 className="text-2xl font-bold mb-4 text-[--lvl4]">Your Roadmap</h2>
          <div className="h-[700px] bg-white rounded-lg border-2 border-[--lvl4] overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              className="bg-gray-50"
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapGenerator;