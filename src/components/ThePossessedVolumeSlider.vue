<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import videoUrl from '@/assets/mercredi_addams.mp4';

const videoRef = ref<HTMLVideoElement | null>(null);
const volume = ref(0.5); // Initial volume
const sliderPosition = ref(50); // Percentage 0-100
const isDragging = ref(false);
const animationFrameId = ref<number | null>(null);
const lastUpdateTime = ref(0);
const animationSpeed = 0.05;
const animationMagnitude = 10;

const updateVolume = (newVolume: number) => {
  volume.value = Math.max(0, Math.min(1, newVolume));
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    // Note: We do NOT automatically unmute here anymore.
    // Muting/Unmuting is strictly controlled by the button.
  }
};

const handleSliderMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  const slider = (e.currentTarget as HTMLElement).querySelector('.volume-track');
  if (!slider) return;

  const rect = slider.getBoundingClientRect();
  let clientX = 0;
  if (e instanceof MouseEvent) {
    clientX = e.clientX;
  } else if (e instanceof TouchEvent) {
    clientX = e.touches[0].clientX;
  }

  const newPosition = ((clientX - rect.left) / rect.width) * 100;
  sliderPosition.value = Math.max(0, Math.min(100, newPosition));
  updateVolume(sliderPosition.value / 100);
};

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  document.addEventListener('mousemove', handleSliderMove);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchmove', handleSliderMove, { passive: false });
  document.addEventListener('touchend', endDrag);
  document.addEventListener('touchcancel', endDrag);

  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
    animationFrameId.value = null;
  }
  handleSliderMove(e);
};

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleSliderMove);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', handleSliderMove);
  document.removeEventListener('touchend', endDrag);
  document.removeEventListener('touchcancel', endDrag);

  setTimeout(startPossessedMovement, 1000);
};

const startPossessedMovement = () => {
  const animateSlider = (currentTime: DOMHighResTimeStamp) => {
    if (!lastUpdateTime.value) {
      lastUpdateTime.value = currentTime;
    }
    // const deltaTime = currentTime - lastUpdateTime.value;
    lastUpdateTime.value = currentTime;

    if (!isDragging.value) {
      const wiggle = Math.sin(currentTime * animationSpeed) * animationMagnitude;
      let newPosition = 50 + wiggle;
      newPosition = Math.max(0, Math.min(100, newPosition));

      sliderPosition.value = newPosition;
      updateVolume(sliderPosition.value / 100);
    }
    animationFrameId.value = requestAnimationFrame(animateSlider);
  };
  animationFrameId.value = requestAnimationFrame(animateSlider);
};

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.volume = volume.value;
    videoRef.value.muted = true; // Start muted to allow autoplay
    videoRef.value.play().catch(e => console.error("Autoplay failed:", e));
  }
  startPossessedMovement();
});

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
    if (videoRef.value.muted) {
      if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
        animationFrameId.value = null;
      }
    } else {
      startPossessedMovement();
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-between min-h-screen bg-gray-900 text-white p-4">
    <h1 class="text-3xl font-bold mb-4 text-mercredi-purple">Le Champ de Saisie Possédé</h1>
    <p class="mb-4 text-center text-gray-400">
      Tentez de régler le volume de la danse de Mercredi Addams. Bonne chance...
    </p>

    <div class="relative flex-grow flex items-center justify-center w-full max-w-lg mb-8 bg-black rounded-lg overflow-hidden shadow-lg border-2 border-mercredi-purple max-h-[60vh]">
      <video
        ref="videoRef"
        :src="videoUrl"
        loop
        autoplay
        playsinline
        muted
        class="w-full h-full object-contain"
        :volume="volume"
      ></video>
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center pointer-events-none" v-if="videoRef && videoRef.muted">
        <p class="text-white text-xl animate-pulse">MUTED</p>
      </div>
    </div>

    <div class="w-full max-w-md flex items-center justify-center space-x-4 mb-4">
      <!-- Mute Button (La Chose) -->
      <button
        @click="toggleMute"
        class="relative p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group"
        :class="{ 'bg-red-600 hover:bg-red-700': videoRef?.muted, 'bg-gray-700 hover:bg-gray-600': !videoRef?.muted }"
      >
        <span class="text-3xl" :class="{'text-white': videoRef?.muted, 'text-gray-300': !videoRef?.muted}">🖐️</span>
        <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          La Chose ({{ videoRef?.muted ? 'Unmute' : 'Mute' }})
        </span>
      </button>

      <!-- Volume Slider -->
      <div
        class="relative flex-grow h-10 bg-gray-700 rounded-full cursor-pointer volume-track"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <div
          class="absolute h-full bg-mercredi-purple rounded-full pointer-events-none"
          :style="{ width: `${sliderPosition}%` }"
        ></div>
        <div
          class="absolute w-6 h-6 bg-white rounded-full shadow-lg border-2 border-mercredi-purple -translate-y-1/2 pointer-events-none"
          :style="{ left: `calc(${sliderPosition}% - 12px)`, top: '50%' }"
        ></div>
      </div>
    </div>

    <p class="mt-8 text-sm text-gray-500">
      Astuce : Essayez d'attraper le curseur quand il se calme... (Il ne se calme jamais.)
    </p>
  </div>
</template>

<style scoped>
.text-mercredi-purple {
  color: #a020f0;
}
.border-mercredi-purple {
  border-color: #a020f0;
}
.bg-mercredi-purple {
  background-color: #a020f0;
}
</style>
