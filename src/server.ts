import express from 'express';
import cors from 'cors';
import { router as voyageRoutes } from './routes/voyages';
import { router as userRoutes } from './routes/users';
import { router as reservationRoutes } from './routes/reservations';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/voyages', voyageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de l\'agence de voyage' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur de démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

export default app;