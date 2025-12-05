<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import videoUrl from '@/assets/mercredi_addams.mp4';
import bloodUrl from '@/assets/blood.svg';

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
const fakeCursorX = ref(window.innerWidth / 2);
const fakeCursorY = ref(window.innerHeight / 2);

// Unified Slider State
const slider = reactive({
  x: 200,
  y: 200,
  vx: 2,
  vy: 2,
  rotation: 0,
  vRotation: 1,
  width: 256,
  height: 48,
  lastChaosTime: 0
});

// --- Physics Helpers ---
const applyChaos = (currentVel: number, maxSpeed: number) => {
    return (Math.random() - 0.5) * 2 * maxSpeed;
};

const updatePhysics = (pos: number, vel: number, maxBound: number) => {
  let nextPos = pos + vel;
  let nextVel = vel;
  if (nextPos <= 0 || nextPos >= maxBound) {
    nextVel *= -1;
    nextPos = Math.max(0, Math.min(nextPos, maxBound));
  }
  return { pos: nextPos, vel: nextVel };
};

// --- Logic ---
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
}

const startExperience = () => {
  hasStarted.value = true;

  // Trigger Fullscreen
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  }

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
        // Chaos
        if (currentTime - slider.lastChaosTime > (Math.random() * 1500 + 500)) {
             slider.vRotation = applyChaos(slider.vRotation, 5);
             slider.vx = applyChaos(slider.vx, 8);
             slider.vy = applyChaos(slider.vy, 8);
             slider.lastChaosTime = currentTime;
        }

        // Rotation
        slider.rotation += slider.vRotation;

        // Physics X
        const maxX = window.innerWidth - (sliderRef.value?.clientWidth || slider.width);
        const resX = updatePhysics(slider.x, slider.vx, maxX);
        slider.x = resX.pos;
        slider.vx = resX.vel;

        // Physics Y
        const maxY = window.innerHeight - (sliderRef.value?.clientHeight || slider.height);
        const resY = updatePhysics(slider.y, slider.vy, maxY);
        slider.y = resY.pos;
        slider.vy = resY.vel;

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

  slider.vx = (Math.random() > 0.5 ? 1 : -1) * 3;
  slider.vy = (Math.random() > 0.5 ? 1 : -1) * 3;
  slider.x = Math.random() * (window.innerWidth - slider.width);
  slider.y = Math.random() * (window.innerHeight - slider.height);

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
  if (videoRef.value) videoRef.value.muted = !videoRef.value.muted;
};
</script>

<template>
  <!-- Main Container with Breathing Background -->
  <div
    class="fixed inset-0 flex flex-col items-center justify-between bg-gray-900 text-white p-4 overflow-hidden select-none font-serif"
    :style="{
      backgroundImage: `url(${bloodUrl}), radial-gradient(ellipse at center, #111827, #0a0a0a, #000000)`,
      backgroundSize: '100% 120%, 100% 100%',
      backgroundPosition: 'center',
      backgroundBlendMode: 'hard-light'
    }"
  >

    <!-- FAKE CURSOR -->
    <div
      class="fixed pointer-events-none z-[20000] text-5xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-none will-change-transform"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${fakeCursorX}px, ${fakeCursorY}px)`
      }"
    >
      🖐️
    </div>

    <!-- TITLE -->
    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-primary-color uppercase tracking-[0.2em] z-10 mt-8 animate-float drop-shadow-[0_0_15px_rgba(139,0,0,0.6)]">
      Attrapez le Volume
    </h1>

    <!-- START OVERLAY -->
    <div v-if="!hasStarted" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        ref="startButtonRef"
        @click="startExperience"
        class="group relative px-10 py-5 bg-transparent text-primary-color text-2xl font-bold rounded-sm border-2 border-primary-color overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--primary-color)] hover:text-white animate-pulse"
      >
        <span class="relative z-10">COMMENCER LA CHASSE</span>
        <!-- Blood fill effect on hover -->
        <div class="absolute inset-0 bg-primary-color transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
      </button>
    </div>

    <!-- VIDEO CONTAINER -->
    <!-- Added animate-neon-pulse for heartbeat effect -->
    <div class="relative inline-block mb-8 rounded-2xl overflow-hidden z-10 video-container border-0 border-primary-color animate-neon-pulse">
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
        @click="toggleMute"
        class="w-20 h-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-gray-700 hover:border-primary-color hover:bg-primary-color/20 hover:shadow-[0_0_20px_var(--primary-color)] transition-all duration-300 cursor-none z-20 group"
      >
        <span class="text-3xl pointer-events-none group-hover:scale-125 transition-transform">{{ videoRef?.muted ? '🤐' : '🔊' }}</span>
      </button>
    </div>

    <!-- FLOATING SLIDER (BLOOD VIAL STYLE) -->
    <div
        ref="sliderRef"
        class="fixed top-0 left-0 h-14 w-72 bg-black/60 backdrop-blur-md rounded-full border border-primary-color/50 overflow-hidden cursor-none shadow-[0_0_25px_rgba(139,0,0,0.4)] z-[50]"
        :style="{
            transform: `translate(${slider.x}px, ${slider.y}px) rotate(${slider.rotation}deg)`
        }"
      >
        <!-- Glass Reflection -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20"></div>

        <!-- Liquid Background -->
        <div class="absolute inset-0 bg-gray-900/80 pointer-events-none"></div>

        <!-- Blood Fill -->
        <div
          class="absolute h-full bg-gradient-to-r from-[#4a0000] via-primary-color to-[#ff0000] pointer-events-none transition-none z-10"
          :style="{ width: `${sliderPosition}%` }"
        ></div>

        <!-- Knob / Bubble -->
        <div
          class="absolute w-1 h-full bg-white/50 shadow-[0_0_10px_white] transform -translate-x-1/2 pointer-events-none z-30 mix-blend-overlay"
          :style="{ left: `${sliderPosition}%` }"
        ></div>

        <!-- Text on slider -->
        <div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-white/80 tracking-widest pointer-events-none z-40 mix-blend-difference">
            {{ Math.round(sliderPosition) }}%
        </div>
    </div>

    <div class="text-center z-10 pointer-events-none pb-4 animate-text-flicker">
         <p class="text-gray-500 text-xs uppercase tracking-widest opacity-60">Patience est mère de sûreté...</p>
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
  background-color: #050505;
}

/* Theme Variables */
:root {
  --primary-color: #8B0000; /* Crimson */
}

/* Utility classes mapping to variables */
.text-primary-color { color: var(--primary-color); }
.border-primary-color { border-color: var(--primary-color); }
.bg-primary-color { background-color: var(--primary-color); }

/* --- CUSTOM ANIMATIONS --- */

/* 1. Background Breathing */
@keyframes bg-breathe {
  0%, 100% { background-size: 100% 100%; }
  50% { background-size: 120% 120%; }
}
.animate-bg-breathe {
  animation: bg-breathe 15s ease-in-out infinite;
}

/* 2. Ghost Float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* 3. Neon Heartbeat Pulse */
@keyframes neon-pulse {
  0% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.2), 0 0 20px rgba(139, 0, 0, 0.1); }
  5% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.6), 0 0 40px rgba(139, 0, 0, 0.4); }
  10% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.2), 0 0 20px rgba(139, 0, 0, 0.1); }
  15% { box-shadow: 0 0 25px rgba(139, 0, 0, 0.7), 0 0 50px rgba(139, 0, 0, 0.5); }
  100% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.2), 0 0 20px rgba(139, 0, 0, 0.1); }
}
.animate-neon-pulse {
  animation: neon-pulse 4s infinite; /* Slow rhythm */
}

/* 4. Text Light Flicker */
@keyframes text-flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.2;
  }
}
.animate-text-flicker {
  animation: text-flicker 5s infinite;
}

/* Neon Glow for Video */
.video-container {
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.3), 0 0 30px rgba(139, 0, 0, 0.2), 0 0 50px rgba(139, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.video-container:hover {
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.6), 0 0 40px rgba(139, 0, 0, 0.4), 0 0 60px rgba(139, 0, 0, 0.2);
}
</style>
