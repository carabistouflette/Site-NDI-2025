<template>
  <section class="game-preview">
    <div class="game-preview__container">
      <div class="game-preview__header">
        <n-h2 class="game-preview__title animate-fade-in">Découvrez nos jeux interactifs</n-h2>
        <p class="game-preview__subtitle animate-slide-up">
          Plongez dans une expérience immersive unique avec nos jeux éducatifs
          conçus pour explorer les facettes d'un numérique inclusif, responsable et durable
        </p>
      </div>
      
      <n-grid x-gap="32" y-gap="32" cols="1 640:2 1024:4" item-responsive responsive="screen" class="game-preview__grid">
        <n-gi v-for="game in games" :key="game.id">
          <GradientCard
            :variant="game.variant"
            class="game-preview__card animate-card"
            :class="`game-preview__card--${game.variant}`"
            hoverable
            @mouseenter="onCardHover(game.id, true)"
            @mouseleave="onCardHover(game.id, false)"
          >
            <template #header>
              <div class="game-preview__card-header">
                <div class="game-preview__icon" :class="`game-preview__icon--${game.variant}`">
                  <n-icon size="24">
                    <component :is="game.icon" />
                  </n-icon>
                </div>
                <div class="game-preview__title-section">
                  <h3>{{ game.title }}</h3>
                  <div class="game-preview__difficulty">
                    <n-icon
                      v-for="level in game.difficulty"
                      :key="level"
                      size="14"
                      class="difficulty-star"
                      :class="`difficulty-star--${game.variant}`"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    </n-icon>
                  </div>
                </div>
              </div>
            </template>
            
            <div class="game-preview__content">
              <div class="game-preview__visual">
                <div class="game-preview__preview-image" :class="`preview-image--${game.variant}`">
                  <div class="preview-content">
                    <span class="preview-emoji">{{ game.emoji }}</span>
                    <div class="preview-overlay">
                      <span class="preview-text">Aperçu du jeu</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p class="game-preview__description">{{ game.description }}</p>
              
              <div class="game-preview__features">
                <div
                  v-for="feature in game.features"
                  :key="feature"
                  class="game-preview__feature"
                >
                  <n-icon size="14" class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </n-icon>
                  <span>{{ feature }}</span>
                </div>
              </div>
              
              <div class="game-preview__tags">
                <span
                  v-for="tag in game.tags"
                  :key="tag"
                  class="game-preview__tag animate-tag"
                  :class="`game-preview__tag--${game.variant}`"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <template #action>
              <div class="game-preview__actions">
                <NirdButton
                  :variant="game.variant"
                  size="small"
                  class="game-preview__play-btn"
                  @click="playGame(game.id)"
                >
                  <span class="btn-content">
                    <span>Jouer</span>
                    <n-icon size="16" class="btn-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12L19 12M19 12L12 5M19 12L12 19"/>
                      </svg>
                    </n-icon>
                  </span>
                </NirdButton>
                <button
                  class="game-preview__info-btn"
                  @click="showGameInfo(game.id)"
                >
                  <n-icon size="20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                  </n-icon>
                </button>
              </div>
            </template>
          </GradientCard>
        </n-gi>
      </n-grid>
      
      <div class="game-preview__footer">
        <NirdButton
          variant="unified"
          size="large"
          class="game-preview__see-all-btn"
          @click="$router.push('/games')"
        >
          <span class="btn-content">
            <span>Voir tous les jeux</span>
            <n-icon size="20" class="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
              </svg>
            </n-icon>
          </span>
        </NirdButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NGrid, NGi, NH2, NIcon } from 'naive-ui'
import GradientCard from '@/components/common/GradientCard.vue'
import NirdButton from '@/components/common/NirdButton.vue'

const router = useRouter()
const hoveredCard = ref<string | null>(null)

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
    description: 'Plongez dans l\'univers de la programmation créative avec ce jeu immersif développé en partenariat avec Mozilla. Apprenez JavaScript, HTML et CSS en résolvant des défis progressifs qui vous mèneront de la création de votre première page web au développement d\'applications interactives. Chaque niveau débloque de nouvelles fonctionnalités et vous rapproche du titre de "Développeur Numérique Inclusif".',
    variant: 'digital' as const,
    icon: CodeIcon,
    emoji: '💻',
    difficulty: 2,
    features: ['15 niveaux progressifs', 'Système de badges', 'Projets créatifs', 'Mentorat par des professionnels'],
    tags: ['Programmation', 'JavaScript', 'Web', 'Créativité']
  },
  {
    id: 'cyber-puzzle',
    title: 'Cyber Puzzle',
    description: 'Devenez un expert en cybersécurité dans ce jeu d\'énigmes collaboratif conçu avec l\'ANSSI. Protégez une entreprise virtuelle contre des cyberattaques réalistes en identifiant les vulnérabilités, en mettant en place des mesures de sécurité et en formant les employés aux bonnes pratiques. Chaque mission vous confronte à des scénarios basés sur des incidents réels.',
    variant: 'inclusive' as const,
    icon: PuzzleIcon,
    emoji: '🔐',
    difficulty: 3,
    features: ['10 scénarios réels', 'Mode multijoueur', 'Analyse de menaces', 'Certification incluse'],
    tags: ['Cybersécurité', 'ANSSI', 'Collaboration', 'Protection']
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy Quest',
    description: 'Navigatez dans le complexe monde de la protection des données personnelles avec ce jeu éducatif validé par la CNIL. Prenez les décisions cruciales d\'un DPO (Data Protection Officer) dans une entreprise innovante, gérez les demandes des utilisateurs, analysez les risques et assurez la conformité RGPD. Vos choix auront un impact direct sur la confiance des clients.',
    variant: 'responsible' as const,
    icon: ShieldIcon,
    emoji: '🛡️',
    difficulty: 2,
    features: ['Cas d\'usage réels', 'Simulation de crises', 'Conformité RGPD', 'Expert CNIL'],
    tags: ['RGPD', 'CNIL', 'Vie privée', 'Éthique']
  },
  {
    id: 'green-it',
    title: 'Green IT Challenge',
    description: 'Mesurez et réduisez l\'impact environnemental du numérique dans ce jeu sérieux développé avec l\'ADEME. Calculez l\'empreinte carbone de vos usages digitaux, découvrez des alternatives éco-responsables et concevez des stratégies de transition numérique durable. Transformez une entreprise traditionnelle en une organisation exemplaire en matière de Green IT.',
    variant: 'sustainable' as const,
    icon: LightbulbIcon,
    emoji: '🌱',
    difficulty: 1,
    features: ['Calculateur d\'empreinte', 'Scénarios d\'entreprise', 'Solutions innovantes', 'Bilan ADEME'],
    tags: ['Écologie', 'ADEME', 'Impact carbone', 'Durable']
  }
]

const onCardHover = (gameId: string, isHovering: boolean) => {
  hoveredCard.value = isHovering ? gameId : null
}

const playGame = (gameId: string) => {
  // Redirection vers la page du jeu (placeholder pour l\'instant)
  router.push(`/games/${gameId}`)
}

const showGameInfo = (gameId: string) => {
  // Afficher les informations détaillées du jeu (placeholder pour l\'instant)
  console.log(`Show info for game: ${gameId}`)
}
</script>

<style>
@import '@/assets/styles/components/game-preview.css';
</style>
