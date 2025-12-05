<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
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
const VISIBLE_ITEMS = 50; // Number of items to generate per spin

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
    value = opts[Math.floor(Math.random() * opts.length)];
  } else if (type === 'rare') {
    // Decent volumes
    const opts = [25, 33, 66, 75];
    value = opts[Math.floor(Math.random() * opts.length)];
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
    // We want to land randomly within item 46, but biased towards the left side (close to the previous Gold item 45)
    const targetIndex = 46;
    
    // Calculate visual center of the screen
    const screenCenter = window.innerWidth / 2;
    // Calculate where the target item is in the strip relative to 0
    // Center of target item = (Index * (W + Gap)) + (W / 2)
    const itemFullWidth = ITEM_WIDTH + ITEM_GAP;
    const targetCenterInStrip = (targetIndex * itemFullWidth) + (ITEM_WIDTH / 2);
    
    // Random offset inside the item (to land "just a bit" inside)
    // A small random jitter. If we want to be cruel, we land near the border of the previous item.
    // -ITEM_WIDTH/2 + 5px means "Just barely entered the item"
    const randomJitter = (Math.random() * (ITEM_WIDTH - 20)) - (ITEM_WIDTH / 2) + 10; 
    
    // Final calculation: We want (TargetCenter + Jitter) to be at ScreenCenter.
    // So we move the strip to the left (negative).
    const finalOffset = -(targetCenterInStrip + randomJitter - screenCenter);

    // Animate
    transitionDuration.value = 6; // 6 seconds spin
    sliderOffset.value = finalOffset;

    // Resolve
    setTimeout(() => {
      isSpinning.value = false;
      const wonItem = items.value[targetIndex];
      volume.value = wonItem.value / 100;
      if (videoRef.value) videoRef.value.volume = volume.value;
      
      // Cruel message
      statusMessage.value = `Dommage ! Vous avez raté le ${items.value[45].value}% de peu... Volume réglé à ${wonItem.value}%`;
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
        <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-30 transform -translate-x-1/2 shadow-[0_0_15px_yellow]"></div>
        <div class="absolute left-1/2 top-4 transform -translate-x-1/2 text-yellow-400 z-30 text-xs uppercase font-bold tracking-widest">▼</div>
        <div class="absolute left-1/2 bottom-4 transform -translate-x-1/2 text-yellow-400 z-30 text-xs uppercase font-bold tracking-widest">▲</div>

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
            class="flex-shrink-0 flex flex-col items-center justify-center w-[160px] h-40 mx-2 border-b-4 bg-gradient-to-b from-transparent to-black rounded-sm transition-transform"
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
