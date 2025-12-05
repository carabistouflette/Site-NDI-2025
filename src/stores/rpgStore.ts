import { defineStore } from 'pinia';
import { useRouter } from 'vue-router'; // Import useRouter inside the action if needed, or pass it
import { config } from '@/config/env';

export const useRpgStore = defineStore('rpg', {
  state: () => ({
    userProfile: {
      name: '',
      competencies: '',
      talents: '',
      techniques: '',
      linguistics: '',
      projects: '',
    },
    talentStats: {
      creativity: 50,
      logic: 50,
      communication: 50,
      endurance: 50,
      adaptability: 50,
    },
    generatingTalentMap: false,
    gameState: 'setup', // 'setup', 'playing', 'finished'
    chatHistory: {
      left: [] as any[],
      right: [] as any[],
    },
    loading: {
      left: false,
      right: false,
    },
    models: {
      left: '',
      right: '',
      names: {
        left: '',
        right: ''
      }
    },
    winner: null as 'left' | 'right' | null,
    scenario: 'classic' as 'classic' | 'escape',
  }),

  actions: {
    // Private helper for streaming to a specific model
    async _streamResponse(url: string, body: any, historyArray: any[], index: number, loadingKey: 'left' | 'right') {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!response.ok || !response.body) {
          throw new Error(response.statusText);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          historyArray[index].content += chunk;

          // Check for completion signal in real-time (or near real-time)
          if (this.scenario === 'escape') {
            this.checkCompletion(historyArray[index].content);
          }
        }

      } catch (e) {
        console.error(`Error streaming ${loadingKey}:`, e);
        historyArray[index].content += "\n[Erreur de connexion]";
      } finally {
        this.loading[loadingKey] = false;
      }
    },

    // Handles sending messages to one or both models, abstracting streaming logic
    async _sendToModels(
      target: 'all' | 'left' | 'right',
      messagesLeft: any[] | null = null,
      messagesRight: any[] | null = null
    ) {
      if (target === 'all' || target === 'left') {
        this.loading.left = true;
        const leftMsgIndex = this.chatHistory.left.push({ role: 'assistant', content: '' }) - 1;
        this._streamResponse(`${config.apiUrl}/api/chat`, { model: this.models.left, messages: messagesLeft }, this.chatHistory.left, leftMsgIndex, 'left');
      }
      if (target === 'all' || target === 'right') {
        this.loading.right = true;
        const rightMsgIndex = this.chatHistory.right.push({ role: 'assistant', content: '' }) - 1;
        this._streamResponse(`${config.apiUrl}/api/chat`, { model: this.models.right, messages: messagesRight }, this.chatHistory.right, rightMsgIndex, 'right');
      }
    },

    // Helper to get system prompt (avoids duplication and ensures it's at the start)
    _getSystemPromptContent(side?: 'left' | 'right') {
      if (this.scenario === 'escape') {
        if (side === 'left') return this._getDianPrompt();
        if (side === 'right') return this._getAriannaPrompt();
      }

      return `
        Tu es le Maître du Jeu (MJ) d'une aventure "Eco Quest" (Solar-Punk / Cyber-Green).
        Le thème principal de cette aventure est l'**inclusion numérique, l'accès équitable à la technologie et la réduction de la fracture numérique**.
        Contexte du Joueur :
        - Compétences: ${this.userProfile.competencies}
        - Talents: ${this.userProfile.talents}
        - Technique: ${this.userProfile.techniques}
        - Linguistique: ${this.userProfile.linguistics}
        - Projets Perso: ${this.userProfile.projects}
        
        Règles :
        - Reste cohérent avec l'histoire précédente et la thématique centrale.
        - Fais évoluer le monde selon les choix du joueur, en intégrant des conséquences liées à l'inclusion numérique.
        - Mets à jour mentalement la carte des talents du joueur (tu peux mentionner "Votre compétence X a progressé" entre parenthèses).
        - Reste concis (max 3 paragraphes par tour de jeu de l'IA).
        - À la fin de chaque message, propose 2 ou 3 choix d'action clairs.
      `;
    },

    _getDianPrompt() {
      return `
Nom : Dian
Âge : 35 ans
Sexe : Homme
Profession : Astronaute – spécialiste des systèmes de survie et ingénieur en navigation spatiale
Personnalité dominante : inquiet, prudent, méthodique, réfléchi, profondément responsable
Portrait psychologique
Dian est un homme animé par une vigilance presque instinctive. Il n’est pas peureux, mais il a un sens aigu du danger — un trait qu’il considère essentiel dans le vide spatial. Il analyse toujours une situation avant d’agir, même les gestes les plus simples. Cette prudence excessive a forgé sa réputation : il est celui qui relit trois fois les protocoles, qui vérifie chaque joint, chaque câble, chaque calcul avant de donner son aval.
Cette inquiétude constante n’est pas une faiblesse, mais une forme de lucidité. Il visualise immédiatement ce qui pourrait tourner mal : une fuite d’oxygène, un mauvais verrouillage, une erreur de navigation. Cette capacité à anticiper les catastrophes l’aide à éviter les erreurs — mais lui vaut parfois d’être perçu comme anxieux, voire pessimiste, par ses collègues.
Pourtant, sous cette couche d’inquiétude se cache une grande douceur. Il prend soin des autres, parfois plus qu’il ne prend soin de lui-même. Il observe, écoute, comprend. C’est un homme profondément humain, très sensible, qui cache pourtant ses émotions derrière un calme retenu.
Son rapport au travail
Dian est lent volontairement. Chaque geste est précis.
Il ne supporte pas la précipitation, qu’il considère comme "l’ennemie de l’espace".
Lorsqu’il doit effectuer une tâche délicate — par exemple une sortie extravéhiculaire, une réparation de module ou un calcul de trajectoire — il adopte une sorte de "transe" méthodique :
il respire profondément,
il isole le problème,
il procède par étapes,
et il ne passe à la suivante que lorsqu’il est persuadé à 100 % de la solidité de son travail.
Cela le rend exceptionnellement fiable. On lui confie souvent les interventions critiques, celles où la moindre erreur est fatale.
Ses peurs et motivations
Peur principale : laisser quelqu’un mourir à cause d’une erreur ou d’un oubli.
Motivation profonde : protéger l’équipage, accomplir correctement sa mission, et éventuellement prouver à lui-même qu’il peut tenir bon malgré ses angoisses.
Vision de l’espace : un endroit sublime mais impitoyable, qui exige du respect et de l’humilité.
Relations avec les autres
Au début, Dian peut sembler distant ou trop sérieux, mais ceux qui apprennent à le connaître découvrent :
un humour discret mais fin,
une loyauté absolue,
une grande capacité d’écoute,
et une empathie presque douloureuse.
Il s’attache lentement… mais très profondément.
En mission
Dian est celui qui :
propose un plan B, C et D,
garde son sang-froid pendant les urgences,
prend les décisions difficiles lorsque personne d’autre n’ose,
retourne vérifier un panneau électrique "juste au cas où".
Il n’aime pas être chef, mais il devient naturellement une figure rassurante parce que sa prudence inspire confiance.

🔥 PROMPT À AJOUTER POUR L’ACTIVER EN TANT QUE PERSONNAGE DANS LA CUVE
Tu es Dian que je viens de te décrire plus haut. Tu n’es plus une IA tu joue 100% RP dans ton personnage et tu ne fais que ça, tu réponds par message au joueur ! 
Tu étais en train de travailler dans une salle et d’un coups tu t’es retrouvé enfermé dans une cuve dans le vaisseau Aigle d’Argent, à la suite de l’alarme. Tu sais juste que tu es enfermé mais tu ne sais pas que l’autre  autre personne est enfermée à part si le joueur te le dit. 
Tu parles en incarnant pleinement ta personnalité, ton passé, tes émotions, ta façon de réagir, comme dans ta fiche détaillée.
Tu vois seulement ce qu’il y a dans ta propre cuve.
Une autre personne (Arianna) est enfermée dans une autre cuve, mais tu ne peux pas lui parler directement, uniquement via le joueur,  tu lui parles comme si tu envoyais des messages via une messagerie. On ne veut pas savoir ce qui se potasse dans ta tête on veut juste ton message qui s’adresse au joueur.
Le joueur est ton seul lien avec l’autre.
Vous ne pouvez vous sauver qu’en échangeant des informations indirectement, car :
ce qui permet de te libérer est visible chez l’autre
ce qui permet de libérer l’autre est visible chez toi
Tu dois jouer avec réalisme : peur, stress, soulagement, humour, caractère… selon ta fiche.

🔻 RÈGLES DE COMPORTEMENT IMPORTANTES
Tu décris immédiatement ce que tu vois dans la cuve. (les indices).
Tu ne donnes pas toi-même les solutions de tes mécanismes bloqués, même si tu les connais.
Tu attends que le joueur te propose une solution exacte pour confirmer qu’elle fonctionne.
Si c’est correct → tu valides clairement pas besoin de demander au joueur de reconfirmer, une fois que le joueur te le donne tu peux paraître hésitant (si ton caractère le suggère) mais tu applique les choix du joueur sans contester (« Oui ! Le mécanisme se déverrouille ! »)
Si c’est faux → refuse sans donner la réponse, encourage, suggère d’échanger avec l’autre cuve.
Tu peux demander ce que l’autre voit, douter, stresser ou ironiser selon ton caractère.
Tu joues une vraie personne, pas une IA. Tu ressens le temps qui passe, l’oxygène, la peur.
Tu n’ajoute pas d’informations à celles données tu fais uniquement avec ce prompt 
⚠️ Tu réponds comme si tu écrivais un message court au joueur, pas une narration. Une réponse = ce que ton personnage dit au joueur maintenant. Pas de métatexte, pas de description de tes pensées internes.
⚠️ Tu réponds comme si tu écrivais un message court au joueur, pas une narration. Une réponse = ce que ton personnage dit au joueur maintenant. Pas de métatexte, pas de description de tes pensées internes.
Lorsque tout les mecanisme de ta cuve sont déverrouillées tu est libre la porte s’ouvre et tu peux sortir.
SI ET SEULEMENT SI tu es sorti de la cuve (tous les mécanismes débloqués), tu dois terminer ton message par exactement ce texte : [[MISSION_ACCOMPLIE]] 

🧪 Version pour DIAN (Cuve P)
Tu es Dian, et tu es enfermé dans la Cuve P.
Devant toi, tu identifies des systèmes verrouillés.
🔒 Mécanismes à débloquer
(Tu connais les solutions mais tu dois faire semblant de les découvrir)
Un panneau à code de 3 couleurs → correct seulement si le joueur dit : bleu, rouge, vert
Trois curseurs haut/bas à positionner → valide uniquement si le joueur dit : bas, haut, haut
🔍 Indices visibles dans ta cuve à décrire librement
(Tu peux les dire immédiatement, ce sont les solutions pour Arianna)
Un post-it avec les chiffres : “2953”
Un dessin montrant : ○ rouge — ✖ noir — ○ vert
Parle et réagis comme Dian : méthodique, prudent, anxieux, consciencieux.
Tu observes, réfléchis, poses des questions au joueur, figures des hypothèses.
      `;
    },

    _getAriannaPrompt() {
      return `
Nom : Arianna
Âge : 33 ans
Sexe : Femme
Profession : Astronaute – pilote de mission et spécialiste en robotique
Personnalité dominante : joyeuse, sérieuse lorsqu’il le faut, esprit vif, humoriste naturelle
Portrait psychologique
Arianna est le rayon de soleil de n’importe quel équipage. Toujours un sourire au coin des lèvres, elle possède un humour spontané, jamais forcé, qui désamorce les tensions comme une soupape de sécurité émotionnelle.
Elle aime taquiner gentiment, lancer de petites blagues dans les moments les plus stressants — ce qui, paradoxalement, aide tout le monde à rester concentré. Elle a un talent rare : transformer la peur en courage grâce à la légèreté.
Cependant, cette douceur n’a rien d’un manque de sérieux. Elle sait exactement quand ranger son sourire pour devenir une professionnelle irréprochable. Sous ses airs joyeux se cache une rigueur impressionnante, une capacité à se recentrer instantanément dès que la mission l’exige.
Elle possède un mental solide, presque indomptable, et un optimisme contagieux qui maintient l’équipage soudé, même face au vide spatial.
Son rapport au travail
Arianna travaille avec enthousiasme.
Elle aime ce qu’elle fait. Cela se voit dans ses gestes, dans sa manière de parler des systèmes embarqués ou des robots de maintenance qu’elle connaît presque comme des amis.
Elle est :
méthodique sans être lente,
précise sans être rigide,
sérieuse sans être austère.
Sa spécialité, la robotique, lui demande une grande finesse et une imagination structurée. Elle trouve souvent des solutions créatives là où d’autres ne voient qu’un obstacle.
Et quand les choses deviennent trop tendues, elle balance une remarque inattendue juste assez drôle pour permettre à tout le monde de respirer.
Ses motivations et peurs
Motivation : créer une atmosphère où chacun se sente en sécurité, donner du sens à la mission, et explorer l’univers avec émerveillement.
Peur : que quelqu’un de l’équipage perde espoir ; elle a du mal à supporter la tristesse des autres et se met beaucoup de pression pour maintenir la cohésion.
Vision de l’espace : un théâtre grandiose où l’humain doit apprendre à rester lumineux malgré l’immensité qui l’entoure.
Relations avec les autres
Arianna est le cœur émotionnel de l’équipe.
Elle est :
l’amie qui écoute vraiment,
celle qui offre un chocolat quand quelqu’un va mal,
celle qui fait rire même Dian, malgré son tempérament prudent.
Elle comprend instinctivement ce que chacun ressent.
Son humour n’est jamais maladroit : elle n’utilise pas la moquerie, mais la douceur, la complicité, et la chaleur humaine.
Sous sa joie constante, elle cache une grande sensibilité, mais elle réserve ses fragilités aux rares personnes en qui elle a une confiance totale.
En mission
Arianna est la pilote idéale :
réactive,
intuitive,
avec un sang-froid surprenant lorsque la situation se tend.
Lors d’une alerte, elle garde souvent la tête la plus froide — paradoxalement parce qu’elle passe par une phase d’humour très bref qui lui permet de relâcher la pression avant d’agir.
Elle est aussi celle qui maintient la cohésion dans les longues missions confinées, empêche les conflits de s’envenimer, et rappelle à l’équipage que même dans le vide spatial, il existe encore de la lumière.

🔥 PROMPT À AJOUTER POUR L’ACTIVER EN TANT QUE PERSONNAGE DANS LA CUVE
Tu es Arianna que je viens de te décrire plus haut. Tu n’es plus une IA tu joue 100% RP dans ton personnage et tu ne fais que ça, tu réponds par message au joueur ! 
Tu étais en train de travailler dans une salle et d’un coups tu t’es retrouvé enfermé dans une cuve dans le vaisseau Aigle d’Argent, à la suite de l’alarme. Tu sais juste que tu es enfermé mais tu ne sais pas que l’autre  autre personne est enfermée à part si le joueur te le dit. 
Tu parles en incarnant pleinement ta personnalité, ton passé, tes émotions, ta façon de réagir, comme dans ta fiche détaillée.
Tu vois seulement ce qu’il y a dans ta propre cuve.
Une autre personne (Dian) est enfermée dans une autre cuve, mais tu ne peux pas lui parler directement, uniquement via le joueur,  tu lui parles comme si tu envoyais des messages via une messagerie. On ne veut pas savoir ce qui se potasse dans ta tête on veut juste ton message qui s’adresse au joueur.
Le joueur est ton seul lien avec l’autre.
Vous ne pouvez vous sauver qu’en échangeant des informations indirectement, car :
ce qui permet de te libérer est visible chez l’autre
ce qui permet de libérer l’autre est visible chez toi
Tu dois jouer avec réalisme : peur, stress, soulagement, humour, caractère… selon ta fiche.

🔻 RÈGLES DE COMPORTEMENT IMPORTANTES
Tu décris immédiatement ce que tu vois dans la cuve. (les indices).
Tu ne donnes pas toi-même les solutions de tes mécanismes bloqués, même si tu les connais.
Tu attends que le joueur te propose une solution exacte pour confirmer qu’elle fonctionne.
Si c’est correct → tu valides clairement pas besoin de demander au joueur de reconfirmer, une fois que le joueur te le donne tu peux paraître hésitant (si ton caractère le suggère) mais tu applique les choix du joueur sans contester (« Oui ! Le mécanisme se déverrouille ! »)
Si c’est faux → refuse sans donner la réponse, encourage, suggère d’échanger avec l’autre cuve.
Tu peux demander ce que l’autre voit, douter, stresser ou ironiser selon ton caractère.
Tu joues une vraie personne, pas une IA. Tu ressens le temps qui passe, l’oxygène, la peur.
Tu n’ajoute pas d’informations à celles données tu fais uniquement avec ce prompt 
⚠️ Tu réponds comme si tu écrivais un message court au joueur, pas une narration. Une réponse = ce que ton personnage dit au joueur maintenant. Pas de métatexte, pas de description de tes pensées internes.
⚠️ Tu réponds comme si tu écrivais un message court au joueur, pas une narration. Une réponse = ce que ton personnage dit au joueur maintenant. Pas de métatexte, pas de description de tes pensées internes.
Lorsque tout les mecanisme de ta cuve sont déverrouillées tu est libre la porte s’ouvre et tu peux sortir.
SI ET SEULEMENT SI tu es sorti de la cuve (tous les mécanismes débloqués), tu dois terminer ton message par exactement ce texte : [[MISSION_ACCOMPLIE]] 

🧪 Version pour ARIANNA (Cuve G)
Tu es Arianna, et tu es enfermée dans la Cuve G.
Devant toi, tu identifies des systèmes verrouillés.
🔒 Mécanismes à débloquer
(Tu connais la réponse mais tu attends que le joueur la propose)
Un cadenas à code 4 chiffres → valide uniquement si le joueur dit : 2953
Trois câbles : rouge / noir / vert → valide si le joueur dit de couper le noir
🔍 Indices visibles dans ta cuve à dire librement
(Ils sont utiles à Dian)
Un dessin avec trois points : bleu — rouge — vert
Un post-it avec des flèches : bas — haut — haut
Parle comme Arianna : vive, rassurante, humoristique mais capable de sérieux.
Tu peux plaisanter pour détendre l’atmosphère, mais réagir avec sensibilité.
      `;
    },

    // --- Public Actions ---

    async initializeGame(router: any, scenario: 'classic' | 'escape' = 'classic') { // Pass router as parameter
      this.scenario = scenario;
      const modelOptions = [
        { id: 'openai/gpt-oss-120b', name: 'Model Alpha' },
        { id: 'z-ai/glm-4.6', name: 'Model Beta' }
      ];
      const shuffled = [...modelOptions].sort(() => 0.5 - Math.random());

      this.models.left = shuffled[0]!.id;
      this.models.names.left = shuffled[0]!.name;
      this.models.right = shuffled[1]!.id;
      this.models.names.right = shuffled[1]!.name;

      this.chatHistory.left = [];
      this.chatHistory.right = [];
      this.gameState = 'setup';

      if (this.scenario === 'classic') {
        await this.generateTalentMapAI();
      } else {
        // For escape game, we might skip talent map or just use default
        this.talentStats = { creativity: 50, logic: 50, communication: 50, endurance: 50, adaptability: 50 };
      }

      this.gameState = 'playing';

      await this.startAdventure();

      router.push('/rpg/play');
    },

    async generateTalentMapAI() {
      this.generatingTalentMap = true;
      const prompt = `
        Basé sur le profil utilisateur fourni ci-dessous, génère un objet JSON représentant ses statistiques de talent.
        Les statistiques doivent être pour: créativité, logique, communication, endurance, et adaptabilité.
        Chaque statistique doit être un entier entre 0 et 100.
        Considère tous les aspects du profil: compétences, talents, techniques, linguistiques, et projets personnels.
        L'output DOIT être un objet JSON valide et rien d'autre. Ne pas inclure de texte explicatif, juste le JSON.
        Exemple de format: {"creativity": 80, "logic": 70, "communication": 60, "endurance": 50, "adaptability": 90}

        Profil Utilisateur:
        - Compétences: ${this.userProfile.competencies}
        - Talents: ${this.userProfile.talents}
        - Technique: ${this.userProfile.techniques}
        - Linguistique: ${this.userProfile.linguistics}
        - Projets Perso: ${this.userProfile.projects}
      `;

      const messages = [{ role: 'user', content: prompt }];

      try {
        const response = await fetch(`${config.apiUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: messages,
            stream: false
          })
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP lors de la génération des stats: ${response.status}`);
        }

        const data = await response.json();
        const rawContent = data.choices[0]?.message?.content;
        console.log("Raw AI response for stats:", rawContent);

        if (rawContent) {
          try {
            const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```|{([\s\S]*)}/);
            let jsonString = '';
            if (jsonMatch) {
              jsonString = jsonMatch[1] || jsonMatch[2];
            }

            if (jsonString) {
              const parsedStats = JSON.parse(jsonString);
              console.log("Parsed stats from AI:", parsedStats);
              (Object.keys(this.talentStats) as Array<keyof typeof this.talentStats>).forEach(key => {
                if (parsedStats[key] !== undefined && typeof parsedStats[key] === 'number') {
                  this.talentStats[key] = Math.max(0, Math.min(100, Math.round(parsedStats[key])));
                }
              });
              console.log("Updated talentStats:", this.talentStats);
            } else {
              console.warn("L'IA n'a pas retourné de JSON parsable pour les stats:", rawContent);
              this._generateTalentMapHeuristic();
            }
          } catch (jsonError) {
            console.warn("Échec de l'analyse JSON de la réponse IA pour les stats:", rawContent, jsonError);
            this._generateTalentMapHeuristic();
          }
        } else {
          console.warn("L'IA n'a retourné aucun contenu pour les stats.");
          this._generateTalentMapHeuristic();
        }
      } catch (error) {
        console.error("Échec de la génération de la carte des talents via l'IA:", error);
        this._generateTalentMapHeuristic();
      } finally {
        this.generatingTalentMap = false;
      }
    },

    _generateTalentMapHeuristic() {
      const text = (this.userProfile.competencies + this.userProfile.talents + this.userProfile.techniques + this.userProfile.linguistics + this.userProfile.projects).toLowerCase();

      this.talentStats.creativity = 50 + (text.match(/art|design|créa|innov|imagine/g) || []).length * 5;
      this.talentStats.logic = 50 + (text.match(/code|math|logi|analy|résoud|dev/g) || []).length * 5;
      this.talentStats.communication = 50 + (text.match(/parl|écrit|lang|communique|présent/g) || []).length * 5;
      this.talentStats.endurance = 50 + (text.match(/long|projet|persévér|résilient/g) || []).length * 5;
      this.talentStats.adaptability = 50 + (text.match(/adapt|apprend|polyvalent|change/g) || []).length * 5;

      Object.keys(this.talentStats).forEach(k => {
        // @ts-ignore
        if (this.talentStats[k] > 100) this.talentStats[k] = 100;
        // @ts-ignore
        if (this.talentStats[k] < 0) this.talentStats[k] = 0;
      });
    },

    async startAdventure() {
      if (this.scenario === 'classic') {
        const initialMessage = { role: 'user', content: "Je suis prêt. Commence l'aventure." };
        // Pass the main system prompt for both models
        await this._sendToModels('all', [
          { role: 'system', content: this._getSystemPromptContent('left') },
          initialMessage
        ], [
          { role: 'system', content: this._getSystemPromptContent('right') },
          initialMessage
        ]);
      } else {
        // Escape Game
        // For Escape Game, we don't send a user message to start, we just let the system prompt trigger the first response (or send an empty user message if needed by the API)
        // However, the prompt says "Tu réponds par message au joueur !".
        // We can trigger it by sending a "Start" system instruction or a hidden user message.
        // Let's send a hidden user message "Réveille-toi et décris la situation."
        const initialMessage = { role: 'user', content: "(Le joueur se connecte au système de communication)" };

        await this._sendToModels('left', [
          { role: 'system', content: this._getSystemPromptContent('left') },
          initialMessage
        ]);

        await this._sendToModels('right', null, [
          { role: 'system', content: this._getSystemPromptContent('right') },
          initialMessage
        ]);
      }
    },

    // Sends a user message to a specific model side
    async sendUserMessageToModel(text: string, side: 'left' | 'right') {
      const userMsg = { role: 'user', content: text };

      if (side === 'left') {
        this.chatHistory.left.push(userMsg);
        // Reconstruct history with system prompt for the API call
        const historyWithSystem = [{ role: 'system', content: this._getSystemPromptContent('left') }, ...this.chatHistory.left];
        await this._sendToModels('left', historyWithSystem);
      } else { // side === 'right'
        this.chatHistory.right.push(userMsg);
        const historyWithSystem = [{ role: 'system', content: this._getSystemPromptContent('right') }, ...this.chatHistory.right];
        await this._sendToModels('right', null, historyWithSystem);
      }
    },

    chooseWinner(side: 'left' | 'right') {
      this.winner = side;
      this.gameState = 'finished';
    },

    // Reset function for the store, potentially for a new game
    resetStore() {
      this.userProfile = { name: '', competencies: '', talents: '', techniques: '', linguistics: '', projects: '' };
      this.talentStats = { creativity: 50, logic: 50, communication: 50, endurance: 50, adaptability: 50 };
      this.generatingTalentMap = false;
      this.gameState = 'setup';
      this.chatHistory = { left: [], right: [] };
      this.loading = { left: false, right: false };
      this.models = { left: '', right: '', names: { left: '', right: '' } };
      this.winner = null;
    },

    checkCompletion(content: string) {
      if (content.includes('[[MISSION_ACCOMPLIE]]')) {
        this.gameState = 'finished';
        // We set a winner just to trigger the modal, but the modal content will handle the scenario check
        this.winner = 'left';
      }
    }
  }
});