# Installation et Démarrage

Ce guide vous explique comment installer les dépendances et lancer le projet en local.

## Prérequis

- **Node.js** (version 20.19.0 ou supérieure recommandée)
- **npm** (inclus avec Node.js)

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd Site-NDI-2025
```

### 2. Installer les dépendances Frontend

À la racine du projet :

```bash
npm install
```

### 3. Installer les dépendances Backend

Allez dans le dossier `server/` :

```bash
cd server
npm install
```

## Configuration

### Backend (.env)

Créez un fichier `.env` dans le dossier `server/` avec les variables suivantes :

```env
PORT=3001
OPENROUTER_API_KEY=votre_cle_api_openrouter
```

*Note : `OPENROUTER_API_KEY` est nécessaire pour les fonctionnalités utilisant l'IA (LLM Game, RPG).*

## Lancement

### 1. Lancer le Backend

Dans le dossier `server/` :

```bash
node index.js
# Ou si vous avez nodemon :
# nodemon index.js
```

Le serveur démarrera sur `http://localhost:3001`.

### 2. Lancer le Frontend

À la racine du projet :

```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173` (ou un autre port indiqué par Vite).

## Scripts Disponibles (Frontend)

- `npm run dev` : Lance le serveur de développement Vite.
- `npm run build` : Compile le projet pour la production.
- `npm run preview` : Prévisualise la version de production.
- `npm run lint` : Analyse et corrige le code avec ESLint.
- `npm run format` : Formate le code avec Prettier.
