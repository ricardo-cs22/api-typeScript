import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obter todos os alunos
router.get('/', async (req, res) => {
  const alunos = await prisma.aluno.findMany();
  res.json(alunos);
  console.log(alunos);
});

// Obter um aluno por ID
router.get('/get', async (req, res) => {
  
  const {
    nome,
    idade,
    presenca,
    notaOficial,
    notaParcial,
    atividadesEmSala,
    atividadesExtracurriculare } = req.body;

  
    let aluno = await prisma.aluno.findMany({
      where: {
        nome,
        idade,
        presenca,
        notaOficial,
        notaParcial,
      }
    })
  
    aluno = await prisma.aluno.findMany()
  }


);


// Criar um novo aluno
router.post('/', async (req, res) => {
  const newAluno = req.body;
  const aluno = await prisma.aluno.create({ data: newAluno });
  res.status(201).json(aluno);
});

// Atualizar um aluno
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const aluno = await prisma.aluno.update({ where: { id }, data: updateData });
  res.json(aluno);
});

// Deletar um aluno
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.aluno.delete({ where: { id } });
  res.json({ message: 'Aluno deletado com sucesso' });
});

export default router;
