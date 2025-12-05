<template>
  <n-card
    :class="cardClass"
    :style="cardStyle"
    :hoverable="hoverable"
    :closable="closable"
    @close="handleClose"
  >
    <template #header v-if="$slots.header">
      <div class="gradient-card__header">
        <slot name="header" />
      </div>
    </template>
    
    <template #header-extra v-if="$slots.headerExtra">
      <slot name="headerExtra" />
    </template>
    
    <div class="gradient-card__content">
      <slot />
    </div>
    
    <template #footer v-if="$slots.footer">
      <div class="gradient-card__footer">
        <slot name="footer" />
      </div>
    </template>
    
    <template #action v-if="$slots.action">
      <slot name="action" />
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard } from 'naive-ui'

interface Props {
  variant?: 'digital' | 'inclusive' | 'responsible' | 'sustainable' | 'unified'
  hoverable?: boolean
  closable?: boolean
  textColor?: string
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'digital',
  hoverable: true,
  closable: false,
  padding: '1.5rem'
})

const emit = defineEmits<{
  close: []
}>()

const cardClass = computed(() => {
  return [
    'gradient-card',
    `gradient-card--${props.variant}`
  ]
})

const cardStyle = computed(() => {
  const baseStyle: Record<string, string> = {
    '--card-padding': props.padding || '1.5rem'
  }
  
  if (props.textColor) {
    baseStyle.color = props.textColor
  }
  
  return baseStyle
})

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.gradient-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  border: none;
  background: white;
  position: relative;
}

.gradient-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.gradient-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 1;
}

.gradient-card--digital::before {
  background: var(--gradient-digital);
}

.gradient-card--inclusive::before {
  background: var(--gradient-inclusive);
}

.gradient-card--responsible::before {
  background: var(--gradient-responsible);
}

.gradient-card--sustainable::before {
  background: var(--gradient-sustainable);
}

.gradient-card--unified::before {
  background: var(--gradient-unified);
}

.gradient-card__header {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--nird-anthracite);
}

.gradient-card__content {
  padding: var(--card-padding);
}

.gradient-card__footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

/* Styles pour les variantes avec fond dégradé */
.gradient-card--digital.gradient-card--filled,
.gradient-card--inclusive.gradient-card--filled,
.gradient-card--responsible.gradient-card--filled,
.gradient-card--sustainable.gradient-card--filled,
.gradient-card--unified.gradient-card--filled {
  color: white;
}

.gradient-card--digital.gradient-card--filled {
  background: var(--gradient-digital);
}

.gradient-card--inclusive.gradient-card--filled {
  background: var(--gradient-inclusive);
}

.gradient-card--responsible.gradient-card--filled {
  background: var(--gradient-responsible);
}

.gradient-card--sustainable.gradient-card--filled {
  background: var(--gradient-sustainable);
}

.gradient-card--unified.gradient-card--filled {
  background: var(--gradient-unified);
}

.gradient-card--filled .gradient-card__header,
.gradient-card--filled .gradient-card__content {
  color: white;
}

.gradient-card--filled .gradient-card__footer {
  border-top-color: rgba(255, 255, 255, 0.2);
}
</style>