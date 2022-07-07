const mongoose = require("mongoose");
const Rules_Bonus = require("./bonus.js");

const Rules_Feat = new mongoose.Schema({
    name: String,
    prerequisites: [{_id: false, type: mongoose.Schema.Types.ObjectId, ref: 'r_feat'}],
    description: String,
    effect: String,
    normal: String,
    bonus: [Rules_Bonus],
})

module.exports = mongoose.model("Rules_Feat", Rules_Feat);