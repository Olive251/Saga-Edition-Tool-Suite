const mongoose = require("mongoose");

const Character_Abilities = new mongoose.Schema({
    strength: {score: Number, bonus: Number},
    dexterity: {score: Number, bonus: Number},
    constitution: {score: Number, bonus: Number},
    intelligence: {score: Number, bonus: Number},
    wisdom: {score: Number, bonus: Number},
    charisma: {score: Number, bonus: Number},
})

const Character_ClassLvl = new mongoose.Schema({
    className: String,
    level: Number,
    classRules: {type: mongoose.Schema.Types.ObjectId, ref: 'Rules_Class'},
})

const Character_Feat = new mongoose.Schema({
    feat: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Feat'}
})

const Character_Talent = new mongoose.Schema({
    talent: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Talent'}
})

const Character_ForcePower = new mongoose.Schema({
    name: String,
})

const Character_Defenses = new mongoose.Schema({
    fortitude: {total: Number, lvlArmorBonus: Number, classBonus: Number, abilityModifer: Number, miscModifier: Number,},
    reflex: {total: Number, lvlArmorBonus: Number, classBonus: Number, abilityModifer: Number, miscModifier: Number,},
    will: {total: Number, lvlArmorBonus: Number, classBonus: Number, abilityModifer: Number, miscModifier: Number,},
})

const Character_Skills = new mongoose.Schema({
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

const Character = new mongoose.Schema({
    name: String,
    pronouns: String,
    species: String,
    age: Number,
    height: String,
    weight: String,
    playerName: String,
    class: [Character_ClassLvl],
    hp: {
        max: Number, 
        current: Number,
        conditionTrack: Number,
    },
    abilities: Character_Abilities,
    defenses: Character_Defenses,
    forcePoints: Number,
    destinyPoints: Number,
    darksidePoints: Number,
    skills: Character_Skills,
    feats: [Character_Feat],
    talents: [Character_Talent],
    forcePowers: [Character_ForcePower],
})

module.exports = mongoose.model("Character", characterSchema);