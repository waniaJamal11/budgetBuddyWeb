import express from "express";
const router = express.Router();
import transactionController from "../controllers/transactionController.js";


router.post("/newTransaction", transactionController.addTransaction);
router.post("/deleteTransaction/:id", transactionController.deleteTransaction);
router.post("/editTransaction/:id",transactionController.editTransaction);


export default router;