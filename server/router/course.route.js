import { Router } from "express";
import courseController from "../controller/course.controller.js";

const router = Router();

// GET
router.get('/:ID', courseController.find);

router.get('/all/:year', courseController.findAll);

// POST


// PUT



// DELETE



export default router;