import userRoutes from "../routes/userRoutes.js";
import pageRoutes from "../routes/pageRoutes.js"
import session from "express-session";
import flash from "connect-flash";

function config(app,express, secretKey) {
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(session({
        secret: secretKey,
        resave:false,
        saveUninitialized: true
    }));
    app.use(flash());
    app.use(function(req, res, next){
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        next();
    })

    app.use("/",userRoutes);
    app.use("/",pageRoutes);
}

export default config;