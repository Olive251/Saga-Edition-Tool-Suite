const mongoose = require("mongoose");

const r_featSchema = new mongoose.Schema({
    name: String,
    prerequisites: [{type: mongoose.Schema.Types.ObjectId, ref: 'r_featSchema'}],
    description: String,
    effect: String,
    normal: String,
})