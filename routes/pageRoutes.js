import express from "express";
const router = express.Router();
import pageController from "../controllers/pageController.js";

router.get("/", pageController.loginPage);
router.get("/signup", pageController.signupPage);
router.get("/dashboard", pageController.dashboardPage);
router.get("/categories", pageController.categoryPage);
router.get("/addCategories", pageController.addCategoryPage);

export default router;