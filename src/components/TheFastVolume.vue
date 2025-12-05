<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue';
import videoUrl from '@/assets/mercredi_addams.mp4';

// --- CONSTANTES ---
// Volume initial à 100%
const INITIAL_VOLUME = 100;
const MIN_TIME_MS = 600;
const REST_TIME_MS = 500;
const HITBOX_PADDING = 20;
const VOLUME_INCREASE_RATE = 5; // Augmentation de 5% à chaque cycle de réapparition
const MAX_VOLUME = 100;
// NOUVEAU: Le volume remonte à 40% quand il atteint 0
const VOLUME_RESET_POINT = 40;

// --- STATE MANAGER ---
const state = reactive({
  volume: INITIAL_VOLUME, // Le volume du jeu
  hasStarted: false,
  gameIsRunning: false,
  buttonVisible: false,
  buttonX: 0,
  buttonY: 0,
  targetButtonTime: MIN_TIME_MS,
});

// --- REFS ---
const videoRef = ref<HTMLVideoElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const startButtonRef = ref<HTMLElement | null>(null);

let buttonTimer: number | null = null;
let gameLoopInterval: number | null = null;
const BUTTON_WIDTH = 120; // Taille fixe pour les calculs de position


// --- CURSEUR INVERSÉ (pour le thème) ---\
const mouseX = ref(window.innerWidth / 2);
const mouseY = ref(window.innerHeight / 2);

const updateMouse = (e: MouseEvent) => {
  // Le curseur réel est inversé
  mouseX.value = window.innerWidth - e.clientX;
  mouseY.value = window.innerHeight - e.clientY;
};

// --- LOGIQUE DU JEU ---

// Condition de "victoire" / reset : Volume atteint 0%
const isVolumeZero = computed(() => state.volume <= 0);

const startExperience = () => {
  state.hasStarted = true;
  state.volume = INITIAL_VOLUME;

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  }

  if (videoRef.value) {
    videoRef.value.volume = state.volume / 100;
    videoRef.value.muted = false;
    videoRef.value.play().catch(() => {});
  }

  state.gameIsRunning = true;
  gameLoopInterval = window.setTimeout(showNewButton, 100);
};

/**
 * Gère la réapparition du bouton à un nouvel emplacement.
 */
const showNewButton = () => {
  if (state.buttonVisible) {
    // Le bouton a expiré sans être cliqué.
  }

  state.buttonVisible = true;

  const padding = 50;
  // Ajustement des bornes pour tenir compte de la largeur du bouton
  const maxX = window.innerWidth - BUTTON_WIDTH - padding;
  const maxY = window.innerHeight - BUTTON_WIDTH - padding;

  state.buttonX = Math.random() * (maxX - padding) + padding;
  state.buttonY = Math.random() * (maxY - padding) + padding;

  // Le bouton disparaît s'il n'est pas cliqué à temps
  buttonTimer = window.setTimeout(hideButton, state.targetButtonTime);
};

/**
 * Cache le bouton et attend avant de le réafficher.
 */
const hideButton = () => {
  state.buttonVisible = false;
  if (buttonTimer) clearTimeout(buttonTimer);
  buttonTimer = null;

  if (isVolumeZero.value) {
    // Le joueur a atteint 0%. Remettre à 40% (pas de vérification isVolumeMax car il ne peut pas être 100 ici)
    state.volume = VOLUME_RESET_POINT;
  } else if (state.volume < MAX_VOLUME) {
    // AUGMENTATION DU VOLUME (5%), SEULEMENT SI LE VOLUME EST INFÉRIEUR À 100%
    state.volume = Math.min(MAX_VOLUME, state.volume + VOLUME_INCREASE_RATE);
  }

  if (videoRef.value) {
    videoRef.value.volume = state.volume / 100;
  }

  // Le jeu ne s'arrête jamais ni à 0% ni à 100%, donc on relance toujours
  if (state.gameIsRunning) {
    gameLoopInterval = window.setTimeout(showNewButton, REST_TIME_MS);
  }
};


/**
 * Logique lorsqu'un joueur clique sur le bouton "-10%".
 */
const handleButtonClick = (e: MouseEvent) => {
  e.stopPropagation();

  // Succès: le volume diminue de 15%, comme demandé
  state.volume = Math.max(0, state.volume - 15);
  if (videoRef.value) videoRef.value.volume = state.volume / 100;

  hideButton(); // Cache immédiatement le bouton et lance le prochain
};

// handleQuit est retiré car il n'y a plus d'écran de fin/bouton

// --- INTERACTIONS GLOBALES (Gestion Start/Clic manqué) ---

/**
 * Vérifie si une position (curseur) est au-dessus d'un élément, avec un rembourrage optionnel.
 */
const isOver = (el: HTMLElement | null, x: number, y: number, padding: number = 0): boolean => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();

  // Utilise la position du curseur visuel (x, y) pour la détection avec rembourrage
  return x >= (rect.left - padding) &&
    x <= (rect.right + padding) &&
    y >= (rect.top - padding) &&
    y <= (rect.bottom + padding);
};


/**
 * Gère les interactions de clic hors du bouton cible (Start)
 */
const handleGlobalInteraction = (e: MouseEvent) => {
  const x = mouseX.value; // Position du curseur VISUEL
  const y = mouseY.value;

  // --- PRIORITÉ 1: BOUTON START ---
  if (!state.hasStarted && isOver(startButtonRef.value, x, y)) {
    startExperience();
    e.stopPropagation();
    return;
  }
};


// --- CYCLE DE VIE ---

onMounted(() => {
  window.addEventListener('mousemove', updateMouse);
  window.addEventListener('mousedown', handleGlobalInteraction);

  if (videoRef.value) {
    videoRef.value.volume = state.volume / 100;
    videoRef.value.muted = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse);
  window.removeEventListener('mousedown', handleGlobalInteraction);
  if (buttonTimer) clearTimeout(buttonTimer);
  if (gameLoopInterval) clearTimeout(gameLoopInterval);
  document.exitFullscreen().catch(() => {});
});
</script>

<template>
  <div
    class="absolute inset-0 flex flex-col items-center justify-between p-4 overflow-hidden select-none font-serif"
  >

    <div class="z-10 w-full flex flex-col items-center mt-8">
      <h1 class="text-4xl md:text-6xl font-bold text-primary-color uppercase tracking-[0.2em] drop-shadow-[0_0_15px_rgba(139,0,0,0.6)] animate-float">
        Attrapez le Volume ZÉRO
      </h1>
      <div v-if="state.hasStarted" class="mt-6 flex space-x-12 text-center">
        <p class="text-3xl font-bold text-white/90">Volume Actuel:
          <span
            :class="{'text-green-500': state.volume <= 10, 'text-red-500': state.volume >= 70, 'text-yellow-500': state.volume < 70 && state.volume > 10}"
          >
                        {{ state.volume }}%
                    </span>
        </p>
      </div>
    </div>

    <div v-if="!state.hasStarted" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        ref="startButtonRef"
        class="group relative px-10 py-5 bg-transparent text-primary-color text-2xl font-bold rounded-sm border-2 border-primary-color overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--primary-color)] hover:text-white animate-pulse"
      >
        <span class="relative z-10 group-hover:text-white transition-colors duration-300">DÉMARRER LE DÉFI FLASH</span>
        <div class="absolute inset-0 bg-primary-color transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
      </button>
    </div>

    <button
      v-if="state.buttonVisible && state.gameIsRunning"
      ref="buttonRef"
      @mousedown.stop="handleButtonClick"
      class="fixed flex items-center justify-center rounded-full bg-red-900/90 border-4 border-red-400/80 shadow-[0_0_20px_rgba(255,0,0,0.9)] text-white font-black text-xl z-50 transition-all duration-75 hover:scale-105 active:scale-95 cursor-none"
      :style="{
                left: `${state.buttonX}px`,
                top: `${state.buttonY}px`,
                width: `${BUTTON_WIDTH}px`,
                height: `${BUTTON_WIDTH}px`,
                // L'animation utilise targetButtonTime
                animation: `pulse-red ${state.targetButtonTime / 1000}s ease-in-out infinite alternate`
            }"
    >
      <span class="drop-shadow-lg">-15%</span>
    </button>


    <div class="relative inline-block mb-8 rounded-lg overflow-hidden z-10 video-container border-0 border-primary-color animate-neon-pulse">
      <video
        ref="videoRef"
        :src="videoUrl"
        loop
        autoplay
        playsinline
        muted
        class="h-[55vh] md:h-[60vh] w-auto object-contain pointer-events-none block"
        :volume="state.volume / 100"
      ></video>
    </div>

    <div class="mb-12"></div>

    <div class="text-center z-10 pointer-events-none pb-4 animate-text-flicker">
      <p class="text-gray-500 text-xs uppercase tracking-widest opacity-60">Soyez plus rapide que l'ouïe...</p>
    </div>

  </div>
</template>

<style>
/* Récupération des styles globaux pour cohérence */
:root { --primary-color: #8B0000; }
.text-primary-color { color: var(--primary-color); }
.border-primary-color { border-color: var(--primary-color); }
.bg-primary-color { background-color: var(--primary-color); }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }

/* Styles spécifiques au composant ThePossessedVolumeSlider.vue pour la vidéo (réutilisés ici) */
.video-container {
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.3), 0 0 30px rgba(139, 0, 0, 0.2), 0 0 50px rgba(139, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.animate-neon-pulse { animation: neon-pulse 4s infinite; }
@keyframes neon-pulse {
  0%, 10%, 100% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.2), 0 0 20px rgba(139, 0, 0, 0.1); }
  5% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.6), 0 0 40px rgba(139, 0, 0, 0.4); }
  15% { box-shadow: 0 0 25px rgba(139, 0, 0, 0.7), 0 0 50px rgba(139, 0, 0, 0.5); }
}
.animate-text-flicker { animation: text-flicker 5s infinite; }
@keyframes text-flicker {
  0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100% { opacity: 0.6; }
  20%, 21.9%, 63%, 63.9%, 65%, 69.9% { opacity: 0.2; }
}

/* Animation spécifique pour le bouton */
@keyframes pulse-red {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.8; }
}
</style>
