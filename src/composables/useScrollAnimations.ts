import { ref, onMounted, onUnmounted } from 'vue'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  root?: Element | null
}

export function useScrollAnimations(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', root = null } = options
  
  const observedElements = ref<Map<Element, boolean>>(new Map())
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as Element
        const isVisible = entry.isIntersecting
        
        // Ajouter ou retirer les classes d'animation
        if (isVisible) {
          element.classList.add('visible')
          
          // Ajouter des classes spécifiques selon la direction
          const rect = element.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const viewportWidth = window.innerWidth
          
          // Animation depuis le bas
          if (rect.top > viewportHeight * 0.2) {
            element.classList.add('scroll-animate-fade-in')
          }
          
          // Animation depuis la gauche
          if (rect.left > viewportWidth * 0.2) {
            element.classList.add('scroll-animate-slide-left')
          }
          
          // Animation depuis la droite
          if (rect.right < viewportWidth * 0.8) {
            element.classList.add('scroll-animate-slide-right')
          }
          
          // Animation avec effet de scale
          if (rect.top > viewportHeight * 0.1 && rect.top < viewportHeight * 0.9) {
            element.classList.add('scroll-animate-scale-up')
          }
        } else {
          element.classList.remove('visible', 'scroll-animate-fade-in', 'scroll-animate-slide-left', 'scroll-animate-slide-right', 'scroll-animate-scale-up')
        }
        
        observedElements.value.set(element, isVisible)
      })
    },
    {
      threshold,
      rootMargin,
      root
    }
  )
  
  const observe = (element: Element) => {
    observer.observe(element)
    // Ajouter les classes initiales
    element.classList.add('scroll-animate-fade-in')
  }
  
  const unobserve = (element: Element) => {
    observer.unobserve(element)
    observedElements.value.delete(element)
  }
  
  const observeAll = (elements: NodeListOf<Element>) => {
    elements.forEach((element) => observe(element))
  }
  
  const disconnect = () => {
    observer.disconnect()
    observedElements.value.clear()
  }
  
  onMounted(() => {
    // Observer les éléments avec des classes d'animation
    const animatedElements = document.querySelectorAll('.scroll-animate-fade-in, .scroll-animate-slide-left, .scroll-animate-slide-right, .scroll-animate-scale-up')
    observeAll(animatedElements)
  })
  
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    observe,
    unobserve,
    observeAll,
    disconnect,
    observedElements
  }
}

// Fonction utilitaire pour ajouter des micro-interactions
export function addMicroInteractions(element: Element) {
  // Ajouter des effets hover améliorés
  element.classList.add('hover-lift')
  
  // Ajouter un effet de focus amélioré
  if (element instanceof HTMLElement) {
    element.addEventListener('focus', () => {
      element.classList.add('focus-visible')
    })
    
    element.addEventListener('blur', () => {
      element.classList.remove('focus-visible')
    })
  }
  
  // Ajouter un effet de clic
  element.addEventListener('click', (e) => {
    // Créer une onde de clic
    const ripple = document.createElement('span')
    ripple.classList.add('ripple-effect')
    
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = (e as MouseEvent).clientX - rect.left - size / 2
    const y = (e as MouseEvent).clientY - rect.top - size / 2
    
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    
    element.appendChild(ripple)
    
    // Supprimer l'onde après l'animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
    }, 600)
  })
}

// Styles pour l'effet de ripple (à ajouter globalement)
export const rippleStyles = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`