import { Router } from 'express';
import alunoController from '../controllers/aluno.controller';

const router = Router();

router.get('/', alunoController.getAll);
router.get('/:id', alunoController.getOne);
router.post('/', alunoController.create);
router.put('/:id', alunoController.update);
router.delete('/:id', alunoController.deleteOne);

export default router;
