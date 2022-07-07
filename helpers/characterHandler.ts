const mongoose = require("mongoose");
import {Schema, Types} from 'mongoose';
const Character = require('./schemas/character.js');
const Rules_Class = require('./schemas/class.js');
const Rules_Skills = require('./schemas/skills.js');
const Rules_ForcePower = require('./schemas/forcePower.js')
const Rules_Species = require('./schemas/species.js');

//todo
//create a way communicate bonuses through the various bits


namespace characterHandling {
    class Bonus {
        target: string; //  path to character trait that will receive the bonus
        bonus: number; //   positive or negative bonus to the target trait
    }

    class CharacterInfo {
        name: string;
        pronouns: string;
        age: number;
        height: string;
        weight: string;
        playerName: string;
        species: {
            name: string;
            movement: number;
            additionalTraits: {name: string, rulesId: Types.ObjectId, bonus: [Bonus],};
        };
        class: {
            className: string;
            level: number;
            rulesId: Types.ObjectId;
            bonus: [Bonus];
        };
        abilities: {
            strength: { score: number, bonus: number, };
            dexterity: { score: number, bonus: number, };
            constitution: { score: number, bonus: number, };
            intelligence: { score: number, bonus: number, };
            wisdom: { score: number, bonus: number, };
            charisma: { score: number, bonus: number, };
        };
        defenses: {
            fortitude: {total: number},
            reflex: {total: number},
            will: {total: number},
        };
        hp: {
            max: number,
            current: number,
            conditionTrack: number,
        };
        skills: {
            acrobatics: {bonus: number, rulesId: Types.ObjectId,};
            athletics: {bonus: number, rulesId: Types.ObjectId,};
            deception: {bonus: number, rulesId: Types.ObjectId,};
            gatherInfo: {bonus: number, rulesId: Types.ObjectId};
            initiative: {bonus: number, rulesId: Types.ObjectId};
            knowledge: [{type: string, bonus: number; rulesId: Types.ObjectId}];
            mechanics: {bonus: number, rulesId: Types.ObjectId};
            perception: {bonus: number, rulesId: Types.ObjectId};
            persuassion: {bonus: number, rulesId: Types.ObjectId};
            pilot: {bonus: number, rulesId: Types.ObjectId};
            ride: {bonus: number, rulesId: Types.ObjectId};
            stealth: {bonus: number, rulesId: Types.ObjectId};
            survival: {bonus: number, rulesId: Types.ObjectId};
            treatInjury: {bonus: number, rulesId: Types.ObjectId};
            useComputer: {bonus: number, rulesId: Types.ObjectId};
            useTheForce: {bonus: number, rulesId: Types.ObjectId};
        };
    }
}

const characterHandler = async(characterId) => {
    //TODO
    //turns the character from mongoose into a character for the CharacterSheet display

    mongoose.connect(
        "mongodb://localhost/SEcharacters",
        () => { console.log("connected to database..."); },
        (err) => console.error(err)
    );

    const rawCharacter = await Character.findById(characterId).lean();
    const rawCharacterClass = await Rules_Class.findById(rawCharacter.class.classRules).lean();
    const rawCharacterSpecies = await Rules_Species.findById(rawCharacter.species.speciesRules).lean();
    

    mongoose.connection.close(()=> {
        console.log("Disconnected from database...");
    });
}

module.exports = {characterHandler}