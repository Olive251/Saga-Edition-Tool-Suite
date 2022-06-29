const mongoose = require("mongoose");

const classTable = new mongoose.Schema({
    level: [{
        classLevel: Number,
        baseAttackBonus: Number,
        classFeatures: [String],
    }]
})

const classHP = new mongoose.Schema({
    starting: Number,
    level: String,
})

const classStartingFeats = new mongoose.Schema({
    feat: [{type: mongoose.Schema.Types.ObjectId, ref:'r_featSchema'}],
})