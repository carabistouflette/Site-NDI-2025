<template>
  <div class="games-view">
    <n-layout>
      <n-layout-header>
        <AppHeader />
      </n-layout-header>
      
      <n-layout-content>
        <div class="terminal-container">
          <!-- Background Effects -->
          <div class="grid-bg"></div>
          <div class="scanline"></div>
          
          <!-- Header HUD -->
          <div class="hud-header animate-fade-down">
            <div class="hud-top-bar">
              <span class="hud-id">TERM_ID: NIRD_025</span>
              <span class="hud-status">STATUS: ONLINE</span>
            </div>
            <h1 class="terminal-title">
              GAME <span class="highlight">TERMINAL</span>
            </h1>
            <div class="hud-decoration"></div>
          </div>

          <!-- Filters -->
          <div class="filters-container animate-fade-in">
            <div class="filter-group">
              <button 
                v-for="filter in filters" 
                :key="filter.id"
                class="filter-btn"
                :class="{ active: activeFilter === filter.id, [filter.id]: true }"
                @click="activeFilter = filter.id"
              >
                <span class="filter-icon">{{ filter.icon }}</span>
                {{ filter.label }}
                <span class="count-badge">{{ getCount(filter.id) }}</span>
              </button>
            </div>
          </div>
          
          <!-- Games Grid -->
          <div class="games-grid" ref="gridRef">
            <transition-group name="grid-anim">
              <div 
                v-for="(game, index) in filteredGames" 
                :key="game.id"
                class="game-unit"
                :class="game.variant"
                @mousemove="handleCardMove($event, index)"
                @mouseleave="handleCardLeave(index)"
                :style="cardStyles[index]"
              >
                <div class="unit-frame">
                  <div class="corner tl"></div>
                  <div class="corner tr"></div>
                  <div class="corner bl"></div>
                  <div class="corner br"></div>
                  
                  <div class="unit-content">
                    <div class="unit-header">
                      <div class="icon-box">{{ game.emoji }}</div>
                      <div class="unit-meta">
                        <span class="unit-id">UNIT_{{ (index + 1).toString().padStart(3, '0') }}</span>
                        <span class="difficulty-indicator">
                          LVL {{ game.difficulty }}
                        </span>
                      </div>
                    </div>
                    
                    <h3 class="unit-title">{{ game.title }}</h3>
                    <p class="unit-desc">{{ game.description }}</p>
                    
                    <div class="unit-tags">
                      <span v-for="tag in game.tags" :key="tag" class="tag">#{{ tag }}</span>
                    </div>
                    
                    <button class="access-btn">
                      ACCEDER <span class="arrow">>></span>
                    </button>
                  </div>
                  
                  <!-- Decorative Overlay -->
                  <div class="scan-overlay"></div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </n-layout-content>
      
      <n-layout-footer>
        <AppFooter />
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Data
const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'TOUS', icon: '💠' },
  { id: 'digital', label: 'DIGITAL', icon: '💻' },
  { id: 'inclusive', label: 'INCLUSIF', icon: '👁️' },
  { id: 'responsible', label: 'RESPONSABLE', icon: '🛡️' },
  { id: 'sustainable', label: 'DURABLE', icon: '🌱' }
]

const games = [
  {
    id: 'code-adventure',
    title: 'Code Adventure',
    description: 'Initialisation des protocoles de programmation. Apprenez les bases du code.',
    variant: 'digital',
    emoji: '💻',
    tags: ['DEV', 'LOGIC'],
    difficulty: 1
  },
  {
    id: 'cyber-puzzle',
    title: 'Cyber Puzzle',
    description: 'Faille de sécurité détectée. Résolvez les énigmes pour patcher le système.',
    variant: 'inclusive',
    emoji: '🧩',
    tags: ['SEC', 'PUZZLE'],
    difficulty: 2
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy Quest',
    description: 'Protection des données personnelles. Échappez à la surveillance.',
    variant: 'responsible',
    emoji: '🕵️',
    tags: ['PRIVACY', 'STEALTH'],
    difficulty: 3
  },
  {
    id: 'green-it',
    title: 'Green IT Challenge',
    description: 'Optimisation énergétique requise. Réduisez l\'empreinte carbone du serveur.',
    variant: 'sustainable',
    emoji: '🌿',
    tags: ['ECO', 'OPTIM'],
    difficulty: 2
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics Lab',
    description: 'Analyse des biais algorithmiques. Entraînez une IA éthique.',
    variant: 'digital',
    emoji: '🤖',
    tags: ['AI', 'ETHICS'],
    difficulty: 4
  },
  {
    id: 'network-security',
    title: 'Network Defender',
    description: 'Attaque DDoS imminente. Déployez les pare-feu.',
    variant: 'inclusive',
    emoji: '🌐',
    tags: ['NET', 'DEFENSE'],
    difficulty: 3
  },
  {
    id: 'data-mining',
    title: 'Data Mining Explorer',
    description: 'Extraction de données précieuses dans un océan d\'informations.',
    variant: 'responsible',
    emoji: '⛏️',
    tags: ['DATA', 'MINING'],
    difficulty: 2
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Sky Quest',
    description: 'Navigation dans l\'infrastructure cloud. Maintenez l\'uptime.',
    variant: 'sustainable',
    emoji: '☁️',
    tags: ['CLOUD', 'OPS'],
    difficulty: 3
  }
]

// Computed
const filteredGames = computed(() => {
  if (activeFilter.value === 'all') return games
  return games.filter(game => game.variant === activeFilter.value)
})

const getCount = (filterId: string) => {
  if (filterId === 'all') return games.length
  return games.filter(game => game.variant === filterId).length
}

// 3D Tilt Logic
const cardStyles = reactive<any>({})

const handleCardMove = (e: MouseEvent, index: number) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -5
  const rotateY = ((x - centerX) / centerX) * 5

  cardStyles[index] = {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
  }
}

const handleCardLeave = (index: number) => {
  cardStyles[index] = {
    transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
  }
}
</script>

<style scoped>
.games-view {
  min-height: 100vh;
  background: #020202;
  color: white;
  font-family: 'Courier New', Courier, monospace; /* Tech font feel */
}

.terminal-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  min-height: 80vh;
}

/* Backgrounds */
.grid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.scanline {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: rgba(0, 255, 0, 0.1);
  opacity: 0.5;
  animation: scan 6s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes scan {
  0% { top: -10%; }
  100% { top: 110%; }
}

/* Header HUD */
.hud-header {
  position: relative;
  z-index: 2;
  margin-bottom: 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2rem;
}

.hud-top-bar {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--neon-green);
  margin-bottom: 1rem;
  opacity: 0.8;
}

.terminal-title {
  font-family: 'Inter', sans-serif; /* Cleaner font for title */
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin: 0;
}

.highlight {
  color: transparent;
  -webkit-text-stroke: 1px var(--neon-green);
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.hud-decoration {
  height: 2px;
  width: 100px;
  background: var(--neon-green);
  margin-top: 1rem;
  box-shadow: 0 0 10px var(--neon-green);
}

/* Filters */
.filters-container {
  position: relative;
  z-index: 2;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #888;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.filter-btn.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

/* Specific active colors */
.filter-btn.active.digital { border-color: #0066FF; color: #0066FF; }
.filter-btn.active.inclusive { border-color: #6B46C1; color: #6B46C1; }
.filter-btn.active.responsible { border-color: #FF6B6B; color: #FF6B6B; }
.filter-btn.active.sustainable { border-color: #F6AD55; color: #F6AD55; }
.filter-btn.active.all { border-color: var(--neon-green); color: var(--neon-green); }

.count-badge {
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 4px;
  opacity: 0.7;
}

/* Games Grid */
.games-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Game Unit (Card) */
.game-unit {
  position: relative;
  height: 380px;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.unit-frame {
  position: relative;
  height: 100%;
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Corners */
.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid var(--neon-green);
  z-index: 10;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.game-unit:hover .corner { opacity: 1; box-shadow: 0 0 5px var(--neon-green); }
.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.br { bottom: 0; right: 0; border-left: none; border-top: none; }

/* Content */
.unit-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.unit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.icon-box {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
}

.unit-meta {
  text-align: right;
  font-size: 0.7rem;
  color: #555;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.difficulty-indicator {
  color: var(--neon-green);
  border: 1px solid var(--neon-green);
  padding: 2px 4px;
  border-radius: 2px;
}

.unit-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.unit-desc {
  color: #999;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
}

.unit-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.7rem;
  color: #666;
  font-family: monospace;
}

.access-btn {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: white;
  font-family: 'Courier New', monospace;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 2px solid var(--neon-green);
}

.access-btn:hover {
  background: var(--neon-green);
  color: black;
  padding-left: 1.5rem;
}

.arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.access-btn:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Variant Specifics */
.digital .corner, .digital .access-btn { border-color: #0066FF; }
.digital:hover .access-btn { background: #0066FF; }
.digital .difficulty-indicator { color: #0066FF; border-color: #0066FF; }

.inclusive .corner, .inclusive .access-btn { border-color: #6B46C1; }
.inclusive:hover .access-btn { background: #6B46C1; }
.inclusive .difficulty-indicator { color: #6B46C1; border-color: #6B46C1; }

.responsible .corner, .responsible .access-btn { border-color: #FF6B6B; }
.responsible:hover .access-btn { background: #FF6B6B; }
.responsible .difficulty-indicator { color: #FF6B6B; border-color: #FF6B6B; }

.sustainable .corner, .sustainable .access-btn { border-color: #F6AD55; }
.sustainable:hover .access-btn { background: #F6AD55; }
.sustainable .difficulty-indicator { color: #F6AD55; border-color: #F6AD55; }

/* Animation Transition Group */
.grid-anim-move,
.grid-anim-enter-active,
.grid-anim-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.grid-anim-enter-from,
.grid-anim-leave-to {
  opacity: 0;
  transform: scale(0.9) translateZ(0);
}

.grid-anim-leave-active {
  position: absolute;
}

@media (max-width: 768px) {
  .terminal-title { font-size: 2rem; }
  .games-grid { grid-template-columns: 1fr; }
}
</style>