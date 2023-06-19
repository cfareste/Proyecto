import { Router } from "express";
import userController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import fileMiddleware from "../middleware/file.middleware.js";

const router = Router();

// GET
router.get('/', authMiddleware.authenticate, authMiddleware.authAdminUser, userController.findAll);

router.get('/:ID', authMiddleware.checkAuthorization, userController.find);

// POST
router.post('/register', fileMiddleware.upload.single('photo'), userController.createUser);

router.post('/login', userController.login);

// PUT
router.put('/updateProfile/:ID', authMiddleware.checkAuthorization, fileMiddleware.upload.single('photo'), userController.updateUser)


// DELETE




export default router;