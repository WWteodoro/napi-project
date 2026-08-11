import { PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'; 
import { AppError } from './errors/AppError';
import { route } from './routes';
import { seedDatabase } from './seed';

require('dotenv').config({ path: '.env' });

const prisma = new PrismaClient();
prisma.$connect();

const app = express();

// ⬅️ HABILITAR CORS AQUI
app.use(cors());

app.use(express.json());
app.use(route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.status).json({
      message: err.message
    });
    return;
  }

  res.status(500).json({
    message: `Internal Server Error - ${err.message}`
  });

  next();
});

async function start() {
  try {
    await prisma.$connect();
    
    // CHAMADA DA SUA FUNÇÃO
    //await seedDatabase();

    const port = Number(process.env.PORT) || 3333;
    app.listen(port, () => {
      console.log('🚀 Initializate and Seeded');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
  }
}

start();

//app.listen(Number(process.env.PORT), () => {
  //console.log('Initializate');
//});