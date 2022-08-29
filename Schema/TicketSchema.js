const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: {
        type: String
    },
    Buttons: [String],
    Description: {
        type: String
    },
    Channel: {
        type: String
    }
})

module.exports = mongoose.model('ticketSetup', Schema)