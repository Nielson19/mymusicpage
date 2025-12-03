import cors from "cors";
import auth from "../controllers/authController.js";
import { Router } from "express";
const router = Router();


//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.post('/register', auth.registerUser)
router.post('/login', auth.loginUser)


export default router;
