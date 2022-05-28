const { Client, Intents, Collection } = require("discord.js");
const Discord = require('discord.js');
const { token } = require("./botconfig.json");
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  });

const config = require('./botconfig.json');

const fs = require('fs');

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);

