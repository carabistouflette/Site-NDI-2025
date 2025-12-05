import ThePossessedVolumeSlider from '../components/ThePossessedVolumeSlider.vue';
import TheCaseOpeningSlider from '../components/TheCaseOpeningSlider.vue';
import TheFastVolume from '../components/TheFastVolume.vue';

export const challenges = [
  {
    id: 'possessed',
    title: 'Le Slider Possédé',
    description: 'Une barre de volume hantée par une entité malveillante. Curseur inversé, gravité aléatoire.',
    component: ThePossessedVolumeSlider,
    difficulty: 'DIABOLIQUE'
  },
  {
    id: 'lootbox',
    title: 'Volume Lootbox',
    description: 'Ouvrez des caisses pour espérer obtenir un volume légendaire. Attention à votre argent.',
    component: TheCaseOpeningSlider,
    difficulty: 'PAY-TO-WIN'
  },
  {
    id: 'fast',
    title: 'Volume rapide!',
    description: 'Cliquez rapidement pour diminuer le volume progressivement.',
    component: TheFastVolume,
    difficulty: 'RAPIDE'
  },

];
