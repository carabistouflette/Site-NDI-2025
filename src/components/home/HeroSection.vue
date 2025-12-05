<template>
  <section class="hero" ref="heroRef">
    <canvas ref="canvasRef" class="hero__canvas"></canvas>



    <div class="hero__content">
      <div class="hero__text">
        <!-- Le titre NIRD de base, sans aucun effet -->
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
import { useRouter } from 'vue-router'

const router = useRouter()
const heroRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let particles: Particle[] = []

// Configuration
const PARTICLE_COUNT = 40 // Réduit de 70 à 40 pour moins d'encombrement
const MOUSE_RADIUS = 120
const REPELL_FORCE = 15
const RETURN_SPEED = 0.05
const FRICTION = 0.90
const SNAKE_HITBOX = 120 // Hitbox généreuse pour le serpent

// Emojis
const emojis = ['🌱', '🌿', '🌳', '♻️', '🌍', '💧', '💻', '💾', '🌐', '⚡', '👾']
const SNAKE_EMOJI = '🐍'

const mouse = { x: -1000, y: -1000 }
let pulseTime = 0 // Pour l'animation de pulsation du serpent

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
  isSnake: boolean

  constructor(canvasWidth: number, canvasHeight: number, isSnake = false) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.baseX = this.x
    this.baseY = this.y
    this.vx = 0
    this.vy = 0
    this.isSnake = isSnake
    // Le serpent est beaucoup plus grand (40-50px au lieu de 14-24px)
    this.size = isSnake ? (Math.random() * 10 + 40) : (Math.random() * 10 + 14)
    this.emoji = isSnake ? SNAKE_EMOJI : (emojis[Math.floor(Math.random() * emojis.length)] || SNAKE_EMOJI)
    // Le serpent est plus opaque pour être plus visible
    this.opacity = isSnake ? 1.0 : (Math.random() * 0.5 + 0.3)
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
    // Effet de pulsation pour le serpent
    let displaySize = this.size
    let displayOpacity = this.opacity

    if (this.isSnake) {
      const pulse = Math.sin(pulseTime * 3) * 0.15 + 1 // Pulsation entre 0.85 et 1.15
      displaySize = this.size * pulse
      displayOpacity = 1.0

      // Ajouter un glow autour du serpent
      context.shadowColor = '#00ff00'
      context.shadowBlur = 20
    }

    context.font = `${displaySize}px Arial`
    context.globalAlpha = displayOpacity
    context.fillStyle = '#ffffff'
    context.fillText(this.emoji, this.x, this.y)

    // Reset shadow
    context.shadowBlur = 0
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
  pulseTime += 0.016 // Incrémenter pour l'animation de pulsation (~60fps)
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

  // Changer le curseur si on survole le serpent
  const snake = particles[0]
  if (snake) {
    const dx = mouse.x - snake.x
    const dy = mouse.y - snake.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < SNAKE_HITBOX) {
      heroRef.value.style.cursor = 'pointer'
    } else {
      heroRef.value.style.cursor = 'default'
    }
  }
}

const handleMouseLeave = () => {
  mouse.x = -1000
  mouse.y = -1000
}

const handleClick = (e: MouseEvent) => {
  if (!heroRef.value || particles.length === 0) return
  const rect = heroRef.value.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const clickY = e.clientY - rect.top

  // The first particle is always the snake
  const snake = particles[0]
  if (!snake) return
  const dx = clickX - snake.x
  const dy = clickY - snake.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // Hitbox très généreuse (120px) pour faciliter le clic
  if (distance < SNAKE_HITBOX) {
    router.push({ name: 'snake' })
  }
}

onMounted(() => {
  init()
  animate()
  if (heroRef.value) {
    heroRef.value.addEventListener('mousemove', handleMouseMove)
    heroRef.value.addEventListener('mouseleave', handleMouseLeave)
    heroRef.value.addEventListener('click', handleClick)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', init)
  if (heroRef.value) {
    heroRef.value.removeEventListener('mousemove', handleMouseMove)
    heroRef.value.removeEventListener('mouseleave', handleMouseLeave)
    heroRef.value.removeEventListener('click', handleClick)
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



.hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 1rem;
  pointer-events: none;
}

/* STYLE DE TITRE : NIRD juste avec la font et couleur blanche */
.nird-title {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  letter-spacing: -5px;
  color: white;
  /* Texte blanc pur */
  /* Tous les effets sont supprimés */
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
  .nird-title {
    font-size: 5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>