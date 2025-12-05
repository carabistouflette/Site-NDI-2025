<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import bloodUrl from '@/assets/blood_bg.svg';

const route = useRoute();

// Custom Cursor Logic
const mouseX = ref(window.innerWidth / 2);
const mouseY = ref(window.innerHeight / 2);

const updateMouse = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

// Determine if we are in the "Possessed" challenge
// Note: Since this layout wraps the routes, we can check the child route params
const isPossessed = computed(() => {
  // We check if the current route name involves the challenge and has the 'possessed' id
  // Since we might be in a nested route structure, we check params.
  return route.params.id === 'possessed';
});

const getVisualCursorPosition = () => {
  let x = mouseX.value;
  let y = mouseY.value;

  if (isPossessed.value) {
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

onMounted(() => {
  window.addEventListener('mousemove', updateMouse);
});
onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse);
});
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-900 text-white overflow-hidden font-serif select-none challenge-layout max-h-screen"
    :style="{
      backgroundImage: `url(${bloodUrl}), radial-gradient(ellipse at center, #111827, #0a0a0a, #000000)`,
      backgroundSize: '100% 100%, 100% 100%',
      backgroundPosition: 'center',
      backgroundBlendMode: 'hard-light'
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

    <!-- ROUTER VIEW -->
    <RouterView />

  </div>
</template>

<style>
/* Hide default cursor ONLY within this layout */
.challenge-layout, .challenge-layout * {
  cursor: none !important;
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
