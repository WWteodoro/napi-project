import { PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'; 
import { AppError } from './errors/AppError';
import { route } from './routes';

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

app.listen(Number(process.env.PORT), () => {
  console.log('Initializate');
});
