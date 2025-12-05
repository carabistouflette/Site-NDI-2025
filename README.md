# Site NDI 2025 - Mercredi Adams

A modern web application built with Vue.js 3 and Node.js, featuring an interactive RPG experience focused on digital inclusion and AI-powered gameplay.

## 🏗️ Architecture

This project consists of two main components:

- **Frontend**: Vue.js 3 SPA with TypeScript, Three.js, and Pinia
- **Backend**: Node.js/Express API server that proxies requests to OpenRouter AI

For detailed architecture information, see [doc/ARCHITECTURE.md](doc/ARCHITECTURE.md).

## 📋 Prerequisites

- Node.js 20.19.0 or higher (or 22.12.0+)
- npm or yarn
- An OpenRouter API key ([get one here](https://openrouter.ai/keys))

## 🚀 Quick Start

### 1. Install Dependencies

**Frontend:**
```sh
npm install
```

**Backend:**
```sh
cd server
npm install
```

### 2. Configure Environment

Create a `.env` file in the `server/` directory:

```env
PORT=3001
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

See `server/.env.example` for reference.

### 3. Run Development Servers

**Terminal 1 - Backend:**
```sh
cd server
npm start
```

**Terminal 2 - Frontend:**
```sh
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

## 🛠️ Development

### Frontend Commands

```sh
npm run dev          # Start dev server with hot-reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type checking
npm run lint         # Lint and fix files
npm run format       # Format code with Prettier
```

### Backend Commands

```sh
cd server
npm start            # Start the backend server
```

## 📦 Deployment

This application is configured for deployment on **Fly.io**.

### Quick Deploy

Use the deployment script:

```sh
./deploy.sh
```

### Manual Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Deployment Overview

1. **Deploy Backend First:**
   ```sh
   cd server
   fly launch --config fly.toml --no-deploy
   fly secrets set OPENROUTER_API_KEY=your-key
   fly deploy
   ```

2. **Update Frontend Config:**
   - Edit `fly.toml` with your backend URL
   
3. **Deploy Frontend:**
   ```sh
   fly launch --config fly.toml --no-deploy
   fly deploy
   ```

## 📚 Documentation

- [Architecture Overview](doc/ARCHITECTURE.md)
- [Backend & API Documentation](doc/BACKEND.md)
- [Components Documentation](doc/COMPONENTS.md)
- [Deployment Guide](DEPLOYMENT.md)

## 🎮 Features

- **Interactive RPG Game**: AI-powered narrative adventure
- **Escape Room Mode**: Cooperative puzzle-solving experience
- **3D Graphics**: Three.js integration for immersive visuals
- **AI Models Comparison**: Compare different AI models in real-time
- **Responsive Design**: Modern, cyber-glass aesthetic

## 🛡️ Security

- Rate limiting on API endpoints
- CORS protection
- Helmet.js security headers
- Environment-based configuration
- API key protection via backend proxy

## 🧪 Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- TypeScript
- Vite
- Pinia (State Management)
- Vue Router
- Three.js / TresJS
- Axios
- Naive UI

### Backend
- Node.js
- Express
- OpenAI SDK (configured for OpenRouter)
- Helmet.js
- Express Rate Limit
- CORS

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a project for NDI 2025. For contribution guidelines, please contact the team.

## 🔧 Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

### Browser Extensions

**Chromium-based browsers:**
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Turn on Custom Object Formatter](http://bit.ly/object-formatters)

**Firefox:**
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Turn on Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

