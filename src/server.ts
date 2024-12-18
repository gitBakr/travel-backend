import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { router as voyageRoutes } from './routes/voyages';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/voyages', voyageRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de l\'agence de voyage' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue !' });
});

const PORT = process.env.PORT || 8080;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/agence-voyage');
    console.log('Connecté à MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

startServer();

export default app;