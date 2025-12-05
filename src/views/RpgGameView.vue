<template>
  <div class="rpg-game">
    <!-- Stats Overlay (Top) -->
    <div class="stats-bar">
      <div class="radar-wrapper" v-if="store.scenario === 'classic'">
        <TalentRadar :stats="store.talentStats" />
      </div>
      <div class="game-info">
        <h2 v-if="store.scenario === 'classic'">MODE DUAL-LINK</h2>
        <h2 v-else>ECO QUEST: ESCAPE</h2>
        
        <p v-if="store.scenario === 'classic'">Interagissez avec deux IA. Comparez leurs styles.</p>
        <p v-else>Sauvez Dian et Arianna en faisant le lien entre eux.</p>

        <button v-if="store.gameState === 'playing'" class="finish-btn" @click="finishGame">
          {{ store.scenario === 'escape' ? 'TERMINER LA MISSION' : 'TERMINER & VOTER' }}
        </button>
      </div>
    </div>

    <!-- Chat Arena -->
    <div class="arena-grid">
      <!-- Model A -->
      <div class="chat-column" :class="{ 'winner': store.winner === 'left' }">
        <div class="col-header">
          <span class="status-dot" :class="{ active: !store.loading.left }"></span>
          {{ leftTitle }}
        </div>
        <div class="chat-window" ref="chatLeft" @scroll="handleScroll('left')">
          <template v-for="(msg, i) in store.chatHistory.left" :key="i">
             <div v-if="shouldShowMessage(msg)" class="message" :class="msg.role">
               <div class="msg-content" v-html="formatMessage(msg.content)"></div>
             </div>
          </template>
          <div v-if="isThinking('left')" class="loading-indicator">
            <span class="blink-text">> TRAITEMENT EN COURS<span class="blink-cursor">_</span></span>
          </div>
        </div>
        <div class="input-area-single">
            <input 
              v-model="userInputLeft" 
              @keyup.enter="sendMessage('left')" 
              type="text" 
              placeholder="Répondre à CONSOLE A..."
              :disabled="store.loading.left"
            >
            <button @click="sendMessage('left')" :disabled="!userInputLeft || store.loading.left">ENVOYER</button>
        </div>
        <button v-if="store.gameState === 'finished' && store.scenario === 'classic'" class="vote-btn" @click="vote('left')">
          CHOISIR CE MODÈLE
        </button>
      </div>

      <!-- Model B -->
      <div class="chat-column" :class="{ 'winner': store.winner === 'right' }">
        <div class="col-header">
          <span class="status-dot" :class="{ active: !store.loading.right }"></span>
          {{ rightTitle }}
        </div>
        <div class="chat-window" ref="chatRight" @scroll="handleScroll('right')">
           <template v-for="(msg, i) in store.chatHistory.right" :key="i">
             <div v-if="shouldShowMessage(msg)" class="message" :class="msg.role">
               <div class="msg-content" v-html="formatMessage(msg.content)"></div>
             </div>
          </template>
          <div v-if="isThinking('right')" class="loading-indicator">
            <span class="blink-text">> TRAITEMENT EN COURS<span class="blink-cursor">_</span></span>
          </div>
        </div>
        <div class="input-area-single">
            <input 
              v-model="userInputRight" 
              @keyup.enter="sendMessage('right')" 
              type="text" 
              placeholder="Répondre à CONSOLE B..."
              :disabled="store.loading.right"
            >
            <button @click="sendMessage('right')" :disabled="!userInputRight || store.loading.right">ENVOYER</button>
        </div>
        <button v-if="store.gameState === 'finished' && store.scenario === 'classic'" class="vote-btn" @click="vote('right')">
          CHOISIR CE MODÈLE
        </button>
      </div>
    </div>

    <!-- Result Modal -->
    <div v-if="store.winner" class="result-modal">
      <div class="result-content">
        <h1>TERMINÉ</h1>
        <p>Vous avez préféré le modèle :</p>
        <h2 class="winner-name">
          {{ store.winner === 'left' ? store.models.names.left : store.models.names.right }}
        </h2>
        <p class="real-id">
          ({{ store.winner === 'left' ? store.models.left : store.models.right }})
        </p>
        
        <!-- Reveal Message -->
        <p class="reveal-message">
          {{ getRevealMessage(store.winner === 'left' ? store.models.left : store.models.right) }}
        </p>

        <div class="final-stats" v-if="store.scenario === 'classic'">
           <h3>Carte Finale des Talents</h3>
           <TalentRadar :stats="store.talentStats" />
        </div>
        <button class="restart-btn" @click="restart">RETOUR ACCUEIL</button>
      </div>
    </div>

    <!-- Escape Game Finish Modal -->
    <div v-if="store.gameState === 'finished' && store.scenario === 'escape'" class="result-modal">
      <div class="result-content">
        <h1>MISSION TERMINÉE</h1>
        <p>Avez-vous réussi à sauver Dian et Arianna ?</p>
        <button class="restart-btn" @click="restart">RETOUR ACCUEIL</button>
      </div>
    </div>

    <!-- Intro Modal for Escape Game -->
    <div v-if="showIntroModal" class="result-modal">
      <div class="result-content intro-content">
        <h1>MISSION: SAUVETAGE</h1>
        <div class="intro-text">
          <p><strong>Année 2032.</strong></p>
          <p>À bord du vaisseau spatial français <em>Aigle d’Argent</em>, une alarme a provoqué la fermeture automatique de plusieurs compartiments.</p>
          <p>Deux astronautes, <strong>Dian</strong> et <strong>Arianna</strong>, sont désormais bloqués dans deux pièces différentes, sans possibilité de communiquer entre eux.</p>
          <p>Chacun voit devant lui des boutons, câbles, panneaux et instructions incomplètes.</p>
          <p>Tu te trouves dans une troisième pièce, équipé d’un ordinateur de liaison. C’est le seul moyen de parler à l’un comme à l’autre.</p>
          <div class="rules-box">
            <h3>RÈGLE DU JEU :</h3>
            <ul>
              <li>Les informations nécessaires pour aider Dian se trouvent dans la pièce d’Arianna.</li>
              <li>Et celles nécessaires pour aider Arianna se trouvent dans la pièce de Dian.</li>
              <li>Ils ne peuvent pas se sauver seuls. <strong>Tu es leur seul lien.</strong></li>
            </ul>
          </div>
          <p>Ton rôle est de recueillir les informations de chacun, les analyser et transmettre la bonne instruction au bon moment.</p>
          <p><em>Dans le silence de l’espace, deux vies dépendent de ta capacité à faire le lien.</em></p>
        </div>
        <button class="restart-btn" @click="showIntroModal = false">COMMENCER LA MISSION</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted, computed } from 'vue';
import { useRpgStore } from '@/stores/rpgStore';
import TalentRadar from '@/components/rpg/TalentRadar.vue';
import { useRouter } from 'vue-router';

const store = useRpgStore();
const router = useRouter();
const userInputLeft = ref('');
const userInputRight = ref('');
const chatLeft = ref<HTMLElement | null>(null);
const chatRight = ref<HTMLElement | null>(null);
const isUserScrollingLeft = ref(false);
const isUserScrollingRight = ref(false);
const showIntroModal = ref(false);

const leftTitle = computed(() => store.scenario === 'escape' ? 'CUVE P (DIAN)' : 'CONSOLE A');
const rightTitle = computed(() => store.scenario === 'escape' ? 'CUVE G (ARIANNA)' : 'CONSOLE B');

onMounted(() => {
  if (store.gameState !== 'playing' || !store.models.left) {
    router.replace('/rpg/setup');
    return;
  }
  if (store.scenario === 'escape') {
    showIntroModal.value = true;
  }
});

const sendMessage = async (side: 'left' | 'right') => {
  let text = '';
  if (side === 'left') {
    text = userInputLeft.value;
    userInputLeft.value = '';
  } else {
    text = userInputRight.value;
    userInputRight.value = '';
  }
  if (!text.trim()) return;
  await store.sendUserMessageToModel(text, side);
};

const finishGame = () => {
  store.gameState = 'finished';
};

const vote = (side: 'left' | 'right') => {
  store.chooseWinner(side);
};

const restart = () => {
  store.resetStore(); // Reset the store state for a fresh start
  router.push('/');
};

const formatMessage = (content: string) => {
  if (!content) return '';
  let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formattedContent = formattedContent.replace(/\n/g, '<br>');
  return formattedContent;
};

const getRevealMessage = (modelId: string) => {
  if (modelId === 'z-ai/glm-4.6') {
    return "C'est l'IA la plus grosse et la plus polluante.";
  } else if (modelId === 'openai/gpt-oss-120b') {
    return "C'est l'IA la plus économe. Sa consommation est 5 fois moindre pour un résultat supérieur.";
  }
  return "";
};

const isThinking = (side: 'left' | 'right') => {
  if (!store.loading[side]) return false;
  const history = store.chatHistory[side];
  if (!history || history.length === 0) return true;
  const lastMsg = history[history.length - 1];
  return lastMsg.role === 'assistant' && (!lastMsg.content || !lastMsg.content.trim());
};

const shouldShowMessage = (msg: any) => {
  return msg.content && msg.content.trim().length > 0;
};

const scrollToBottom = (side: 'left' | 'right') => {
  const container = side === 'left' ? chatLeft.value : chatRight.value;
  if (container) {
    // Only auto-scroll if user is near the bottom
    const threshold = 100; // px from bottom
    if (container.scrollHeight - container.scrollTop <= container.clientHeight + threshold) {
      container.scrollTop = container.scrollHeight;
    }
  }
};

const handleScroll = (side: 'left' | 'right') => {
  const container = side === 'left' ? chatLeft.value : chatRight.value;
  if (container) {
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5; // Small buffer
    if (side === 'left') {
      isUserScrollingLeft.value = !isAtBottom;
    } else {
      isUserScrollingRight.value = !isAtBottom;
    }
  }
};

// Auto-scroll when history content changes (Streaming)
watch(() => store.chatHistory.left, async () => {
  await nextTick();
  if (!isUserScrollingLeft.value) { // Only auto-scroll if user is not actively scrolling
    scrollToBottom('left');
  }
}, { deep: true });

watch(() => store.chatHistory.right, async () => {
  await nextTick();
  if (!isUserScrollingRight.value) { // Only auto-scroll if user is not actively scrolling
    scrollToBottom('right');
  }
}, { deep: true });
</script>

<style scoped>
.rpg-game {
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
  color: #e0e0e0;
  font-family: 'Share Tech Mono', monospace;
  min-height: 100vh;
  padding-top: 90px;
}

.stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 1.5rem;
  background: #0f0f0f;
  border-bottom: 1px solid #222;
}

.radar-wrapper {
  width: 140px;
  height: 140px;
}

.game-info {
  text-align: left;
}

.game-info h2 {
  color: #4af626;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.game-info p {
  color: #888;
  font-size: 0.9rem;
  max-width: 400px;
  line-height: 1.4;
}

.arena-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: #222; /* Divider color */
}

.chat-column {
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-column.winner {
  border: 1px solid #4af626;
  background: #0c1a0c;
}

.col-header {
  padding: 15px;
  text-align: center;
  font-family: 'Share Tech Mono', monospace;
  color: #4af626;
  border-bottom: 1px solid #222;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #0f0f0f;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #333;
  border-radius: 50%;
}
.status-dot.active {
  background: #4af626;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Custom Scrollbar */
.chat-window::-webkit-scrollbar {
  width: 6px;
}
.chat-window::-webkit-scrollbar-track {
  background: #0a0a0a;
}
.chat-window::-webkit-scrollbar-thumb {
  background: #222;
}
.chat-window::-webkit-scrollbar-thumb:hover {
  background: #4af626;
}

.message {
  max-width: 85%;
  font-size: 0.95rem;
  line-height: 1.6;
}

.message :deep(strong) {
  color: #fff;
  font-weight: bold;
}

.message.assistant {
  align-self: flex-start;
  color: #ccc;
}
.message.assistant .msg-content::before {
  content: '> ';
  color: #4af626;
  margin-right: 8px;
}

.message.user {
  align-self: flex-end;
  color: #4af626;
  text-align: right;
}
.message.user .msg-content::after {
  content: ' <';
  color: #666;
  margin-left: 8px;
}

.input-area-single {
  padding: 1.5rem;
  background: #0f0f0f;
  display: flex;
  gap: 1rem;
  border-top: 1px solid #222;
}

.input-area-single input {
  flex: 1;
  padding: 12px 16px;
  background: #050505;
  border: 1px solid #333;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-area-single input:focus {
  outline: none;
  border-color: #4af626;
}

.input-area-single button {
  padding: 0 1.5rem;
  background: transparent;
  color: #4af626;
  border: 1px solid #333;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s;
}

.input-area-single button:hover:not(:disabled) {
  border-color: #4af626;
  background: rgba(74, 246, 38, 0.1);
}

.input-area-single button:disabled {
  color: #444;
  border-color: #222;
  cursor: not-allowed;
}

.loading-indicator {
  color: #4af626;
  font-size: 1rem;
  padding: 1rem;
  text-align: left;
  font-family: 'Share Tech Mono', monospace;
  opacity: 1;
}

.blink-cursor {
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background: #4af626;
  vertical-align: bottom;
  animation: blink 1s step-end infinite;
  margin-left: 5px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.finish-btn, .vote-btn {
  margin: 1rem;
  padding: 1rem 2rem;
  background: transparent;
  color: #4af626;
  border: 1px solid #4af626;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.2s;
}

.finish-btn:hover, .vote-btn:hover {
  background: #4af626;
  color: #000;
}

/* Result Modal */
.result-modal {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.result-content {
  text-align: center;
  background: #0a0a0a;
  padding: 3rem;
  border: 1px solid #4af626;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.winner-name {
  font-size: 2.5rem;
  color: #4af626;
  margin: 1.5rem 0;
  letter-spacing: 2px;
}

.real-id {
  color: #666;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.reveal-message {
  margin: 2rem 0;
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.6;
}

.restart-btn {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid #666;
  color: #ccc;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  transition: all 0.2s;
}

.restart-btn:hover {
  border-color: #fff;
  color: #fff;
}

.intro-content {
  max-width: 800px;
  text-align: left;
}

.intro-text p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #ccc;
}

.rules-box {
  background: rgba(74, 246, 38, 0.1);
  border: 1px solid #4af626;
  padding: 1.5rem;
  margin: 2rem 0;
}

.rules-box h3 {
  color: #4af626;
  margin-bottom: 1rem;
}

.rules-box ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.rules-box li {
  margin-bottom: 0.5rem;
  color: #e0e0e0;
}
</style>