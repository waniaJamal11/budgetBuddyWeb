import userRoutes from "../routes/userRoutes.js";
import pageRoutes from "../routes/pageRoutes.js"
import categoryRoutes from "../routes/categoryRoutes.js"
import transactionRoutes from "../routes/transactionRoutes.js";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";

function config(app, express, secretKey) {
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DATABASE,
            collectionName: "sessions",
            ttl: 60 * 60,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false,
        }
    }));
    app.use(flash());
    app.use(function (req, res, next) {
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.formData = req.flash("formData")[0] || {};
        res.locals.session = req.session;
        next();
    })

    app.use(userRoutes);
    app.use(pageRoutes);
    app.use(categoryRoutes);
    app.use(transactionRoutes);

}

export default config;