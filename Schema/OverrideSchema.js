const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    Authorization: { type: String, require: true, unique: true },
    Allowed: { type: String, require: true },
    
})

module.exports = mongoose.model('Override', Schema)