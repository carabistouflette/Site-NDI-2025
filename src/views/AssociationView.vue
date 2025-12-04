<template>
  <div class="nird-experience" :class="{ 'eco-mode': isEcoMode }">
    <!-- Background Canvas for Particles -->
    <canvas ref="canvasRef" class="network-canvas"></canvas>

    <!-- Navigation Dots -->
    <nav class="section-nav">
      <button 
        v-for="(section, index) in sections" 
        :key="index"
        :class="{ active: currentSection === index }"
        @click="scrollToSection(index)"
      >
        <span class="nav-label">{{ section.title }}</span>
      </button>
    </nav>

    <!-- ECO MODE TOGGLE (Fixed) -->
    <div class="eco-toggle-wrapper">
      <div class="eco-toggle-label">MODE SOBRIÉTÉ</div>
      <button class="eco-switch" @click="toggleEcoMode" :aria-pressed="isEcoMode">
        <div class="switch-track">
          <div class="switch-thumb">
            <span class="leaf-icon">🌿</span>
          </div>
        </div>
      </button>
    </div>

    <!-- SECTIONS -->
    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
      
      <!-- 0. HERO: The Paradigm Shift -->
      <section class="immersive-section hero-section" data-index="0">
        <div class="hero-container">
          <!-- Abstract Geometric Core representing the convergence -->
          <div class="geometric-core" :class="{ 'hovered': isHoveringCore }" @mouseenter="isHoveringCore = true" @mouseleave="isHoveringCore = false">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
            <div class="core-point"></div>
          </div>
          
          <div class="manifesto-container">
            <h1 class="light-title">Repenser le <span class="highlight">Numérique</span></h1>
            <div class="rotating-text-wrapper">
              <span class="prefix">Pour qu'il soit</span>
              <div class="scrolling-words">
                <span class="word word-1">Inclusif</span>
                <span class="word word-2">Responsable</span>
                <span class="word word-3">Durable</span>
                <span class="word word-1">Inclusif</span> <!-- Duplicate for loop -->
              </div>
            </div>
          </div>

          <div class="scroll-hint-minimal">
            <div class="line"></div>
            <span>SCROLL</span>
          </div>
        </div>
      </section>

      <!-- 1. INCLUSION: The Network -->
      <section class="immersive-section inclusion-section" data-index="1">
        <div class="content-box left">
          <h2 class="section-title">Inclusion Numérique</h2>
          <p class="interactive-instruction">
            <span class="icon">🖱️</span> Survolez les nœuds pour rétablir la connexion.
          </p>
          <div class="text-block">
            <h3>Briser la fracture</h3>
            <p>
              L'accès au numérique ne doit pas être un privilège. 
              Nous tissons des liens là où ils sont rompus, offrant matériel et formation pour que personne ne reste hors ligne.
            </p>
          </div>
        </div>
      </section>

      <!-- 2. RESPONSABILITÉ: The Decoder -->
      <section class="immersive-section responsible-section" data-index="2">
        <div class="decoder-overlay" :style="decoderStyle"></div>
        <div class="content-box right">
          <h2 class="section-title">Responsabilité & Éthique</h2>
          <p class="interactive-instruction">
            <span class="icon">🔦</span> Utilisez votre curseur pour révéler la vérité.
          </p>
          <div class="encrypted-content" ref="encryptedContent">
            <div class="truth-layer">
              <h3>Citoyen, pas produit</h3>
              <p>
                Le numérique responsable, c'est comprendre ce qu'on utilise.
                Nous défendons le logiciel libre, la protection des données et la souveraineté numérique.
                Ne soyez plus un "cliqueur" passif.
              </p>
            </div>
            <div class="noise-layer" aria-hidden="true">
              ERROR 404 ETHICS NOT FOUND SYSTEM FAILURE DATA LEAK TRACKING ENABLED ADS ADS ADS CONSUME OBEY BUY NOW NO PRIVACY DETECTED
            </div>
          </div>
        </div>
      </section>

      <!-- 3. DURABILITÉ: The Eco Switch -->
      <section class="immersive-section sustainable-section" data-index="3">
        <div class="content-box center">
          <h2 class="section-title">Durabilité</h2>
          <div class="text-block">
            <h3>Le poids de l'immatériel</h3>
            <p>
              Le numérique pollue. Il consomme. Il chauffe.
              La vraie innovation, c'est de faire mieux avec moins.
            </p>
            <p class="cta-text">Activez le bouton en haut à droite pour comprendre la sobriété.</p>
          </div>
          
          <div class="stats-display" v-if="isEcoMode">
            <div class="stat-row">
              <span>GPU LOAD:</span>
              <span class="stat-value text-green">0% (IDLE)</span>
            </div>
            <div class="stat-row">
              <span>ANIMATIONS:</span>
              <span class="stat-value text-green">DISABLED</span>
            </div>
            <div class="stat-row">
              <span>ENERGY:</span>
              <span class="stat-value text-green">OPTIMIZED</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// --- STATE ---
const isEcoMode = ref(false)
const currentSection = ref(0)
const scrollContainer = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHoveringCore = ref(false)

const sections = [
  { title: 'INIT' },
  { title: 'INCLUSION' },
  { title: 'RESPONSABILITÉ' },
  { title: 'DURABILITÉ' }
]

// --- RESPONSIVE MOUSE TRACKING ---
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const decoderStyle = computed(() => {
  // Creates a flashlight effect mask
  return {
    background: `radial-gradient(circle 200px at ${mouseX.value}px ${mouseY.value}px, transparent 0%, rgba(0,0,0,0.95) 100%)`
  }
})

// --- CANVAS ANIMATION SYSTEM ---
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let particles: Particle[] = []
let width = 0
let height = 0

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseX: number
  baseY: number
  color: string
  alpha: number = 0.5 
  // connected property removed

  constructor(w: number, h: number) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.baseX = this.x
    this.baseY = this.y
    // Constant steady movement
    this.vx = (Math.random() - 0.5) * 1.5 
    this.vy = (Math.random() - 0.5) * 1.5
    this.size = Math.random() * 3 + 2 
    this.color = '255, 255, 255'
  }

  update(mode: number, mouseX: number, mouseY: number, width: number, height: number, isHoveringCore: boolean) {
    if (isEcoMode.value) return

    if (mode === 0) {
      // ... (Hero logic unchanged) ...
      const centerX = width / 2
      const centerY = height / 2
      let dx = this.x - centerX
      let dy = this.y - centerY
      let radius = Math.sqrt(dx * dx + dy * dy)
      let angle = Math.atan2(dy, dx)
      const targetRadius = 200 + (Math.sin(this.baseX * 0.01 + this.baseY * 0.01) * 50);
      if (radius < targetRadius - 10) radius += 0.5
      if (radius > targetRadius + 10) radius -= 0.5
      const speed = isHoveringCore ? 0.05 : 0.005
      angle += speed * (radius > 0 ? 500/radius : 0)
      this.x = centerX + Math.cos(angle) * radius
      this.y = centerY + Math.sin(angle) * radius
      this.alpha = isHoveringCore ? 0.8 : 0.3
      this.color = isHoveringCore ? '255, 255, 255' : '0, 102, 255'

    } else if (mode === 1) {
      // Inclusion Mode: Free Floating Network (No Mouse Attraction)
      
      // Natural drift
      this.x += this.vx 
      this.y += this.vy 

      // Screen bounce
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Stable appearance
      this.alpha = 0.6
      this.color = '217, 70, 239' // Purple

    } else if (mode === 2) {
      // ... (Responsibility logic unchanged) ...
      this.y += 3 + this.size / 2
      this.x += (Math.random() - 0.5) * 0.5
      if (this.y > height + this.size) this.y = -this.size
      this.alpha = 0.6
      this.color = '34, 197, 94'

    } else if (mode === 3) {
      // ... (Sustainable logic unchanged) ...
      this.x += this.vx * 0.05
      this.y += this.vy * 0.05
      this.alpha = 0.2
      this.color = '255, 255, 255'
    }

    if (mode !== 1 && mode !== 2) {
      if (this.x < 0) this.x = width
      if (this.x > width) this.x = 0
      if (this.y < 0) this.y = height
      if (this.y > height) this.y = 0
    }
  }
  // ... draw method stays same ...
  draw() {
    if (!ctx || isEcoMode.value) return
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`
    ctx.fill()
  }
}

const initCanvas = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  
  particles = []
  const particleCount = window.innerWidth < 768 ? 60 : 150 // More particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(width, height))
    // Distribute them evenly first time if possible, or just re-randomize initial positions
    // For orbit mode, it's good they start scattered to form the orbit.
  }
}

const animate = () => {
  if (!ctx || !canvasRef.value) return
  
  if (isEcoMode.value) {
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = '#33ff33'
    ctx.lineWidth = 0.5
    ctx.font = '12px monospace'
    ctx.fillStyle = '#33ff33'
    ctx.fillText('> ECO MODE ACTIVE. RENDERING PAUSED.', 20, 30)
    
    // Simple static grid
    ctx.beginPath()
    for(let x = 0; x < width; x += 100) {
      ctx.moveTo(x, 0); ctx.lineTo(x, height);
    }
    for(let y = 0; y < height; y += 100) {
      ctx.moveTo(0, y); ctx.lineTo(width, y);
    }
    ctx.stroke()
    
    animationFrameId = requestAnimationFrame(animate)
    return
  }

  ctx.clearRect(0, 0, width, height)
  
  // Update and draw particles
  particles.forEach(p => {
    p.update(currentSection.value, mouseX.value, mouseY.value, width, height, isHoveringCore.value)
    p.draw()
  })

  // Draw connections and apply REPULSION in Inclusion mode
  if (currentSection.value === 1) {
    particles.forEach((p1, i) => {
      // Check against all subsequent particles for connections
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const connectionThreshold = 150 // Slightly tighter threshold for cleaner look without mouse
        
        if (dist < connectionThreshold && ctx) {
          const alpha = 0.5 * (1 - dist / connectionThreshold)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(217, 70, 239, ${alpha})`
          ctx.lineWidth = 1.5
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      })

      // SEPARATION FORCE (Prevent Clumping) - Check against ALL particles nearby
      particles.forEach((p2, j) => {
        if (i === j) return // Don't check self
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const minDistance = 50 // Increased separation distance

        if (dist < minDistance && dist > 0) {
          const force = (minDistance - dist) / minDistance 
          const repulsionX = (dx / dist) * force * 1.5 
          const repulsionY = (dy / dist) * force * 1.5
          
          p1.x += repulsionX
          p1.y += repulsionY
        }
      })
    })
  }

  animationFrameId = requestAnimationFrame(animate)
}

// --- SCROLL HANDLING ---
const handleScroll = (e: Event) => {
  if (!scrollContainer.value) return
  const el = scrollContainer.value
  const scrollPosition = el.scrollTop
  const viewportHeight = window.innerHeight
  
  // Determine active section
  const newSection = Math.round(scrollPosition / viewportHeight)
  if (newSection !== currentSection.value) {
    currentSection.value = newSection
  }
}

const scrollToSection = (index: number) => {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollTo({
    top: index * window.innerHeight,
    behavior: 'smooth'
  })
}

const toggleEcoMode = () => {
  isEcoMode.value = !isEcoMode.value
  // Save preference if needed
}

// --- LIFECYCLE ---
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', initCanvas)
  initCanvas()
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', initCanvas)
  cancelAnimationFrame(animationFrameId)
})

watch(isEcoMode, (newVal) => {
  if (newVal) {
    // Optional: Force simple view updates
  }
})

</script>

<style scoped>
/* === CORE LAYOUT === */
.nird-experience {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #050505;
  color: white;
  font-family: 'Inter', sans-serif;
}

.network-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.6;
}

.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  z-index: 2;
  scrollbar-width: none; /* Hide scrollbar */
}

.immersive-section {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10%;
}

/* === CONTENT STYLING === */
.content-box {
  max-width: 600px;
  padding: 3rem;
  background: rgba(10, 10, 15, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  transition: all 0.5s ease;
}

.content-box.center { margin: 0 auto; text-align: center; }
.content-box.left { margin-right: auto; }
.content-box.right { margin-left: auto; }

.mega-title {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1rem;
  position: relative;
  color: transparent;
  -webkit-text-stroke: 2px white;
}

.glitch-layer {
  position: absolute;
  top: 0;
  left: 0;
  color: #0ff;
  opacity: 0.5;
  animation: glitch-anim 2s infinite alternate-reverse;
}

@keyframes glitch-anim {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
}

.section-title {
  font-size: 3.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #fff, #888);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.text-block p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.interactive-instruction {
  display: inline-block;
  background: rgba(0, 102, 255, 0.2);
  border: 1px solid rgba(0, 102, 255, 0.4);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: #60a5fa;
}

/* === NAVIGATION === */
.section-nav {
  position: fixed;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-nav button {
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: right;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  transition: all 0.3s;
  position: relative;
}

.section-nav button::after {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  background: currentColor;
  border-radius: 50%;
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
}

.section-nav button.active {
  color: var(--nird-blue-electric, #0066FF);
  font-weight: bold;
  transform: scale(1.1);
}

/* === ECO MODE TOGGLE === */
.eco-toggle-wrapper {
  position: fixed;
  top: 100px;
  right: 3rem;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.eco-toggle-label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.7;
}

.eco-switch {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.switch-track {
  width: 60px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  position: relative;
  transition: background 0.3s;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.switch-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.eco-switch[aria-pressed="true"] .switch-track {
  background: rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
}

.eco-switch[aria-pressed="true"] .switch-thumb {
  transform: translateX(28px);
  background: #22c55e;
  color: white;
}

/* === SPECIAL EFFECTS === */
/* Responsibility Decoder */
.responsible-section {
  overflow: hidden;
}

.decoder-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5; /* Above content */
  pointer-events: none;
}

.encrypted-content {
  position: relative;
}

.noise-layer {
  font-family: 'Courier New', monospace;
  color: red;
  font-size: 0.8rem;
  opacity: 0.4;
  word-break: break-all;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0,0,0,0.8);
}

/* === ECO MODE STYLES (THE WOW FACTOR) === */
.eco-mode {
  background: #000000;
}

.eco-mode .content-box {
  background: black;
  border: 1px solid #33ff33;
  border-radius: 0;
  backdrop-filter: none;
  box-shadow: none;
}

.eco-mode .section-title,
.eco-mode h1,
.eco-mode h3,
.eco-mode p {
  color: #33ff33 !important;
  font-family: 'Courier New', monospace;
  text-shadow: none !important;
  -webkit-text-stroke: 0;
  background: none;
}

.eco-mode .glitch-layer { display: none; }
.eco-mode .decoder-overlay { display: none; }
.eco-mode .noise-layer { display: none; }
.eco-mode .interactive-instruction {
  border-color: #33ff33;
  color: #33ff33;
  background: transparent;
  border-radius: 0;
}

.eco-mode .stats-display {
  margin-top: 2rem;
  border-top: 1px dashed #33ff33;
  padding-top: 1rem;
  text-align: left;
  font-family: monospace;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #33ff33;
}

/* === NEW HERO STYLES === */
.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  perspective: 1000px;
}

/* Geometric Core */
.geometric-core {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 4rem;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  cursor: pointer;
}

.geometric-core:hover {
  transform: scale(1.2);
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid rgba(0, 102, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 102, 255, 0.1);
  transition: all 0.5s ease;
}

.ring-1 {
  width: 100%;
  height: 100%;
  border-top-color: var(--nird-blue-electric, #0066FF);
  animation: spin-ring 8s infinite linear;
}

.ring-2 {
  width: 70%;
  height: 70%;
  border-right-color: var(--nird-fuchsia, #d946ef);
  animation: spin-ring 6s infinite reverse linear;
}

.ring-3 {
  width: 40%;
  height: 40%;
  border-bottom-color: var(--nird-green, #22c55e);
  animation: spin-ring 4s infinite linear;
}

.geometric-core:hover .ring {
  border-color: white;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
}

.core-point {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 20px 10px rgba(0, 102, 255, 0.4);
  animation: pulse-core 2s infinite ease-in-out;
}

@keyframes spin-ring {
  0% { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(0deg); }
  100% { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(360deg); }
}

@keyframes pulse-core {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
}

/* Manifesto Text */
.manifesto-container {
  text-align: center;
  z-index: 2;
}

.light-title {
  font-weight: 300;
  font-size: 3.5rem;
  letter-spacing: -1px;
  margin: 0;
  margin-bottom: 1rem;
}

.light-title .highlight {
  font-weight: 700;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.rotating-text-wrapper {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
}

.scrolling-words {
  height: 1.5em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.word {
  height: 100%;
  display: block;
  font-weight: 600;
  padding-left: 0.5rem;
  animation: scroll-words 6s infinite cubic-bezier(0.2, 0.8, 0.2, 1);
}

.word-1 { color: var(--nird-blue-electric, #0066FF); }
.word-2 { color: var(--nird-fuchsia, #d946ef); }
.word-3 { color: var(--nird-green, #22c55e); }

@keyframes scroll-words {
  0%, 25% { transform: translateY(0); }
  33%, 58% { transform: translateY(-100%); }
  66%, 91% { transform: translateY(-200%); }
  100% { transform: translateY(-300%); }
}

/* Minimal Scroll Hint */
.scroll-hint-minimal {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  font-size: 0.8rem;
  letter-spacing: 2px;
}

.scroll-hint-minimal .line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, white, transparent);
  animation: scroll-line 2s infinite;
}

@keyframes scroll-line {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* Eco Mode Overrides for Hero */
.eco-mode .geometric-core { display: none; }
.eco-mode .light-title { font-family: monospace; font-size: 2rem; }
.eco-mode .word { animation: none; color: #33ff33; transform: none !important; }
.eco-mode .scrolling-words { overflow: visible; height: auto; }
.eco-mode .rotating-text-wrapper { flex-direction: column; }
</style>