const mongoose = require("mongoose");

const Rules_Species = new mongoose.Schema({
    name: String,
    abilityModifiers: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        Wisdom: Number,
        Charisma: Number,
    },
    size: {_id: false, type: String, enum: ['SMALL', 'MEDIUM', 'LARGE'], default: 'MEDIUM'},
    speed: Number,
    additionalTraits: [{_id: false, name: String, description: String,}],
    speciesFeats: [{_id: false, type: mongoose.Schema.Types.ObjectId, ref: 'r_feat'}],
})

module.exports = mongoose.model("Rules_Species", Rules_Species);