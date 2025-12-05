<template>
  <div class="games-view">
    <main>
      <!-- Intro Section -->
      <div class="intro-section">
        <div class="intro-bg"></div>
        <div class="intro-content">
          <h1 class="main-title">
            <span class="glitch-text" data-text="Nos Expériences">Nos Expériences</span>
          </h1>
          <p class="subtitle">
            Quatre univers. <span class="highlight">Quatre concepts.</span> Une Nuit.
          </p>
          <div class="scroll-indicator">
            <span class="arrow-down">↓</span>
          </div>
        </div>
      </div>

      <!-- 1. Eco-Quest RPG (Retro Terminal Style) -->
      <section class="game-section eco-quest">
        <div class="terminal-window">
          <div class="terminal-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-title">eco_quest_launcher.sh</span>
          </div>
          <div class="terminal-body">
            <p class="term-line">
              <span class="prompt">user@nird:~$</span> ./init_adventure.sh --green-mode
            </p>
            <p class="term-line">
              <span class="system">SYSTEM:</span> Loading world assets... [OK]
            </p>
            <p class="term-line">
              <span class="system">SYSTEM:</span> Optimizing AI models... <span class="success">[COMPLETED]</span>
            </p>
            <br />
            <p class="term-line typing-effect">
              "Bienvenue, voyageur. Vous entrez dans un monde où chaque mot compte."
            </p>
            <p class="term-line typing-effect-delayed">
              Le destin de la planète dépend de vos choix... et de la taille de votre modèle.
            </p>
            <br />
            <div class="terminal-actions">
              <button class="retro-btn" @click="$router.push('/rpg/setup')">
                [ COMMENCER L'AVENTURE ]
              </button>
            </div>
          </div>
        </div>
        <div class="section-info">
          <h2 class="retro-title">Eco-Quest RPG</h2>
          <p>
            Un Jeu de Rôle textuel où la puissance brute ne fait pas tout.
            Comparez des modèles massifs à des modèles optimisés (Green AI).
            Moins de consommation, plus d'imagination.
          </p>
        </div>
      </section>

      <!-- 2. Au Cœur du LLM (Tech / Lab Style) -->
      <section class="game-section llm-core">
        <div class="blueprint-bg">
          <div class="grid-lines"></div>
          <!-- Container for Infinite Scrolling -->
          <div class="infinite-scroll-container">
            <!-- First Group -->
            <div class="terms-group">
              <span class="term t1">Q4_K_M</span>
              <span class="term t2">LORA</span>
              <span class="term t3">AWQ</span>
              <span class="term t4">GPTQ</span>
              <span class="term t5">FP16</span>
              <span class="term t6">INT8</span>
              <span class="term t7">BF16</span>
              <span class="term t8">PRUNING</span>
            </div>
            <!-- Duplicate Group for seamless loop -->
            <div class="terms-group">
              <span class="term t1">Q4_K_M</span>
              <span class="term t2">LORA</span>
              <span class="term t3">AWQ</span>
              <span class="term t4">GPTQ</span>
              <span class="term t5">FP16</span>
              <span class="term t6">INT8</span>
              <span class="term t7">BF16</span>
              <span class="term t8">PRUNING</span>
            </div>
          </div>
        </div>
        
        <div class="lab-interface">
          <div class="tech-visual-container">
             <!-- Tensor Cube Visualization -->
             <div class="tensor-cube">
                <div class="face front"><span>WEIGHTS</span></div>
                <div class="face back"><span>BIAS</span></div>
                <div class="face right"><span>ATTENTION</span></div>
                <div class="face left"><span>LAYERS</span></div>
                <div class="face top"><span>INPUT</span></div>
                <div class="face bottom"><span>OUTPUT</span></div>
             </div>
             <div class="orbit-data-ring"></div>
          </div>

          <div class="lab-content">
            <h2 class="lab-title">Au Cœur du LLM</h2>
            <p class="lab-desc">
              Plongez dans les matrices. <span class="tech-term">LORA</span>, <span class="tech-term">Q4_K_M</span>, <span class="tech-term">INT8</span>...
              Ces termes ne sont pas de la magie, c'est de l'optimisation.
              <br><br>
              Comprenez comment la <span class="tech-highlight">quantification</span> réduit la précision pour gagner en vitesse et en énergie, sans perdre l'intelligence.
            </p>
            <button class="lab-btn" @click="$router.push('/games/llm')">
              <span class="btn-icon">⚙️</span> LANCER LA SIMULATION
            </button>
          </div>
        </div>
      </section>

      <!-- 3. Le Serpent Caché (Mystery / Minimalist) -->
      <section class="game-section hidden-snake">
        <div class="void-container">
          <h2 class="void-text" @mouseenter="revealHint" @mouseleave="hideHint">
            Mais où est le serpent ?
          </h2>
          <p class="void-hint" :class="{ visible: showHint }">
            <i>Cherchez l'anomalie dans le vide...</i>
          </p>
          <!-- The "Snake" is a tiny pixel at the bottom right -->
          <div class="snake-trigger" title="Sssss..."></div>
        </div>
      </section>

      <!-- 4. Samurai Volume (Chaos / Glitch) -->
      <section class="game-section samurai-chaos">
        <div class="chaos-overlay"></div>
        <div class="chaos-container">
          <div class="glitch-box" data-text="SAMURAI VOLUME">
            SAMURAI VOLUME
          </div>
          
          <div class="volume-control-gone-wrong">
            <div class="volume-knob">
              <div class="knob-marker"></div>
            </div>
            <div class="volume-display">VOL: <span class="shaking-text">ERROR</span>%</div>
          </div>

          <div class="chaos-desc">
            <p>IL EST POSSÉDÉ.</p>
            <p>IL NE VEUT PAS BAISSER.</p>
            <p class="highlight-red">CALMEZ-LE SI VOUS L'OSEZ.</p>
          </div>

          <button class="chaos-btn" @click="$router.push('/games/volume')">
            DÉGAINER LE KATANA
          </button>
        </div>
      </section>
    </main>

    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Logic for Snake Hint
const showHint = ref(false)
const revealHint = () => showHint.value = true
const hideHint = () => showHint.value = false
</script>

<style scoped>
.games-view {
  background: #000;
  color: white;
  overflow-x: hidden;
}

/* --- Enhanced Hero Section --- */
.intro-section {
  position: relative;
  text-align: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #050505;
}

.intro-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(0, 102, 255, 0.15), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(107, 70, 193, 0.15), transparent 40%);
  z-index: 1;
}

.intro-content {
  position: relative;
  z-index: 2;
  padding: 0 1rem;
}

.main-title {
  font-family: 'Inter', sans-serif;
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -3px;
  line-height: 1.1;
  color: white;
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.glitch-text {
  position: relative;
  display: inline-block;
  background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  color: #a0a0a0;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.highlight {
  color: var(--neon-green);
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
}

.scroll-indicator {
  position: relative;
  margin-top: 2rem;
  left: 50%; /* Re-add for horizontal centering */
  transform: translateX(-50%); /* Re-add for horizontal centering */
  font-size: 2.5rem;
  color: var(--neon-green);
  animation: bounce 2s infinite;
  opacity: 1;
  text-shadow: 0 0 10px var(--neon-green);
  font-weight: bold;
}

/* Generic Section Style */
.game-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 4rem 2rem;
}

/* --- 1. Eco-Quest (Retro Terminal) --- */
.eco-quest {
  background: #0d1117;
  flex-direction: column;
  gap: 3rem;
  border-top: 1px solid #222;
}

.terminal-window {
  background: #000;
  border: 1px solid #333;
  border-radius: 10px;
  box-shadow: 0 20px 50px rgba(0, 255, 0, 0.05);
  width: 100%;
  max-width: 800px;
  font-family: 'Courier New', monospace;
  overflow: hidden;
  position: relative;
}

.terminal-header {
  background: #161b22;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #333;
}

.dot { width: 12px; height: 12px; border-radius: 50%; }
.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.terminal-title {
  margin-left: 10px;
  font-size: 0.8rem;
  color: #8b949e;
}

.terminal-body {
  padding: 2rem;
  color: #0f0;
  min-height: 300px;
}

.term-line { margin: 0.5rem 0; line-height: 1.4; }
.prompt { color: #27c93f; font-weight: bold; }
.system { color: #79c0ff; }
.success { color: #27c93f; }

.retro-btn {
  background: transparent;
  border: 1px solid #27c93f;
  color: #27c93f;
  padding: 0.8rem 2rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
}

.retro-btn:hover {
  background: #27c93f;
  color: #000;
  box-shadow: 0 0 15px #27c93f;
}

.section-info { text-align: center; max-width: 600px; }
.retro-title { font-family: 'Courier New', monospace; color: #27c93f; margin-bottom: 1rem; font-size: 2rem; }

/* --- 2. LLM Core (Tech / Lab Style) --- */
.llm-core {
  background: #020408;
  overflow: hidden;
  position: relative;
}

.blueprint-bg {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(rgba(0, 102, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 102, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  perspective: 1000px;
}

/* Infinite Scrolling Optimization Terms */
.infinite-scroll-container {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  /* Height needs to be large enough to accommodate the scrolling */
  height: 200%; 
  animation: scroll-up 30s linear infinite;
  pointer-events: none;
}

.terms-group {
  position: relative;
  height: 50%; /* Each group takes 50% of the double-height container */
  width: 100%;
}

.term {
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 0 15px rgba(0, 102, 255, 0.8);
  white-space: nowrap;
}

/* Fixed positions relative to their group */
.t1 { top: 10%; left: 10%; }
.t2 { top: 20%; right: 15%; font-size: 1.2rem; }
.t3 { bottom: 15%; left: 20%; }
.t4 { bottom: 30%; right: 10%; }
.t5 { top: 50%; left: 5%; font-size: 3rem; opacity: 0.5; }
.t6 { top: 15%; left: 40%; }
.t7 { bottom: 40%; left: 60%; }
.t8 { top: 80%; right: 30%; }

@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

.lab-interface {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  z-index: 2;
}

/* Tensor Cube Visual */
.tech-visual-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

.tensor-cube {
  width: 150px;
  height: 150px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate-cube 15s infinite linear;
}

.face {
  position: absolute;
  width: 150px;
  height: 150px;
  background: rgba(0, 102, 255, 0.1);
  border: 1px solid rgba(0, 102, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  color: #0066FF;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: inset 0 0 20px rgba(0, 102, 255, 0.2);
}

.front  { transform: translateZ(75px); }
.back   { transform: rotateY(180deg) translateZ(75px); }
.right  { transform: rotateY(90deg) translateZ(75px); }
.left   { transform: rotateY(-90deg) translateZ(75px); }
.top    { transform: rotateX(90deg) translateZ(75px); }
.bottom { transform: rotateX(-90deg) translateZ(75px); }

.orbit-data-ring {
  position: absolute;
  width: 350px;
  height: 350px;
  border: 1px dashed rgba(0, 102, 255, 0.3);
  border-radius: 50%;
  transform: rotateX(75deg);
  animation: spin 10s linear infinite;
}

@keyframes rotate-cube {
  0% { transform: rotateX(0) rotateY(0); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

.lab-content { text-align: left; }

.lab-title {
  font-size: 3.5rem;
  color: white;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
}

.lab-desc {
  font-size: 1.1rem;
  color: #b0c4de;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.tech-term {
  font-family: monospace;
  background: rgba(0, 102, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  color: #0066FF;
}

.tech-highlight { color: #0066FF; font-weight: bold; text-shadow: 0 0 10px rgba(0,102,255,0.3); }

.lab-btn {
  background: rgba(0, 102, 255, 0.1);
  border: 1px solid #0066FF;
  color: #0066FF;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.lab-btn:hover {
  background: #0066FF;
  color: white;
  box-shadow: 0 0 30px rgba(0, 102, 255, 0.4);
}

/* --- 3. Hidden Snake (Minimalist) --- */
.hidden-snake {
  background: #000;
  min-height: 60vh; /* Smaller section */
  cursor: help;
}

.void-container {
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.void-text {
  font-size: 2rem;
  font-weight: 300;
  color: #333;
  letter-spacing: 5px;
  transition: color 0.5s;
}

.void-text:hover {
  color: #555;
}

.void-hint {
  margin-top: 2rem;
  color: #222;
  opacity: 0;
  transition: opacity 1s ease;
}

.void-hint.visible {
  opacity: 1;
}

/* The hidden trigger: Tiny pixel, bottom right */
.snake-trigger {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #111; /* Almost invisible */
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.snake-trigger:hover {
  background: #0f0; /* Light up green on hover */
  box-shadow: 0 0 10px #0f0;
  transform: scale(2);
}

/* --- 4. Samurai Volume (Chaos) --- */
.samurai-chaos {
  background: #0f0000;
  position: relative;
  overflow: hidden;
  border-top: 5px solid #FF0000;
}

.chaos-overlay {
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmYwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+');
  opacity: 0.5;
}

.chaos-container {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.glitch-box {
  font-size: 4rem;
  font-weight: 900;
  color: #FF0000;
  text-transform: uppercase;
  position: relative;
  animation: glitch-shake 2s infinite;
}

.volume-control-gone-wrong {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 2rem 0;
}

.volume-knob {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(#444, #111);
  border: 4px solid #FF0000;
  box-shadow: 0 0 20px #FF0000;
  position: relative;
  animation: angry-knob 0.5s linear infinite alternate;
}

.knob-marker {
  position: absolute;
  top: 10px;
  left: 50%;
  width: 4px;
  height: 20px;
  background: #FF0000;
  transform: translateX(-50%);
}

.volume-display {
  margin-top: 20px;
  font-family: monospace;
  font-size: 1.5rem;
  color: #FF0000;
  white-space: nowrap; /* Prevent wrapping */
}

.shaking-text {
  display: inline-block;
  animation: glitch-shake 0.2s infinite;
}

.chaos-desc {
  font-size: 1.2rem;
  color: #aaa;
}

.highlight-red {
  color: #FF0000;
  font-weight: bold;
  font-size: 1.4rem;
  display: block;
  margin-top: 1rem;
}

.chaos-btn {
  background: #FF0000;
  color: black;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  transform: skewX(-10deg);
  cursor: pointer;
  transition: transform 0.1s;
}

.chaos-btn:hover {
  transform: skewX(-10deg) scale(1.1);
  box-shadow: 0 0 30px #FF0000;
}

/* Animations */
@keyframes pulse-blue {
  0% { box-shadow: 0 0 30px rgba(0, 102, 255, 0.5); opacity: 0.8; }
  50% { box-shadow: 0 0 60px rgba(0, 102, 255, 0.8); opacity: 1; }
  100% { box-shadow: 0 0 30px rgba(0, 102, 255, 0.5); opacity: 0.8; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes angry-knob {
  0% { transform: rotate(-10deg); }
  100% { transform: rotate(130deg); }
}

@keyframes glitch-shake {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
  40% {transform: translateY(-10px) translateX(-50%);}
  60% {transform: translateY(-5px) translateX(-50%);}
}

@media (max-width: 900px) {
  .lab-interface {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  .lab-content {
    text-align: center;
    order: -1; /* Text first on mobile */
  }
  .lab-btn {
    margin: 0 auto;
  }
  .main-title {
    font-size: 3rem;
  }
  .tech-visual-container {
    transform: scale(0.8);
    margin-top: -2rem;
  }
}
</style>