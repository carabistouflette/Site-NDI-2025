# Documentation Backend & API

Le backend est situé dans le dossier `server/`. C'est une application Node.js standard.

## Configuration

Le serveur écoute par défaut sur le port `3001`.
Il nécessite un fichier `.env` à la racine de `server/` :

```env
PORT=3001
OPENROUTER_API_KEY=sk-or-v1-...
```

## Endpoints API

### `GET /`

- **Description** : Vérification de l'état du serveur.
- **Réponse** : `Server is running (Streaming Enabled).`

### `POST /api/chat`

- **Description** : Endpoint principal pour interagir avec le LLM (via OpenRouter).
- **Body (JSON)** :
  ```json
  {
    "model": "google/gemini-2.0-flash-exp:free", // ou autre modèle supporté
    "messages": [
      { "role": "user", "content": "Bonjour !" }
    ],
    "stream": true // (Optionnel) Active le streaming SSE
  }
  ```
- **Réponse (Stream)** :
  - Si `stream: true` : Le serveur renvoie un flux `text/event-stream` avec les chunks de texte générés.
  - Si `stream: false` : Renvoie un objet JSON standard avec la réponse complète.

## Gestion des Erreurs

Le serveur gère les erreurs courantes :
- **400 Bad Request** : Paramètres manquants (`model`, `messages`).
- **500 Internal Server Error** : Clé API manquante ou erreur de communication avec OpenRouter.

## Rate Limiting

Une limite est appliquée sur `/api/` :
- **Fenêtre** : 1 minute
- **Max** : 50 requêtes par IP
