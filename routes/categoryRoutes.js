import express from "express";
const router = express.Router();
import categoryController from "../controllers/categoryController.js";

router.post("/addCategory", categoryController.addCategory);

export default router;