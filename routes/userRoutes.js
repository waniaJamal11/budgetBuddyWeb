import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.post("/signupUser", userController.signUp);
router.post("/loginUser",userController.login);
router.get("/logout", userController.logout);
router.post("/updateProfile",userController.profile);
router.post("/forgetPassword",userController.forgetPass);

export default router;