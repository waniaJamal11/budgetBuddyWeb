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
                req.flash("formData", req.body);
                return res.redirect("/signup");
            }
        }
        //match pass and confirmpass
        if (password !== confirmPassword) {
            req.flash("error", "Password and Confirm Password do not match");
            req.flash("formData", req.body);
            return res.redirect("/signup");
        }
        //check email exist already or not
        const existing = await userModel.findOne({ email });
        if (existing) {
            req.flash("error", "Email already registered");
            req.flash("formData", req.body);
            return res.redirect("/signup");
        }
        //encrypt pass
        const encryptPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ name, email, password: encryptPassword });

        // login directly after signup
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

        const feilds = {
            Email: email?.trim(),
            Password: password,
        };
        for (let key in feilds) {
            if (!feilds[key]) {
                req.flash("error", `${key} is required`);
                req.flash("formData", req.body);
                return res.redirect("/");

            }
        }
        //check email
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Invalid Email or Password");
            req.flash("formData", req.body);
            return res.redirect("/");
        }
        //check pass
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.flash("error", "Invalid Email or Password");
            req.flash("formData", req.body);
            return res.redirect("/");
        }
        //loign
        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email
        };
        req.flash("success", "Login Successfull!");
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(`Login Error: ${error.message}`);
        req.flash("error", "Something went wrong while login");
        res.redirect("/");
    }
}
async function logout(req, res) {
    try {
        if (req.session.user) {
            req.flash("success", "Logout successfully");

            // Mark session to destroy after redirect
            req.session.destroyAfterLogin = true;
            return res.redirect("/");
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(`Logout Error: ${error.message}`);
        req.flash("error", "Something went wrong while logging out");
        return res.redirect("/dashboard");
    }
}
async function profile(req, res) {
    try {
        const userId = req.session.user._id;
        const { name, email, oldPassword, newPassword, confirmPassword } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/profileSetting");
        }

        let updated = false;

        if (name && name.trim() !== "" && name.trim() !== user.name) {
            user.name = name.trim();
            updated = true;
        }

        if (email && email.trim() !== "" && email.trim() !== user.email) {
            user.email = email.trim();
            updated = true;
        }

        if (oldPassword || newPassword || confirmPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                req.flash("error", "Old password incorrect");
                return res.redirect("/profileSetting");
            }

            if (newPassword !== confirmPassword) {
                req.flash("error", "New passwords do not match");
                return res.redirect("/profileSetting");
            }

            const hashed = await bcrypt.hash(newPassword, 10);
            user.password = hashed;
            updated = true;
        }

        if (updated) {
            const updatedUser = await user.save();
            req.session.user = {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            };
            req.flash("success", "Profile updated successfully!");
        }

        return res.redirect("/profileSetting");


    } catch (error) {
        console.log(`Updating profile error: ${error.message}`);
        req.flash("error", "Something went wrong while updating profile");
        return res.redirect("/profileSetting");
    }
}
async function forgetPass(req, res) {
    try {
        const { email, password, confirmPassword } = req.body;

        // Step 1: Only email submitted → Check if exists
        if (!password && !confirmPassword) {

            const user = await userModel.findOne({ email });

            if (!user) {
                req.flash("error", "Email not found!");
                req.flash("formData", req.body);
                return res.redirect("/forgetPassword");
            }

            // Email exists → show password fields
          //  req.flash("formData", req.body);

            return res.render("userPage/forgetPassword", {
                emailExists: true,
                formData: { email },
            });

        }

        // Step 2: Password submitted → Update password
        if (password !== confirmPassword) {
            req.flash("error", "Passwords do not match!");
            req.flash("formData", req.body);
            return res.redirect("/forgetPassword");
        }

        const hash = await bcrypt.hash(password, 10);

        await userModel.findOneAndUpdate({ email }, { password: hash });

        req.flash("success", "Password updated! Login now.");
        return res.redirect("/");

    } catch (error) {
        console.log("Forget Password Error:", error);
        req.flash("error", "Something went wrong!");
        return res.redirect("/forgot-password");
    }
}

export default {
    signUp,
    login,
    logout,
    profile,
    forgetPass
};
