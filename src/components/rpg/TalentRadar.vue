<template>
  <div class="radar-container">
    <svg viewBox="0 0 200 200" class="radar-svg">
      <!-- Background Webs -->
      <polygon :points="getWebPoints(100)" class="web-bg" />
      <polygon :points="getWebPoints(75)" class="web-bg" />
      <polygon :points="getWebPoints(50)" class="web-bg" />
      <polygon :points="getWebPoints(25)" class="web-bg" />

      <!-- Axis Lines -->
      <line v-for="(point, index) in axisPoints" :key="'line-'+index"
            x1="100" y1="100" :x2="point.x" :y2="point.y"
            class="axis-line" />
      
      <!-- Axis Labels -->
      <text v-for="(point, index) in labelPoints" :key="'label-'+index"
            :x="point.x" :y="point.y"
            class="label-text" text-anchor="middle" dominant-baseline="middle">
        {{ labels[index] }}
      </text>

      <!-- Data Polygon -->
      <polygon :points="dataPoints" class="data-poly" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  stats: {
    creativity: number;
    logic: number;
    communication: number;
    endurance: number;
    adaptability: number;
  }
}>();

const labels = ['CRÉA', 'LOGIQUE', 'COMM', 'ENDURE', 'ADAPT'];
const keys = ['creativity', 'logic', 'communication', 'endurance', 'adaptability'];

const getPoint = (value: number, index: number, max: number = 100) => {
  const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
  const radius = (value / max) * 80; // 80 is max radius
  return {
    x: 100 + Math.cos(angle) * radius,
    y: 100 + Math.sin(angle) * radius
  };
};

const getWebPoints = (radiusPercent: number) => {
  return Array.from({ length: 5 }).map((_, i) => {
    const p = getPoint(radiusPercent, i, 100);
    return `${p.x},${p.y}`;
  }).join(' ');
};

const axisPoints = computed(() => {
  return Array.from({ length: 5 }).map((_, i) => getPoint(100, i, 100));
});

const labelPoints = computed(() => {
  return Array.from({ length: 5 }).map((_, i) => {
     const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
     const radius = 95; // Label radius
     return {
        x: 100 + Math.cos(angle) * radius,
        y: 100 + Math.sin(angle) * radius
     };
  });
});

const dataPoints = computed(() => {
  return keys.map((key, i) => {
    // @ts-ignore
    const val = props.stats[key] || 50;
    const p = getPoint(val, i, 100);
    return `${p.x},${p.y}`;
  }).join(' ');
});
</script>

<style scoped>
.radar-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.radar-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.web-bg {
  fill: none;
  stroke: #333;
  stroke-width: 1;
}

.axis-line {
  stroke: #333;
  stroke-width: 1;
}

.label-text {
  fill: #4af626;
  font-size: 10px;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
}

.data-poly {
  fill: rgba(74, 246, 38, 0.2);
  stroke: #4af626;
  stroke-width: 1.5;
  transition: all 1s ease;
}
</style>
