import ThePossessedVolumeSlider from '../components/ThePossessedVolumeSlider.vue';
import TheCaseOpeningSlider from '../components/TheCaseOpeningSlider.vue';

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
  }
];
