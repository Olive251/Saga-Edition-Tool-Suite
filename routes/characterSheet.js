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
    test.buildSampleCharacters();
})
router.get('/:character', async(req,res) => {
    
    mongoose.connect(
        "mongodb://localhost/SEcharacters",
        () => {console.log("connected to database...")},
        (err) => console.error(err)
    );

    let searchID = req.params.character;
    try {
        let viewCharacter = await Character.find({_id: searchID}).lean();
        res.render('CharacterSheet', {title: `${viewCharacter[0].name}-Character Sheet`, character: viewCharacter[0]});
    } catch {
        let msg = `No character with {_id: ${req.params.character}} found...`
        res.render('404', {title: `ERROR404: ${req.params.character}`, message: msg});
    }

    mongoose.connection.close(() => {
        console.log("Connection to database closed...");
    });
 
})

module.exports = router;