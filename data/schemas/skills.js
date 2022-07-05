const mongoose = require("mongoose");

const Rules_Skill = new mongoose.Schema({
    name: String,
    description: String,
    specialRules: [String],
    actions: {name: String, description: String,}
})

module.exports = mongoose.model("Rules_Skills", Rules_Skills);