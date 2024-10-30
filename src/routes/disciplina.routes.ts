import { Router } from 'express';
import disciplinaController from '../controllers/disciplina.controller';

const router = Router();

router.get('/', disciplinaController.getAll);
router.get('/:id', disciplinaController.getOne);
router.post('/', disciplinaController.create);
router.put('/:id', disciplinaController.update);
router.delete('/:id', disciplinaController.deleteOne);

export default router;
