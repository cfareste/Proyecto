import { Router } from 'express';
import exerciseController from '../controller/exercise.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// GET
router.get('/:ID', exerciseController.find);

router.get('/all/:lessonID/:userID', authMiddleware.checkAuthorization, exerciseController.findExercisesRelatedToUserAndOneLesson);


// POST
router.post('/create/:lessonID/:userID', authMiddleware.checkAuthorization, exerciseController.createRelationWithUser);


// PUT
router.put('/update/:exerciseID/:userID', authMiddleware.checkAuthorization, exerciseController.updateRelationWithUser);

router.put('/restartAll/:lessonID/:userID', authMiddleware.checkAuthorization, exerciseController.restartAllUserRelationsOfALesson);

export default router;