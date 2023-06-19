import { Router } from "express";
import unitController from "../controller/unit.controller.js";

const router = Router();

// GET 
router.get('/:ID', unitController.find);

router.get('/all/:courseID', unitController.findByCourseId);


// POST


// PUT


// DELETE

export default router;