require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { trackerAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "fortnite",
        description: "Fetch fortnite stats from a user",
        usage: "",
        category: "other",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        const platform = args[0];
        const region = args[1];
        const epic = args[2];

        await fetch(`https://api.fortnitetracker.com/v1/powerrankings/${platform}/${region}/${epic}?TRN-Api-Key=${trackerAPI}`).then(res => res.json()).then(json => {
            
            const apodEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Fortnite status`)
            .setDescription(`Fortnite stats for ${json.users}`)
            .setFooter({ text: 'Dweeber >> fortnite'});


        message.channel.send({ embeds: [apodEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
