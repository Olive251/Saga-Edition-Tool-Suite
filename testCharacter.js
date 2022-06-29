const Character = require('./data/schemas/character.js');

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost/SEcharacters",
    () => {console.log("connected to database...")},
    (err) => console.error(err)
)


async function testCharacter() {

    await Character.remove({});
    try {
        const character = await Character.create({
            name: "Arma Thorden(Sample Character)",
            pronouns: "she/her",
            species: "human",
            age: 24,
            height: "tall",
            weight: 145,
            playerName: "Olivia",
            class: {class: "soldier", level: 5},
            hp: {max: 80, current: 80},
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
            skills: {
                acrobatics: {trained: false, skillFocus: 0},
                athletics: {trained: true, skillFocus: 0},
                deception: {trained: false, skillFocus: 0},
                gatherInfo: {trained: false, skillFocus: 0},
                initiative: {trained: false, skillFocus: 0}, 
                mechanics: {trained: false, skillFocus: 0},
                perception: {trained: false, skillFocus: 0},
                persuasion: {trained: false, skillFocus: 0},
                pilot: {trained: false, skillFocus: 0},
                ride: {trained: false, skillFocus: 0},
                stealth: {trained: false, skillFocus: 0},
                survival: {trained: false, skillFocus: 0},
                treatInjury: {trained: false, skillFocus: 0},
                useComputer: {trained: false, skillFocus: 0},
                useTheForce: {trained: true, skillFocus: 1}
            },
            feats: [{name: "Force Sensitivity"}, {name: "Force Training"}],
            talents: [{name: "Jet Pack Training"}, {name: "Improved Trajectory"}],
            forcePowers: [{name: "Dark Rage"}, {name: "Move Object"}],
            });

        // console.log(character.name);
        await  character.save();
        let retChar = await Character.find({}).limit(1).lean();
        //console.log(retChar);
        return retChar[0];
    } catch (err) { console.log(err.message) };
    
}

module.exports = {testCharacter};