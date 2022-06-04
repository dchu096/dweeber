require('module-alias/register')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('@root/botconfig.json');
const fs = require('fs');
const {Signale} = require('signale');
module.exports = {
    config: {
        name: "deploy",
        description: "Deploy slash commands",
        usage: "",
        category: "owner",
        accessableby: "BotDev",
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        try {

        
            const clientId = "978434521412272148";
            const guildId = message.guild.id;
            
            const commands = [];
            
            const rest = new REST({ version: '9' }).setToken(token);
            
            rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
                .then(() => message.channel.send('Successfully registered application commands.'))
      

    } catch (err) {
        signale.error(err);
    }

    }

}








