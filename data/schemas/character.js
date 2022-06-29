const mongoose = require("mongoose");

const c_abilitiesSchema = new mongoose.Schema({
    strength: {score: Number, bonus: Number},
    dexterity: {score: Number, bonus: Number},
    constitution: {score: Number, bonus: Number},
    intelligence: {score: Number, bonus: Number},
    wisdom: {score: Number, bonus: Number},
    charisma: {score: Number, bonus: Number},
})

const classLvlSchema = new mongoose.Schema({
    class: String,
    level: Number,
})
const featSchema = new mongoose.Schema({
    name: String
})
const talentSchema = new mongoose.Schema({
    name: String
})
const forcePowersSchema = new mongoose.Schema({
    name: String,
})

const skillsSchema = new mongoose.Schema({
    acrobatics: {trained: Boolean, skillFocus: Number},
	athletics: {trained: Boolean, skillFocus: Number},
	deception: {trained: Boolean, skillFocus: Number},
	gatherInfo: {trained: Boolean, skillFocus: Number},
	initiative: {trained: Boolean, skillFocus: Number},
	knowledge: [{type: String, trained: Boolean, skillFocus: Number}], 
	mechanics: {trained: Boolean, skillFocus: Number},
	perception: {trained: Boolean, skillFocus: Number},
	persuasion: {trained: Boolean, skillFocus: Number},
	pilot: {trained: Boolean, skillFocus: Number},
	ride: {trained: Boolean, skillFocus: Number},
	stealth: {trained: Boolean, skillFocus: Number},
	survival: {trained: Boolean, skillFocus: Number},
	treatInjury: {trained: Boolean, skillFocus: Number},
	useComputer: {trained: Boolean, skillFocus: Number},
	useTheForce: {trained: Boolean, skillFocus: Number},
})

const characterSchema = new mongoose.Schema({
    name: String,
    pronouns: String,
    species: String,
    age: Number,
    height: String,
    weight: String,
    playerName: String,
    class: [classLvlSchema],
    hp: {
        max: Number, 
        current: Number
    },
    abilities: c_abilitiesSchema,
    forcePoints: Number,
    destinyPoints: Number,
    skills: skillsSchema,
    feats: [{name: String}],
    talents: [{name:String}],
    forcePowers: [{name:String}],
})

module.exports = mongoose.model("Character", characterSchema);