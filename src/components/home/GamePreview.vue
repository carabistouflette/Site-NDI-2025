<template>
  <section id="games" class="game-nexus">
    <div class="nexus-bg">
      <div class="scanline"></div>
    </div>

    <div class="container">
      <div class="header-glitch">
        <h2 class="section-title">ZONES D'INTERACTION</h2>
        <p class="subtitle">Initialisation des protocoles ludiques...</p>
      </div>

      <div class="cards-container" @mousemove="handleContainerMouseMove">
        <div v-for="(game, index) in games" :key="index" class="holo-card" :class="game.variant"
          @mousemove="handleCardMove($event, index)" @mouseleave="handleCardLeave(index)" 
          @click="goToGames"
          :style="cardStyles[index]">
          <div class="card-content">
            <div class="card-header">
              <div class="icon-3d">{{ game.icon }}</div>
              <span class="status-badge">ONLINE</span>
            </div>

            <div class="card-body">
              <h3 class="game-title">{{ game.title }}</h3>
              <p class="game-desc">{{ game.desc }}</p>
            </div>

            <div class="card-footer">
              <div class="stat-row">
                <span class="stat-label">NIVEAU DE CHAOS</span>
                <div class="chaos-meter">
                  <span class="chaos-value">{{ game.chaosLevel }}</span>
                </div>
              </div>
              <button class="launch-btn" @click.stop="goToGames">
                INITIALISER <span class="btn-glitch">>></span>
              </button>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="card-border"></div>
          <div class="shine"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToGames = () => {
  router.push('/games')
}

const games = [
  {
    title: 'Au Cœur du LLM',
    desc: 'Comprenez enfin la "boîte noire". Une démo interactive sur la quantification et l\'optimisation.',
    icon: '🧠',
    variant: 'digital',
    chaosLevel: '🧠 CÉRÉBRAL'
  },
  {
    title: 'Eco-Quest RPG',
    desc: 'Aventure textuelle comparant différents modèles d\'IA. Le Green IT en action.',
    icon: '🌱',
    variant: 'sustainable',
    chaosLevel: '🌱 BIODEGRADABLE'
  },
  {
    title: 'Samurai Volume',
    desc: 'Un contrôleur de volume possédé. Quiconque peut le calmer sera un réel samurai.',
    icon: '🔊',
    variant: 'responsible',
    chaosLevel: '🔥 OVER 9000'
  },
  {
    title: 'Le Serpent Caché',
    desc: 'Mais où est le serpent ? Cherchez bien...',
    icon: '🐍',
    variant: 'inclusive',
    chaosLevel: '👀 INVISIBLE'
  }
]

// Gestion de l\'effet Tilt 3D
const cardStyles = reactive(games.map(() => ({})))

const handleCardMove = (e: MouseEvent, index: number) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = ((y - centerY) / centerY) * -10 // Max 10deg rotation
  const rotateY = ((x - centerX) / centerX) * 10

  cardStyles[index] = {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    '--mouse-x': `${x}px`,
    '--mouse-y': `${y}px`
  }
}

const handleCardLeave = (index: number) => {
  cardStyles[index] = {
    transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
    transition: 'transform 0.5s ease'
  }
}

const handleContainerMouseMove = (e: MouseEvent) => {
  const cards = document.querySelectorAll('.holo-card')
  cards.forEach(card => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
      ; (card as HTMLElement).style.setProperty('--spotlight-x', `${x}px`)
      ; (card as HTMLElement).style.setProperty('--spotlight-y', `${y}px`)
  })
}
</script>

<style scoped>
.game-nexus {
  padding: 8rem 1rem;
  background: #020202;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
}

/* Background Animated Grid */
.nexus-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: top center;
  pointer-events: none;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: rgba(0, 255, 0, 0.1);
  filter: blur(5px);
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% {
    top: -10%;
  }

  100% {
    top: 110%;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Header Styles */
.header-glitch {
  text-align: center;
  margin-bottom: 6rem;
}

.section-title {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  position: relative;
  display: inline-block;
  letter-spacing: 4px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

.subtitle {
  color: var(--neon-green);
  font-family: monospace;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-transform: uppercase;
  opacity: 0.8;
}

/* Cards Grid */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  padding: 1rem;
}

/* Holo Card Main Style */
.holo-card {
  position: relative;
  height: 450px;
  background: rgba(10, 10, 10, 0.6);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform-style: preserve-3d;
  cursor: pointer;
  transition: transform 0.1s ease-out;
  /* Smooth movement */
}

/* Variant Colors */
.holo-card.digital {
  --card-color: #0066FF;
}

.holo-card.sustainable {
  --card-color: #F6AD55;
}

.holo-card.inclusive {
  --card-color: #6B46C1;
}

.holo-card.responsible {
  --card-color: #FF6B6B;
}

/* Card Internal Layout */
.card-content {
  position: absolute;
  inset: 2px;
  background: rgba(5, 5, 5, 0.9);
  border-radius: 14px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transform: translateZ(20px);
  /* Slight popping out */
  z-index: 5;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.icon-3d {
  font-size: 3.5rem;
  transform: translateZ(50px);
  /* Pop out more */
  filter: drop-shadow(0 0 20px var(--card-color));
}

.status-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--card-color);
  border: 1px solid var(--card-color);
  font-family: monospace;
  box-shadow: 0 0 10px var(--card-color);
}

.card-body {
  flex: 1;
  transform: translateZ(30px);
}

.game-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.game-desc {
  color: #888;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Stats & Button */
.card-footer {
  margin-top: auto;
  transform: translateZ(30px);
}

.stat-row {
  margin-bottom: 1.5rem;
}

.stat-label {
  display: block;
  color: #555;
  font-size: 0.7rem;
  font-family: monospace;
  margin-bottom: 5px;
}

.chaos-meter {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chaos-value {
  color: var(--card-color);
  font-weight: bold;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  font-size: 0.9rem;
  text-shadow: 0 0 10px var(--card-color);
}

.launch-btn {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 1px solid var(--card-color);
  color: var(--card-color);
  font-family: monospace;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.launch-btn:hover {
  background: var(--card-color);
  color: black;
  box-shadow: 0 0 20px var(--card-color);
}

/* Effects */
.card-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px;
  background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y),
      var(--card-color),
      transparent 40%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s;
}

.holo-card:hover .card-border {
  opacity: 1;
}

.shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.1),
      transparent 50%);
  border-radius: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  mix-blend-mode: overlay;
}

.holo-card:hover .shine {
  opacity: 1;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }

  .holo-card {
    transform: none !important;
  }

  /* Disable tilt on mobile */
}
</style>