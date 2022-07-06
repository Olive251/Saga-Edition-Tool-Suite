const Character = require('./schemas/character.js');
const Rules_ForcePower = require('./schemas/forcePower.js')
const Rules_Species = require('./schemas/species.js');

const mongoose = require("mongoose");

async function buildSampleCharacters() {
    mongoose.connect(
        "mongodb://localhost/SEcharacters",
        () => { console.log("connected to database...\nbuilding sample character..."); },
        (err) => console.error(err)
    )

    if ((await Rules_Species.find({name: "Zabrack"}))){
        const zabrack = await Rules_Species.create({
            name: "Zabrack",
            size: "MEDIUM",
            movement: 6,
            additionalTraits: [
                {name: "Heightened Awareness", description: "Having strong survival instincts and quic reactions, a Zabrack may choose to reroll any Perception check, but the result of the reroll must be accepted, even if it is worse."},
                {name: "Superior Defenses", description: "Adapted to a very tough and trying environment, Zabrack gain a +1 species bonus to all of their defenses."},
            ],
        });
        await zabrack.save();
    }
    let zabrackId = await Rules_Species.find({name: "Zabrack"}).lean();
    try  {zabrackId = zabrackId[0]._id;}
    catch (err){ console.log(`${err}`)};
    console.log(zabrackId);

    
    if ((await Rules_ForcePower.find({name: "Move Object"}))){
        const moveObject = await Rules_ForcePower.create({
            name: "Move Object",
            descriptorTag: "Telekinetic",
            targets: "One character or object within 12 squares, and within line of sight.",
            initiator: "Make a Use the Force check. The result of the check determines the maximum size of the target you can lift. If the target is a creature that resists your attempt, your Use the Force check must also exceed the target's Will Defense.\nYou can hurl the target at (or drop it on) another target in range if your Use the Force check exceeds the second target's Reflex Defense. Both targets take the damaged determined by your Use the Force check result.",
            forceCheckTable: [
                {dc: 15, effect: "Can move object up to Medium size (Deals 2d6 points of damage)."},
                {dc: 20, effect: "Can move object up to Large size (Deals 4d6 points of damage)."},
                {dc: 25, effect: "Can move object up to Huge size (Deals 6d6 points of damage)."},
                {dc: 30, effect: "Can move object up to Gargantuan size (Deals 8d6 points of damage)."},
                {dc: 35, effect: "Can move object up to Collosal size (Deals 10d6 points of damage)."},
            ],
            special: "You may maintain your concentration on the targeted object to continue to move it from round to round. Maintaining the Move Object power is a Standard Action, and you must make a new Use the Force check each round.\nIf you suffer damage while maintaining Move Object, you must succeed on a Use the Force check (DC= 15 + damage taken) to continue concentrating. If you deal damage with the Move Object power, you cease to be able to maintain it.\nIf you use Move Object against a hovering or flying target (such as a speeder or starship), the target can oppose your Use the Force check with a Grapple check as a Reaction. If the target wins the opposed check, you are unable to move the target.\nYou may spend a Force Point to increase the maximum size of the object by one category and deal an additional 2d6 points of damage (maximum size Colossal (Frigate), 12d6 damage). Alternatively, you may spend a Destiny Point to increase the maximum size of an object by three categories and deal an additional 6d6 points of damage (maximum size Colossal (Station), 16d6 damage).",
        })
        await moveObject.save();
    }
    let moveObjectId = await Rules_ForcePower.find({name: "Move Object"}).lean();
    moveObjectId = moveObjectId[0]._id;    

    if ((await Character.find({name: "Imia Brae"})))
    {
        try {
            // const character = await Character.create(
            const character = await Character.updateOne({_id: "62c59ead4e2dc9f907d8a27c"}, 
            {
                name: "Imia Brae",
                pronouns: "she/her",
                species: {name: "Zabrack", speciesRules: zabrackId},
                age: 25,
                height: "6ft",
                weight: 155,
                playerName: "Olivia",
                class: {class: "Soldier", level: 5},
                hp: {max: 80, current: 80, conditionTrack: 1},
                abilities: {
                    strength: {score: 14,},
                    dexterity: {score: 16,},
                    constitution: {score: 15,},
                    intelligence: {score: 10,},
                    wisdom: {score: 16,},
                    charisma: {score: 18,},
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
                    fortitude: {total: 17,},
                    reflex: {total: 19,},
                    will: {total: 16,},
                },
                feats: [{name: "Force Sensitivity"}, {name: "Force Training"}, {name: "Quick Draw"}, {name: "Dual Wielding 1"},],
                talents: [{name: "Jet Pack Training"}, {name: "Improved Trajectory"}, {name: "Burning Assault"},],
                forcePowers: [{name: "Move Object", forcePower: moveObjectId}],
            });
            
            let newCharacter = await Character.find({name: "Imia Brae"})
            console.log( newCharacter[0]);
    
        } catch (err) { console.log(err.message) };
    }
    

    mongoose.connection.close(()=> {
        console.log("Disconnected from database...");
    });
    
}

module.exports = {buildSampleCharacters};