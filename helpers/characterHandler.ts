const mongoose = require("mongoose");
import {Schema, Types} from 'mongoose';
const Character = require('./schemas/character.js');
const Rules_Class = require('./schemas/class.js');
const Rules_Skills = require('./schemas/skills.js');
const Rules_ForcePower = require('./schemas/forcePower.js')
const Rules_Species = require('./schemas/species.js');

//todo
//create a way communicate bonuses through the various bits



class Bonus {
    target: string; //  path to character trait that will receive the bonus
    bonus: number; //   positive or negative bonus to the target trait
}

class CS_Skills_Rules {

}

class CS_ForcePowers_Rules {

}

class CS_Species_Rules {

}

class CS_Feats_Rules {

}

class CS_Talents_Rules {

}

class Character_Info {
    name: string;
    pronouns: string;
    age: number;
    height: string;
    weight: string;
    playerName: string;
    forcePoints: number;
    destinyPoints: number;
    darkSideScore: number;
    species: {
        name: string;
        movement: number;
        size: string;
        rulesId: Types.ObjectId;
    };
    class: {
        className: string;
        level: number;
        rulesId: Types.ObjectId;
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
        persuasion: {bonus: number, rulesId: Types.ObjectId};
        pilot: {bonus: number, rulesId: Types.ObjectId};
        ride: {bonus: number, rulesId: Types.ObjectId};
        stealth: {bonus: number, rulesId: Types.ObjectId};
        survival: {bonus: number, rulesId: Types.ObjectId};
        treatInjury: {bonus: number, rulesId: Types.ObjectId};
        useComputer: {bonus: number, rulesId: Types.ObjectId};
        useTheForce: {bonus: number, rulesId: Types.ObjectId};
    };
    feats: [{
        name: string, 
        bonus: [Bonus], 
        rulesID: Types.ObjectId
    }];
    talents: [{
        //  TODO change to include rules info for tooltips
        //  keep the objectid for the purpose of creating hyperlinks to the items full info
        name: string,
        bonus: [Bonus],
        rulesID: Types.ObjectId
    }];
    weapons: [{
        name: string,
        baseDamage: string,
    }];

    constructor(rawCharacter, rawCharacterSpecies, rawCharacterClass) {
        this.name = rawCharacter.name;
        this.pronouns = rawCharacter.pronouns;
        this.age = rawCharacter.age;
        this.height = rawCharacter.height;
        this.weight = rawCharacter.weight;
        this.playerName = rawCharacter.playerName;

        this.species.name = rawCharacterSpecies.name;
        this.species.movement = rawCharacterSpecies.movement;
        this.species.movement = rawCharacterSpecies.size;
        
        this.class.className = rawCharacter.class.className;
        this.class.level = rawCharacter.class.level;
        this.class.rulesId = rawCharacter.class.classRules;

        

        this.skillHandler(rawCharacter.skills.acrobatics, this.skills.acrobatics);
        this.skillHandler(rawCharacter.skills.athletics, this.skills.athletics);
        this.skillHandler(rawCharacter.skills.deception, this.skills.deception);
        this.skillHandler(rawCharacter.skills.gatherInfo, this.skills.gatherInfo);
        this.skillHandler(rawCharacter.skills.initiative, this.skills.initiative);
        rawCharacter.skills.knowledge.forEach(knowledge => {
            var i:number = 0;

            this.skillHandler(knowledge, this.skills.knowledge[i]);
            i++
        });
        this.skillHandler(rawCharacter.skills.mechanics, this.skills.mechanics);
        this.skillHandler(rawCharacter.skills.perception, this.skills.perception);
        this.skillHandler(rawCharacter.skills.persuasion, this.skills.persuasion);
        this.skillHandler(rawCharacter.skills.pilot, this.skills.pilot);
        this.skillHandler(rawCharacter.skills.ride, this.skills.ride);
        this.skillHandler(rawCharacter.skills.stealth, this.skills.stealth);
        this.skillHandler(rawCharacter.skills.survival, this.skills.survival);
        this.skillHandler(rawCharacter.skills.treatInjury, this.skills.treatInjury);
        this.skillHandler(rawCharacter.skills.useComputer, this.skills.useTheForce);
        this.skillHandler(rawCharacter.skills.useTheForce, this.skills.useTheForce);

    }

    abilityHandler(sourceAbility, destAbility)
    {
        destAbility.score = sourceAbility.score;
        
        destAbility.bonus = (Math.floor((destAbility.score -10)/2));
    }

    skillHandler(sourceSkill, destSkill) {
        
        if (sourceSkill.trained === true)
        {    destSkill.bonus += 5;    }
        destSkill.bonus += (sourceSkill.skillFocus * 5);

        if (sourceSkill.type)
        {
            destSkill.type = sourceSkill.type;
        }
        
        destSkill.rulesId = sourceSkill.skillRules;
    }
}

class View_Info {
    m_character: Character_Info;

    constructor(character_id:Types.ObjectId) {

        mongoose.connect(
            "mongodb://localhost/SEcharacters",
            () => { console.log("connected to database..."); },
            (err) => console.error(err)
        );

        var rawCharacter:any;
        var rawCharacterClass:any;
        var rawCharacterSpecies:any;
        var rawForcePowers:any = [];

        async(character_id) => {
            rawCharacter = await Character.findById(character_id).lean();
            rawCharacterClass = await Rules_Class.findById(rawCharacter.class.classRules).lean();
            rawCharacterSpecies = await Rules_Species.findById(rawCharacter.species.speciesRules).lean();

            var rawCharacterForcePowers:any = [];
            //gathering full details of the force powers the character has
            rawCharacter.forcePowers.forEach( async fp => {
            let rawfp = await Rules_ForcePower.findById(fp.forcePowerRules).lean();
            rawCharacterForcePowers.push(rawfp);
            });

            var rawSkills:any = [];
            rawCharacter.skills.forEach(async skill => {
                let rawSkill = await Rules_Skills.findById(skill.skillRules).lean();
                rawSkills.push(rawSkill);
            })
        }

        


        mongoose.connection.close(()=> {
            console.log("Disconnected from database...");
        });
    }
}

const characterHandler = async(characterId) => {

    let viewInfo:View_Info = new View_Info(characterId);

    

}


module.exports = {characterHandler}