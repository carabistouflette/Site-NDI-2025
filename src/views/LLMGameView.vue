<template>
  <div class="llm-game-container">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>
    
    <div class="game-window">
      <!-- HUD Header -->
      <header class="game-header">
        <div class="header-left">
          <div class="logo">NEURAL_ENGINE // <span class="blink">CONNECTED</span></div>
          <div class="mini-stats">
            <span>MEM: {{ memoryUsage }}GB</span>
            <span>TEMP: <span :class="{ 'text-danger': isOverheating }">{{ temperature }}°C</span></span>
          </div>
        </div>
        <div class="progress-container">
          <div class="step-dots">
            <div v-for="s in 4" :key="s" class="step-dot" :class="{ active: stage >= s - 1, current: stage === s - 1 }"></div>
          </div>
        </div>
      </header>

      <!-- STAGE 0: BOOT SEQUENCE -->
      <section v-if="stage === 0" class="stage boot-stage">
        <div class="terminal-boot">
          <div v-for="(line, i) in bootLines" :key="i" class="boot-line">
            <span class="prefix">></span> {{ line }}
          </div>
        </div>
        <div v-if="bootComplete" class="start-prompt">
          <h1 class="glitch-title" data-text="AU CŒUR DU LLM">AU CŒUR DU LLM</h1>
          <p class="subtitle">Comprendre. Optimiser. Préserver.</p>
          <button class="cyber-btn" @click="nextStage">
            <span class="btn-content">INITIALISER LE SYSTÈME</span>
            <span class="btn-glitch"></span>
          </button>
        </div>
      </section>

      <!-- STAGE 1: TOKEN PREDICTION (The Brain) -->
      <section v-if="stage === 1" class="stage token-stage">
        <div class="stage-info">
          <h2>MODULE 1: PRÉDICTION PROBABILISTE</h2>
          <p>Un LLM ne réfléchit pas, il calcule la suite logique. Aidez-le à compléter la phrase.</p>
        </div>

        <div class="neural-viz">
          <div class="context-display">
            <span v-for="(word, i) in sentence" :key="i" class="confirmed-word">{{ word }}</span>
            <span class="cursor">_</span>
          </div>

          <div class="token-selector">
            <div 
              v-for="token in currentOptions" 
              :key="token.text"
              class="token-card"
              :class="{ 'best-pick': token.prob > 0.6 }"
              @click="pickToken(token)"
            >
              <div class="token-header">
                <span class="token-id">ID:{{ Math.floor(Math.random() * 9999) }}</span>
                <span class="token-prob">{{ (token.prob * 100).toFixed(1) }}%</span>
              </div>
              <div class="token-value">{{ token.text }}</div>
              <div class="prob-bar">
                <div class="prob-fill" :style="{ width: (token.prob * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STAGE 2: INFRASTRUCTURE (The Heat) -->
      <section v-if="stage === 2" class="stage infra-stage">
        <div class="alert-overlay" v-if="isOverheating"></div>
        <div class="stage-info">
          <h2>MODULE 2: INFRASTRUCTURE & OS</h2>
          <p>Le modèle tourne sur un OS propriétaire lourd. Les ressources sont gaspillées.</p>
        </div>

        <div class="server-room">
          <div class="rack-container">
            <div class="rack" :class="{ 'burning': isOverheating, 'optimized': !isOverheating }">
              <div class="server-unit" v-for="n in 5" :key="n">
                <div class="leds">
                  <span class="led"></span><span class="led"></span><span class="led"></span>
                </div>
                <div class="fan" :class="{ 'fast': isOverheating }"></div>
              </div>
            </div>
            <div class="metrics-panel">
              <div class="metric-row">
                <label>OS KERNEL</label>
                <span class="value">{{ isOverheating ? 'WIN_SVR_2025 (BLOATED)' : 'ALPINE LINUX (TINY)' }}</span>
              </div>
              <div class="metric-row">
                <label>CPU LOAD</label>
                <div class="bar-bg"><div class="bar-fill" :style="{ width: isOverheating ? '95%' : '15%', background: isOverheating ? 'red' : '#0f0' }"></div></div>
              </div>
              <div class="metric-row">
                <label>POWER</label>
                <div class="bar-bg"><div class="bar-fill" :style="{ width: isOverheating ? '850W' : '120W', background: isOverheating ? 'red' : '#0f0' }"></div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="actions-panel">
          <button v-if="isOverheating" class="cyber-btn warning" @click="installLinux">
            <span class="btn-content">>>> MIGRER VERS LINUX</span>
          </button>
          <button v-else class="cyber-btn success" @click="nextStage">
            <span class="btn-content">SYSTÈME STABILISÉ -> CONTINUER</span>
          </button>
        </div>
      </section>

      <!-- STAGE 3: QUANTIZATION (The Compression) -->
      <section v-if="stage === 3" class="stage quant-stage">
        <div class="stage-info">
          <h2>MODULE 3: QUANTIFICATION</h2>
          <p>Le modèle pèse trop lourd (FP16). Compressez les poids pour réduire l'empreinte carbone.</p>
        </div>

        <div class="quant-visualizer">
          <div class="model-core" :class="quantMode">
            <!-- Representing weights as particles/dots -->
            <div class="particles-container">
              <div v-for="n in 100" :key="n" class="weight-dot"></div>
            </div>
            <div class="core-label">{{ quantMode.toUpperCase() }}</div>
          </div>

          <div class="control-deck">
            <div class="slider-group">
              <label>PRÉCISION DES POIDS</label>
              <input type="range" min="0" max="2" step="1" v-model="quantIndex" class="cyber-slider">
              <div class="slider-labels">
                <span>FP16 (Original)</span>
                <span>INT8 (Optimisé)</span>
                <span>Q4_K_M (Eco)</span>
              </div>
            </div>

            <div class="impact-monitor">
              <div class="monitor-screen">
                <div class="line">VRAM: <span :class="energyColor">{{ vramUsage }} GB</span></div>
                <div class="line">CO2/req: <span :class="energyColor">{{ co2Usage }} g</span></div>
                <div class="line">QUALITY: <span class="text-white">{{ qualityScore }}%</span></div>
              </div>
            </div>
          </div>
        </div>

        <button v-if="quantIndex == 2" class="cyber-btn success" @click="finishGame">
          <span class="btn-content">DÉPLOYER LE MODÈLE OPTIMISÉ</span>
        </button>
      </section>

      <!-- STAGE 4: VICTORY -->
      <section v-if="stage === 4" class="stage victory-stage">
        <div class="hologram-projector">
          <div class="hologram-beam"></div>
          <div class="certificate">
            <div class="cert-icon">🌿</div>
            <h1>CERTIFIÉ GREEN AI</h1>
            <div class="cert-details">
              <p>Vous avez configuré un LLM performant et durable.</p>
              <ul>
                <li>Infrastructure: <strong>LINUX</strong> (Low Overhead)</li>
                <li>Modèle: <strong>QUANTIFIÉ (Q4)</strong> (Low Energy)</li>
                <li>Impact: <strong>-75% de consommation</strong></li>
              </ul>
            </div>
          </div>
        </div>
        <button class="cyber-btn" @click="$router.push('/games')">
          <span class="btn-content">RETOUR AU HUB</span>
        </button>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// --- GLOBAL STATE ---
const stage = ref(0)
const bgCanvas = ref<HTMLCanvasElement | null>(null)

// --- STAGE 0: BOOT ---
const bootLines = ref<string[]>([])
const bootComplete = ref(false)
const fullBootLog = [
  "Initializing Kernel...",
  "Loading Neural Weights...",
  "Checking GPU Availability... [OK]",
  "Mounting File System... [OK]",
  "Connecting to NIRD Network...",
  "System Ready."
]

function runBootSequence() {
  let i = 0
  const interval = setInterval(() => {
    if (i < fullBootLog.length) {
      bootLines.value.push(fullBootLog[i])
      i++
    } else {
      clearInterval(interval)
      bootComplete.value = true
    }
  }, 400)
}

// --- STAGE 1: TOKENS ---
const sentence = ref<string[]>(["L'IA", "durable", "est"])
const step = ref(0)

const scenarios = [
  {
    options: [
      { text: "l'avenir", prob: 0.85 },
      { text: "une pomme", prob: 0.01 },
      { text: "dangereuse", prob: 0.10 },
      { text: "bleue", prob: 0.04 }
    ]
  },
  {
    options: [
      { text: "pour", prob: 0.92 },
      { text: "contre", prob: 0.05 },
      { text: "avec", prob: 0.02 },
      { text: "sans", prob: 0.01 }
    ]
  },
  {
    options: [
      { text: "la planète", prob: 0.88 },
      { text: "le grille-pain", prob: 0.02 },
      { text: "l'espace", prob: 0.05 },
      { text: "rien", prob: 0.05 }
    ]
  }
]

const currentOptions = computed(() => {
  if (step.value >= scenarios.length) return []
  return scenarios[step.value].options.sort((a, b) => b.prob - a.prob) // Sort visually? No, let's shuffle or keep fixed to make user look. Actually sorted is better for "Top K" viz.
})

function pickToken(token: any) {
  if (token.prob < 0.2) {
    // Punish bad choice?
    alert("Ce mot semble peu probable dans ce contexte. Réessayez.")
    return
  }
  sentence.value.push(token.text)
  step.value++
  if (step.value >= scenarios.length) {
    setTimeout(() => nextStage(), 1000)
  }
}

// --- STAGE 2: INFRA ---
const isOverheating = ref(true)
const temperature = ref(85)
const memoryUsage = ref(16)

function installLinux() {
  isOverheating.value = false
  // Animate values dropping
  const interval = setInterval(() => {
    if (temperature.value > 35) temperature.value -= 2
    if (memoryUsage.value > 4) memoryUsage.value -= 0.5
    else clearInterval(interval)
  }, 50)
}

// --- STAGE 3: QUANTIZATION ---
const quantIndex = ref(0)
const quantMode = computed(() => {
  if (quantIndex.value == 0) return 'fp16'
  if (quantIndex.value == 1) return 'int8'
  return 'q4'
})
const vramUsage = computed(() => {
  if (quantIndex.value == 0) return 24
  if (quantIndex.value == 1) return 12
  return 6
})
const co2Usage = computed(() => {
  if (quantIndex.value == 0) return 4.5
  if (quantIndex.value == 1) return 2.1
  return 0.8
})
const qualityScore = computed(() => {
  if (quantIndex.value == 0) return 100
  if (quantIndex.value == 1) return 99
  return 96
})
const energyColor = computed(() => {
  if (quantIndex.value == 0) return 'text-danger'
  if (quantIndex.value == 1) return 'text-warning'
  return 'text-success'
})

// --- NAVIGATION ---
function nextStage() {
  stage.value++
}

function finishGame() {
  stage.value = 4
}

// --- CANVAS BACKGROUND ---
let animationFrame: number
function initCanvas() {
  const canvas = bgCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: any[] = []
  for(let i=0; i<50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 2
    })
  }

  function animate() {
    if (!ctx || !canvas) return
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#00ff41'
    particles.forEach(p => {
      p.y += p.speed
      if (p.y > canvas.height) p.y = 0
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.05)'
    ctx.lineWidth = 1
    const gridSize = 50
    /*
    for(let x=0; x<canvas.width; x+=gridSize) {
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    */ // Too busy?

    animationFrame = requestAnimationFrame(animate)
  }
  animate()
}

onMounted(() => {
  runBootSequence()
  initCanvas()
  window.addEventListener('resize', () => {
    if(bgCanvas.value) {
      bgCanvas.value.width = window.innerWidth
      bgCanvas.value.height = window.innerHeight
    }
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
/* --- VARIABLES & FONTS --- */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

.llm-game-container {
  min-height: 100vh;
  background: #000;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.game-window {
  position: relative;
  z-index: 10;
  width: 95%;
  max-width: 1000px;
  min-height: 650px;
  background: rgba(10, 12, 16, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid #333;
  border-radius: 4px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* --- HEADER --- */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0,0,0,0.6);
  border-bottom: 1px solid #333;
}

.logo {
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
}

.blink { animation: blink 1s infinite; color: #0f0; }
@keyframes blink { 50% { opacity: 0; } }

.mini-stats {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.2rem;
  display: flex;
  gap: 1rem;
}

.text-danger { color: #ff3333; }
.text-warning { color: #ffbd2e; }
.text-success { color: #0f0; }
.text-white { color: white; }

.step-dots {
  display: flex;
  gap: 8px;
}

.step-dot {
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
}
.step-dot.active { background: #0066ff; }
.step-dot.current { box-shadow: 0 0 10px #0066ff; background: #fff; }

/* --- STAGES COMMON --- */
.stage {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.stage-info {
  margin-bottom: 2rem;
  border-left: 3px solid #0066ff;
  padding-left: 1rem;
}

.stage-info h2 {
  color: #0066ff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.stage-info p {
  color: #aaa;
  font-size: 0.9rem;
  max-width: 600px;
}

/* --- BUTTONS --- */
.cyber-btn {
  position: relative;
  background: transparent;
  border: 1px solid #0066ff;
  color: #0066ff;
  padding: 1rem 2rem;
  font-family: inherit;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: auto;
  align-self: flex-start;
}

.cyber-btn:hover {
  background: rgba(0, 102, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 102, 255, 0.4);
  letter-spacing: 1px;
}

.cyber-btn.warning { border-color: #ff3333; color: #ff3333; }
.cyber-btn.warning:hover { background: rgba(255, 51, 51, 0.1); box-shadow: 0 0 20px rgba(255, 51, 51, 0.4); }

.cyber-btn.success { border-color: #0f0; color: #0f0; }
.cyber-btn.success:hover { background: rgba(0, 255, 0, 0.1); box-shadow: 0 0 20px rgba(0, 255, 0, 0.4); }


/* --- STAGE 0: BOOT --- */
.boot-stage {
  justify-content: center;
  align-items: center;
}

.terminal-boot {
  width: 100%;
  max-width: 600px;
  font-size: 0.9rem;
  color: #0f0;
  margin-bottom: 2rem;
  min-height: 150px;
}

.boot-line { margin-bottom: 0.5rem; }
.prefix { opacity: 0.5; margin-right: 0.5rem; }

.start-prompt { text-align: center; animation: fadeIn 1s; }

.glitch-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 2px 2px 0px #0066ff;
  margin-bottom: 0.5rem;
}

.subtitle { color: #888; margin-bottom: 2rem; }

/* --- STAGE 1: TOKENS --- */
.neural-viz {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.context-display {
  font-size: 1.5rem;
  background: rgba(255,255,255,0.05);
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  border: 1px solid #333;
}

.confirmed-word { color: #fff; margin-right: 0.6em; }
.cursor { color: #0066ff; animation: blink 1s infinite; }

.token-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
}

.token-card {
  background: #111;
  border: 1px solid #333;
  padding: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.token-card:hover {
  border-color: #0066ff;
  transform: translateY(-5px);
  background: #161616;
}

.token-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.token-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
}

.prob-bar {
  height: 4px;
  background: #222;
  border-radius: 2px;
}

.prob-fill {
  height: 100%;
  background: #0066ff;
  box-shadow: 0 0 10px #0066ff;
}

/* --- STAGE 2: INFRA --- */
.infra-stage { position: relative; }

.alert-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, transparent 50%, rgba(255, 0, 0, 0.2) 100%);
  pointer-events: none;
  animation: pulse-red 1s infinite;
  z-index: 0;
}

@keyframes pulse-red {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.server-room {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.rack-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
}

.rack {
  width: 200px;
  background: #111;
  border: 4px solid #333;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.5s;
}

.rack.burning { border-color: #ff3333; box-shadow: 0 0 30px rgba(255, 0, 0, 0.3); }
.rack.optimized { border-color: #0f0; box-shadow: 0 0 30px rgba(0, 255, 0, 0.2); }

.server-unit {
  height: 40px;
  background: #222;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.leds { display: flex; gap: 4px; }
.led { width: 4px; height: 4px; background: #0f0; border-radius: 50%; animation: blink 0.2s infinite alternate; }
.burning .led { background: #ff3333; animation-duration: 0.05s; }

.fan {
  width: 20px;
  height: 20px;
  border: 2px solid #444;
  border-radius: 50%;
  border-top-color: #888;
  animation: spin 2s linear infinite;
}
.fan.fast { animation-duration: 0.1s; border-color: #ff3333; }

@keyframes spin { to { transform: rotate(360deg); } }

.metrics-panel {
  flex: 1;
  background: rgba(0,0,0,0.5);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #333;
}

.metric-row {
  margin-bottom: 1.5rem;
}

.metric-row label {
  display: block;
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.metric-row .value {
  font-size: 1.2rem;
  font-weight: bold;
}

.bar-bg {
  height: 10px;
  background: #222;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
}

.bar-fill { height: 100%; transition: all 1s ease; }

.actions-panel {
  display: flex;
  justify-content: center;
}

/* Shake animation removed */

/* --- STAGE 3: QUANTIZATION --- */
.quant-visualizer {
  display: flex;
  gap: 3rem;
  height: 100%;
}

.model-core {
  flex: 1;
  border: 1px solid #333;
  background: #050505;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.particles-container {
  width: 200px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  transition: all 1s;
}

.weight-dot {
  width: 18px;
  height: 18px;
  background: #ff3333;
  border-radius: 2px;
  transition: all 0.5s;
}

.model-core.int8 .particles-container { width: 140px; height: 140px; }
.model-core.int8 .weight-dot { width: 12px; height: 12px; background: #ffbd2e; }

.model-core.q4 .particles-container { width: 100px; height: 100px; }
.model-core.q4 .weight-dot { width: 8px; height: 8px; background: #0f0; border-radius: 50%; }

.core-label {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 2rem;
  font-weight: 900;
  opacity: 0.2;
}

.control-deck {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.slider-group label { display: block; margin-bottom: 1rem; color: #0066ff; }

.cyber-slider {
  width: 100%;
  margin-bottom: 1rem;
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

.monitor-screen {
  background: #111;
  border: 1px solid #333;
  padding: 1rem;
  font-family: monospace;
}

.monitor-screen .line {
  margin-bottom: 0.5rem;
  border-bottom: 1px dashed #222;
  padding-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
}

/* --- STAGE 4: VICTORY --- */
.victory-stage {
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hologram-projector {
  position: relative;
  margin-bottom: 3rem;
}

.hologram-beam {
  width: 200px;
  height: 300px;
  background: linear-gradient(to top, rgba(0, 255, 0, 0.2), transparent);
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  pointer-events: none;
}

.certificate {
  background: rgba(0, 20, 0, 0.8);
  border: 2px solid #0f0;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 50px rgba(0, 255, 0, 0.2);
  animation: float 3s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.cert-icon { font-size: 4rem; margin-bottom: 1rem; }
.cert-details { text-align: left; margin-top: 1.5rem; color: #ccc; }
.cert-details ul { list-style: none; padding: 0; }
.cert-details li { margin-bottom: 0.5rem; border-bottom: 1px solid rgba(0,255,0,0.2); padding-bottom: 0.5rem; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .quant-visualizer { flex-direction: column; }
  .rack-container { flex-direction: column; }
  .rack { width: 100%; flex-direction: row; justify-content: space-around; }
  .server-unit { width: 18%; }
}
</style>
