<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { challenges } from '../data/challenges';

const route = useRoute();
const router = useRouter();
const backButtonRef = ref<HTMLElement | null>(null);
const isHoveringBack = ref(false);

const currentChallenge = computed(() => {
  return challenges.find(c => c.id === route.params.id);
});

const isPossessed = computed(() => route.params.id === 'possessed');

const backToMenu = () => {
  router.push('/challenge');
};

const checkCollision = (e: MouseEvent) => {
  if (!backButtonRef.value) return false;

  let x = e.clientX;
  let y = e.clientY;

  // Apply Inversion if needed (Must match App.vue logic)
  if (isPossessed.value) {
    x = window.innerWidth - x;
    y = window.innerHeight - y;
  }

  const rect = backButtonRef.value.getBoundingClientRect();
  return (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);
};

const handleMouseMove = (e: MouseEvent) => {
  isHoveringBack.value = checkCollision(e);
};

const handleGlobalClick = (e: MouseEvent) => {
  if (checkCollision(e)) {
    e.stopPropagation();
    backToMenu();
  }
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mousedown', handleGlobalClick);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mousedown', handleGlobalClick);
});
</script>

<template>
  <div v-if="currentChallenge" class="h-full w-full relative">
    <!-- Back Button -->
    <button
      ref="backButtonRef"
      class="fixed top-4 left-4 z-[30000] px-4 py-2 rounded border text-xs uppercase tracking-widest transition-all duration-200 pointer-events-none"
      :class="isHoveringBack ? 'text-white bg-primary-color/80 border-primary-color shadow-[0_0_15px_var(--primary-color)]' : 'bg-black/50 text-white/50 border-white/10'"
    >
      Abandonner
    </button>

    <component :is="currentChallenge.component" />
  </div>
  <div v-else class="flex items-center justify-center h-full text-red-500">
    Challenge introuvable.
  </div>
</template>
