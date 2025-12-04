<template>
  <section id="games" class="game-preview">
    <div class="container">
      <h2 class="section-title">Découvrez nos jeux <span class="neon">interactifs</span></h2>
      
      <div class="game-grid">
        <!-- Game Card 1 -->
        <div class="game-card">
          <div class="card-image gradient-digital"></div>
          <div class="card-content">
            <h3>Cyber Security Quiz</h3>
            <p>Testez vos connaissances sur la sécurité numérique.</p>
            <button class="play-btn">Jouer</button>
          </div>
        </div>

        <!-- Game Card 2 -->
        <div class="game-card">
          <div class="card-image gradient-inclusive"></div>
          <div class="card-content">
            <h3>Eco-Code Challenge</h3>
            <p>Optimisez votre code pour réduire son empreinte carbone.</p>
            <button class="play-btn">Jouer</button>
          </div>
        </div>

        <!-- Game Card 3 -->
        <div class="game-card">
          <div class="card-image gradient-responsible"></div>
          <div class="card-content">
            <h3>Accessibilité Memory</h3>
            <p>Découvrez les principes du web accessible.</p>
            <button class="play-btn">Jouer</button>
          </div>
        </div>

        <!-- Game Card 4 -->
        <div class="game-card">
          <div class="card-image gradient-sustainable"></div>
          <div class="card-content">
            <h3>Data Privacy Run</h3>
            <p>Échappez aux traceurs dans ce runner infini.</p>
            <button class="play-btn">Jouer</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.game-preview {
  padding: 6rem 1rem;
  background: #080808; /* Slightly lighter than bg-dark for contrast */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  text-align: center;
  color: var(--text-primary);
}

.neon {
  color: var(--neon-green);
  text-shadow: var(--glow-text);
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.game-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.game-card:hover {
  transform: translateY(-10px);
  border-color: var(--neon-green);
  box-shadow: 0 0 30px rgba(57, 255, 20, 0.15);
}

.card-image {
  height: 150px;
  width: 100%;
  position: relative;
}

.card-image::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to bottom, transparent, var(--bg-card));
}

.gradient-digital { background: var(--gradient-digital); }
.gradient-inclusive { background: var(--gradient-inclusive); }
.gradient-responsible { background: var(--gradient-responsible); }
.gradient-sustainable { background: var(--gradient-sustainable); }

.card-content {
  padding: 1.5rem;
}

h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.play-btn {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid var(--neon-green);
  color: var(--neon-green);
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.play-btn:hover {
  background: var(--neon-green);
  color: black;
  box-shadow: var(--glow-text);
}
</style>