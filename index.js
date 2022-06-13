const { Client, Collection } = require('discord.js');
const { TOKEN, MONGOURL } = require("./config.json");
const client = new Client({intents: 32767}); //Intents choose what you want as currently its everything, https://ziad87.net/intents/
const signale = require('signale');

//Database Connect

const { EconomyManager } = require("quick.eco");
const eco = new EconomyManager({
    adapter: 'sqlite' // => sqlite, mongo or mysql
});

client.eco = eco

client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json')

module.exports = client;

["Event", "Slash"].forEach(handler => {
  require(`./Structures/${handler}`)(client);
});


client.once("ready", () => {
  console.log(`====================================================================================`)
  console.log(`    :::::::::  :::       ::: :::::::::: :::::::::: :::::::::  :::::::::: :::::::::  `)
  console.log(`    :+:    :+: :+:       :+: :+:        :+:        :+:    :+: :+:        :+:    :+: `)
  console.log(`   +:+    +:+ +:+       +:+ +:+        +:+        +:+    +:+ +:+        +:+    +:+  `)
  console.log(`  +#+    +:+ +#+  +:+  +#+ +#++:++#   +#++:++#   +#++:++#+  +#++:++#   +#++:++#:    `)
  console.log(` +#+    +#+ +#+ +#+#+ +#+ +#+        +#+        +#+    +#+ +#+        +#+    +#+    `)
  console.log(`#+#    #+#  #+#+# #+#+#  #+#        #+#        #+#    #+# #+#        #+#    #+#     `)
  console.log(`#########    ###   ###   ########## ########## #########  ########## ###    ###     `)
  console.log(`====================================================================================`)

  signale.pending(`Authenticating with Discord gateway, please wait`)

  signale.success(`${client.user.username} is online, if theres any error message it will be below this message`)

  console.log(`Current stats: ${client.users.cache.size} users and ${client.guilds.cache.size} servers.`);

  console.log(`====================================================================================`)

    client.user.setActivity(`V2 | dweeber.dev`, { type: "WATCHING"}) //Set the activity of the bot
});

process.on('unhandledRejection', err => {
  signale.fatal(`[ERROR] Unhandled promise rejection: ${err.message}.`);
    console.log(err)
  });
  
  client.login(TOKEN);
  