# Architecture du Projet

Le projet **Site NDI 2025** est une application web moderne séparée en deux parties principales : un Frontend (SPA) et un Backend (API).

## Vue d'ensemble

```mermaid
graph TD
    Client[Navigateur Client] -->|HTTP/WebSocket| Frontend[Frontend Vue.js]
    Frontend -->|API Calls (Axios)| Backend[Backend Express]
    Backend -->|API Calls| OpenRouter[OpenRouter AI API]
```

## Frontend (Client)

Le frontend est construit avec **Vue 3** et **Vite**.

### Technologies Clés

- **Framework** : Vue.js 3 (Composition API, `<script setup>`)
- **Build Tool** : Vite
- **Langage** : TypeScript
- **Routing** : Vue Router
- **State Management** : Pinia
- **3D / Graphismes** : Three.js via **TresJS**
- **UI Library** : Naive UI (pour certains composants)
- **HTTP Client** : Axios

### Structure des Dossiers (`src/`)

- `assets/` : Images, styles globaux, polices.
- `components/` : Composants Vue réutilisables (Briques UI).
- `views/` : Pages principales de l'application (liées au routeur).
- `stores/` : Stores Pinia pour la gestion d'état global (ex: `rpgStore.ts`).
- `router/` : Configuration des routes (`index.ts`).
- `composables/` : Logique réutilisable (Hooks).

## Backend (Server)

Le backend est un serveur **Node.js** léger utilisant **Express**.

### Rôle

Son rôle principal est de servir de proxy sécurisé pour les appels à l'API d'Intelligence Artificielle (OpenRouter), afin de ne pas exposer les clés API côté client.

### Technologies Clés

- **Runtime** : Node.js
- **Framework** : Express
- **Sécurité** : Helmet, Express Rate Limit
- **IA SDK** : OpenAI (configuré pour OpenRouter)

### Sécurité

- **Rate Limiting** : Limite le nombre de requêtes par IP pour éviter les abus.
- **CORS** : Configuré pour autoriser les requêtes du frontend.
- **Helmet** : Ajoute des headers de sécurité HTTP.
