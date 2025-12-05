<template>
  <div class="rpg-setup">
    <div class="setup-container">
      <h1 class="title glitch" data-text="INITIALISATION_PROFIL">INITIALISATION_PROFIL</h1>
      
      <div class="scenario-selection">
        <div 
          class="scenario-card" 
          :class="{ active: selectedScenario === 'classic' }"
          @click="selectedScenario = 'classic'"
        >
          <h3>ECO QUEST: CLASSIC</h3>
          <p>Aventure RPG générative basée sur vos compétences.</p>
        </div>
        <div 
          class="scenario-card" 
          :class="{ active: selectedScenario === 'escape' }"
          @click="selectedScenario = 'escape'"
        >
          <h3>ECO QUEST: ESCAPE</h3>
          <p>Sauvez Dian et Arianna en résolvant des énigmes croisées.</p>
        </div>
      </div>

      <div class="form-grid" v-if="selectedScenario === 'classic'">
        <div class="input-group">
          <label>Compétences Clés</label>
          <textarea v-model="store.userProfile.competencies" placeholder="Ex: Gestion de projet, Leadership, Design..."></textarea>
        </div>
        
        <div class="input-group">
          <label>Talents Cachés</label>
          <textarea v-model="store.userProfile.talents" placeholder="Ex: Improvisation, Cuisine, Dessin..."></textarea>
        </div>
        
        <div class="input-group">
          <label>Techniques / Hard Skills</label>
          <textarea v-model="store.userProfile.techniques" placeholder="Ex: Python, VueJS, Soudure..."></textarea>
        </div>

        <div class="input-group">
          <label>Linguistique</label>
          <input type="text" v-model="store.userProfile.linguistics" placeholder="Ex: Français, Anglais, Japonais...">
        </div>

        <div class="input-group full-width">
          <label>Projets Personnels Marquants</label>
          <textarea v-model="store.userProfile.projects" placeholder="Décrivez un projet dont vous êtes fier..."></textarea>
        </div>
      </div>

      <div class="actions">
        <button class="neon-btn" @click="launchGame" :disabled="store.generatingTalentMap">
          <span v-if="selectedScenario === 'escape'" class="btn-text">LANCER LA MISSION</span>
          <span v-else-if="!store.generatingTalentMap" class="btn-text">GÉNÉRER LA CARTE DES TALENTS</span>
          <span v-else class="btn-text">GÉNÉRATION EN COURS...</span>
          <div class="btn-glitch"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRpgStore } from '@/stores/rpgStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const store = useRpgStore();
const router = useRouter();
const selectedScenario = ref<'classic' | 'escape'>('classic');

const launchGame = async () => {
  if (selectedScenario.value === 'classic' && !store.userProfile.competencies) {
    alert("Veuillez remplir au moins vos compétences pour le mode Classique.");
    return;
  }
  await store.initializeGame(router, selectedScenario.value);
};
</script>

<style scoped>
.rpg-setup {
  background: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: 90px; /* The general view still needs to be pushed down by the header */
  background-image: radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.05), transparent 70%);
}

.setup-container {
  width: 100%;
  max-width: 800px;
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid #333;
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.setup-container::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 2px;
  background: linear-gradient(90deg, transparent, var(--neon-green), transparent);
  animation: scanline 3s linear infinite;
}

.title {
  font-family: 'Courier New', monospace;
  color: var(--neon-green);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  letter-spacing: 2px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.full-width { grid-column: span 2; }

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #a0a0a0;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input, textarea {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #444;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s;
  resize: vertical;
}

textarea { min-height: 100px; }

input:focus, textarea:focus {
  border-color: var(--neon-green);
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
  outline: none;
}

.actions {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.neon-btn {
  background: transparent;
  border: 2px solid var(--neon-green);
  color: var(--neon-green);
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  text-transform: uppercase;
}

.neon-btn:hover {
  background: var(--neon-green);
  color: black;
  box-shadow: 0 0 30px var(--neon-green);
}

@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
  .full-width { grid-column: span 1; }
}

@keyframes scanline {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.scenario-selection {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.scenario-card {
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.scenario-card:hover {
  border-color: var(--neon-green);
  background: rgba(0, 255, 0, 0.05);
}

.scenario-card.active {
  border-color: var(--neon-green);
  background: rgba(0, 255, 0, 0.1);
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
}

.scenario-card h3 {
  color: var(--neon-green);
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
}

.scenario-card p {
  color: #aaa;
  font-size: 0.9rem;
}
</style>