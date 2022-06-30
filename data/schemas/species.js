const mongoose = require("mongoose");

const Rules_Species = new mongoose.Schema({
    abilityModifiers: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        Wisdom: Number,
        Charisma: Number,
    },
    size: {type: String, enum: ['SMALL', 'MEDIUM', 'LARGE'], default: 'MEDIUM'},
    speed: Number,
    additionalTraits: {name: String, description: String,},
    speciesFeats: [{type: mongoose.Schema.Types.ObjectId, ref: 'r_feat'}]
})