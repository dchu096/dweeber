const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    coins: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    bankLimit: { type: Number, default: 0},
})

module.exports = mongoose.model('Economy', Schema)