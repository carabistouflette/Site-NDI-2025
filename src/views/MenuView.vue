<script setup lang="ts">
import { useRouter } from 'vue-router';
import { challenges } from '../data/challenges';
import GradientCard from '@/components/common/GradientCard.vue';

const router = useRouter();

const goToChallenge = (challengeId: string) => {
  router.push({ name: 'challenge', params: { id: challengeId } });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full text-white">
    <h1 class="text-4xl font-bold mb-8 text-primary-color tracking-[0.2em] drop-shadow-[0_0_10px_black]">
      DÉFIS
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      <GradientCard
        v-for="challenge in challenges"
        :key="challenge.id"
        :variant="challenge.id === 'possessed' ? 'responsible' : 'digital'"
        hoverable
        class="cursor-pointer"
        @click="goToChallenge(challenge.id)"
      >
        <template #header>
          {{ challenge.title }}
        </template>
        <p>{{ challenge.description }}</p>
        <template #footer>
          <span class="text-xs uppercase font-bold" :class="{ 'text-red-500': challenge.difficulty === 'DIABOLIQUE' || challenge.difficulty === 'PAY-TO-WIN' }">
            Difficulté: {{ challenge.difficulty }}
          </span>
        </template>
      </GradientCard>
    </div>
  </div>
</template>

<style scoped>
.text-primary-color {
  color: var(--primary-color);
}
</style>
