import { Router } from "express";
import lessonController from "../controller/lesson.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// GET
router.get('/:ID', lessonController.find);

router.get('/relation/:lessonID/:userID', authMiddleware.checkAuthorization, lessonController.findRelation)

router.get('/all/:unitID', lessonController.findByUnitId);

router.get('/all/search/:title', lessonController.findBySearch);

router.get('/all/started/:year/:userID', authMiddleware.checkAuthorization, lessonController.findAllStartedByUserId);

// POST
router.post('/create/:lessonID/:userID', authMiddleware.checkAuthorization, lessonController.createRelationWithUser);


// UPDATE
router.put('/update/:lessonID/:userID', authMiddleware.checkAuthorization, lessonController.updateRelationWithUser);

router.put('/restart/:lessonID/:userID', authMiddleware.checkAuthorization, lessonController.restartRelationWithUser);

// DELETE

export default router;