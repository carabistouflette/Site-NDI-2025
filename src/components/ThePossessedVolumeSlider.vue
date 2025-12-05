<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import videoUrl from '@/assets/mercredi_addams.mp4';

// --- COMPOSABLES (Internal) ---

function useFakeCursor() {
  const x = ref(window.innerWidth / 2);
  const y = ref(window.innerHeight / 2);

  const update = (e: MouseEvent) => {
    x.value = window.innerWidth - e.clientX;
    y.value = window.innerHeight - e.clientY;
  };

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}

function usePossessedSlider(sliderRef: any, windowWidth: number, windowHeight: number) {
  const state = reactive({
    x: 200,
    y: 200,
    vx: 2,
    vy: 2,
    rotation: 0,
    vRotation: 1,
    scale: 1,
    vScale: 0.002,
    flickerOpacity: 1,
    width: 256,
    height: 48,
    lastChaosTime: 0,
    isDragging: false
  });

  const applyChaos = (val: number, max: number) => (Math.random() - 0.5) * 2 * max;

  const updatePhysics = (pos: number, vel: number, max: number) => {
    let nextPos = pos + vel;
    let nextVel = vel;
    if (nextPos <= 0 || nextPos >= max) {
      nextVel *= -1;
      nextPos = Math.max(0, Math.min(nextPos, max));
    }
    return { pos: nextPos, vel: nextVel };
  };

  let frameId: number | null = null;

  const startLoop = (onUpdate: () => void) => {
    // Randomize start
    state.vx = (Math.random() > 0.5 ? 1 : -1) * 3;
    state.vy = (Math.random() > 0.5 ? 1 : -1) * 3;
    state.x = Math.random() * (windowWidth - state.width);
    state.y = Math.random() * (windowHeight - state.height);

    const loop = (time: number) => {
      // Chaos
      if (time - state.lastChaosTime > (Math.random() * 1500 + 500)) {
        state.vRotation = applyChaos(state.vRotation, 5);
        state.vx = applyChaos(state.vx, 8);
        state.vy = applyChaos(state.vy, 8);
        state.vScale = applyChaos(state.vScale, 0.015);
        state.lastChaosTime = time;
      }

      // Updates
      state.rotation += state.vRotation;
      state.scale += state.vScale;

      // Scale Bounce
      if (state.scale < 0.8 || state.scale > 1.2) {
        state.vScale *= -1;
        state.scale = Math.max(0.8, Math.min(1.2, state.scale));
      }

      // Flicker Effect
      state.flickerOpacity = 0.8 + Math.random() * 0.2; // Jitter between 0.8 and 1.0

      const maxX = window.innerWidth - (sliderRef.value?.clientWidth || state.width);
      const resX = updatePhysics(state.x, state.vx, maxX);
      state.x = resX.pos;
      state.vx = resX.vel;

      const maxY = window.innerHeight - (sliderRef.value?.clientHeight || state.height);
      const resY = updatePhysics(state.y, state.vy, maxY);
      state.y = resY.pos;
      state.vy = resY.vel;

      if (state.isDragging) onUpdate(); // Callback for volume update

      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
  };

  onUnmounted(() => { if(frameId) cancelAnimationFrame(frameId) });

  return { state, startLoop };
}

// --- MAIN LOGIC ---

const videoRef = ref<HTMLVideoElement | null>(null);
const sliderRef = ref<HTMLElement | null>(null);
const startButtonRef = ref<HTMLElement | null>(null);
const muteButtonRef = ref<HTMLElement | null>(null);

const volume = ref(0.5);
const sliderPosition = ref(0);
const hasStarted = ref(false);

// Init Composables
const fakeCursor = useFakeCursor();
const slider = usePossessedSlider(sliderRef, window.innerWidth, window.innerHeight);

// Volume Logic
const updateVolumeFromCursor = (cursorX: number) => {
  if (!sliderRef.value) return;
  const rect = sliderRef.value.getBoundingClientRect();
  const newPos = ((cursorX - rect.left) / rect.width) * 100;
  sliderPosition.value = Math.max(0, Math.min(100, newPos));
  volume.value = Math.max(0, Math.min(1, sliderPosition.value / 100));

  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    if (hasStarted.value) videoRef.value.muted = false;
  }
};

// Start Logic
const startExperience = () => {
  hasStarted.value = true;
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = false;
    videoRef.value.play().catch(() => {});
    // Start loop with dragging callback
    slider.startLoop(() => updateVolumeFromCursor(fakeCursor.x.value));
  }
};

// Interaction Logic (Hit Testing & Drag)
const handleGlobalMouseDown = () => {
  const x = fakeCursor.x.value;
  const y = fakeCursor.y.value;

  const isOver = (el: HTMLElement | null) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  if (!hasStarted.value && isOver(startButtonRef.value)) {
    startExperience();
    return;
  }

  if (isOver(muteButtonRef.value)) {
    if (videoRef.value) videoRef.value.muted = !videoRef.value.muted;
    return;
  }

  if (hasStarted.value && isOver(sliderRef.value)) {
    startDrag();
  }
};

const startDrag = () => {
  slider.state.isDragging = true;
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
  updateVolumeFromCursor(fakeCursor.x.value);
};

const endDrag = () => {
  slider.state.isDragging = false;
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);
};

onMounted(() => {
  window.addEventListener('mousedown', handleGlobalMouseDown);
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('mousedown', handleGlobalMouseDown);
});

</script>

<template>
  <!-- Main Container -->
  <div
    class="absolute inset-0 flex flex-col items-center justify-between p-4 overflow-hidden select-none font-serif"
  >

    <!-- TITLE -->
    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-primary-color uppercase tracking-[0.2em] z-10 mt-8 drop-shadow-[0_0_15px_rgba(139,0,0,0.6)] animate-float">
      Attrapez le Volume
    </h1>
    <!-- START OVERLAY -->
    <div v-if="!hasStarted" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        ref="startButtonRef"
        @click="startExperience"
        class="group relative px-10 py-5 bg-transparent text-primary-color text-2xl font-bold rounded-sm border-2 border-primary-color overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--primary-color)] hover:text-white animate-pulse"
      >
        <span class="relative z-10 group-hover:text-white transition-colors duration-300">COMMENCER LA CHASSE</span>
        <div class="absolute inset-0 bg-primary-color transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
      </button>
    </div>

    <!-- VIDEO CONTAINER -->
    <div class="relative inline-block mb-8 rounded-lg overflow-hidden z-10 video-container border-0 border-primary-color animate-neon-pulse">
      <video
        ref="videoRef"
        :src="videoUrl"
        loop
        autoplay
        playsinline
        muted
        class="h-[55vh] md:h-[60vh] w-auto object-contain pointer-events-none block"
        :volume="volume"
      ></video>
      <div class="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none" v-if="videoRef && videoRef.muted">
        <p class="text-white text-2xl font-bold animate-pulse border-4 border-white p-4 rotate-12 mix-blend-overlay">MUTED</p>
      </div>
    </div>

    <!-- MUTE BUTTON -->
    <div class="w-full max-w-md flex items-center justify-center space-x-6 mb-12 z-10">
      <button
        ref="muteButtonRef"
        class="w-20 h-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-gray-700 hover:border-primary-color hover:bg-primary-color/20 hover:shadow-[0_0_20px_var(--primary-color)] transition-all duration-300 cursor-none z-20 group"
      >
        <span class="text-3xl pointer-events-none group-hover:scale-125 transition-transform">{{ videoRef?.muted ? '🤐' : '🔊' }}</span>
      </button>
    </div>

    <!-- FLOATING SLIDER -->
    <div
      ref="sliderRef"
      class="fixed top-0 left-0 h-14 w-72 bg-black/90 backdrop-blur-xl rounded-full border-2 border-red-900/50 overflow-hidden cursor-none shadow-[0_0_30px_rgba(139,0,0,0.3)] z-[50]"
      :class="hasStarted ? 'z-50' : 'z-[10001]'"
      :style="{
            transform: `translate(${slider.state.x}px, ${slider.state.y}px) rotate(${slider.state.rotation}deg) scale(${slider.state.scale})`,
            opacity: slider.state.flickerOpacity
        }"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20"></div>
      <div class="absolute inset-0 bg-red-950/30 pointer-events-none"></div>
      <div
        class="absolute h-full bg-gradient-to-r from-black via-red-900 to-primary-color pointer-events-none transition-none z-10"
        :style="{ width: `${sliderPosition}%` }"
      ></div>
      <div
        class="absolute w-1 h-full bg-primary-color shadow-[0_0_15px_var(--primary-color)] transform -translate-x-1/2 pointer-events-none z-30"
        :style="{ left: `${sliderPosition}%` }"
      ></div>
      <div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white/90 tracking-[0.2em] pointer-events-none z-40 drop-shadow-md font-serif">
        {{ Math.round(sliderPosition) }}%
      </div>
    </div>

    <div class="text-center z-10 pointer-events-none pb-4 animate-text-flicker">
      <p class="text-gray-500 text-xs uppercase tracking-widest opacity-60">Patience est mère de sûreté...</p>
    </div>

  </div>
</template>

<style>
/* COMPONENT-SPECIFIC CURSOR HIDING */

/* Component Styles */
.video-container {
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.3), 0 0 30px rgba(139, 0, 0, 0.2), 0 0 50px rgba(139, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.video-container:hover {
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.6), 0 0 40px rgba(139, 0, 0, 0.4), 0 0 60px rgba(139, 0, 0, 0.2);
}

/* Animations */
@keyframes neon-pulse {
  0%, 10%, 100% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.2), 0 0 20px rgba(139, 0, 0, 0.1); }
  5% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.6), 0 0 40px rgba(139, 0, 0, 0.4); }
  15% { box-shadow: 0 0 25px rgba(139, 0, 0, 0.7), 0 0 50px rgba(139, 0, 0, 0.5); }
}
.animate-neon-pulse { animation: neon-pulse 4s infinite; }

@keyframes text-flicker {
  0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100% { opacity: 0.6; }
  20%, 21.9%, 63%, 63.9%, 65%, 69.9% { opacity: 0.2; }
}
.animate-text-flicker { animation: text-flicker 5s infinite; }
</style>
