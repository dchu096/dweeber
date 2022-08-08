const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Authorization: { type: String, require: true, unique: true },
    maxuse: { type: Number, default: 0 },
})

module.exports = mongoose.model('Override', Schema)