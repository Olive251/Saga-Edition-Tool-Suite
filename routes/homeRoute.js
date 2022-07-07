const express = require('express');
const router = express.Router();
const publicRouter = require("./public.js");
//router.use('/public', publicRouter);

router.get('/', (req,res) => {
    res.render('home',{title: "Saga Edition Character Tool Suite"});
})

module.exports = router;