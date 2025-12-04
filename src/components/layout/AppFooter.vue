<template>
  <footer class="app-footer">
    <div class="app-footer__container">
      <div class="app-footer__content">
        <div class="app-footer__section">
          <h3 class="app-footer__title">NIRD</h3>
          <p class="app-footer__description">
            Association pour la promotion d'un numérique inclusif, responsable et durable.
          </p>
          <div class="app-footer__socials">
            <a href="#" class="social-link" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="app-footer__section">
          <h3 class="app-footer__title">Navigation</h3>
          <ul class="app-footer__links">
            <li><RouterLink to="/">Accueil</RouterLink></li>
            <li><RouterLink to="/games">Jeux</RouterLink></li>
            <li><RouterLink to="/about">Association</RouterLink></li>
            <li><RouterLink to="/#nird">Démarche NIRD</RouterLink></li>
          </ul>
        </div>
        
        <div class="app-footer__section">
          <h3 class="app-footer__title">Contact</h3>
          <div class="app-footer__contact">
            <p>contact@nird.fr</p>
            <p>Tél: +33 1 23 45 67 89</p>
            <p>Paris, France</p>
          </div>
        </div>
      </div>
      
      <div class="app-footer__bottom">
        <div class="app-footer__copyright">
          <p>&copy; 2025 NIRD. Tous droits réservés.</p>
        </div>
        <div class="app-footer__legal">
          <a href="#mentions-legales">Mentions légales</a>
          <a href="#politique-confidentialite">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.app-footer {
  background: #080808;
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.app-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.app-footer__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.app-footer__section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-footer__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.app-footer__description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.app-footer__socials {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a1a1a;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid var(--border-color);
}

.social-link:hover {
  background: var(--neon-green);
  color: black;
  transform: translateY(-2px);
  box-shadow: var(--glow-text);
  border-color: var(--neon-green);
}

.app-footer__links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app-footer__links a,
.app-footer__links RouterLink {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.app-footer__links a:hover,
.app-footer__links RouterLink:hover {
  color: var(--neon-green);
  text-shadow: var(--glow-text);
}

.app-footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app-footer__contact p {
  color: var(--text-secondary);
  margin: 0;
}

.app-footer__bottom {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.app-footer__copyright p {
  color: #444;
  margin: 0;
}

.app-footer__legal {
  display: flex;
  gap: 1.5rem;
}

.app-footer__legal a {
  color: #444;
  text-decoration: none;
  transition: color 0.3s ease;
}

.app-footer__legal a:hover {
  color: var(--neon-green);
}

@media (max-width: 768px) {
  .app-footer {
    padding: 2rem 0 1rem;
  }
  
  .app-footer__content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .app-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>