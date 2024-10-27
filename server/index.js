import express from 'express';
import cors from 'cors';
import { sequelize } from './db.js';
import { artistRoutes } from './routes/artists.js';
import { songRoutes } from './routes/songs.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
    
    app.listen(PORT, () => {
      console.log(`Backend Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();