const mongoose = require("mongoose");

const Rules_Bonus = new mongoose.Schema({
    _id: false,
    target: String, //  target path of the mongoose schema character trait
    bonus: Number,
})

module.exports = mongoose.model("Rules_Bonus", Rules_Bonus);