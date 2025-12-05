# Deployment Guide for Fly.io

This guide explains how to deploy the Site NDI 2025 application to Fly.io. The application consists of two services:
- **Backend API** (Node.js/Express)
- **Frontend** (Vue.js SPA)

## Prerequisites

1. Install the Fly.io CLI:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Authenticate with Fly.io:
   ```bash
   fly auth login
   ```

## Step 1: Deploy the Backend

The backend must be deployed first so we can configure the frontend with its URL.

```bash
cd server
fly launch --config fly.toml --no-deploy
```

This will create the app on Fly.io. Now set the required secrets:

```bash
fly secrets set OPENROUTER_API_KEY=your-openrouter-api-key-here
fly secrets set FRONTEND_URL=https://ndi-2025-frontend.fly.dev
```

**Note:** Update the `FRONTEND_URL` with your actual frontend URL after deploying it.

Deploy the backend:

```bash
fly deploy
```

Note the backend URL (e.g., `https://ndi-2025-backend.fly.dev`).

## Step 2: Update Frontend Configuration

Update the `fly.toml` in the root directory with the actual backend URL:

```toml
[env]
  VITE_API_URL = "https://ndi-2025-backend.fly.dev"
```

Replace `ndi-2025-backend.fly.dev` with your actual backend URL from Step 1.

## Step 3: Deploy the Frontend

From the root directory:

```bash
fly launch --config fly.toml --no-deploy
```

Deploy the frontend:

```bash
fly deploy
```

## Verify Deployment

1. Check backend health:
   ```bash
   fly status -a ndi-2025-backend
   fly logs -a ndi-2025-backend
   ```

2. Check frontend health:
   ```bash
   fly status -a ndi-2025-frontend
   fly logs -a ndi-2025-frontend
   ```

3. Open the application:
   ```bash
   fly open -a ndi-2025-frontend
   ```

## Updating the Application

### Update Backend:
```bash
cd server
fly deploy
```

### Update Frontend:
```bash
cd ..
fly deploy
```

## Scaling

Both services are configured with auto-scaling. To adjust:

```bash
# Scale backend
fly scale vm shared-cpu-1x --memory 512 -a ndi-2025-backend

# Scale frontend
fly scale vm shared-cpu-1x --memory 512 -a ndi-2025-frontend
```

## Monitoring

View logs in real-time:

```bash
# Backend logs
fly logs -a ndi-2025-backend

# Frontend logs
fly logs -a ndi-2025-frontend
```

## Troubleshooting

### Backend not connecting to OpenRouter
- Verify the API key is set: `fly secrets list -a ndi-2025-backend`
- Check logs: `fly logs -a ndi-2025-backend`

### Frontend can't reach backend
- Verify CORS is properly configured in `server/index.js`
- Check the `VITE_API_URL` in `fly.toml`
- Ensure backend is running: `fly status -a ndi-2025-backend`

### Build failures
- Check Docker build locally: `docker build -t test .`
- Review build logs: `fly logs -a <app-name>`

## Cost Optimization

The apps are configured with:
- `auto_stop_machines = "stop"` - Stops when idle
- `auto_start_machines = true` - Starts on request
- `min_machines_running = 0` - No always-on machines

This minimizes costs while maintaining availability.

## Environment Variables

### Backend (.env in server/)
- `PORT` - Server port (default: 3001)
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `FRONTEND_URL` - Frontend URL for CORS and OpenRouter (e.g., https://ndi-2025-frontend.fly.dev)

### Frontend (build-time)
- `VITE_API_URL` - Backend API URL (set in fly.toml)

## Security Notes

1. Never commit `.env` files
2. Always use `fly secrets` for sensitive data
3. HTTPS is enforced by default on Fly.io
4. Rate limiting is configured in the backend
