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
        return res.render("dashboardPage/dashboard");
    } catch (error) {
        console.log(`Error loading dashboard page: ${error.message}`);
    }
}

export default {
    loginPage,
    signupPage,
    dashboardPage
}