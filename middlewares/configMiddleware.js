function config(app,express) {
    app.set("view engine", "ejs");
    app.use(express.static("public"));
}

export default config;