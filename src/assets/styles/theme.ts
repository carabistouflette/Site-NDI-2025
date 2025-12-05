import type { GlobalTheme } from 'naive-ui'

// Thème NIRD personnalisé pour Naive UI
// Nous utilisons une approche minimaliste pour éviter les erreurs TypeScript
// Le reste du thème sera appliqué via CSS personnalisé
export const nirdTheme: GlobalTheme = {
  name: 'nird-light',
  common: {
    primaryColor: '#0066FF',           // Bleu Électrique
    primaryColorHover: '#0052CC',      // Bleu Roi
    primaryColorPressed: '#0041A8',    // Bleu foncé
    primaryColorSuppl: '#6B46C1',      // Violet
    infoColor: '#0066FF',              // Bleu Électrique
    infoColorHover: '#0052CC',         // Bleu Roi
    infoColorPressed: '#0041A8',       // Bleu foncé
    infoColorSuppl: '#6B46C1',         // Violet
    successColor: '#F6AD55',           // Jaune Doré
    successColorHover: '#ED8936',      // Ambré
    successColorPressed: '#DD6B20',    // Orange foncé
    successColorSuppl: '#F6AD55',      // Jaune Doré
    warningColor: '#ED8936',            // Ambré
    warningColorHover: '#DD6B20',      // Orange foncé
    warningColorPressed: '#C05621',    // Orange très foncé
    warningColorSuppl: '#ED8936',       // Ambré
    errorColor: '#FF6B6B',             // Rose Corail
    errorColorHover: '#E53E3E',        // Rouge
    errorColorPressed: '#C53030',      // Rouge foncé
    errorColorSuppl: '#FF6B6B',        // Rose Corail
    textColorBase: '#2D3748',          // Gris Anthracite
    textColor1: '#2D3748',             // Gris Anthracite
    textColor2: '#4A5568',             // Gris clair
    textColor3: '#718096',             // Gris plus clair
    textColorDisabled: '#A0AEC0',
    placeholderColor: '#A0AEC0',
    placeholderColorDisabled: '#CBD5E0',
    iconColor: '#718096',
    iconColorDisabled: '#CBD5E0',
    iconColorHover: '#2D3748',
    iconColorPressed: '#2D3748',
    opacity1: '0.82',
    opacity2: '0.72',
    opacity3: '0.61',
    opacity4: '0.51',
    opacity5: '0.41',
    dividerColor: '#E2E8F0',
    borderColor: '#E2E8F0',
    cardColor: '#FFFFFF',
    modalColor: '#FFFFFF',
    bodyColor: '#FFFFFF',
    popoverColor: '#FFFFFF',
    tableHeaderColor: '#F7FAFC',
    codeColor: '#F7FAFC',
    avatarColor: '#F7FAFC',
    invertedColor: '#000000',
    inputColor: '#FFFFFF',
    inputColorDisabled: '#F7FAFC',
    scrollbarColor: '#E2E8F0',
    scrollbarColorHover: '#CBD5E0',
    progressRailColor: '#E2E8F0',
    tableColor: '#FFFFFF',
    tableColorHover: '#F7FAFC',
    tableColorStriped: '#F7FAFC',
    baseColor: '#FFFFFF'
  } as any // eslint-disable-line @typescript-eslint/no-explicit-any
}