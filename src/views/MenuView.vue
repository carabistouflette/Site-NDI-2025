<script setup lang="ts">
import { challenges } from '../data/challenges';
import { useRouter } from 'vue-router';

const router = useRouter();

const selectChallenge = (challenge: any) => {
  if (challenge.component) {
    router.push({ name: 'challenge', params: { id: challenge.id } });
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full p-8 z-10 relative">
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
</template>
