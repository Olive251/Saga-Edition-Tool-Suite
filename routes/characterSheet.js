const express = require('express');
const router = express.Router();
const publicRouter = require("./public.js");
router.use('/public', publicRouter);
const Character = require("../data/schemas/character.js");

//Mongoose setup
const mongoose = require("mongoose");


//testcharacter
const test = require('../data/sampleCharacters.js');

router.get('/', async (req,res) => {
    
    let arma = await test.testCharacter();
    console.log(arma);

    res.render('CharacterSheet', {character: arma});
    
})
router.get('/:scharacter', async(req,res) => {
    //TODO : update to use ids once the data is created
    if(req.query.scharacter) {
        mongoose.connect(
            "mongodb://localhost/SEcharacters",
            () => {console.log("connected to database...")},
            (err) => console.error(err)
        );
        let viewSCharacter = await Character.find({name: req.query.scharacter});

        res.render('CharacterSheet', viewSCharacter)
    }
})

module.exports = router;