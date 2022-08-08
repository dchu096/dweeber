const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    guildID: { type: String, require: true },
    warnings: { type: Number, default: 0 },
    kicked: { type: Number, default: 0 },
    banned: { type: Number, default: 0 },
})

module.exports = mongoose.model('Moderation', Schema)