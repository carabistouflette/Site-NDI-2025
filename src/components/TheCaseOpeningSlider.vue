<script setup lang="ts">
import { ref, onMounted } from 'vue';
import videoUrl from '@/assets/mercredi_addams.mp4';

const videoRef = ref<HTMLVideoElement | null>(null);
const volume = ref(0.5);
const isSpinning = ref(false);
const sliderOffset = ref(0);
const transitionDuration = ref(0);
const statusMessage = ref("Tentez votre chance...");

// Item definition
interface VolumeItem {
  id: number;
  value: number; // 0 to 100
  type: 'common' | 'rare' | 'legendary';
  label: string;
}

// State for the carousel
const items = ref<VolumeItem[]>([]);
const ITEM_WIDTH = 160; // Width of one card in px
const ITEM_GAP = 16; // Gap between cards
const VISIBLE_ITEMS = 80; // Increased to prevent empty space on right

// Config for probabilities
const generateItem = (id: number, forceType?: 'common' | 'rare' | 'legendary'): VolumeItem => {
  const rand = Math.random();
  let type: VolumeItem['type'] = 'common';
  let value = 0;

  if (forceType) {
    type = forceType;
  } else if (rand > 0.98) {
    type = 'legendary'; // 2% chance
  } else if (rand > 0.80) {
    type = 'rare'; // 18% chance
  }

  // Assign values based on rarity
  if (type === 'legendary') {
    // Perfect volumes
    const opts = [0, 50, 100];
    const idx = Math.floor(Math.random() * opts.length);
    value = opts[idx]!;
  } else if (type === 'rare') {
    // Decent volumes
    const opts = [25, 33, 66, 75];
    const idx = Math.floor(Math.random() * opts.length);
    value = opts[idx]!;
  } else {
    // Trash volumes (13, 87, 99, 1, etc.)
    value = Math.floor(Math.random() * 101);
    // Ensure it's not a "nice" number
    if (value % 5 === 0) value += 1;
  }

  return {
    id,
    value,
    type,
    label: `${value}%`
  };
};

// Prepare the strip
const prepareStrip = () => {
  const newItems: VolumeItem[] = [];
  for (let i = 0; i < VISIBLE_ITEMS; i++) {
    // Rigging the end:
    // Index 45 = GOLD (The bait)
    // Index 46 = BLUE (The trap - where we land)
    // Index 47 = GOLD (The "Oh no I missed it by 1 pixel" bait)
    if (i === 45) newItems.push(generateItem(i, 'legendary'));
    else if (i === 46) newItems.push(generateItem(i, 'common')); // LANDING TARGET
    else if (i === 47) newItems.push(generateItem(i, 'legendary'));
    else newItems.push(generateItem(i));
  }
  items.value = newItems;

  // Reset position visually without transition
  transitionDuration.value = 0;
  sliderOffset.value = 0;
};

const spin = () => {
  if (isSpinning.value) return;

  // Reset first to start position
  prepareStrip();

  statusMessage.value = "Ouverture de la caisse...";
  isSpinning.value = true;

  // Force a reflow/wait a tick so the reset applies
  setTimeout(() => {
    // TARGET: Index 46 (The common trash item)
    const targetIndex = 46;

    // Calculate Center Target
    // Item 0 Center is at: Margin(8) + HalfWidth(80) = 88px from start
    // Item N Center is at: 88 + N * (160 + 16)
    const itemPitch = ITEM_WIDTH + ITEM_GAP; // 176
    const startOffset = (ITEM_WIDTH / 2) + (ITEM_GAP / 2); // 88

            const targetCenterPosition = startOffset + (targetIndex * itemPitch);



            // Add randomness (+/- 60px) to land anywhere on the card

            const randomJitter = (Math.random() * 120) - 60;



            // Correct calculation: shift LEFT by the distance to the target

            const exactOffset = -(targetCenterPosition + randomJitter);



            // Animate

            transitionDuration.value = 6;    sliderOffset.value = exactOffset;

    // Resolve based on VISUAL position
    setTimeout(() => {
      isSpinning.value = false;

      // Inverse calculation to find which item is actually under the center
      // Pos = -Offset
      // Index = (Pos - 88) / 176
      const currentPos = -sliderOffset.value;
      let actualIndex = Math.round((currentPos - startOffset) / itemPitch);

      // Bounds check
      if (actualIndex < 0) actualIndex = 0;
      if (actualIndex >= items.value.length) actualIndex = items.value.length - 1;

      const wonItem = items.value[actualIndex];
      if (wonItem) {
        volume.value = wonItem.value / 100;
        if (videoRef.value) videoRef.value.volume = volume.value;

        // Troll Message
        const missedItem = items.value[actualIndex - 1]; // The one just before (usually better)
        statusMessage.value = `Dommage ! Vous avez raté le ${missedItem ? missedItem.value : '???'}% de peu... Volume réglé à ${wonItem.value}%`;
      }
    }, 6000);
  }, 50);
};

onMounted(() => {
  prepareStrip();
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = false;
    videoRef.value.play().catch(() => {});
  }
});

const getRarityColor = (type: string) => {
  switch(type) {
    case 'legendary': return 'border-yellow-400 bg-yellow-900/20 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]';
    case 'rare': return 'border-purple-500 bg-purple-900/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
    default: return 'border-blue-800 bg-blue-900/10 text-blue-600'; // Trash
  }
};
</script>

<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center overflow-hidden font-serif select-none">

    <!-- VIDEO PREVIEW -->
    <div class="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <video
        ref="videoRef"
        :src="videoUrl"
        loop
        autoplay
        playsinline
        muted
        class="w-full h-full object-cover"
        :volume="volume"
      ></video>
    </div>

    <!-- MAIN UI -->
    <div class="z-10 w-full max-w-6xl flex flex-col items-center relative">

      <h1 class="text-4xl font-bold mb-12 text-primary-color tracking-[0.2em] drop-shadow-[0_0_10px_black]">
        VOLUME LOOTBOX
      </h1>

      <!-- CAROUSEL CONTAINER -->
      <div class="relative w-full h-64 bg-black/80 border-y-4 border-gray-800 backdrop-blur-sm mb-12 overflow-hidden shadow-[0_0_50px_black] flex items-center">

        <!-- CENTER LINE (CURSOR) -->
        <div class="absolute left-1/6 top-0 bottom-0 w-1 bg-yellow-400 z-30 transform -translate-x-1/2 shadow-[0_0_15px_yellow]"></div>
        <div class="absolute left-1/6 top-4 transform -translate-x-1/2 text-yellow-400 z-30 text-xs uppercase font-bold tracking-widest">▼</div>
        <div class="absolute left-1/6 bottom-4 transform -translate-x-1/2 text-yellow-400 z-30 text-xs uppercase font-bold tracking-widest">▲</div>

        <!-- SLIDING STRIP -->
        <div
          class="flex items-center h-48 px-[50vw]"
          :style="{
            transform: `translateX(${sliderOffset}px)`,
            transition: isSpinning ? `transform ${transitionDuration}s cubic-bezier(0.15, 0, 0.10, 1)` : 'none'
          }"
        >
          <div
            v-for="item in items"
            :key="item.id"
            class="flex-shrink-0 flex flex-col items-center justify-center w-[160px] h-40 mx-2 border-b-4 border-r-2 border-r-white/10 bg-gradient-to-b from-transparent to-black rounded-sm transition-transform"
            :class="getRarityColor(item.type)"
          >
            <div class="text-3xl font-bold mb-2">{{ item.value }}%</div>
            <div class="text-xs uppercase opacity-70 tracking-widest">{{ item.type === 'legendary' ? '★ LEGENDAIRE ★' : (item.type === 'rare' ? 'RARE' : 'COMMUN') }}</div>
          </div>
        </div>

        <!-- FADE SIDES -->
        <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-20"></div>
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-20"></div>
      </div>

      <!-- CONTROLS -->
      <div class="flex flex-col items-center space-y-6">
        <p class="text-gray-400 text-sm h-6 uppercase tracking-widest animate-pulse">{{ statusMessage }}</p>

        <button
          @click="spin"
          :disabled="isSpinning"
          class="px-12 py-6 bg-green-700 text-white text-2xl font-bold rounded shadow-[0_0_20px_rgba(21,128,61,0.5)] border-b-4 border-green-900 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale hover:brightness-110"
        >
          {{ isSpinning ? 'OUVERTURE EN COURS...' : 'ACHETER UNE CLÉ (2.49€)' }}
        </button>

        <p class="text-xs text-gray-600 max-w-md text-center italic">
          *En cliquant, vous acceptez de ne jamais avoir le volume désiré. Les clés ne sont pas remboursables.
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom cubic-bezier for that specific "CS:GO slide" feel: Fast start, extremely slow end */
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}
</style>
