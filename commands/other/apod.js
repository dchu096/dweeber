require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { NasaAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "apod",
        description: "Show a Astronomy Picture of the Day",
        usage: "",
        category: "other",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`https://api.nasa.gov/planetary/apod?api_key=awE2rRMkdMHmxkkbTSJYffwoCotin5w2nhBaQaor`).then(res => res.json()).then(json => {
            
            const apodEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`APOD`)
            .setDescription(`Copyright ${json.copyright} @ ${json.date}`)
            .addField(`Explanation`, `${json.explanation}`)
            .setImage(`${json.url}`)
            .setFooter({ text: 'Dweeber >> APOD'});


        message.channel.send({ embeds: [apodEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
