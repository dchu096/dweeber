const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    guildID: { type: String, require: true },
    kicks: { type: Number, default: 0 },
    bans: { type: Number, default: 0 },
    warns: { type: Number, default: 0 },
    warnings: { type: Number, default: 0 },
    kicked: { type: Number, default: 0 },
    banned: { type: Number, default: 0 },
})

module.exports = mongoose.model('Moderation', Schema)