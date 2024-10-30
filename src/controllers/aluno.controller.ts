import { Request, Response } from 'express';
import prisma from '../config/database';


const getAll = async (req: Request, res: Response) => {
  const alunos = await prisma.aluno.findMany();
  res.json(alunos);
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const aluno = await prisma.aluno.findUnique({ where: { id } });
  aluno ? res.json(aluno) : res.status(404).json({ error: 'Aluno não encontrado' });
};

const create = async (req: Request, res: Response) => {
  const newAluno = req.body;
  const aluno = await prisma.aluno.create({ data: newAluno });
  res.status(201).json(aluno);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const aluno = await prisma.aluno.update({ where: { id }, data: updateData });
  res.json(aluno);
};

const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.aluno.delete({ where: { id } });
  res.json({ message: 'Aluno deletado com sucesso' });
};

export default { getAll, getOne, create, update, deleteOne };
