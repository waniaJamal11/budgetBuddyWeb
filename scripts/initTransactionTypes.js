import mongoose from "mongoose";
import transactionTypeModel from "../models/transactionTypeModel.js";
import dotenv from 'dotenv';
dotenv.config(); 
const url = process.env.DATABASE;

async function initTransactionTypes() {
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully!");
    const types = ['Income', 'Expense'];
    for (const name of types) {
      const exists = await transactionTypeModel.findOne({ name });
      if (!exists) {
        await transactionTypeModel.create({ name });
        console.log(`Added transaction type: ${name}`);
      }
    }
    console.log("Initialization complete!");
    process.exit(0); 
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

initTransactionTypes();


//run script by (node scripts/initTransactionTypes.js)