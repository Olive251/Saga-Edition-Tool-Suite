const mongoose = require("mongoose");

const Talent = new mongoose.Schema({
    name: String,
    description: String,
    prerequisite: {type: mongoose.Types.ObjectId, ref:'Talent'},
})

const Rules_TalentTree = new mongoose.Schema({
    name: String,
    description: String,
    talents: [Talent],
})

module.exports = mongoose.model("Rules_TalentTree", Rules_TalentTree);