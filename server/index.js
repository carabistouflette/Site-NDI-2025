import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai'; // On importe la lib officielle

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());

// CORS configuration for both local development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow Fly.io frontend domain
    if (origin.includes('ndi-2025-frontend.fly.dev')) {
      return callback(null, true);
    }
    
    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

app.use(express.json({ limit: '20kb' }));

// Configuration du client OpenAI pour pointer vers OpenRouter
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Optionnel : Remplace par l'URL de ton site
    "X-Title": "Site NDI 2025", // Optionnel : Nom de ton appli
  }
});

app.get('/', (req, res) => {
  res.send('Server is running (Streaming Enabled).');
});

app.post('/api/chat', async (req, res) => {
  const { messages, model, stream = true } = req.body;

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'Clé API manquante' });
  }

  // Validation : Vérifie que le modèle est bien présent
  if (!model) {
     return res.status(400).json({ error: 'Le paramètre "model" est manquant.' });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Format de message invalide.' });
  }

  try {
    if (stream) {
      const apiStream = await client.chat.completions.create({
        model: model,
        messages: messages,
        stream: true,
      });

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of apiStream) {
        // La structure est légèrement différente avec la lib officielle
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(content);
        }
      }
      res.end();
    } else {
      const completion = await client.chat.completions.create({
        model: model,
        messages: messages,
        stream: false,
      });
      res.json(completion);
    }
  } catch (error) {
    console.error('API Call Error:', error);
    
    // Gestion plus fine des erreurs
    if (!res.headersSent) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({
        error: 'Erreur lors de la communication avec l\'IA.',
        details: error.message || 'Erreur interne'
      });
    } else {
      res.end();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Secure Server running on http://localhost:${PORT}`);
});
