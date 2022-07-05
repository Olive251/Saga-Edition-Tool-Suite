const mongoose = require("mongoose");
import {Schema, Types} from 'mongoose';
const Character = require('./schemas/character.js');

namespace characterHandling {

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
    

    mongoose.connection.close(()=> {
        console.log("Disconnected from database...");
    });
}

module.exports = {characterHandler}