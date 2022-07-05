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
    class: String,
    level: Number,
    classRules: {type: mongoose.Schema.Types.ObjectId, ref: 'Rules_Class'},
})

const Character_Feat = new mongoose.Schema({
    name: String,
    feat: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Feat'}
})

const Character_Talent = new mongoose.Schema({
    name: String,
    talent: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Talent'}
})

const Character_ForcePower = new mongoose.Schema({
    name: String,
    forcePower: {type: mongoose.Schema.Types.ObjectId, ref: 'Rules_ForcePower'}
})

const Character_Defenses = new mongoose.Schema({
    fortitude: {total: Number, lvlArmorBonus: Number, classBonus: Number, abilityModifer: Number, miscModifier: Number,},
    reflex: {total: Number, lvlArmorBonus: Number, classBonus: Number, abilityModifer: Number, miscModifier: Number,},
    will: {total: Number, lvlArmorBonus: Number, classBonus: Number, abilityModifer: Number, miscModifier: Number,},
})

const Character_Skills = new mongoose.Schema({
    acrobatics: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	athletics: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	deception: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	gatherInfo: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	initiative: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	knowledge: [{type: String, trained: Boolean, skillFocus: Number}], 
	mechanics: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	perception: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	persuasion: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	pilot: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	ride: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	stealth: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	survival: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	treatInjury: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	useComputer: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	useTheForce: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
})

const Character = new mongoose.Schema({
    name: String,
    pronouns: String,
    species: {_id: false, name: String, speciesRules: {_id: false, type: mongoose.Schema.Types.ObjectId, ref:'Rules_Species'}},
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

module.exports = mongoose.model("Character", Character);