<template>
  <section id="join-us" class="join-us">
    <div class="container">
      <h2 class="section-title">Comment nous rejoindre ?</h2>
      
      <div class="grid">
        <!-- Map / Address -->
        <div class="card map-card">
          <div class="card-content">
            <div class="icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h3>Campus Universitaire Paris-Saclay</h3>
            <p class="address">
              Bâtiment Breguet<br>
              3 Rue Joliot-Curie<br>
              91190 Gif-sur-Yvette, France
            </p>
          </div>
        </div>

        <!-- Transport -->
        <div class="card transport-card">
          <div class="transport-list">
            <div class="transport-item">
              <span class="emoji">🚇</span>
              <div>
                <strong>Métro / RER</strong>
                <p>RER B - Gif-sur-Yvette (10 min à pied)</p>
              </div>
            </div>
            
            <div class="transport-item">
              <span class="emoji">🚌</span>
              <div>
                <strong>Bus</strong>
                <p>Lignes 91.06, 91.08 (Arrêt Moulon)</p>
              </div>
            </div>

            <div class="transport-item">
              <span class="emoji">🚗</span>
              <div>
                <strong>Accès Route</strong>
                <p>N118 - Sortie 9 "Centre Universitaire"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.join-us {
  padding: 6rem 1rem;
  background: var(--bg-dark);
  position: relative;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--neon-green);
  box-shadow: var(--glow-box);
  transform: translateY(-5px);
}

.icon-box {
  color: var(--neon-green);
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.address {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
}

.transport-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.transport-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.emoji {
  font-size: 1.5rem;
}

.transport-item strong {
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.transport-item p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0;
}
</style>