const Character = require('./schemas/character.js');

const mongoose = require("mongoose");



async function buildSampleCharacters() {
    mongoose.connect(
        "mongodb://localhost/SEcharacters",
        () => { console.log("connected to database..."); },
        (err) => console.error(err)
    )

    await Character.remove({name:"Imia Brae"});
    try {
        const character = await Character.create({
            name: "Imia Brae",
            pronouns: "she/her",
            species: "Zabrack",
            age: 25,
            height: "6ft",
            weight: 155,
            playerName: "Olivia",
            class: {class: "Soldier", level: 5},
            hp: {max: 80, current: 80, conditionTrack: 1},
            abilities: {
                strength: {score: 14, bonus: 2},
                dexterity: {score: 16, bonus: 3},
                constitution: {score: 15, bonus: 2},
                intelligence: {score: 10, bonus: 0},
                wisdom: {score: 16, bonus: 3},
                charisma: {score: 18, bonus: 4},
            },
            forcePoints: 7,
            destinyPoints: 1,
            darksidePoints: 2,
            skills: {
                acrobatics: {trained: false, skillFocus: 0},
                athletics: {trained: true, skillFocus: 0},
                deception: {trained: false, skillFocus: 0},
                gatherInfo: {trained: true, skillFocus: 0},
                initiative: {trained: false, skillFocus: 0}, 
                mechanics: {trained: false, skillFocus: 0},
                perception: {trained: false, skillFocus: 0},
                persuasion: {trained: true, skillFocus: 0},
                pilot: {trained: false, skillFocus: 0},
                ride: {trained: false, skillFocus: 0},
                stealth: {trained: false, skillFocus: 0},
                survival: {trained: false, skillFocus: 0},
                treatInjury: {trained: false, skillFocus: 0},
                useComputer: {trained: false, skillFocus: 0},
                useTheForce: {trained: true, skillFocus: 1}
            },
            defenses: {
                fortitude: {total: 17, lvlArmorBonus: 2, classBonus: 2, abilityModifer: 2, miscModifier: 1,},
                reflex: {total: 19, lvlArmorBonus: 4, classBonus: 1, abilityModifer: 3, miscModifier: 1,},
                will: {total: 16, lvlArmorBonus: 2, classBonus: 0, abilityModifer: 3, miscModifier: 1,},
            },
            feats: [{name: "Force Sensitivity"}, {name: "Force Training"}, {name: "Quick Draw"}, {name: "Dual Wielding 1"},],
            talents: [{name: "Jet Pack Training"}, {name: "Improved Trajectory"}, {name: "Burning Assault"},],
            forcePowers: [{name: "Dark Rage"}, {name: "Move Object"}, {name: "Farseeing"}, {name: "Negate Energy"},],
        });

        await  character.save();

    } catch (err) { console.log(err.message) };

    mongoose.connection.close(()=> {
        console.log("Disconnected from database...");
    });
    
}

module.exports = {buildSampleCharacters};