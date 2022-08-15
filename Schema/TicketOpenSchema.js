const mongoose = require("mongoose");

const ticketsSchema = new mongoose.Schema({
    guildID: String,
    authorID: String,
    reason: String,
    channelID: String
})

module.exports = mongoose.model("tickets", ticketsSchema);