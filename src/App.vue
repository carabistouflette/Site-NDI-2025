<template>
  <div id="app" class="nird-theme">
    <router-view v-slot="{ Component }">
      <transition name="page-transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
// L'application utilise maintenant le router pour gérer les vues avec des transitions
</script>

<style>
/* Import des variables CSS globales */
@import './assets/styles/variables.css';

/* Styles globaux pour l'application */
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--nird-anthracite);
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Styles de base pour le thème NIRD */
.nird-theme {
  /* Assure que tous les composants Naive UI utilisent notre thème */
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-digital);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gradient-inclusive);
}

/* Animations globales */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Transitions de page */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive utilities */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-top: 0;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

p {
  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 1rem;
}

/* Links */
a {
  color: var(--nird-blue-electric);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--nird-blue-king);
}

/* Focus styles */
*:focus {
  outline: 2px solid var(--nird-blue-electric);
  outline-offset: 2px;
}

/* Boutons sans focus visible quand ils sont cliqués */
button:focus:not(:focus-visible) {
  outline: none;
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
}
</style>
