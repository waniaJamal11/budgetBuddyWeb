import mongoose from "mongoose"; 

const transactionTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Income', 'Expense'], 
    unique: true
  }
}, { timestamps: true });

const TransactionTypeModel  = mongoose.model('TransactionType', transactionTypeSchema);
export default TransactionTypeModel;