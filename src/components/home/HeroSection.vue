<template>
  <section class="hero" ref="heroRef">
    <canvas ref="canvasRef" class="hero__canvas"></canvas>
    
    <div class="hero__mist"></div>
    
    <div class="hero__content">
      <div class="hero__text">
        <h1 class="wind-effect">NIRD</h1>
        <p class="subtitle">Numérique <span class="neon">Inclusif</span> Responsable Durable</p>
        <p class="description">
          Construisons ensemble un avenir numérique éthique.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const heroRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let particles: Particle[] = []

// Configuration
const PARTICLE_COUNT = 70
const MOUSE_RADIUS = 120
const REPELL_FORCE = 15 // Force de répulsion
const RETURN_SPEED = 0.05 // Vitesse de retour (plus petit = plus lent/fluide)
const FRICTION = 0.90 // Ralentissement naturel
const EMOJI_SIZE = 24

// Emojis
const emojis = ['🌱', '🌿', '🌳', '♻️', '🌍', '💧', '💻', '💾', '🌐', '⚡', '👾']
const SNAKE_EMOJI = '🐍'

// État de la souris
const mouse = {
  x: -1000,
  y: -1000
}

class Particle {
  x: number
  y: number
  baseX: number // Position d'origine (Ancre)
  baseY: number // Position d'origine (Ancre)
  vx: number // Vélocité Y
  vy: number // Vélocité Y
  size: number
  emoji: string
  opacity: number
  density: number // Facteur de poids aléatoire pour varier les mouvements

  constructor(canvasWidth: number, canvasHeight: number, isSnake = false) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.baseX = this.x
    this.baseY = this.y
    
    this.vx = 0
    this.vy = 0

    this.size = Math.random() * 10 + 14 // 14px à 24px
    this.emoji = isSnake ? SNAKE_EMOJI : emojis[Math.floor(Math.random() * emojis.length)]
    this.opacity = Math.random() * 0.5 + 0.3
    this.density = (Math.random() * 30) + 1
  }

  update(canvasWidth: number, canvasHeight: number) {
    // 1. Calcul de la distance avec la souris
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // 2. Force de Répulsion (Si la souris est proche)
    let forceDirectionX = 0
    let forceDirectionY = 0
    let force = 0

    if (distance < MOUSE_RADIUS) {
      forceDirectionX = dx / distance
      forceDirectionY = dy / distance
      // La force est plus forte plus on est près
      force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
      
      // On pousse la vélocité à l'opposé de la souris
      const directionX = forceDirectionX * force * REPELL_FORCE * -1
      const directionY = forceDirectionY * force * REPELL_FORCE * -1
      
      this.vx += directionX
      this.vy += directionY
    }

    // 3. Force d'Attraction (Retour à la base)
    // Si on n'est pas repoussé, on retourne doucement vers la base
    const homeDx = this.baseX - this.x
    const homeDy = this.baseY - this.y
    
    // On ajoute une petite force vers la maison
    this.vx += homeDx * RETURN_SPEED * 0.5
    this.vy += homeDy * RETURN_SPEED * 0.5

    // 4. Application de la friction (pour éviter que ça oscille indéfiniment)
    this.vx *= FRICTION
    this.vy *= FRICTION

    // 5. Mise à jour de la position
    this.x += this.vx
    this.y += this.vy

    // 6. Contrainte des bords (Mur invisible)
    // Empêcher de sortir de l'écran
    const padding = this.size
    if (this.x < padding) {
      this.x = padding
      this.vx *= -0.5 // Rebond léger
    }
    if (this.x > canvasWidth - padding) {
      this.x = canvasWidth - padding
      this.vx *= -0.5
    }
    if (this.y < padding) {
      this.y = padding
      this.vy *= -0.5
    }
    if (this.y > canvasHeight - padding) {
      this.y = canvasHeight - padding
      this.vy *= -0.5
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.font = `${this.size}px Arial`
    context.globalAlpha = this.opacity
    context.fillStyle = '#ffffff'
    context.fillText(this.emoji, this.x, this.y)
    context.globalAlpha = 1
  }
}

const init = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  
  // Fonction interne pour reset les particules adaptées à la taille
  const resetParticles = () => {
    canvas.width = heroRef.value?.offsetWidth || window.innerWidth
    canvas.height = heroRef.value?.offsetHeight || window.innerHeight
    
    particles = []
    particles.push(new Particle(canvas.width, canvas.height, true)) // Le serpent
    for (let i = 0; i < PARTICLE_COUNT - 1; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }
  }
  
  window.addEventListener('resize', resetParticles)
  resetParticles()
}

const animate = () => {
  if (!ctx || !canvasRef.value) return
  
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  
  particles.forEach(particle => {
    particle.update(canvasRef.value!.width, canvasRef.value!.height)
    particle.draw(ctx!)
  })
  
  animationFrameId = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

const handleMouseLeave = () => {
  mouse.x = -1000
  mouse.y = -1000
}

onMounted(() => {
  init()
  animate()
  
  if (heroRef.value) {
    heroRef.value.addEventListener('mousemove', handleMouseMove)
    heroRef.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', init)
  
  if (heroRef.value) {
    heroRef.value.removeEventListener('mousemove', handleMouseMove)
    heroRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<style scoped>
.hero {
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #000000;
}

.hero__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero__mist {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: radial-gradient(circle at center, transparent 0%, #000000 95%),
              linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 20%, transparent 80%, #000000 100%);
  pointer-events: none;
  box-shadow: inset 0 0 100px rgba(0,0,0,0.9);
}

.hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 1rem;
  pointer-events: none;
}

h1 {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  color: white;
  letter-spacing: -5px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--text-secondary);
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.neon {
  color: var(--neon-green);
  text-shadow: var(--glow-text);
}

.description {
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #888;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Nouveau style d'effet de vent */
.wind-effect {
  position: relative;
  overflow: hidden; /* Important pour cacher les débordements de l'animation */
  display: inline-block; /* Pour que overflow hidden fonctionne */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; /* Masque le texte original */
  background-image: linear-gradient(90deg, white 0%, white 50%, white 100%);
  transition: background-position 0.2s ease-out; /* Pour un mouvement de fond fluide */
}

.wind-effect::before {
  content: "NIRD"; /* Duplique le texte pour l'animation */
  position: absolute;
  top: 0;
  left: -100%; /* Commence en dehors de l'écran */
  width: 300%; /* Largeur suffisante pour couvrir et donner un effet de passage */
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, var(--neon-green) 50%, transparent 100%);
  background-size: 30% 100%; /* Contrôle la taille de l'effet de vent */
  background-repeat: no-repeat;
  background-position: 0% 50%;
  animation: wind-pass 4s infinite ease-in-out;
  mix-blend-mode: screen; /* Pour un effet de lumière plus subtil */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  pointer-events: none;
}

@keyframes wind-pass {
  0% { left: -150%; opacity: 0; }
  10% { left: -50%; opacity: 1; }
  50% { left: 100%; opacity: 1; }
  60% { left: 150%; opacity: 0; }
  100% { left: -150%; opacity: 0; }
}

@media (max-width: 768px) {
  h1 { font-size: 5rem; }
  .subtitle { font-size: 1rem; }
}
</style>
