import express from "express";
const router = express.Router();
import categoryController from "../controllers/categoryController.js";

router.post("/addCategory", categoryController.addCategory);
router.post("/deleteCategory/:id", categoryController.deleteCategory);
router.post("/editCategory/:id", categoryController.editCategory);


export default router;