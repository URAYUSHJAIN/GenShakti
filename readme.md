<p align="center">
  <img src="./src/assets/img/genshakti.png" alt="GenShakti Logo" width="150"/>
</p>

<h1 align="center">GenShakti</h1>
<p align="center">
  <b>AI-Powered Renewable Energy Planning & Optimization Platform</b><br/>
  <i>Empowering Communities with Smart Site Selection, Carbon Modeling, and Real-Time Energy Insights</i>
</p>

<p align="center">
  <a href="https://genshaakti.web.app/" target="_blank"><img src="https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=firebase" /></a>
  <a href="https://www.canva.com/design/DAGici7hZmc/Aej6LS1YH25oncQBteBs8A/edit?ui=eyJEIjp7IlAiOnsiQiI6ZmFsc2V9fX0" target="_blank"><img src="https://img.shields.io/badge/View-Presentation-blueviolet?style=for-the-badge&logo=canva" /></a>
  <a href="https://github.com/URAYUSHJAIN/genshkati2.0" target="_blank"><img src="https://img.shields.io/badge/Source-Code-black?style=for-the-badge&logo=github" /></a>
</p>

---

## 🌍 About GenShakti

**GenShakti** is an AI-driven web platform aimed at solving the problem of unreliable and unsustainable energy access in communities around the world. By leveraging advanced geospatial analysis and machine learning, GenShakti provides optimal site recommendations, carbon emission simulations, and real-time integration of environmental and energy data.

> 🔥 *Aligns with UN SDG 7 (Affordable and Clean Energy) & SDG 13 (Climate Action)*


## 🚀 Features

- 🧠 **Smart Site Selection** — AI-powered renewable energy site recommendations with interactive map visualization. Validates coordinates for India region with real-time error handling.
- 🗺 **Personalized Energy Roadmaps** — Generate 7-10 step action plans to reduce electricity bills with cost estimates in Indian currency (₹).
- 🌱 **Carbon Modeling** — Estimate and visualize carbon emission reductions with detailed analytics.
- 📊 **Real-Time Data Integration** — Weather and energy usage data for accurate insights and forecasting.
- 💡 **Sustainable Suggestions** — Get 5 personalized energy-saving tips based on transport, energy, and waste inputs.
- 📍 **Geospatial AI** — Map-based location analytics using Leaflet with coordinate validation and bounds checking.
- 🛠️ **Cost Savings Dashboard** — Track investment planning and savings with AI-generated recommendations.
- ⚡ **Renewable Capacity Analysis** — Real-time recommendations for solar, wind, hydro, geothermal, and biomass energy sources.
- 🔄 **Visual Roadmaps** — Interactive flow diagrams using ReactFlow for energy transition planning.

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18.3.1 + Vite 6.0.1** | Frontend framework with hot reload |
| **Tailwind CSS** | Styling and UI |
| **JavaScript (ES6+)** | Core programming |
| **HuggingFace Inference API** | AI-powered recommendations using Llama-3.2-3B-Instruct |
| **Leaflet + React Leaflet** | Interactive map visualization |
| **ReactFlow** | Visual roadmap generation |
| **Firebase** | Deployment and hosting |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- HuggingFace API key ([Get one here](https://huggingface.co/settings/tokens))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/URAYUSHJAIN/genshkati2.0.git
   cd genshkati2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_HF_API_KEY=your_huggingface_api_key_here
   ```
   
   > ⚠️ **Important**: Never commit `.env` to version control. It's already in `.gitignore`.

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```
   
   Output will be in the `dist/` directory.

---

## 🏗 Project Structure

```
GenShakti/
├── public/              # Static assets
├── src/
│   ├── assets/
│   │   └── img/        # Images and logos
│   ├── components/     # Reusable UI components (Header, Footer)
│   ├── pages/          # Feature pages
│   │   ├── ai.jsx                        # Energy reduction roadmap
│   │   ├── siteSelection.jsx             # Smart site selection with maps
│   │   ├── Sustainable-Suggestions.jsx   # Sustainability recommendations
│   │   ├── Roadmap.jsx                   # Visual energy roadmap
│   │   ├── Renewable Capacity.jsx        # Energy capacity dashboard
│   │   ├── Cost Saving.jsx               # Cost analysis
│   │   └── ...more pages
│   ├── utils/
│   │   └── aiProvider.js                 # Centralized AI utility (HuggingFace)
│   ├── App.jsx         # Main app component with routing
│   └── main.jsx        # Entry point
├── .env                # Environment variables (not in git)
├── .gitignore
├── index.html
├── tailwind.config.js
├── vite.config.js      # Vite config with HF API proxy
└── package.json
```

### Key Files

- **`src/utils/aiProvider.js`**: Centralized AI utility using HuggingFace's Llama-3.2-3B-Instruct model for all AI-powered features
- **`vite.config.js`**: Includes proxy configuration to handle CORS during development
- **`.env`**: Stores sensitive API keys (VITE_HF_API_KEY)

---

## 🧭 Process Flow

1. **User Input** – Energy type, location, usage, etc.
2. **AI Analysis** – Optimal site detection using geospatial data.
3. **Roadmap Generation** – Electricity bill reduction strategies.
4. **Carbon Modeling** – Emissions simulation and dashboard.
5. **Sustainability Insights** – Tailored green energy tips.

---

## 🌐 Live Demo & Media

- 🔗 **Live App**: [genshaakti.web.app](https://genshaakti.web.app/)
- 🎥 **Demo Video**: [YouTube Channel](https://www.youtube.com/@urayushjain)
- 📘 **Pitch Deck**: [View Canva Presentation](https://www.canva.com/design/DAGici7hZmc/Aej6LS1YH25oncQBteBs8A/edit?ui=eyJEIjp7IlAiOnsiQiI6ZmFsc2V9fX0)
---

## 🔮 Future Scope

- 📱 **Flutter Mobile App** with Google Maps & real-time energy insights.
- 🌐 **Expanded Energy Types**: Enhanced hydro & biomass modeling.
- 🧠 **Advanced AI Models**: Experiment with larger LLMs for more precise recommendations.
- 🏠 **IoT Integration**: Smart home devices for automated energy optimization.
- 🤝 **Strategic Partnerships**: Energy firms, governments, NGOs for wider adoption.
- 🌏 **Multilingual Support**: Reach non-English speaking communities.
- 🎮 **Gamification**: Reward users for achieving sustainability milestones.
- 📈 **Analytics Dashboard**: Historical tracking and predictive modeling.
- 🔒 **User Authentication**: Save and track personal energy goals over time.

---

## 🚨 Troubleshooting

### API Issues
- **401 Unauthorized**: Check if `VITE_HF_API_KEY` is correctly set in `.env`
- **CORS Errors**: Make sure Vite dev server is running (proxy handles CORS)
- **Model Errors**: The app uses `meta-llama/Llama-3.2-3B-Instruct` which is deployed on HuggingFace router

### Build Issues
- Clear cache: `rm -rf node_modules dist && npm install`
- Check Node version: `node -v` (should be 18.x or higher)

### Map Not Loading
- Verify Leaflet CSS is included in your HTML
- Check browser console for coordinate validation errors

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_HF_API_KEY` | HuggingFace API key for AI features | ✅ Yes |

> 💡 **Tip**: For production deployment on Vercel/Netlify, add environment variables in their dashboard.

---

## 🚀 Deployment

### Vercel/Netlify
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Add environment variable: `VITE_HF_API_KEY`
4. Build command: `npm run build`
5. Output directory: `dist`

### Firebase (Current)
```bash
npm run build
firebase deploy
```

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available for educational and research purposes.

---

## 🙏 Acknowledgments

- HuggingFace for providing the Inference API
- React and Vite communities for excellent tooling
- Leaflet for map visualization capabilities
- All contributors and supporters of sustainable energy initiatives
