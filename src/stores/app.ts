import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // État de l'application
    isLoading: false,
    theme: 'light' as 'light' | 'dark',
    currentRoute: '/',
    
    // État de l'utilisateur
    user: null as {
      id: string
      name: string
      email: string
    } | null,
    
    // État des jeux
    games: [
      {
        id: 'code-adventure',
        title: 'Code Adventure',
        description: 'Apprends les bases de la programmation à travers une aventure interactive.',
        variant: 'digital',
        tags: ['Programmation', 'Débutant'],
        isCompleted: false,
        score: 0
      },
      {
        id: 'cyber-puzzle',
        title: 'Cyber Puzzle',
        description: 'Résous des énigmes cybersécurité pour protéger un système informatique.',
        variant: 'inclusive',
        tags: ['Cybersécurité', 'Logique'],
        isCompleted: false,
        score: 0
      },
      {
        id: 'data-privacy',
        title: 'Data Privacy Quest',
        description: 'Protège les données personnelles dans ce jeu de sensibilisation.',
        variant: 'responsible',
        tags: ['Vie privée', 'Responsabilité'],
        isCompleted: false,
        score: 0
      },
      {
        id: 'green-it',
        title: 'Green IT Challenge',
        description: 'Découre comment rendre le numérique plus écologique.',
        variant: 'sustainable',
        tags: ['Écologie', 'Durable'],
        isCompleted: false,
        score: 0
      }
    ]
  }),
  
  getters: {
    // Getters pour l'état de l'application
    isAuthenticated: (state) => state.user !== null,
    completedGames: (state) => state.games.filter(game => game.isCompleted),
    totalScore: (state) => state.games.reduce((total, game) => total + game.score, 0),
    
    // Getters pour les jeux
    getGameById: (state) => (id: string) => {
      return state.games.find(game => game.id === id)
    },
    getGamesByVariant: (state) => (variant: string) => {
      return state.games.filter(game => game.variant === variant)
    }
  },
  
  actions: {
    // Actions pour l'état de l'application
    setLoading(loading: boolean) {
      this.isLoading = loading
    },
    
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      // Ici, on pourrait appliquer le thème au document
      document.documentElement.setAttribute('data-theme', theme)
    },
    
    setCurrentRoute(route: string) {
      this.currentRoute = route
    },
    
    // Actions pour l'utilisateur
    setUser(user: { id: string; name: string; email: string } | null) {
      this.user = user
    },
    
    login(userData: { id: string; name: string; email: string }) {
      this.user = userData
      // Ici, on pourrait sauvegarder dans localStorage
      localStorage.setItem('nird-user', JSON.stringify(userData))
    },
    
    logout() {
      this.user = null
      // Ici, on pourrait supprimer de localStorage
      localStorage.removeItem('nird-user')
    },
    
    // Actions pour les jeux
    updateGameScore(gameId: string, score: number) {
      const game = this.games.find(g => g.id === gameId)
      if (game) {
        game.score = score
        game.isCompleted = score > 0
      }
    },
    
    markGameAsCompleted(gameId: string) {
      const game = this.games.find(g => g.id === gameId)
      if (game) {
        game.isCompleted = true
      }
    },
    
    resetGameProgress(gameId: string) {
      const game = this.games.find(g => g.id === gameId)
      if (game) {
        game.score = 0
        game.isCompleted = false
      }
    },
    
    // Initialisation
    initializeApp() {
      // Récupérer le thème depuis localStorage
      const savedTheme = localStorage.getItem('nird-theme') as 'light' | 'dark'
      if (savedTheme) {
        this.setTheme(savedTheme)
      }
      
      // Récupérer l'utilisateur depuis localStorage
      const savedUser = localStorage.getItem('nird-user')
      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser)
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error)
        }
      }
    }
  }
})