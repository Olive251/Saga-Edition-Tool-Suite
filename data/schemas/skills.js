const mongoose = require("mongoose");

const r_skill = new mongoose.Schema({
    name: String,
    description: String,
    specialRules: [String],
    actions: {name: String, description: String,}
})