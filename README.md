# 🚀 NASA Explorer

A modern web application that showcases space-related data from NASA's Open APIs. Built with React frontend and Node.js backend, featuring beautiful data visualization and interactive user experience.

![NASA Explorer](https://img.shields.io/badge/NASA-Explorer-blue?style=for-the-badge&logo=nasa)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)

## 🌐 Live Application

**🚀 Frontend (Vercel):** [NASA Explorer Live](https://nasa-explorer-80j061wul-timmys-projects-ddacdedf.vercel.app/)

**🔧 Backend (Render):** [NASA Explorer API](https://nasa-explorer-backend-1yjr.onrender.com)

**📂 GitHub Repository:** [NASA Explorer Source Code](https://github.com/Timmy15/nasa-explorer)

## ✨ Features

- **🌌 Astronomy Picture of the Day (APOD)** - Daily space images with detailed explanations
- **🔴 Mars Rover Photos** - Explore photos from Curiosity, Perseverance, and other rovers
- **🌍 Earth Polychromatic Imaging Camera (EPIC)** - View Earth from space
- **☄️ Near Earth Objects (NEO)** - Track asteroids and comets near Earth
- **🔍 NASA Image & Video Library Search** - Search through NASA's vast media collection
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **⚡ Real-time Data** - Live data from NASA's APIs with intelligent caching
- **🎨 Modern UI/UX** - Beautiful space-themed interface with smooth animations
- **🌟 Interactive Elements** - Hover effects, smooth scrolling, and animated backgrounds

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **React Router DOM 6.20.1** - Client-side routing
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **Framer Motion 10.16.4** - Smooth animations and transitions
- **React Query 3.39.3** - Data fetching and caching
- **Lucide React 0.263.1** - Beautiful icons
- **React Intersection Observer 9.5.2** - Intersection observer hooks

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **Axios 1.10.0** - HTTP client for NASA API calls
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.0.0** - Environment variable management

## 📁 Project Structure

```
nasa-explorer/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.js    # Navigation component
│   │   │   ├── LoadingSpinner.js
│   │   │   └── ErrorMessage.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js     # Landing page
│   │   │   ├── APOD.js     # Astronomy Picture of the Day
│   │   │   ├── MarsRover.js # Mars Rover photos
│   │   │   ├── EPIC.js     # Earth from space
│   │   │   ├── NEO.js      # Near Earth Objects
│   │   │   └── SearchPage.js # NASA image search
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useNASA.js  # NASA API hook
│   │   ├── utils/          # Utility functions
│   │   │   └── api.js      # API utility functions
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   ├── package.json
│   ├── vercel.json         # Vercel deployment configuration
│   ├── .npmrc              # npm configuration for legacy peer deps
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── postcss.config.js   # PostCSS configuration
├── backend/                 # Node.js backend server
│   ├── index.js            # Express server and API routes
│   ├── package.json
│   └── .env                # Environment variables (not in repo)
├── deploy.sh               # Deployment script
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Timmy15/nasa-explorer.git
   cd nasa-explorer
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install --legacy-peer-deps
   ```

4. **Set up environment variables (optional)**
   
   Create a `.env` file in the backend directory:
   ```env
   NASA_API_KEY=your_nasa_api_key_here
   PORT=5000
   ```
   
   > **Note:** If no API key is provided, the app will use NASA's DEMO_KEY (limited to 1000 requests per day).

5. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   
   The backend will run on `http://localhost:5000`

6. **Start the frontend application**
   ```bash
   cd frontend
   npm start
   ```
   
   The frontend will run on `http://localhost:3000`

7. **Open your browser**
   
   Navigate to `http://localhost:3000` to explore the NASA Explorer!

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # Starts development server with hot reload
```

### Building for Production
```bash
cd frontend
npm run build
```

## 🌐 API Endpoints

The backend provides the following endpoints that proxy to NASA's APIs:

- `GET /` - API information and available endpoints
- `GET /api/apod` - Astronomy Picture of the Day
- `GET /api/mars-rover` - Mars Rover photos
- `GET /api/mars-rovers` - Available Mars rovers
- `GET /api/rover-manifest/:rover` - Rover mission details
- `GET /api/epic` - Earth Polychromatic Imaging Camera
- `GET /api/neo` - Near Earth Objects
- `GET /api/search` - NASA Image and Video Library search
- `GET /api/health` - Backend health check

## 🎨 Customization

### Styling
The app uses Tailwind CSS with custom NASA-themed colors defined in `tailwind.config.js`:
- `nasa-blue`: #0B3D91
- `nasa-red`: #FC3D21
- `space-black`: #0A0A0A
- `cosmic-purple`: #6B46C1
- `stellar-yellow`: #F6E05E

### Adding New Features
1. Create new page components in `frontend/src/pages/`
2. Add API endpoints in `backend/index.js`
3. Create custom hooks in `frontend/src/hooks/`
4. Update navigation in `frontend/src/components/Navbar.js`

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set framework preset to **"Create React App"**
3. Set root directory to `frontend`
4. Add environment variable: `REACT_APP_API_URL=https://nasa-explorer-backend-1yjr.onrender.com/api`
5. Deploy!

**Configuration Files:**
- `frontend/vercel.json` - Vercel deployment configuration
- `frontend/.npmrc` - npm configuration for dependency resolution

### Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables:
   - `NASA_API_KEY` (optional, will use DEMO_KEY if not set)
   - `PORT` (Render will set this automatically)
5. Deploy!

## 🔧 Recent Updates & Fixes

### Version Compatibility Fixes
- **React 18.3.1**: Downgraded from React 19.1.0 for better compatibility with Framer Motion
- **React Router DOM 6.20.1**: Updated for stability and compatibility
- **Dependency Resolution**: Added `.npmrc` with `legacy-peer-deps=true` for smooth installation

### Deployment Improvements
- **Vercel Configuration**: Added `frontend/vercel.json` for proper deployment settings
- **Backend Root Route**: Added informative root endpoint (`/`) for better API documentation
- **Monorepo Structure**: Properly configured for separate frontend/backend deployment

### Performance & UX Enhancements
- **Loading States**: Added loading spinners and error handling across all pages
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Enhanced with Framer Motion for better user experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA** for providing amazing APIs and space data
- **React Team** for the incredible framework
- **Vercel** for seamless frontend deployment
- **Render** for reliable backend hosting
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Timmy15/nasa-explorer/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Made with ❤️ and 🚀 by the NASA Explorer Team** 