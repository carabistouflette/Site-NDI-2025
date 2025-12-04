<template>
  <section class="hero" ref="heroRef">
    <canvas ref="canvasRef" class="hero__canvas"></canvas>
    
    <div class="hero__mist"></div>
    
    <div class="hero__content">
      <div class="hero__text">
        <!-- Le titre NIRD de base, avec une lueur néon simple -->
        <h1 class="nird-title">NIRD</h1>
        
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
const REPELL_FORCE = 15
const RETURN_SPEED = 0.05
const FRICTION = 0.90
const EMOJI_SIZE = 24

// Emojis
const emojis = ['🌱', '🌿', '🌳', '♻️', '🌍', '💧', '💻', '💾', '🌐', '⚡', '👾']
const SNAKE_EMOJI = '🐍'

const mouse = { x: -1000, y: -1000 }

class Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  emoji: string
  opacity: number
  density: number

  constructor(canvasWidth: number, canvasHeight: number, isSnake = false) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.baseX = this.x
    this.baseY = this.y
    this.vx = 0
    this.vy = 0
    this.size = Math.random() * 10 + 14
    this.emoji = isSnake ? SNAKE_EMOJI : emojis[Math.floor(Math.random() * emojis.length)]
    this.opacity = Math.random() * 0.5 + 0.3
    this.density = (Math.random() * 30) + 1
  }

  update(canvasWidth: number, canvasHeight: number) {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < MOUSE_RADIUS) {
      const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
      const directionX = (dx / distance) * force * REPELL_FORCE * -1
      const directionY = (dy / distance) * force * REPELL_FORCE * -1
      this.vx += directionX
      this.vy += directionY
    }

    const homeDx = this.baseX - this.x
    const homeDy = this.baseY - this.y
    this.vx += homeDx * RETURN_SPEED * 0.5
    this.vy += homeDy * RETURN_SPEED * 0.5
    this.vx *= FRICTION
    this.vy *= FRICTION

    this.x += this.vx
    this.y += this.vy

    const padding = this.size
    if (this.x < padding) { this.x = padding; this.vx *= -0.5 }
    if (this.x > canvasWidth - padding) { this.x = canvasWidth - padding; this.vx *= -0.5 }
    if (this.y < padding) { this.y = padding; this.vy *= -0.5 }
    if (this.y > canvasHeight - padding) { this.y = canvasHeight - padding; this.vy *= -0.5 }
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
  const resetParticles = () => {
    canvas.width = heroRef.value?.offsetWidth || window.innerWidth
    canvas.height = heroRef.value?.offsetHeight || window.innerHeight
    particles = []
    particles.push(new Particle(canvas.width, canvas.height, true))
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

/* NOUVEAU STYLE DE TITRE : NIRD de base */
.nird-title {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  letter-spacing: -5px;
  color: white; /* Texte blanc */
  text-shadow: 0 0 10px var(--neon-green), /* Lueur interne */
               0 0 20px var(--neon-green), /* Lueur plus large */
               0 0 30px var(--neon-green); /* Lueur encore plus large */
  filter: drop-shadow(0 0 15px var(--neon-green)); /* Lueur douce externe */
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

@media (max-width: 768px) {
  .nird-title { font-size: 5rem; }
  .subtitle { font-size: 1rem; }
}
</style>
