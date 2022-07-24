const mongoose = require("mongoose");

const Character_Abilities = new mongoose.Schema({
    _id: false,
    strength: {score: Number},
    dexterity: {score: Number},
    constitution: {score: Number},
    intelligence: {score: Number},
    wisdom: {score: Number},
    charisma: {score: Number},
})

const Character_ClassLvl = new mongoose.Schema({
    _id: false,
    className: String,
    level: Number,
    classRules: {type: mongoose.Schema.Types.ObjectId, ref: 'Rules_Class'},
})

const Character_Feat = new mongoose.Schema({
    _id: false,
    name: String,
    feat: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Feat'}
})

const Character_Talent = new mongoose.Schema({
    _id: false,
    name: String,
    talent: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Talent'}
})

const Character_ForcePower = new mongoose.Schema({
    _id: false,
    name: String,
    forcePowerRules: {type: mongoose.Schema.Types.ObjectId, ref: 'Rules_ForcePower'}
})

const Character_Defenses = new mongoose.Schema({
    _id: false,
    fortitude: Number,
    reflex: Number,
    will: Number,
})

const Character_Skills = new mongoose.Schema({
    //MODIFIED FROM ORIGINAL SE RULESET
    //  house rules to make fewer skills for the sake of increasing individual character utility
    _id: false,
    acrobatics: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	athletics: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	deception: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	gatherInfo: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	initiative: {trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}},
	knowledge: [{type: String, trained: Boolean, skillFocus: Number, skillRules: {type: mongoose.Schema.Types.ObjectId, ref:'Rules_Skill'}}], 
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
    species: {_id: false, name: String, speciesRules: 
        {_id: false, type: mongoose.Schema.Types.ObjectId, ref:'Rules_Species'}
    },
    age: Number,
    height: String,
    weight: String,
    playerName: String,
    class: [Character_ClassLvl],
    hp: {
        //rolledNumber: Number,
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