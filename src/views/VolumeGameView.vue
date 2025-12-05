<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, computed } from 'vue';
import ThePossessedVolumeSlider from '@/components/ThePossessedVolumeSlider.vue';
import TheCaseOpeningSlider from '@/components/TheCaseOpeningSlider.vue';
import bloodUrl from '@/assets/blood.svg';

// Define the available challenges
const challenges = [
  { 
    id: 'possessed', 
    title: 'Le Slider Possédé', 
    description: 'Une barre de volume hantée par une entité malveillante. Curseur inversé, gravité aléatoire.',
    component: ThePossessedVolumeSlider,
    difficulty: 'DIABOLIQUE'
  },
  { 
    id: 'lootbox', 
    title: 'Volume Lootbox', 
    description: 'Ouvrez des caisses pour espérer obtenir un volume légendaire. Attention à votre argent.',
    component: TheCaseOpeningSlider,
    difficulty: 'PAY-TO-WIN'
  }
];
const currentChallenge = shallowRef<any>(null);
const backButtonRef = ref<HTMLElement | null>(null);
const isHoveringBack = ref(false);

// Custom Cursor Logic
const mouseX = ref(window.innerWidth / 2);
const mouseY = ref(window.innerHeight / 2);

const updateMouse = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;

  // Check hover for Back Button
  if (currentChallenge.value && backButtonRef.value) {
    const { x, y } = getVisualCursorPosition();
    const rect = backButtonRef.value.getBoundingClientRect();
    isHoveringBack.value = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  } else {
    isHoveringBack.value = false;
  }
};

const getVisualCursorPosition = () => {
  let x = mouseX.value;
  let y = mouseY.value;

  if (currentChallenge.value && currentChallenge.value.id === 'possessed') {
    x = window.innerWidth - mouseX.value;
    y = window.innerHeight - mouseY.value;
  }
  return { x, y };
};

// Calculate cursor position based on active challenge
const cursorStyle = computed(() => {
  const { x, y } = getVisualCursorPosition();
  return {
    transform: `translate(${x}px, ${y}px)`
  };
});

const handleGlobalClick = (e: MouseEvent) => {
  // Check if clicking Back Button
  if (currentChallenge.value && backButtonRef.value) {
    const { x, y } = getVisualCursorPosition();
    const rect = backButtonRef.value.getBoundingClientRect();

    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      backToMenu();
      e.stopPropagation(); // Prevent game interactions if clicking UI
    }
  }
};

onMounted(() => {
  window.addEventListener('mousemove', updateMouse);
  window.addEventListener('mousedown', handleGlobalClick);
});
onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse);
  window.removeEventListener('mousedown', handleGlobalClick);
});

const selectChallenge = (challenge: any) => {
  if (challenge.component) {
    currentChallenge.value = challenge;
  }
};

const backToMenu = () => {
  currentChallenge.value = null;
  window.location.reload();
};
</script>

<template>
  <div
    class="volume-game-root fixed inset-0 bg-gray-900 text-white overflow-hidden font-serif select-none"
    :style="{
      backgroundImage: `url(${bloodUrl}), radial-gradient(ellipse at center, #111827, #0a0a0a, #000000)`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundPosition: 'center',
      backgroundBlendMode: 'screen'
    }"
  >

        <!-- GLOBAL FAKE CURSOR -->
        <div
          class="fixed pointer-events-none z-[50000] text-5xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-none will-change-transform"
          :style="{
            left: '0px',
            top: '0px',
            ...cursorStyle
          }"
        >
          <span class="relative">
            🖐️
            <!-- Precision Dot -->
            <div class="absolute top-0 left-0 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)] animate-pulse"></div>
          </span>
        </div>
    <!-- MENU SCREEN -->
    <div v-if="!currentChallenge" class="flex flex-col items-center justify-center h-full w-full p-8 z-10 relative">
      <h1 class="text-5xl md:text-7xl font-bold mb-12 text-primary-color uppercase tracking-[0.2em] drop-shadow-[0_0_15px_rgba(139,0,0,0.8)] text-center animate-float">
        SÉLECTION DU SUPPLICE
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div
          v-for="challenge in challenges"
          :key="challenge.id"
          @click="selectChallenge(challenge)"
          class="group relative p-6 bg-black/60 backdrop-blur-md border-2 border-primary-color/30 rounded-lg cursor-pointer transition-all duration-300 hover:border-primary-color hover:shadow-[0_0_30px_rgba(139,0,0,0.4)] hover:scale-105"
          :class="{ 'opacity-50 cursor-not-allowed': !challenge.component }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary-color/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <h2 class="text-2xl font-bold text-white mb-2 group-hover:text-primary-color transition-colors">{{ challenge.title }}</h2>
          <p class="text-gray-400 text-sm mb-4 font-sans">{{ challenge.description }}</p>

          <div class="flex justify-between items-center mt-4 border-t border-gray-800 pt-4">
            <span class="text-xs uppercase tracking-widest text-gray-500">Difficulté</span>
            <span class="text-sm font-bold text-red-500 drop-shadow-sm">{{ challenge.difficulty }}</span>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 text-center text-gray-600 text-xs uppercase tracking-widest opacity-50">
        Choisissez votre poison
      </div>
    </div>

    <!-- GAME SCREEN -->
    <div v-else class="h-full w-full relative">
      <!-- Back Button -->
      <button 
        ref="backButtonRef"
        @click="backToMenu"
        class="fixed top-4 left-4 z-[30000] px-4 py-2 rounded border text-xs uppercase tracking-widest transition-all duration-200"
        :class="isHoveringBack ? 'text-white bg-primary-color/80 border-primary-color shadow-[0_0_15px_var(--primary-color)]' : 'bg-black/50 text-white/50 border-white/10'"
      >
        Abandonner
      </button>

      <component :is="currentChallenge.component" />
    </div>

  </div>
</template>

<style scoped>
/* Hide default cursor only in this component */
.volume-game-root {
  cursor: none;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.volume-game-root > div {
  height: 100%;
  width: 100%;
}

:root {
  --primary-color: #8B0000;
}

.text-primary-color { color: var(--primary-color); }
.border-primary-color { border-color: var(--primary-color); }
.bg-primary-color { background-color: var(--primary-color); }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }
</style>