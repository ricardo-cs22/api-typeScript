import { Request, Response } from 'express';
import prisma from '../config/database';
import analyticsService from '../services/analytics.service';
import disciplinaController from './disciplina.controller';



const getAll = async (req: Request, res: Response) => {
  const alunos = await prisma.aluno.findMany();
  res.json(alunos);
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;  const aluno = await prisma.aluno.findUnique({ where: { id } });
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




const listStudentsInfo = async (req: Request, res: Response) => {
  const { semestreId, ano, disciplinaId } = req.query;
  
  const semestre = semestreId as string | undefined;
  const disciplina = disciplinaId as string | undefined;
  const anoNumber = ano ? parseInt(ano as string, 10) : undefined;
  
  try {
    const alunos = await analyticsService.listStudentsInfo({ semestreId: semestre, ano: anoNumber, disciplinaId: disciplina });
    res.json(alunos);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ error: errorMessage });
  }
};

const getStudentRisk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const risk = await analyticsService.analyzeStudentRisk(id);
    res.json(risk);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(404).json({ error: errorMessage });
  }
};

const formStudyGroups = async (req: Request, res: Response) => {
  const { semestreId } = req.params;
  try {
    const groups = await analyticsService.formStudyGroups(semestreId);
    res.json(groups);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ error: errorMessage });
  }
};













export default { getAll, getOne, create, update, deleteOne,listStudentsInfo, getStudentRisk, formStudyGroups }


