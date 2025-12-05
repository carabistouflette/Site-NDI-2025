<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full p-8 relative z-10">
    <h1 class="text-6xl md:text-9xl font-bold mb-8 text-primary-color uppercase tracking-[0.2em] drop-shadow-[0_0_15px_rgba(139,0,0,0.8)] text-center animate-float">
      NDI 2025
    </h1>
    
    <p class="text-gray-400 text-xl mb-12 font-sans tracking-widest uppercase">
      Oserez-vous entrer ?
    </p>

    <RouterLink 
      to="/menu"
      class="px-8 py-4 text-2xl font-bold text-white border-2 border-primary-color bg-black/60 backdrop-blur-md rounded hover:bg-primary-color hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(139,0,0,0.4)] hover:shadow-[0_0_40px_rgba(139,0,0,0.8)] uppercase tracking-widest"
    >
      Entrer
    </RouterLink>
  </div>
</template>
