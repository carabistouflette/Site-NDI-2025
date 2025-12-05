<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'

const route = useRoute()
</script>

<template>
  <AppHeader v-if="!route.meta.hideHeader" />
  <div :class="{ 'main-styles-enabled': !route.meta.disableMainCss }">
    <RouterView />
  </div>
</template>


<style scoped>
/* No specific app-wide styles here in this version */
</style>
