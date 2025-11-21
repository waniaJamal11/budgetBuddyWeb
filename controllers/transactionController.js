import transactionModel from "../models/transactionModel.js";
import categoryModel from "../models/categoryModel.js";
import transactionTypeModel from "../models/transactionTypeModel.js";

async function addTransaction(req, res) {
    try {
        const userId = req.session.user?._id;
        if (!userId) {
            req.flash("error", "Please login first");
            return res.redirect("/");
        }
        const { amount, categoryId, transactionType } = req.body;
        const description = req.body.description || "";

        if (!amount || !categoryId || !transactionType) {
            req.flash("error", "Please fill all required feilds");
            return res.redirect("/addTransaction");
        }
        const category = await categoryModel.findOne({ _id: categoryId, userId });
        if (!category) {
            req.flash("error", "Invalid category selection.");
            return res.redirect("/addTransaction");
        }
        const type = await transactionTypeModel.findOne({ name: transactionType });
        if (!type) {
            req.flash("error", "Invalid transaction type.");
            return res.redirect("/addTransaction");
        }
        const newTransaction = new transactionModel({
            userId,
            categoryId,
            transactionTypeId: type._id,
            amount,
            description
        });
        await newTransaction.save();
        req.flash("success", "Transaction added successfully!");
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(`Add transaction Error: ${error.message}`);
        req.flash("error", "Something went wrong while adding transaction");
        return res.redirect("/dashboard");
    }

}

async function deleteTransaction(req, res) {
    try {
        const transId = req.params.id;
        const deleted = await transactionModel.findByIdAndDelete(transId);
        if (!deleted) {
            req.flash("error", "Transaction not found");
        }
        else {
            req.flash("success", "Transaction deleted successfully!");
        }
        res.redirect("/transaction");
    } catch (error) {
        console.log(`Delete transaction Error: ${error.message}`);
        req.flash("error", "Something went wrong while deleteing transaction");
        return res.redirect("/transaction");
    }
}

async function editTransaction(req, res) {
    try {
        const transId = req.params.id;
        const userId = req.session.user?._id;

        if (!userId) {
            req.flash("error", "Please login first");
            return res.redirect("/");
        }

        const { amount, categoryId, transactionType, description } = req.body;

        if (!amount || !categoryId || !transactionType) {
            req.flash("error", "Please fill all required fields");
            return res.redirect("/transaction");
        }

        const category = await categoryModel.findOne({ _id: categoryId, userId });
        if (!category) {
            req.flash("error", "Invalid category selected");
            return res.redirect("/transaction");
        }

        const type = await transactionTypeModel.findOne({ name: transactionType });
        if (!type) {
            req.flash("error", "Invalid transaction type");
            return res.redirect("/transaction");
        }

        const old = await transactionModel.findById(transId);
        if (!old) {
            return res.redirect("/transaction");
        }

        const nothingChanged =
            Number(amount) === Number(old.amount) &&
            categoryId == old.categoryId.toString() &&
            type._id.toString() === old.transactionTypeId.toString() &&
            (description || "") === (old.description || "");
            
        if (nothingChanged) {
            return res.redirect("/transaction");
        }

        const updated = await transactionModel.findByIdAndUpdate(
            transId,
            {
                amount,
                categoryId,
                transactionTypeId: type._id,
                description,
            },
            { new: true }
        );

        if (!updated) {
            req.flash("error", "Transaction not found");
            return res.redirect("/transaction");
        }

        req.flash("success", "Transaction updated successfully!");
        res.redirect("/transaction");
    } catch (error) {
        console.log(`Update transaction Error: ${error.message}`);
        req.flash("error", "Something went wrong while updating transaction");
        return res.redirect("/transaction");
    }
}
export default { addTransaction, deleteTransaction, editTransaction }