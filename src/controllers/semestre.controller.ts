import { Request, Response } from 'express';
import prisma from '../config/database';


const getAll = async (req: Request, res: Response) => {
  const semestres = await prisma.semestre.findMany();
  res.json(semestres);
};
const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const semestre = await prisma.semestre.findUnique({ where: { id } });
  semestre ? res.json(semestre) : res.status(404).json({ error: 'semestre não encontrado' });
};

const create = async (req: Request, res: Response) => {
  const newsemestre = req.body;
  const semestre = await prisma.semestre.create({ data: newsemestre });
  res.status(201).json(semestre);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const semestre = await prisma.semestre.update({ where: { id }, data: updateData });
  res.json(semestre);
};

const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.semestre.delete({ where: { id } });
  res.json({ message: 'semestre deletado com sucesso' });
};

export default { getAll, getOne, create, update, deleteOne };
