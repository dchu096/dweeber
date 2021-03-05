const {Client, Collection } = require("discord.js");
const Discord = require('discord.js');
const { token } = require("./botconfig.json");
const bot = new Discord.Client(); // Create the bot client.

const config = require('./botconfig.json');
const fs = require('fs');

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));


bot.on('guildMemberAdd', async member => {

    let wChan = bot.channels.cache.get('617994627810721824')

    if(wChan == null) return;

    if(!wChan) return;

    let welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`welcome ${member.user.tag} to MEmu Discord!`)
        .setDescription("Welcome to the MEmu community!")
        .addField("Rules:", "We setup a server rules at <#790489245193732127> to maintain behaviour in server, please read so you dont break them!", false)
        .addField("Roles:", " A lot of channels in this server requires a role to be assigned. get to <#786798319992307763> to get yourself some!", false)
        .addField("channels:", "channels have been setup to help easier. so please do post in the correct channels so we can troubleshoot faster!", false)
        .setFooter("As long as you follow, then welcome!")

        try {
            wChan.send(welcomeEmbed) //Send the image to the channel
        } catch (e) {
           console.log(e)
        }
    })





bot.login(token);
