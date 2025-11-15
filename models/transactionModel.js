import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    transactionTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransactionType",
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    }

}, { timestamps: true });
const transactionModel = mongoose.model('transaction', transactionSchema);
export default transactionModel;