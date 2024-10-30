import { Request, Response } from 'express';
import prisma from '../config/database';


const getAll = async (req: Request, res: Response) => {
  const disciplinas = await prisma.disciplina.findMany();
  res.json(disciplinas);
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const aluno = await prisma.aluno.findUnique({ where: { id } });
  aluno ? res.json(aluno) : res.status(404).json({ error: 'disciplina não encontrado' });
};

const create = async (req: Request, res: Response) => {
  const newdisciplina = req.body;
  const disciplina = await prisma.disciplina.create({ data: newdisciplina });
  res.status(201).json(disciplina);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const disciplina = await prisma.disciplina.update({ where: { id }, data: updateData });
  res.json(disciplina);
};

const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.disciplina.delete({ where: { id } });
  res.json({ message: 'disciplina deletado com sucesso' });
};

export default { getAll, getOne, create, update, deleteOne };
