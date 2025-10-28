import express from "express";
const router= express.Router();

router.get("/",(req, res) => {
  res.render('index', { title: 'Budget Buddy' });
});

export default router;