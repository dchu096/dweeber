const { Client, Intents, Collection } = require("discord.js");
const Discord = require("discord.js");
const { token } = require("./botconfig.json");
const { fs } = require("fs")
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,  Intents.FLAGS.GUILD_PRESENCES]
  });

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);