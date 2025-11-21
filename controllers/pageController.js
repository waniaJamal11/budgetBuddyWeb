import categoryModel from "../models/categoryModel.js";
import transactionTypesModel from "../models/transactionTypeModel.js"
import transactionModel from "../models/transactionModel.js";
import moment from "moment";

async function loginPage(req, res) {
    try {
        if (req.session.destroyAfterLogin) {
            req.session.destroy(() => { });
        }
        return res.render("userPage/login");
    } catch (error) {
        console.log(`Error loading login page: ${error.message}`);
        return res.status(500).send("Something went wrong");
    }
}

async function signupPage(req, res) {
    try {
        return res.render("userPage/signup");
    }
    catch (error) {
        console.log(`Error loading signup page: ${error.message}`);
    }
}

async function dashboardPage(req, res) {
  try {
    const userId = req.session.user?._id;
    if (!userId) return res.redirect("/");

    const filter = req.query.filter || "weekly"; 
    let startDate;

    if (filter === "daily") startDate = moment().startOf("day").toDate();
    else if (filter === "weekly") startDate = moment().startOf("week").toDate();
    else if (filter === "monthly") startDate = moment().startOf("month").toDate();

    const transactions = await transactionModel
      .find({ userId, createdAt: { $gte: startDate } })
      .populate("categoryId transactionTypeId")
      .lean()
      .sort({ _id: -1 });

    const categoryTotals = {};
    transactions.forEach((tx) => {
      if (tx.transactionTypeId?.name === "Expense") {
        const name = tx.categoryId?.name || "Others";
        categoryTotals[name] = (categoryTotals[name] || 0) + tx.amount;
      }
    });

    const pieLabels = Object.keys(categoryTotals);
    const pieData = Object.values(categoryTotals);

    const allTransactions = await transactionModel.find({ userId }).populate("transactionTypeId").lean();
    let totalBalance = 0;
    allTransactions.forEach((tx) => {
      if (tx.transactionTypeId?.name === "Income") totalBalance += tx.amount;
      else if (tx.transactionTypeId?.name === "Expense") totalBalance -= tx.amount;
    });

    return res.render("dashboardPage/dashboard", { currentPage: "dashboard", user: req.session.user,transactions,totalBalance,pieLabels,pieData,filter,
    });
  } catch (error) {
    console.log(`Error loading dashboard page: ${error.message}`);
    return res.status(500).send("Something went wrong");
  }
}



async function categoryPage(req, res) {
    try {
        const userId = req.session.user?._id;

        if (!userId) {
            req.flash("error", "Please login first.");
            return res.redirect("/");
        }

        const category = await categoryModel.find({ userId }).populate("transactionType").sort({ _id: -1 });

        return res.render("categoriesPage/categories", { currentPage: "categories", category });
    }
    catch (error) {
        console.log(`Error loading categories page: ${error.message}`);
        req.flash("error", "Something went wrong while loading categories.");
        return res.redirect("/dashboard");
    }
}

async function transactionPage(req, res) {
    try {

        const userId = req.session.user?._id;
        if (!userId) {
            req.flash("error", "Please login first.");
            return res.redirect("/");
        }

        const search = req.query.search?.trim();
        const filter = req.query.filter;
        let transactions = [];
        let message = "";
        let flag = 0;

        // Base query
        let query = { userId };

        // If user typed something but did not select a filter
        if (search && !filter) {
            req.flash("error", "Please select a filter to search.");
            return res.redirect("/transaction");
        }


        if (search && filter) {
            if (filter === "category") {
                const categories = await categoryModel.find({
                    userId,
                    name: { $regex: search, $options: "i" }
                });
                const categoryIds = categories.map(cat => cat._id);
                query.categoryId = { $in: categoryIds };
            } else if (filter === "type") {
                const types = await transactionTypesModel.find({
                    name: { $regex: search, $options: "i" }
                });
                const typeIds = types.map(t => t._id);
                query.transactionTypeId = { $in: typeIds };
            } else if (filter === "date" && search) {
                const start = new Date(search + "T00:00:00");
                const end = new Date(search + "T23:59:59");
                query.createdAt = { $gte: start, $lte: end };
            }

        }

        transactions = await transactionModel.find(query).populate("categoryId").populate("transactionTypeId").sort({ _id: -1 });
        if (transactions.length === 0) {
            message = search ? `No transaction records found for "${search}"` : "No transaction records found";
        }
        const categories = await categoryModel.find({ userId });
        //for msg and btn
        if (search) {
            flag = 0;
        }
        else if (!search && transactions.length === 0) {
            flag = 1;
        }

        return res.render("transactionPage/transaction", { currentPage: "transaction", transaction: transactions, moment, categories, search, filter, message, flag });
    }
    catch (error) {
        console.log(`Error loading transactions page: ${error.message}`);
    }
}

async function addTransactionPage(req, res) {
    try {
        if (!req.session.user) {
            req.flash("error", "Please login first");
            return res.redirect("/");
        }

        const userId = req.session.user._id;
        const categories = await categoryModel.find({ userId });
        const transactionType = await transactionTypesModel.find();
        return res.render("transactionPage/addTransaction", { categories, transactionType });
    }
    catch (error) {
        console.log(`Error loading add trasactions page: ${error.message}`);
    }

}
async function profilePage(req, res) {
    try {
        if (!req.session.user) {
            req.flash("error", "Please login first");
            return res.redirect("/");
        }
        const user = req.session.user;
        return res.render("userPage/profileSettings", { user });

    } catch (error) {
        console.log(`Error loading profile setting page: ${error.message}`);
    }
}


export default {
    loginPage,
    signupPage,
    dashboardPage,
    categoryPage,
    transactionPage,
    addTransactionPage, profilePage
}