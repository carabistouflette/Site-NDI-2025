<template>
  <div class="games-view">
    <n-layout>
      <n-layout-header>
        <AppHeader />
      </n-layout-header>
      
      <n-layout-content>
        <div class="games-container">
          <div class="games-header">
            <n-h1 class="games-title">Jeux de la Nuit de l'Informatique 2025</n-h1>
            <n-p class="games-subtitle">
              Découvrez notre sélection de jeux éducatifs et interactifs pour explorer le numérique autrement.
            </n-p>
          </div>
          
          <div class="games-grid">
            <GradientCard
              v-for="game in games"
              :key="game.id"
              :variant="game.variant"
              class="game-card"
              hoverable
            >
              <template #header>
                <div class="game-card__header">
                  <div class="game-card__icon">
                    <component :is="game.icon" />
                  </div>
                  <h3>{{ game.title }}</h3>
                </div>
              </template>
              
              <div class="game-card__content">
                <p>{{ game.description }}</p>
                <div class="game-card__tags">
                  <span
                    v-for="tag in game.tags"
                    :key="tag"
                    class="game-card__tag"
                    :class="`game-card__tag--${game.variant}`"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <template #action>
                <NirdButton
                  :variant="game.variant"
                  @click="playGame(game.id)"
                >
                  Jouer
                </NirdButton>
              </template>
            </GradientCard>
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
import { h } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import GradientCard from '@/components/common/GradientCard.vue'
import NirdButton from '@/components/common/NirdButton.vue'

const router = useRouter()

// Icônes SVG pour les jeux
const CodeIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' })
])

const PuzzleIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z' })
])

const ShieldIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z' })
])

const LightbulbIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z' })
])

const RobotIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
])

const NetworkIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })
])

const DatabaseIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z' })
])

const CloudIcon = () => h('svg', {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z' })
])

const games = [
  {
    id: 'code-adventure',
    title: 'Code Adventure',
    description: 'Apprends les bases de la programmation à travers une aventure interactive.',
    variant: 'digital' as const,
    icon: CodeIcon,
    tags: ['Programmation', 'Débutant']
  },
  {
    id: 'cyber-puzzle',
    title: 'Cyber Puzzle',
    description: 'Résous des énigmes cybersécurité pour protéger un système informatique.',
    variant: 'inclusive' as const,
    icon: PuzzleIcon,
    tags: ['Cybersécurité', 'Logique']
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy Quest',
    description: 'Protège les données personnelles dans ce jeu de sensibilisation.',
    variant: 'responsible' as const,
    icon: ShieldIcon,
    tags: ['Vie privée', 'Responsabilité']
  },
  {
    id: 'green-it',
    title: 'Green IT Challenge',
    description: 'Découvre comment rendre le numérique plus écologique.',
    variant: 'sustainable' as const,
    icon: LightbulbIcon,
    tags: ['Écologie', 'Durable']
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics Lab',
    description: 'Explore les enjeux éthiques de l\'intelligence artificielle.',
    variant: 'digital' as const,
    icon: RobotIcon,
    tags: ['IA', 'Éthique']
  },
  {
    id: 'network-security',
    title: 'Network Defender',
    description: 'Protège un réseau contre les cybermenaces.',
    variant: 'inclusive' as const,
    icon: NetworkIcon,
    tags: ['Réseau', 'Sécurité']
  },
  {
    id: 'data-mining',
    title: 'Data Mining Explorer',
    description: 'Explore les données pour découvrir des tendances cachées.',
    variant: 'responsible' as const,
    icon: DatabaseIcon,
    tags: ['Données', 'Analyse']
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing Quest',
    description: 'Découvre les mystères du cloud computing.',
    variant: 'sustainable' as const,
    icon: CloudIcon,
    tags: ['Cloud', 'Infrastructure']
  }
]

const playGame = (gameId: string) => {
  // Redirection vers la page du jeu (placeholder pour l'instant)
  router.push(`/games/${gameId}`)
}
</script>

<style scoped>
.games-view {
  min-height: 100vh;
}

.games-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.games-header {
  text-align: center;
  margin-bottom: 3rem;
}

.games-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--nird-anthracite);
  margin: 0 0 1rem 0;
  background: var(--gradient-unified);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.games-subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.game-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.game-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  flex-shrink: 0;
}

.game-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-card__content p {
  color: var(--nird-anthracite);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.game-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.game-card__tag {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

.game-card__tag--digital {
  background: var(--gradient-digital);
}

.game-card__tag--inclusive {
  background: var(--gradient-inclusive);
}

.game-card__tag--responsible {
  background: var(--gradient-responsible);
}

.game-card__tag--sustainable {
  background: var(--gradient-sustainable);
}

@media (max-width: 768px) {
  .games-container {
    padding: 1rem;
  }
  
  .games-title {
    font-size: 2rem;
  }
  
  .games-subtitle {
    font-size: 1.125rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>