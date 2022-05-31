require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
module.exports = {
    config: {
        name: "uslessfacts",
        description: "Show a useless fact",
        usage: "",
        category: "other",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`https://uselessfacts.jsph.pl/random.json`).then(res => res.json()).then(json => {
            
            const factsEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Useless fact #${id}`)
            .setDescription(`${text}`)
            .addField(`Source:`, `${source}`)
            .addField(`URL:`, `${source_url}`)
            .addField(`Language:`, `${language}`)
            .addField(`Permanent Link:`, `${permalink}`)
            .setFooter({ text: 'Dweeber >> uselessfacts'});


        message.channel.send({ embeds: [factsEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
