<template>
  <n-button :type="type" :size="size" :disabled="disabled" :loading="loading" :circle="circle" :round="round"
    :text="text" :tag="tag as any" :render-icon="renderIcon" :color="computedColor" :text-color="computedTextColor"
    :class="buttonClass" @click="handleClick">
    <slot />
  </n-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VNode } from 'vue'
import { NButton } from 'naive-ui'

interface Props {
  type?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'default' | 'tertiary'
  size?: 'tiny' | 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  circle?: boolean
  round?: boolean
  text?: boolean
  tag?: string
  renderIcon?: () => VNode
  color?: string
  textColor?: string
  variant?: 'digital' | 'inclusive' | 'responsible' | 'sustainable' | 'unified'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  circle: false,
  round: false,
  text: false,
  tag: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const computedColor = computed(() => {
  if (props.color) return props.color

  // Utiliser des couleurs hexadécimales directes pour Naive UI au lieu des dégradés
  // Naive UI ne peut pas interpréter les variables CSS de dégradé dans sa propriété color
  switch (props.variant) {
    case 'digital':
      return '#0066FF' // Bleu Électrique
    case 'inclusive':
      return '#6B46C1' // Violet
    case 'responsible':
      return '#FF6B6B' // Rose Corail
    case 'sustainable':
      return '#F6AD55' // Jaune Doré
    case 'unified':
      return '#0066FF' // Bleu Électrique par défaut
    default:
      return undefined
  }
})

const computedTextColor = computed(() => {
  if (props.textColor) return props.textColor

  // Texte blanc pour les boutons avec dégradé
  if (props.variant) return '#FFFFFF'
  return undefined
})

const buttonClass = computed(() => {
  return [
    'nird-button',
    `nird-button--${props.type}`,
    props.variant ? `nird-button--${props.variant}` : ''
  ]
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.nird-button {
  transition: all 0.3s ease;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nird-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.nird-button--digital {
  background: var(--gradient-digital);
  border: none;
  color: white;
}

.nird-button--inclusive {
  background: var(--gradient-inclusive);
  border: none;
  color: white;
}

.nird-button--responsible {
  background: var(--gradient-responsible);
  border: none;
  color: white;
}

.nird-button--sustainable {
  background: var(--gradient-sustainable);
  border: none;
  color: white;
}

.nird-button--unified {
  background: var(--gradient-unified);
  border: none;
  color: white;
}
</style>