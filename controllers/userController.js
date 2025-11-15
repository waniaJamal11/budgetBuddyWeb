import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
async function signUp(req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;
        //check empty feilds
        const feilds = {
            Name: name?.trim(),
            Email: email?.trim(),
            Password: password,
            "Confirm Password": confirmPassword

        };
        for (let key in feilds) {
            if (!feilds[key]) {
                req.flash("error", `${key} is required`);
                return res.redirect("/signup");

            }
        }
        //match pass and confirmpass
        if (password !== confirmPassword) {
            req.flash("error", "Password and Confirm Password do not match");
            return res.redirect("/signup");
        }
        //check email exist already or not
        const existing = await userModel.findOne({ email });
        if (existing) {
            req.flash("error", "Email already registered");
            return res.redirect("/signup");
        }
        //encrypt pass
        const encryptPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ name, email, password: encryptPassword });

        // auto-login after signup
        req.session.user = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };

        req.flash("success", "Signup successfull!");
        return res.redirect("/dashboard");

    } catch (error) {
        console.log(`Signup Error: ${error.message}`);
        req.flash("error", "Something went wrong while signup");
        return res.redirect("/signup");
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        //check fields are empty
        if (!email || !password) {
            req.flash("error", "Email and Password are required");
            return res.redirect("/");
        }
        //check email
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/");
        }
        //check pass
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/");
        }
        //loign
        req.session.user = user;
        req.flash("success", "Login Successfull!");
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(`Login Error: ${error.message}`);
        req.flash("error", "Something went wrong while login");
        res.redirect("/");
    }
}

export default {
    signUp,
    login,
};
