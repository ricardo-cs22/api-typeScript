import { Router } from 'express';
import semestreController from '../controllers/semestre.controller';

const router = Router();

router.get('/', semestreController.getAll);
router.get('/:id', semestreController.getOne);
router.post('/', semestreController.create);
router.put('/:id', semestreController.update);
router.delete('/:id', semestreController.deleteOne);

export default router;
