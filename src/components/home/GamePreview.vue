<template>
  <section class="game-preview">
    <div class="game-preview__container">
      <div class="game-preview__header">
        <h2 class="game-preview__title animate-fade-in">Découvrez nos jeux interactifs</h2>
        <p class="game-preview__subtitle animate-slide-up">
          Plongez dans une expérience immersive unique avec nos jeux éducatifs
          conçus pour explorer les facettes d'un numérique inclusif, responsable et durable
        </p>
      </div>
      
      <div class="game-preview__grid">
        <GradientCard
          v-for="game in games"
          :key="game.id"
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
                <component :is="game.icon" />
              </div>
              <div class="game-preview__title-section">
                <h3>{{ game.title }}</h3>
                <div class="game-preview__difficulty">
                  <span
                    v-for="level in game.difficulty"
                    :key="level"
                    class="difficulty-star"
                    :class="`difficulty-star--${game.variant}`"
                  >
                    ★
                  </span>
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
                <span class="feature-icon">✓</span>
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
                  <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L19 12M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </NirdButton>
              <button
                class="game-preview__info-btn"
                @click="showGameInfo(game.id)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </button>
            </div>
          </template>
        </GradientCard>
      </div>
      
      <div class="game-preview__footer">
        <NirdButton
          variant="unified"
          size="large"
          class="game-preview__see-all-btn"
          @click="$router.push('/games')"
        >
          <span class="btn-content">
            <span>Voir tous les jeux</span>
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </NirdButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
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
  // Redirection vers la page du jeu (placeholder pour l'instant)
  router.push(`/games/${gameId}`)
}

const showGameInfo = (gameId: string) => {
  // Afficher les informations détaillées du jeu (placeholder pour l'instant)
  console.log(`Show info for game: ${gameId}`)
}
</script>

<style scoped>
.game-preview {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
}

.game-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gradient-unified);
  opacity: 0.3;
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
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite;
}

.game-preview__subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.game-preview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.game-preview__card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.game-preview__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.game-preview__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-unified);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-preview__card:hover::before {
  opacity: 1;
}

.game-preview__card--digital:hover::before {
  background: var(--gradient-digital);
}

.game-preview__card--inclusive:hover::before {
  background: var(--gradient-inclusive);
}

.game-preview__card--responsible:hover::before {
  background: var(--gradient-responsible);
}

.game-preview__card--sustainable:hover::before {
  background: var(--gradient-sustainable);
}

.game-preview__card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.game-preview__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
}

.game-preview__card:hover .game-preview__icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.game-preview__icon--digital {
  background: var(--gradient-digital);
}

.game-preview__icon--inclusive {
  background: var(--gradient-inclusive);
}

.game-preview__icon--responsible {
  background: var(--gradient-responsible);
}

.game-preview__icon--sustainable {
  background: var(--gradient-sustainable);
}

.game-preview__title-section {
  flex: 1;
}

.game-preview__title-section h3 {
  margin: 0 0 0.5rem 0;
  color: var(--nird-anthracite);
  font-size: 1.25rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.game-preview__card:hover .game-preview__title-section h3 {
  color: #2d3748;
}

.game-preview__difficulty {
  display: flex;
  gap: 0.25rem;
}

.difficulty-star {
  font-size: 0.875rem;
  color: #ddd;
  transition: color 0.3s ease;
}

.difficulty-star--digital {
  color: var(--nird-blue-electric);
}

.difficulty-star--inclusive {
  color: var(--nird-violet);
}

.difficulty-star--responsible {
  color: var(--nird-coral);
}

.difficulty-star--sustainable {
  color: var(--nird-golden);
}

.game-preview__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.game-preview__visual {
  margin: -1rem -1rem 0 -1rem;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.game-preview__preview-image {
  height: 180px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.preview-image--digital {
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 82, 204, 0.1) 100%);
}

.preview-image--inclusive {
  background: linear-gradient(135deg, rgba(107, 70, 193, 0.1) 0%, rgba(213, 63, 140, 0.1) 100%);
}

.preview-image--responsible {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 160, 122, 0.1) 100%);
}

.preview-image--sustainable {
  background: linear-gradient(135deg, rgba(246, 173, 85, 0.1) 0%, rgba(237, 137, 54, 0.1) 100%);
}

.game-preview__card:hover .game-preview__preview-image {
  transform: scale(1.02);
}

.preview-content {
  position: relative;
  text-align: center;
  transition: all 0.3s ease;
}

.preview-emoji {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
  animation: float 3s ease-in-out infinite;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
}

.game-preview__card:hover .preview-overlay {
  opacity: 1;
}

.preview-text {
  color: white;
  font-weight: 500;
  font-size: 1.125rem;
}

.game-preview__description {
  color: var(--nird-anthracite);
  line-height: 1.6;
  margin: 0;
  flex: 1;
  font-size: 0.95rem;
}

.game-preview__features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.game-preview__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--nird-anthracite);
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.game-preview__feature:hover {
  transform: translateX(5px);
}

.feature-icon {
  color: var(--nird-blue-electric);
  font-weight: bold;
  flex-shrink: 0;
}

.game-preview__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.game-preview__tag {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  transition: all 0.3s ease;
  opacity: 0;
  animation: tag-appear 0.5s ease forwards;
}

.game-preview__tag:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

.game-preview__actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.game-preview__play-btn {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.game-preview__play-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.game-preview__play-btn:hover::before {
  left: 100%;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.game-preview__play-btn:hover .btn-icon {
  transform: translateX(4px);
}

.game-preview__info-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  background: white;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.game-preview__info-btn:hover {
  border-color: var(--nird-blue-electric);
  color: var(--nird-blue-electric);
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 102, 255, 0.2);
}

.game-preview__footer {
  text-align: center;
}

.game-preview__see-all-btn {
  position: relative;
  overflow: hidden;
}

.game-preview__see-all-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.game-preview__see-all-btn:hover::before {
  left: 100%;
}

/* Animations */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes tag-appear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slide-up 0.8s ease forwards;
  animation-delay: 0.2s;
}

.animate-card {
  opacity: 0;
  animation: card-appear 0.6s ease forwards;
}

.animate-card:nth-child(1) {
  animation-delay: 0.1s;
}

.animate-card:nth-child(2) {
  animation-delay: 0.2s;
}

.animate-card:nth-child(3) {
  animation-delay: 0.3s;
}

.animate-card:nth-child(4) {
  animation-delay: 0.4s;
}

.animate-tag:nth-child(1) {
  animation-delay: 0.5s;
}

.animate-tag:nth-child(2) {
  animation-delay: 0.6s;
}

.animate-tag:nth-child(3) {
  animation-delay: 0.7s;
}

@media (max-width: 1024px) {
  .game-preview__grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .game-preview__preview-image {
    height: 160px;
  }
  
  .preview-emoji {
    font-size: 2.5rem;
  }
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
  
  .game-preview__card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .game-preview__icon {
    width: 48px;
    height: 48px;
  }
  
  .game-preview__preview-image {
    height: 140px;
  }
  
  .preview-emoji {
    font-size: 2rem;
  }
  
  .game-preview__features {
    gap: 0.5rem;
  }
  
  .game-preview__feature {
    font-size: 0.8rem;
  }
  
  .game-preview__actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .game-preview__info-btn {
    width: 100%;
    height: 40px;
    border-radius: 8px;
  }
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