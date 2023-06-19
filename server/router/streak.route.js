import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import streakController from "../controller/streak.controller.js";

const router = Router();

// GET
router.get('/:userID', authMiddleware.checkAuthorization, streakController.getByUserID);


// POST
router.post('/new/:userID', authMiddleware.checkAuthorization, streakController.create);


// PUT
router.put('/update/:userID', authMiddleware.checkAuthorization, streakController.update);


// DELETE



export default router;