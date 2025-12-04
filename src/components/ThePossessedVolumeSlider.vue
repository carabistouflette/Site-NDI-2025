<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import videoUrl from '@/assets/mercredi_addams.mp4';

const videoRef = ref<HTMLVideoElement | null>(null);
const volume = ref(0.5);
const sliderPosition = ref(50);
const isDragging = ref(false);
const animationFrameId = ref<number | null>(null);
const hasStarted = ref(false);
const sliderRef = ref<HTMLElement | null>(null);
const startButtonRef = ref<HTMLElement | null>(null);
const muteButtonRef = ref<HTMLElement | null>(null);

// Fake Cursor State
const fakeCursorX = ref(window.innerWidth / 2); // Start centered to avoid corner jump
const fakeCursorY = ref(window.innerHeight / 2);

// Floating Slider State
const sliderX = ref(200); // Default non-zero
const sliderY = ref(200); // Default non-zero
const velocityX = ref(2);
const velocityY = ref(2);
const sliderWidth = 256;
const sliderHeight = 48;

// Rotation State
const rotation = ref(0);
const rotationVelocity = ref(1);
const lastRotationTime = ref(0);
const lastSpeedChangeTime = ref(0);

// Update fake cursor position on global mouse move
const updateFakeCursor = (e: MouseEvent) => {
  fakeCursorX.value = window.innerWidth - e.clientX;
  fakeCursorY.value = window.innerHeight - e.clientY;

  if (isDragging.value) {
    updateSliderFromFakeX(fakeCursorX.value);
  }
};

const updateSliderFromFakeX = (x: number) => {
  if (!sliderRef.value) return;

  const rect = sliderRef.value.getBoundingClientRect();
  const newPosition = ((x - rect.left) / rect.width) * 100;

  sliderPosition.value = Math.max(0, Math.min(100, newPosition));
  updateVolume(sliderPosition.value / 100);
};

const startExperience = () => {
  hasStarted.value = true;
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = false;
    videoRef.value.play().catch(e => console.error("Play failed:", e));
    startFloatingLoop();
  }
};

const updateVolume = (newVolume: number) => {
  volume.value = Math.max(0, Math.min(1, newVolume));
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    if (hasStarted.value) videoRef.value.muted = false;
  }
};

// HIT TESTING
const handleGlobalMouseDown = (e: MouseEvent) => {
  const x = fakeCursorX.value;
  const y = fakeCursorY.value;

  const isOver = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  // 1. Start Button
  if (!hasStarted.value && startButtonRef.value && isOver(startButtonRef.value)) {
    startExperience();
    return;
  }

  // 2. Mute Button
  if (muteButtonRef.value && isOver(muteButtonRef.value)) {
    toggleMute();
    return;
  }

  // 3. Slider
  if (!hasStarted.value || !sliderRef.value) return;
  const rect = sliderRef.value.getBoundingClientRect();
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
  updateSliderFromFakeX(fakeCursorX.value);
};

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
};

const startFloatingLoop = () => {
  const animate = (currentTime: DOMHighResTimeStamp) => {
    if (hasStarted.value) {
        sliderX.value += velocityX.value;
        sliderY.value += velocityY.value;
        rotation.value += rotationVelocity.value;

        // Random changes
        if (currentTime - lastRotationTime.value > (Math.random() * 2000 + 1000)) {
             rotationVelocity.value = (Math.random() - 0.5) * 10;
             lastRotationTime.value = currentTime;
        }
        if (currentTime - lastSpeedChangeTime.value > (Math.random() * 1500 + 500)) {
             velocityX.value = (Math.random() - 0.5) * 16;
             velocityY.value = (Math.random() - 0.5) * 16;
             lastSpeedChangeTime.value = currentTime;
        }

        // Bounce
        const maxX = window.innerWidth - (sliderRef.value?.clientWidth || sliderWidth);
        const maxY = window.innerHeight - (sliderRef.value?.clientHeight || sliderHeight);

        if (sliderX.value <= 0 || sliderX.value >= maxX) {
            velocityX.value *= -1;
            sliderX.value = Math.max(0, Math.min(sliderX.value, maxX));
        }
        if (sliderY.value <= 0 || sliderY.value >= maxY) {
            velocityY.value *= -1;
             sliderY.value = Math.max(0, Math.min(sliderY.value, maxY));
        }

        if (isDragging.value) {
            updateSliderFromFakeX(fakeCursorX.value);
        }
    }
    animationFrameId.value = requestAnimationFrame(animate);
  };
  animationFrameId.value = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener('mousemove', updateFakeCursor);
  window.addEventListener('mousedown', handleGlobalMouseDown);

  // Randomize start
  velocityX.value = (Math.random() > 0.5 ? 1 : -1) * 3;
  velocityY.value = (Math.random() > 0.5 ? 1 : -1) * 3;
  sliderX.value = Math.random() * (window.innerWidth - sliderWidth);
  sliderY.value = Math.random() * (window.innerHeight - sliderHeight);

  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = true;
  }
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
  <div class="fixed inset-0 flex flex-col items-center justify-between bg-gray-900 text-white p-4 overflow-hidden select-none">

    <!-- DARKNESS OVERLAY -->
    <div
      v-if="hasStarted"
      class="fixed inset-0 pointer-events-none z-[9000]"
      :style="{
        backgroundColor: 'rgba(0,0,0,0.98)',
        maskImage: `radial-gradient(circle 2000px at ${fakeCursorX}px ${fakeCursorY}px, transparent 0%, black 20%), radial-gradient(ellipse 600px 90% at 50% 50%, transparent 0%, transparent 60%, black 80%)`,
        webkitMaskImage: `radial-gradient(circle 2000px at ${fakeCursorX}px ${fakeCursorY}px, transparent 0%, black 20%), radial-gradient(ellipse 600px 90% at 50% 50%, transparent 0%, transparent 60%, black 80%)`,
        maskComposite: 'intersect',
        webkitMaskComposite: 'source-in'
      }"
    ></div>

    <!-- FAKE CURSOR -->
    <div 
      class="fixed pointer-events-none z-[20000] text-4xl filter drop-shadow-lg transition-none will-change-transform"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${fakeCursorX}px, ${fakeCursorY}px)`
      }"
    >
      🖐️
    </div>

    <h1 class="text-3xl font-bold mb-4 text-primary-color uppercase tracking-widest z-10">Attrapez le Volume</h1>

    <!-- Start Overlay -->
    <div v-if="!hasStarted" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
      <button
        ref="startButtonRef"
        @click="startExperience"
        class="px-8 py-4 bg-white text-black text-xl font-bold rounded border-2 border-black hover:bg-primary-color hover:text-white hover:border-primary-color transition-colors duration-300 animate-bounce"
      >
        COMMENCER LA CHASSE
      </button>
    </div>

    <!-- Video Container -->
    <div class="relative inline-block mb-8 rounded-lg overflow-hidden shadow-lg border-0 border-primary-color z-10 video-container">
      <video
        ref="videoRef"
        :src="videoUrl"
        loop
        autoplay
        playsinline
        muted
        class="h-[60vh] w-auto object-contain pointer-events-none block"
        :volume="volume"
      ></video>
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center pointer-events-none" v-if="videoRef && videoRef.muted">
        <p class="text-white text-xl animate-pulse">MUTED</p>
      </div>
    </div>

    <div class="w-full max-w-md flex items-center justify-center space-x-6 mb-8 z-10">
      <!-- Mute Button -->
      <button
        ref="muteButtonRef"
        @click="toggleMute"
        class="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 border-2 border-gray-600 hover:border-primary-color transition-all duration-200 cursor-none z-20"
      >
        <span class="text-2xl pointer-events-none">{{ videoRef?.muted ? '🤐' : '🔊' }}</span>
      </button>
    </div>

    <!-- FLOATING SLIDER -->
    <div
        ref="sliderRef"
        class="fixed top-0 left-0 h-12 w-64 bg-gray-800 rounded-md border-2 border-primary-color overflow-hidden cursor-none shadow-2xl"
        :class="hasStarted ? 'z-50' : 'z-[10001]'"
        :style="{
            transform: `translate(${sliderX}px, ${sliderY}px) rotate(${rotation}deg)`
        }"
      >
        <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>
        <!-- Volume Level -->
        <div
          class="absolute h-full bg-gradient-to-r from-red-900 to-primary-color pointer-events-none transition-none"
          :style="{ width: `${sliderPosition}%` }"
        ></div>
        <!-- Knob -->
        <div
          class="absolute w-4 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transform -translate-x-1/2 pointer-events-none"
          :style="{ left: `${sliderPosition}%` }"
        ></div>

        <!-- Text on slider -->
        <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference pointer-events-none">
            VOLUME
        </div>
    </div>

    <div class="text-center z-10 pointer-events-none">
         <p class="text-gray-500 text-sm">Attrapez la barre... si vous pouvez.</p>
    </div>

  </div>
</template>

<style>
/* GLOBAL CURSOR HIDING */
* {
  cursor: none !important;
}

html, body, #app {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* Theme Colors */
:root {
  --primary-color: #8B0000; /* Crimson Red */
}

.text-primary-color { color: var(--primary-color); }
.border-primary-color { border-color: var(--primary-color); }
.bg-primary-color { background-color: var(--primary-color); }
.hover\:bg-primary-color:hover { background-color: var(--primary-color); }
.hover\:border-primary-color:hover { border-color: var(--primary-color); }
.to-primary-color { --tw-gradient-to: var(--primary-color); }

.video-container {
  box-shadow: 0 0 15px var(--primary-color), 0 0 30px var(--primary-color), 0 0 45px var(--primary-color);
}
</style>