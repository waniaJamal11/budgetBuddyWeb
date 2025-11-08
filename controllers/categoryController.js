import categoryModel from "../models/categoryModel.js";
import transactionTypeModel from "../models/transactionTypeModel.js";

async function addCategory(req, res) {
    try {
        const { name, transactionType } = req.body;
        if (!name.trim() || !transactionType) {
            req.flash("error", "Please provide both Category Name and Transaction Type");
            return res.redirect("/addCategories");
        }
        const type = await transactionTypeModel.findOne({ name: transactionType });
           if (!type) {
            req.flash("error", "Invalid Transaction Type");
            return res.redirect("/addCategories");
        } 
        const existingCategory = await categoryModel.findOne({ 
            name: { $regex: `^${name.trim()}$`, $options: 'i' }, 
            transactionType: type._id 
        });
        if (existingCategory) {
            req.flash("error", "This category already exists");
            return res.redirect("/addCategories");
        }
        const newCategory = new categoryModel({ 
            name: name.trim(), 
            transactionType: type._id 
        });
        await newCategory.save();
        req.flash("success","Category added successfully!");
        return res.redirect("/categories");

    } catch (error) {
        console.log(`Add Category Error: ${error.message}`);
        req.flash("error", "Something went wrong while adding new category");
        return res.redirect("/addCategories");
    }
}


export default {
   addCategory
}
