<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import videoUrl from '@/assets/mercredi_addams.mp4';

const videoRef = ref<HTMLVideoElement | null>(null);
const volume = ref(0.5);
const sliderPosition = ref(50);
const isDragging = ref(false);
const animationFrameId = ref<number | null>(null);
const lastUpdateTime = ref(0);
const hasStarted = ref(false);
const sliderRef = ref<HTMLElement | null>(null); // Ref for the slider track

// Fake Cursor State
const fakeCursorX = ref(0);
const fakeCursorY = ref(0);

const animationSpeed = 0.05;
const animationMagnitude = 10;

// Update fake cursor position on global mouse move
const updateFakeCursor = (e: MouseEvent) => {
  // Invert coordinates: (Width - x, Height - y)
  fakeCursorX.value = window.innerWidth - e.clientX;
  fakeCursorY.value = window.innerHeight - e.clientY;

  // If dragging, the slider follows the FAKE cursor's X
  if (isDragging.value) {
    updateSliderFromFakeX(fakeCursorX.value);
  }
};

const updateSliderFromFakeX = (x: number) => {
  if (!sliderRef.value) return;

  const rect = sliderRef.value.getBoundingClientRect();
  // Calculate position relative to the slider track using the FAKE X
  const newPosition = ((x - rect.left) / rect.width) * 100;

  sliderPosition.value = Math.max(0, Math.min(100, newPosition));
  updateVolume(sliderPosition.value / 100);
}

const startExperience = () => {
  hasStarted.value = true;
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = false;
    videoRef.value.play().catch(e => console.error("Play failed:", e));
    startPossessedMovement();
  }
};

const updateVolume = (newVolume: number) => {
  volume.value = Math.max(0, Math.min(1, newVolume));
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    if (hasStarted.value) videoRef.value.muted = false;
  }
};

// HIT TESTING: Check if the FAKE cursor is over the slider when the REAL mouse clicks
const handleGlobalMouseDown = (e: MouseEvent) => {
  if (!hasStarted.value || !sliderRef.value) return;

  const rect = sliderRef.value.getBoundingClientRect();
  const x = fakeCursorX.value;
  const y = fakeCursorY.value;

  // Check collision between Fake Cursor (Point) and Slider (Rect)
  // We add a bit of padding (margin) to make it easier to grab
  const padding = 20;
  if (
    x >= rect.left - padding &&
    x <= rect.right + padding &&
    y >= rect.top - padding &&
    y <= rect.bottom + padding
  ) {
    startDrag();
  }
};

const startDrag = () => {
  isDragging.value = true;

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
    animationFrameId.value = null;
  }

  // Immediate update
  updateSliderFromFakeX(fakeCursorX.value);
};

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
  setTimeout(startPossessedMovement, 1000);
};

const startPossessedMovement = () => {
  const animateSlider = (currentTime: DOMHighResTimeStamp) => {
    if (!lastUpdateTime.value) lastUpdateTime.value = currentTime;
    lastUpdateTime.value = currentTime;

    if (!isDragging.value && hasStarted.value && videoRef.value && !videoRef.value.paused) {
      const wiggle = Math.sin(currentTime * animationSpeed) * animationMagnitude;
      let newPosition = 50 + wiggle;
      newPosition = Math.max(0, Math.min(100, newPosition));

      sliderPosition.value = newPosition;
      updateVolume(sliderPosition.value / 100);
    }
    animationFrameId.value = requestAnimationFrame(animateSlider);
  };
  if (!animationFrameId.value) {
      animationFrameId.value = requestAnimationFrame(animateSlider);
  }
};

onMounted(() => {
  // Track mouse globally for the fake cursor
  window.addEventListener('mousemove', updateFakeCursor);
  // Track clicks globally for Hit Testing
  window.addEventListener('mousedown', handleGlobalMouseDown);

  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = true;
    videoRef.value.play().catch(e => console.error("Autoplay failed:", e));
  }
  startPossessedMovement();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateFakeCursor);
  window.removeEventListener('mousedown', handleGlobalMouseDown);
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
  }
};
</script>

<template>
  <!-- Main Container: Full viewport, hidden overflow to stop scrollbars -->
  <div class="fixed inset-0 flex flex-col items-center justify-between bg-gray-900 text-white p-4 overflow-hidden select-none">

    <!-- FAKE CURSOR: Pointer events none to let clicks pass through to window/elements underneath (if mapped) -->
    <div
      class="fixed pointer-events-none z-[9999] text-4xl filter drop-shadow-lg transition-none will-change-transform"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${fakeCursorX}px, ${fakeCursorY}px)`
      }"
    >
      🖐️
    </div>

    <h1 class="text-3xl font-bold mb-4 text-mercredi-purple uppercase tracking-widest z-10">Contrôles Inversés</h1>

    <!-- Start Overlay -->
    <div v-if="!hasStarted" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm cursor-auto">
      <button
        @click="startExperience"
        class="px-8 py-4 bg-mercredi-purple text-white text-xl font-bold rounded border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 animate-bounce"
      >
        CLIQUER POUR SOUFFRIR
      </button>
    </div>

    <div class="relative flex-grow flex items-center justify-center w-full max-w-lg mb-8 bg-black rounded-lg overflow-hidden shadow-lg border-2 border-mercredi-purple max-h-[50vh] z-10">
      <video
        ref="videoRef"
        :src="videoUrl"
        loop
        autoplay
        playsinline
        muted
        class="w-full h-full object-contain pointer-events-none"
        :volume="volume"
      ></video>
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center pointer-events-none" v-if="videoRef && videoRef.muted">
        <p class="text-white text-xl animate-pulse">MUTED</p>
      </div>
    </div>

    <div class="w-full max-w-md flex items-center justify-center space-x-6 mb-8 z-10">
      <!-- Mute Button: Note - You still have to hit this with the INVISIBLE REAL MOUSE.
           To make it 'Fake Cursor' clickable, we'd need similar hit testing.
           Let's leave it as a 'Trap' for now: You see the hand over it, but it doesn't click. -->
      <button
        @click="toggleMute"
        class="w-16 h-16 flex items-center justify-center rounded-full bg-red-800 border-2 border-gray-600 hover:border-mercredi-purple transition-all duration-200 cursor-none"
      >
        <span class="text-2xl pointer-events-none">{{ videoRef?.muted ? '🤐' : '🔊' }}</span>
      </button>

      <!-- Possessed Slider Container -->
      <div
        ref="sliderRef"
        class="relative flex-grow h-12 bg--800 rounded-md volume-track border border-gray-600 overflow-hidden cursor-none"
      >
        <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>
        <div
          class="absolute h-full bg-gradient-to-r from-red-900 to-mercredi-purple pointer-events-none"
          :style="{ width: `${sliderPosition}%` }"
        ></div>
        <div
          class="absolute w-4 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transform -translate-x-1/2 pointer-events-none"
          :style="{ left: `${sliderPosition}%` }"
        ></div>
      </div>
    </div>

    <div class="text-center z-10 pointer-events-none">
         <p class="text-gray-500 text-sm">Le curseur est un mensonge. Alignez la main pour attraper le son.</p>
    </div>

  </div>
</template>

<style>
/* GLOBAL CURSOR HIDING */
html, body, #app {
  cursor: none !important;
  overflow: hidden; /* Prevent scrollbars messing up coords */
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.text-mercredi-purple { color: #8B0000; }
.border-mercredi-purple { border-color: #8B0000; }
.bg-mercredi-purple { background-color: #8B0000; }
</style>
