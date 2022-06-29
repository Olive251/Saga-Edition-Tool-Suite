const express = require('express');
const router = express.Router();
const publicRouter = require("./public.js");
router.use('/public', publicRouter);

//testcharacter
const test = require('../testCharacter.js');
//let arma = test.testCharacter();


router.get('/', async (req,res) => {
    
    let arma = await test.testCharacter();
    console.log(arma);

    res.render('CharacterSheet', {character: arma});
    
})

module.exports = router;