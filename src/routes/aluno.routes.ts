import { Router } from 'express';
import alunoController from '../controllers/aluno.controller';

const router = Router();


router.get('/info', alunoController.listStudentsInfo);
router.get('/:id/risk', alunoController.getStudentRisk);
router.get('/:semestreId/study-groups', alunoController.formStudyGroups);

router.get('/', alunoController.getAll);
router.get('/:id', alunoController.getOne);
router.post('/', alunoController.create);
router.put('/:id', alunoController.update);
router.delete('/:id', alunoController.deleteOne);

export default router;
