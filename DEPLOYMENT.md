# 🚀 Deployment Guide

This guide will help you deploy the NASA Explorer application to production.

## 📋 Prerequisites

1. **GitHub Account** - For source code hosting
2. **Vercel Account** - For frontend deployment (free tier available)
3. **Render Account** - For backend deployment (free tier available)
4. **NASA API Key** - Get one from [https://api.nasa.gov/](https://api.nasa.gov/)

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository
```bash
# In your project root
git init
git add .
git commit -m "Initial commit: NASA Explorer application"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `nasa-explorer`
3. Make it public
4. Don't initialize with README (we already have one)

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/nasa-explorer.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy Backend (Render)

### 2.1 Create Render Account
1. Go to [Render](https://render.com) and sign up
2. Connect your GitHub account

### 2.2 Deploy Backend Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name:** `nasa-explorer-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### 2.3 Set Environment Variables
In your Render service settings, add:
```
NASA_API_KEY=your_nasa_api_key_here
PORT=10000
```

### 2.4 Get Backend URL
After deployment, note your backend URL (e.g., `https://nasa-explorer-backend.onrender.com`)

## 🎨 Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account
1. Go to [Vercel](https://vercel.com) and sign up
2. Connect your GitHub account

### 3.2 Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### 3.3 Set Environment Variables
In your Vercel project settings, add:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### 3.4 Deploy
Click "Deploy" and wait for the build to complete.

## 🔗 Step 4: Update Links

### 4.1 Update README.md
Replace the placeholder URLs in your README.md:
- `https://nasa-explorer-app.vercel.app` with your actual Vercel URL
- `https://github.com/yourusername/nasa-explorer` with your actual GitHub URL

### 4.2 Update Frontend API Configuration
If needed, update the API base URL in `frontend/src/utils/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## 🧪 Step 5: Test Deployment

### 5.1 Test Backend
Visit your backend URL + `/api/health` to ensure it's running:
```
https://your-backend-url.onrender.com/api/health
```

### 5.2 Test Frontend
Visit your Vercel URL and test all features:
- Home page
- APOD page
- Mars Rover page
- EPIC page
- NEO page
- Search page

## 🔄 Step 6: Continuous Deployment

Both Vercel and Render will automatically redeploy when you push changes to your GitHub repository.

### 6.1 Making Updates
```bash
# Make your changes
git add .
git commit -m "Update feature description"
git push origin main
```

### 6.2 Monitor Deployments
- **Vercel:** Check the deployment status in your Vercel dashboard
- **Render:** Check the deployment logs in your Render dashboard

## 🛠️ Alternative Deployment Options

### Frontend Alternatives
- **Netlify** - Similar to Vercel, great for static sites
- **GitHub Pages** - Free hosting for static sites
- **Firebase Hosting** - Google's hosting solution

### Backend Alternatives
- **Heroku** - Popular platform (paid)
- **Railway** - Modern alternative to Heroku
- **DigitalOcean App Platform** - Scalable hosting
- **AWS Elastic Beanstalk** - Enterprise-grade hosting

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit API keys to your repository
- Use environment variables for all sensitive data
- Regularly rotate your NASA API key

### 2. CORS Configuration
Your backend already includes CORS configuration for development. For production, you might want to restrict origins:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app'],
  credentials: true
}));
```

### 3. Rate Limiting
Consider adding rate limiting to your backend to prevent abuse:
```bash
npm install express-rate-limit
```

## 📊 Monitoring

### 1. Backend Monitoring
- Monitor API response times
- Track error rates
- Monitor NASA API usage

### 2. Frontend Monitoring
- Monitor page load times
- Track user interactions
- Monitor for JavaScript errors

## 🆘 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check environment variables
   - Verify Node.js version compatibility
   - Check build logs

2. **Frontend can't connect to backend**
   - Verify CORS configuration
   - Check environment variables
   - Ensure backend is running

3. **NASA API errors**
   - Check API key validity
   - Monitor rate limits
   - Verify API endpoints

### Getting Help
- Check the deployment logs in your hosting platform
- Review the [NASA API documentation](https://api.nasa.gov/)
- Create an issue in your GitHub repository

## 🎉 Success!

Once deployed, your NASA Explorer will be live and accessible to users worldwide! 

**Remember to:**
- Share your live application URL
- Update your portfolio/resume
- Monitor the application for any issues
- Keep dependencies updated 