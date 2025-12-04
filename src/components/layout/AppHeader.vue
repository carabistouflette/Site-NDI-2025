<template>
  <header 
    class="app-header" 
    :class="{
      'app-header--scrolled': isScrolled,
      'app-header--hidden': isHidden 
    }"
  >
    <div class="app-header__glow-line"></div>
    
    <div class="app-header__container">
      <!-- Logo Section -->
      <RouterLink to="/" class="app-header__logo group">
        <div class="logo-wrapper">
          <img src="/src/assets/logo.svg" alt="Logo NIRD" class="logo" />
          <div class="logo-glow"></div>
        </div>
        <span class="logo-text">
          <span class="letter" style="--delay: 0s">N</span>
          <span class="letter" style="--delay: 0.1s">I</span>
          <span class="letter" style="--delay: 0.2s">R</span>
          <span class="letter" style="--delay: 0.3s">D</span>
        </span>
      </RouterLink>
      
      <!-- Desktop Navigation -->
      <nav class="app-header__nav desktop-only">
        <RouterLink 
          v-for="item in menuItems" 
          :key="item.key"
          :to="item.to"
          class="nav-link"
          active-class="nav-link--active"
        >
          <span class="nav-link__content" :data-text="item.label">{{ item.label }}</span>
          <span class="nav-link__line"></span>
        </RouterLink>
      </nav>
      
      <!-- Mobile Toggle -->
      <div class="app-header__actions">
        <button
          class="menu-toggle"
          :class="{ 'menu-toggle--active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" :class="{ 'mobile-menu--open': isMobileMenuOpen }">
      <div class="mobile-menu__bg"></div>
      <div class="mobile-menu__grid"></div>
      
      <div class="mobile-menu__content">
        <nav class="mobile-menu__nav">
          <RouterLink 
            v-for="(item, index) in menuItems" 
            :key="item.key"
            :to="item.to"
            class="mobile-link"
            active-class="mobile-link--active"
            @click="closeMobileMenu"
            :style="{ '--item-index': index }"
          >
            <component :is="item.icon" class="mobile-link__icon" />
            <span class="mobile-link__text">{{ item.label }}</span>
          </RouterLink>
        </nav>

        <div class="mobile-menu__footer">
          <div class="mobile-socials">
            <a href="#" class="social-icon" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
            </a>
            <a href="#" class="social-icon" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" class="social-icon" aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
          <p class="mobile-copy">&copy; 2025 NIRD</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, h } from 'vue'
import { useRoute } from 'vue-router'

// Icon Components
const IconHome = () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
])

const IconGamepad = () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S19.17 9 20 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' })
])

const IconUsers = () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' })
])

const route = useRoute()
const isScrolled = ref(false)
const isHidden = ref(false)
const isMobileMenuOpen = ref(false)
let lastScrollY = 0

const menuItems = [
  { label: 'Accueil', to: '/', key: 'home', icon: IconHome },
  { label: 'Jeux', to: '/games', key: 'games', icon: IconGamepad },
  { label: 'L\'association', to: '/about', key: 'about', icon: IconUsers }
]

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isScrolled.value = currentScrollY > 20

  if (currentScrollY > 100 && currentScrollY > lastScrollY && !isMobileMenuOpen.value) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
  
  lastScrollY = currentScrollY
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.classList.add('menu-open')
    document.body.style.overflow = 'hidden'
  } else {
    document.body.classList.remove('menu-open')
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.classList.remove('menu-open')
  document.body.style.overflow = ''
}

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.classList.remove('menu-open')
  document.body.style.overflow = ''
})
</script>

<style>
/* Global blur effect for content when menu is open */
body.menu-open main,
body.menu-open footer {
  filter: blur(8px) brightness(0.3);
  transition: filter 0.4s ease;
  pointer-events: none;
}

/* Ensure clean transition when menu closes */
main, footer {
  transition: filter 0.4s ease;
}
</style>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(5, 5, 5, 0);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  padding: 1.5rem 0;
  border-bottom: 1px solid transparent;
  transition: 
    background-color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    backdrop-filter 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    -webkit-backdrop-filter 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    padding 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform, background-color, padding, backdrop-filter;
}

.app-header--scrolled {
  background: rgba(5, 5, 5, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.app-header--hidden {
  transform: translateY(-100%);
}

.app-header__glow-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--nird-blue-electric) 20%, var(--nird-fuchsia) 50%, var(--nird-blue-electric) 80%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
}

.app-header--scrolled .app-header__glow-line {
  opacity: 0.5;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.app-header__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.app-header__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  position: relative;
}

.logo {
  height: 40px;
  width: auto;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.app-header__logo:hover .logo {
  transform: scale(1.05) rotate(-5deg);
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: var(--nird-blue-electric);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.app-header__logo:hover .logo-glow { opacity: 0.4; }

.logo-text {
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: 2px;
  display: flex;
  color: white;
}

.logo-text .letter {
  display: inline-block;
  transition: transform 0.3s ease, color 0.3s ease;
  transition-delay: var(--delay);
}

.app-header__logo:hover .logo-text .letter {
  transform: translateY(-2px);
  color: var(--nird-blue-electric);
  text-shadow: 0 0 10px rgba(0, 102, 255, 0.5);
}

/* Desktop Nav */
.app-header__nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover, .nav-link--active { color: white; }

.nav-link__line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: var(--gradient-digital);
  transition: width 0.3s ease;
  border-radius: 2px;
  box-shadow: 0 0 8px var(--nird-blue-electric);
}

.nav-link:hover .nav-link__line,
.nav-link--active .nav-link__line { width: 100%; }

/* Toggle */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 48px;
  height: 48px;
  position: relative;
  z-index: 1002;
  align-items: center;
  justify-content: center;
}

.hamburger {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.3s ease;
}

.menu-toggle:hover .hamburger span {
  background-color: var(--nird-blue-electric);
  box-shadow: 0 0 8px var(--nird-blue-electric);
}

.menu-toggle--active .hamburger span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.menu-toggle--active .hamburger span:nth-child(2) { opacity: 0; }
.menu-toggle--active .hamburger span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

/* Mobile Menu Structure */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1001;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}

.mobile-menu__bg {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 5, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* Animated Grid Background */
.mobile-menu__grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 102, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 102, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0;
  transform: scale(1.1);
  transition: all 0.6s ease;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.mobile-menu__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 6rem 2rem 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.mobile-menu--open { pointer-events: auto; }
.mobile-menu--open .mobile-menu__bg { opacity: 0.98; }
.mobile-menu--open .mobile-menu__grid { opacity: 1; transform: scale(1); }
.mobile-menu--open .mobile-menu__content { opacity: 1; transform: translateY(0); }

.mobile-menu__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
}

.mobile-link__icon {
  width: 32px;
  height: 32px;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.mobile-link:hover, .mobile-link--active {
  color: white;
  transform: translateX(10px);
}

.mobile-link:hover .mobile-link__icon,
.mobile-link--active .mobile-link__icon {
  opacity: 1;
  color: var(--neon-green);
  filter: drop-shadow(0 0 8px var(--neon-green));
}

.mobile-link:hover .mobile-link__text,
.mobile-link--active .mobile-link__text {
  text-shadow: 0 0 20px rgba(0, 102, 255, 0.5);
}

/* Mobile Footer */
.mobile-menu__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  margin-top: auto;
}

.mobile-socials {
  display: flex;
  gap: 1.5rem;
}

.social-icon {
  color: var(--text-secondary);
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.social-icon:hover {
  color: var(--neon-green);
  background: rgba(57, 255, 20, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
}

.mobile-copy {
  font-size: 0.8rem;
  color: #444;
  font-family: monospace;
}

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .menu-toggle { display: flex; }
  .app-header__container { padding: 0 1.5rem; }
}
</style>