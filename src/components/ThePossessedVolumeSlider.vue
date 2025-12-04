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

// Fake Cursor State
const fakeCursorX = ref(0);
const fakeCursorY = ref(0);

// Floating Slider State
const sliderX = ref(100); // Initial X position
const sliderY = ref(100); // Initial Y position
const velocityX = ref(2); // Speed X
const velocityY = ref(2); // Speed Y
const sliderWidth = 256; // w-64 = 16rem = 256px
const sliderHeight = 48; // h-12 = 3rem = 48px

// Update fake cursor position on global mouse move
const updateFakeCursor = (e: MouseEvent) => {
  // Invert coordinates: (Width - x, Height - y)
  fakeCursorX.value = window.innerWidth - e.clientX;
  fakeCursorY.value = window.innerHeight - e.clientY;
  
  // If dragging, we update the volume based on the fake cursor's position relative to the MOVING slider
  if (isDragging.value) {
    updateSliderFromFakeX(fakeCursorX.value);
  }
};

const updateSliderFromFakeX = (x: number) => {
  if (!sliderRef.value) return;

  const rect = sliderRef.value.getBoundingClientRect();
  // Calculate position relative to the moving slider track
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
  if (!hasStarted.value || !sliderRef.value) return;

  const rect = sliderRef.value.getBoundingClientRect();
  const x = fakeCursorX.value;
  const y = fakeCursorY.value;

  // Check collision with the floating slider
  const padding = 20; // Forgiveness padding
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
  // We DO NOT stop the animation loop. The slider keeps moving while you drag!
  updateSliderFromFakeX(fakeCursorX.value);
};

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
};

const startFloatingLoop = () => {
  const animate = () => {
    if (hasStarted.value) {
        // Move the slider
        sliderX.value += velocityX.value;
        sliderY.value += velocityY.value;

        // Bounce Logic
        const maxX = window.innerWidth - (sliderRef.value?.clientWidth || sliderWidth);
        const maxY = window.innerHeight - (sliderRef.value?.clientHeight || sliderHeight);

        if (sliderX.value <= 0 || sliderX.value >= maxX) {
            velocityX.value *= -1;
            // Clamp to prevent sticking
            sliderX.value = Math.max(0, Math.min(sliderX.value, maxX));
        }
        if (sliderY.value <= 0 || sliderY.value >= maxY) {
            velocityY.value *= -1;
             sliderY.value = Math.max(0, Math.min(sliderY.value, maxY));
        }

        // If dragging, update volume because the slider moved under the cursor!
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
  
  // Randomize start direction
  velocityX.value = (Math.random() > 0.5 ? 1 : -1) * 3; // Speed 3
  velocityY.value = (Math.random() > 0.5 ? 1 : -1) * 3;

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
    
    <!-- FAKE CURSOR -->
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

    <h1 class="text-3xl font-bold mb-4 text-mercredi-purple uppercase tracking-widest z-10">Attrapez le Volume</h1>
    
    <!-- Start Overlay -->
    <div v-if="!hasStarted" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm cursor-auto">
      <button 
        @click="startExperience"
        class="px-8 py-4 bg-mercredi-purple text-white text-xl font-bold rounded border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 animate-bounce"
      >
        COMMENCER LA CHASSE
      </button>
    </div>

    <!-- Video Container -->
    <div class="relative flex-grow flex items-center justify-center w-full max-w-3xl mb-8 rounded-lg overflow-hidden shadow-lg border-0 border-mercredi-purple max-h-[70vh] z-10">
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
      <!-- Mute Button (Fixed position) -->
      <button
        @click="toggleMute"
        class="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 border-2 border-gray-600 hover:border-mercredi-purple transition-all duration-200 cursor-none z-20"
      >
        <span class="text-2xl pointer-events-none">{{ videoRef?.muted ? '🤐' : '🔊' }}</span>
      </button>
    </div>
    
    <!-- FLOATING SLIDER -->
    <!-- Moved out of the flow, using fixed positioning controlled by JS -->
    <div
        ref="sliderRef"
        class="fixed top-0 left-0 h-12 w-64 bg-gray-800 rounded-md border-2 border-mercredi-purple overflow-hidden cursor-none shadow-2xl z-50"
        :style="{
            transform: `translate(${sliderX}px, ${sliderY}px)`
        }"
      >
        <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>
        <!-- Volume Level -->
        <div
          class="absolute h-full bg-gradient-to-r from-red-900 to-mercredi-purple pointer-events-none transition-none"
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
html, body, #app {
  cursor: none !important;
  overflow: hidden; 
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* Crimson Theme */
.text-mercredi-purple { color: #8B0000; }
.border-mercredi-purple { border-color: #8B0000; }
.bg-mercredi-purple { background-color: #8B0000; }
</style>