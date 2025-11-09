import categoryModel from "../models/categoryModel.js";

async function loginPage(req, res) {
    try {
        return res.render("userPage/login");
    } catch (error) {
        console.log(`Error loading login page: ${error.message}`);
    }
}
async function signupPage(req, res) {
    try {
        return res.render("userPage/signup");
    } catch (error) {
        console.log(`Error loading signup page: ${error.message}`);
    }
}
async function dashboardPage(req, res) {
    try {
        return res.render("dashboardPage/dashboard",{ currentPage: "dashboard" });
    } catch (error) {
        console.log(`Error loading dashboard page: ${error.message}`);
    }
}
async function categoryPage(req, res) {
    try {
        let category = await categoryModel.find().populate("transactionType").sort({_id:-1});
        return res.render("categoriesPage/categories",{ currentPage: "categories", category });
    } catch (error) {
        console.log(`Error loading catagories page: ${error.message}`);
    }
}

async function addCategoryPage(req, res) {
    try {
        return res.render("categoriesPage/addCategory");
    } catch (error) {
        console.log(`Error loading add catagories page: ${error.message}`);
    }
}

export default {
    loginPage,
    signupPage,
    dashboardPage,
    categoryPage,
    addCategoryPage
}