<template>
  <section class="game-preview">
    <div class="game-preview__container">
      <div class="game-preview__header">
        <h2 class="game-preview__title">Découvrez nos jeux</h2>
        <p class="game-preview__subtitle">
          Une sélection de jeux éducatifs et interactifs pour explorer le numérique autrement
        </p>
      </div>
      
      <div class="game-preview__grid">
        <GradientCard 
          v-for="game in games" 
          :key="game.id"
          :variant="game.variant"
          class="game-preview__card"
          hoverable
        >
          <template #header>
            <div class="game-preview__card-header">
              <div class="game-preview__icon">
                <component :is="game.icon" />
              </div>
              <h3>{{ game.title }}</h3>
            </div>
          </template>
          
          <div class="game-preview__content">
            <p>{{ game.description }}</p>
            <div class="game-preview__tags">
              <span 
                v-for="tag in game.tags" 
                :key="tag"
                class="game-preview__tag"
                :class="`game-preview__tag--${game.variant}`"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <template #action>
            <NirdButton 
              :variant="game.variant"
              size="small"
              @click="playGame(game.id)"
            >
              Jouer
            </NirdButton>
          </template>
        </GradientCard>
      </div>
      
      <div class="game-preview__footer">
        <NirdButton 
          variant="unified" 
          size="large"
          @click="$router.push('/games')"
        >
          Voir tous les jeux
        </NirdButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
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
    description: 'Découre comment rendre le numérique plus écologique.',
    variant: 'sustainable' as const,
    icon: LightbulbIcon,
    tags: ['Écologie', 'Durable']
  }
]

const playGame = (gameId: string) => {
  // Redirection vers la page du jeu (placeholder pour l'instant)
  router.push(`/games/${gameId}`)
}
</script>

<style scoped>
.game-preview {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.game-preview__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.game-preview__header {
  text-align: center;
  margin-bottom: 3rem;
}

.game-preview__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--nird-anthracite);
  margin: 0 0 1rem 0;
  background: var(--gradient-unified);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.game-preview__subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.game-preview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.game-preview__card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-preview__card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.game-preview__icon {
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

.game-preview__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-preview__content p {
  color: var(--nird-anthracite);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.game-preview__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.game-preview__tag {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

.game-preview__tag--digital {
  background: var(--gradient-digital);
}

.game-preview__tag--inclusive {
  background: var(--gradient-inclusive);
}

.game-preview__tag--responsible {
  background: var(--gradient-responsible);
}

.game-preview__tag--sustainable {
  background: var(--gradient-sustainable);
}

.game-preview__footer {
  text-align: center;
}

@media (max-width: 768px) {
  .game-preview {
    padding: 3rem 0;
  }
  
  .game-preview__title {
    font-size: 2rem;
  }
  
  .game-preview__subtitle {
    font-size: 1.125rem;
  }
  
  .game-preview__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>