const mongoose = require("mongoose");

const classRulesTable = new mongoose.Schema({
    _id: false,
    level: {
        classLevel: Number,
        baseAttackBonus: Number,
        classFeatures: [String],
    }
})

const classHP = new mongoose.Schema({
    _id: false,
    starting: Number,
    leveling: String,
})

const classStartingFeats = new mongoose.Schema({
    _id: false,
    feat: {type: mongoose.Schema.Types.ObjectId, ref:'r_feat'},
})

const classSkills = new mongoose.Schema({
    _id: false,
    numOfSkills: String,
    classSkills: [{type: mongoose.Schema.Types.ObjectId, ref:'r_skill'}],
})

const Rules_Class = new mongoose.Schema({
    name: String,
    classTable: [classRulesTable],
    hp: classHP,
    startingFeats: [classStartingFeats],
    skills: classSkills,

})

module.exports = mongoose.model("Rules_Class", Rules_Class);