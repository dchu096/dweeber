const {Client, Collection } = require("discord.js");
const Discord = require('discord.js');
const { token } = require("./botconfig.json");
const bot = new Discord.Client(); // Create the bot client.

const config = require('./botconfig.json');

const fs = require('fs');

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));


bot.on('message', message => { // When the bot receive a message
    client.onMessage(message)
});


bot.login(token);

