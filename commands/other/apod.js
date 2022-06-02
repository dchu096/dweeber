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
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NasaAPI}`).then(res => res.json()).then(json => {
            
            const apodEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Astronomy Picture of the Day`)
            .setDescription(`Copyright ${json.copyright} @ ${json.date}`)
            .addField(`Explanation`, trim(`${json.explanation}`, 1024))
            .setImage(`${json.url}`)
            .setFooter({ text: 'Dweeber >> APOD'});


        message.channel.send({ embeds: [apodEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
