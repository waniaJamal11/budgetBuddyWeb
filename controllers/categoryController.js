import categoryModel from "../models/categoryModel.js";
import transactionTypeModel from "../models/transactionTypeModel.js";
import transactionModel from "../models/transactionModel.js";

async function addCategory(req, res) {
    try {
        const { name, transactionType } = req.body;
        const userId = req.session.user?._id;

        if (!name.trim() || !transactionType) {
            req.flash("error", "Please provide both Category Name and Transaction Type");
            return res.redirect("/categories");
        }
        const type = await transactionTypeModel.findOne({ name: transactionType });
        if (!type) {
            req.flash("error", "Invalid Transaction Type");
            return res.redirect("/categories");
        }
        const existingCategory = await categoryModel.findOne({
            name: { $regex: `^${name.trim()}$`, $options: 'i' },
            transactionType: type._id,
            userId, 
        });

        if (existingCategory) {
            req.flash("error", "This category already exists");
            return res.redirect("/categories");
        }

        if (!userId) {
            req.flash("error", "Please login first.");
            return res.redirect("/");
        }

        const newCategory = new categoryModel({
            name: name.trim(),
            transactionType: type._id,
            userId
        });

        await newCategory.save();
        req.flash("success", "Category added successfully!");
        return res.redirect("/categories");

    } catch (error) {
        console.log(`Add Category Error: ${error.message}`);
        req.flash("error", "Something went wrong while adding new category");
        return res.redirect("/categories");
    }
}

async function deleteCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const hasTransaction = await transactionModel.exists({categoryId: categoryId});

        if(hasTransaction){
            req.flash("error","Cannot delete category because it has transactions.");
            return res.redirect("/categories");
        }

        const deleted = await categoryModel.findByIdAndDelete(categoryId);

        if (!deleted) {
            req.flash("error", "Category not found");
        }
        else {
            req.flash("success", "Category deleted successfully!");
        }
        res.redirect("/categories");
    } catch (error) {
        console.log(`Delete Category Error: ${error.message}`);
        req.flash("error", "Something went wrong while deleteing category");
        return res.redirect("/categories");
    }
}

async function editCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const userId = req.session.user._id;
        const { name, transactionType } = req.body;

        if (!name || !transactionType) {
            req.flash("error", "Name and Transaction Type required");
            return res.redirect("/categories");
        }

        const type = await transactionTypeModel.findOne({ name: transactionType });
        if (!type) {
            req.flash("error", "Invalid Transaction Type");
            return res.redirect("/categories");
        }

        const category = await categoryModel
            .findOne({ _id: categoryId, userId })
            .populate("transactionType");

        if (!category) {
            req.flash("error", "Category not found");
            return res.redirect("/categories");
        }

        const isNameChanged =
            category.name.toLowerCase() !== name.trim().toLowerCase();
        const isTypeChanged =
            category.transactionType._id.toString() !== type._id.toString();

        if (!isNameChanged && !isTypeChanged) {
            return res.redirect("/categories");
        }

        const existing = await categoryModel.findOne({
            _id: { $ne: categoryId },
            userId,
            name: { $regex: `^${name.trim()}$`, $options: "i" },
            transactionType: type._id
        });

        if (existing) {
            req.flash("error", "Category already exists");
            return res.redirect("/categories");
        }

        category.name = name.trim();
        category.transactionType = type._id;
        await category.save();

        req.flash("success", "Category updated!");
        return res.redirect("/categories");

    } catch (error) {
        console.log(`Updating Category Error: ${error.message}`);
        req.flash("error", "Something went wrong while updating category");
        return res.redirect("/categories");
    }
}



export default {
    addCategory,
    deleteCategory,
    editCategory,
}
