import mongoose from "mongoose"; 

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  transactionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TransactionType',
    required: true
  }
}, { timestamps: true });
const categoryModel  = mongoose.model('category', categorySchema);
export default categoryModel;