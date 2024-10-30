import express from 'express';
import { PrismaClient } from '@prisma/client';
import aluno from './aluno';



const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rotas
app.use('/alunos', aluno);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
