 async function landingPage(req, res) {
    try {
        return res.render("landingPage/landing",{ title: 'Budget Buddy' });
    } catch (error) {
        console.log(`Error:${error.message}`);
    }
}

export default {landingPage};
