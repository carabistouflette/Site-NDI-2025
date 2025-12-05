<template>
  <section id="nird" class="nird-presentation">
    <div class="container">
      
      <!-- Header Section -->
      <div class="nird-header animate-fade-in">
        <h2 class="section-title">Qu'est-ce que le <span class="glitch-text" data-text="NIRD">NIRD</span> ?</h2>
        <p class="intro-text">
          <strong class="highlight">Numérique Inclusif, Responsable et Durable.</strong><br>
          Une démarche visant à transformer les pratiques numériques en conciliant 
          innovation technologique et enjeux éthiques, sociaux et environnementaux.
        </p>
      </div>

      <!-- Interactive Pillars -->
      <div class="pillars-grid">
        
        <!-- Pilier 1: Inclusif -->
        <div class="pillar-card inclusive" 
             :class="{ active: activePillar === 'inclusive' }"
             @mouseenter="activePillar = 'inclusive'"
             @click="activePillar = 'inclusive'">
          <div class="pillar-bg"></div>
          <div class="pillar-content">
            <div class="pillar-icon">🤝</div>
            <h3>Inclusion Numérique</h3>
            <p class="pillar-summary">Lutter contre la fracture numérique pour garantir un accès égalitaire.</p>
            
            <div class="pillar-details">
              <div class="detail-item">
                <strong>Accessibilité pour tous</strong>
                <p>S'assurer que chaque utilisateur puisse accéder, comprendre et contribuer à l'écosystème numérique.</p>
              </div>
              <div class="detail-item">
                <strong>Solidarité</strong>
                <p>Distribution d'ordinateurs reconditionnés équipés de logiciels libres aux publics non équipés.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pilier 2: Responsable -->
        <div class="pillar-card responsible"
             :class="{ active: activePillar === 'responsible' }"
             @mouseenter="activePillar = 'responsible'"
             @click="activePillar = 'responsible'">
          <div class="pillar-bg"></div>
          <div class="pillar-content">
            <div class="pillar-icon">🛡️</div>
            <h3>Responsabilité & Éthique</h3>
            <p class="pillar-summary">Émancipation de l'utilisateur et protection des données.</p>
            
            <div class="pillar-details">
              <div class="detail-item">
                <strong>Citoyenneté numérique</strong>
                <p>Former les utilisateurs à être des acteurs conscients et non de simples consommateurs passifs.</p>
              </div>
              <div class="detail-item">
                <strong>Logiciel Libre</strong>
                <p>Transparence, pérennité et indépendance vis-à-vis des géants du numérique grâce à l'Open Source.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pilier 3: Durable -->
        <div class="pillar-card sustainable"
             :class="{ active: activePillar === 'sustainable' }"
             @mouseenter="activePillar = 'sustainable'"
             @click="activePillar = 'sustainable'">
          <div class="pillar-bg"></div>
          <div class="pillar-content">
            <div class="pillar-icon">🌱</div>
            <h3>Durabilité Environnementale</h3>
            <p class="pillar-summary">Réduire l'empreinte écologique (sobriété numérique).</p>
            
            <div class="pillar-details">
              <div class="detail-item">
                <strong>Matériel reconditionné</strong>
                <p>Privilégier la réparation et le réemploi (machines réhabilitées sous GNU/Linux) plutôt que l'achat neuf.</p>
              </div>
              <div class="detail-item">
                <strong>Économie de ressources</strong>
                <p>Utilisation de systèmes légers ou de mini-ordinateurs (Raspberry Pi) moins énergivores.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Conclusion -->
      <div class="nird-footer">
        <p>
          NIRD n'est pas qu'un déploiement technique : c'est un 
          <span class="highlight-green">projet de société</span> qui utilise le numérique 
          pour promouvoir des valeurs de partage, d'écologie et d'autonomie.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activePillar = ref<string | null>(null)
</script>

<style scoped>
.nird-presentation {
  padding: 6rem 1rem;
  background: #050505;
  color: var(--text-primary);
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.nird-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
}

.glitch-text {
  position: relative;
  color: var(--neon-green);
  display: inline-block;
}

.intro-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.highlight {
  color: white;
  font-weight: 600;
}

.highlight-green {
  color: var(--neon-green);
  font-weight: 600;
  text-shadow: var(--glow-text);
}

/* Grid */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  perspective: 1000px;
}

/* Card Styles */
.pillar-card {
  position: relative;
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.pillar-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent);
  z-index: 0;
  transition: opacity 0.4s ease;
}

.pillar-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pillar-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  transition: transform 0.4s ease;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 700;
}

.pillar-summary {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.5;
}

/* Details Section (Hidden by default) */
.pillar-details {
  margin-top: auto;
  opacity: 0;
  max-height: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.detail-item {
  margin-bottom: 1rem;
  border-left: 2px solid rgba(255,255,255,0.1);
  padding-left: 1rem;
}

.detail-item strong {
  display: block;
  color: white;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.detail-item p {
  font-size: 0.9rem;
  color: #aaa;
  margin: 0;
}

/* Active/Hover States */
.pillar-card:hover, .pillar-card.active {
  transform: translateY(-10px);
  border-color: rgba(255,255,255,0.2);
  background: rgba(25, 25, 25, 0.9);
}

.pillar-card:hover .pillar-details,
.pillar-card.active .pillar-details {
  opacity: 1;
  max-height: 500px; /* Enough height */
  transform: translateY(0);
}

.pillar-card:hover .pillar-icon,
.pillar-card.active .pillar-icon {
  transform: scale(1.1);
}

/* Specific Theme Colors */
/* Inclusif - Violet */
.pillar-card.inclusive:hover {
  box-shadow: 0 0 30px rgba(107, 70, 193, 0.2);
  border-color: #6B46C1;
}
.pillar-card.inclusive h3 {
  transition: color 0.3s;
}
.pillar-card.inclusive:hover h3 {
  color: #9F7AEA; /* Light Purple */
}
.pillar-card.inclusive .detail-item {
  border-left-color: #6B46C1;
}

/* Responsable - Red/Coral */
.pillar-card.responsible:hover {
  box-shadow: 0 0 30px rgba(255, 107, 107, 0.2);
  border-color: #FF6B6B;
}
.pillar-card.responsible:hover h3 {
  color: #FF6B6B;
}
.pillar-card.responsible .detail-item {
  border-left-color: #FF6B6B;
}

/* Durable - Gold/Orange */
.pillar-card.sustainable:hover {
  box-shadow: 0 0 30px rgba(246, 173, 85, 0.2);
  border-color: #F6AD55;
}
.pillar-card.sustainable:hover h3 {
  color: #F6AD55;
}
.pillar-card.sustainable .detail-item {
  border-left-color: #F6AD55;
}

/* Footer */
.nird-footer {
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  font-size: 1.25rem;
  color: #ccc;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .pillar-details {
    opacity: 1;
    max-height: none;
    transform: none;
    margin-top: 1rem;
  }
}
</style>
