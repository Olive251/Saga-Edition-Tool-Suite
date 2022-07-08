const mongoose = require('mongoose');
const Rules_Bonus = require('./bonus');

const Rules_Equipment = new mongoose.Schema({
    name: String,
    weight: Number,
    cost: Number,
    description: String,
})

const Rules_EquipmentAvailability = new mongoose.Schema({
    availability: {_id: false, type: String, enum:["RESTRICTED", "LICENSED", "MILITARY", "ILLEGAL", "RARE", "OPEN"]},
})

const Rules_Equipment_Weapon = new mongoose.Schema({
    item: Rules_Equipment,
    size: {type: String, enum: ["SMALL", "MEDIUM", "LARGE", "HUGE"]},
    damage: String,
    hasStun: Boolean,
    rateOfFire: {semi: Boolean, auto: Boolean},
    damageType: [String],
    availability: Rules_EquipmentAvailability,
})

const Rules_Equipment_Armor = new mongoose.Schema({
    item: Rules_Equipment,
    category: [{type: String, enum:["LIGHT", "MEDIUM", "HEAVY"]}],
    armorBonus: Number,
    equipmentBonus: Number,
    maxDexBonus: Number,
    availability: Rules_EquipmentAvailability,
})