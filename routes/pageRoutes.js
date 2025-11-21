import express from "express";
const router = express.Router();
import pageController from "../controllers/pageController.js";

router.get("/", pageController.loginPage);
router.get("/signup", pageController.signupPage);
router.get("/dashboard", pageController.dashboardPage);
router.get("/categories", pageController.categoryPage);
// router.get("/addCategories", pageController.addCategoryPage);
router.get("/transaction",pageController.transactionPage);
router.get("/addTransaction",pageController.addTransactionPage);
router.get("/profileSetting",pageController.profilePage);


export default router;