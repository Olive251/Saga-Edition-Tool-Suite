const mongoose = require("mongoose");

const Rules_Feat = new mongoose.Schema({
    name: String,
    prerequisites: [{type: mongoose.Schema.Types.ObjectId, ref: 'r_feat'}],
    description: String,
    effect: String,
    normal: String,
})