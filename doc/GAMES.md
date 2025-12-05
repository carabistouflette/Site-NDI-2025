# Documentation des Jeux

Le site propose plusieurs expériences interactives (mini-jeux) pour engager l'utilisateur.

## 1. Eco Quest (RPG)

Une aventure narrative interactive propulsée par l'IA.

### Modes de Jeu

- **Mode Classique** : Une aventure "dont vous êtes le héros" dans un univers Solar-Punk / Cyber-Green. Le Maître du Jeu (IA) adapte l'histoire selon vos choix et votre profil.
- **Escape Game** : Un scénario de coopération entre deux personnages (Dian et Arianna) enfermés dans des cuves. Le joueur sert d'intermédiaire pour qu'ils s'échappent en échangeant des indices.

### Fonctionnement Technique

- **Store** : `src/stores/rpgStore.ts` gère toute la logique.
- **IA** : Utilise deux modèles d'IA en parallèle (gauche et droite) pour générer les réponses.
- **Carte des Talents** : Au début du mode classique, l'IA analyse le profil du joueur pour générer des statistiques (Créativité, Logique, etc.).

## 2. Au Cœur du LLM

Un jeu d'exploration et de compréhension des modèles de langage (Large Language Models).
*(Détails à compléter selon l'implémentation finale dans `LLMGameView.vue`)*

## 3. Snake (SnekSnek)

Une version moderne et esthétique du jeu Snake classique.

- **Composant** : `src/components/SnekSnek.vue`
- **Caractéristiques** :
  - Design néon / cyber.
  - Score et High Score.
  - Vitesse progressive.

## 4. The Volume Game

Une collection d'interfaces utilisateur frustrantes ou ludiques pour régler le volume.

- **Concept** : Parodier les mauvaises UX ou proposer des défis d'adresse.
- **Variantes** :
  - **Possessed Slider** : Le curseur bouge tout seul (comme le logo DVD) et fuit la souris.
  - **Samurai Slider** : Un défi de précision (couper le son au bon moment ?).
