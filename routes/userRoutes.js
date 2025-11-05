import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.post("/signupUser", userController.signUp);
router.post("/loginUser",userController.login);

export default router;