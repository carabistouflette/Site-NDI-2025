# Fly.io Deployment - Quick Reference

## 📋 Files Created for Deployment

### Backend (`server/`)
- ✅ `Dockerfile` - Container configuration for backend
- ✅ `fly.toml` - Fly.io app configuration
- ✅ `.dockerignore` - Files to exclude from Docker build
- ✅ `.env.example` - Environment variables template

### Frontend (root)
- ✅ `Dockerfile` - Multi-stage build with nginx
- ✅ `fly.toml` - Fly.io app configuration
- ✅ `nginx.conf` - Nginx configuration for SPA
- ✅ `.dockerignore` - Files to exclude from Docker build

### Configuration
- ✅ `src/config/env.ts` - Environment-based API URL configuration
- ✅ `src/stores/rpgStore.ts` - Updated to use config.apiUrl

### Documentation & Scripts
- ✅ `DEPLOYMENT.md` - Comprehensive deployment guide
- ✅ `deploy.sh` - Interactive deployment script
- ✅ `README.md` - Updated with deployment info

## 🚀 Deployment Commands

### First Time Setup

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io:**
   ```bash
   fly auth login
   ```

### Deploy Backend

```bash
cd server
fly launch --config fly.toml --no-deploy
fly secrets set OPENROUTER_API_KEY=your-actual-key-here
fly deploy
cd ..
```

### Deploy Frontend

**Important:** Update `fly.toml` with your backend URL first!

```bash
# Edit fly.toml and set VITE_API_URL to your backend URL
fly launch --config fly.toml --no-deploy
fly deploy
```

### Or Use the Script

```bash
./deploy.sh
```

## 🔍 Monitoring & Management

### Check Status
```bash
fly status -a ndi-2025-backend
fly status -a ndi-2025-frontend
```

### View Logs
```bash
fly logs -a ndi-2025-backend
fly logs -a ndi-2025-frontend
```

### Open App
```bash
fly open -a ndi-2025-frontend
```

### Update Secrets
```bash
fly secrets set OPENROUTER_API_KEY=new-key -a ndi-2025-backend
```

### List Secrets
```bash
fly secrets list -a ndi-2025-backend
```

## 🔧 Configuration Details

### Backend Environment Variables
- `PORT` - Server port (default: 3001)
- `OPENROUTER_API_KEY` - Your OpenRouter API key (required)

### Frontend Build-time Variables
- `VITE_API_URL` - Backend API URL (set in fly.toml)

### CORS Configuration
The backend is configured to accept requests from:
- `localhost` (development)
- `127.0.0.1` (development)
- `ndi-2025-frontend.fly.dev` (production)

**Note:** Update `server/index.js` if you use a different frontend domain.

## 💰 Cost Optimization

Both apps are configured with:
- Auto-stop when idle
- Auto-start on request
- 0 minimum running machines
- 256MB RAM (adjustable)

This keeps costs minimal while maintaining availability.

## ⚠️ Important Notes

1. **Deploy Backend First** - Frontend needs the backend URL
2. **Set API Key** - Backend won't work without OPENROUTER_API_KEY
3. **Update CORS** - If you change the frontend domain, update CORS in `server/index.js`
4. **Update fly.toml** - Set the correct backend URL in frontend's fly.toml before deploying

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check logs
fly logs -a ndi-2025-backend

# Verify secrets are set
fly secrets list -a ndi-2025-backend

# SSH into the machine
fly ssh console -a ndi-2025-backend
```

### Frontend can't reach backend
1. Check backend is running: `fly status -a ndi-2025-backend`
2. Verify VITE_API_URL in fly.toml
3. Check CORS settings in server/index.js
4. View frontend logs: `fly logs -a ndi-2025-frontend`

### Build failures
```bash
# Test Docker build locally
docker build -t test-backend ./server
docker build -t test-frontend .

# Check build logs on Fly.io
fly logs -a <app-name>
```

## 📚 Additional Resources

- [Fly.io Documentation](https://fly.io/docs/)
- [Fly.io Pricing](https://fly.io/docs/about/pricing/)
- [OpenRouter API](https://openrouter.ai/docs)
