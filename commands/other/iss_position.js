require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
module.exports = {
    config: {
        name: "iss_position",
        description: "Find where the international space station is",
        usage: "",
        category: "other",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`http://api.open-notify.org/iss-now.json`).then(res => res.json()).then(json => {
            
            const issEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`ISS Position`)
            .setDescription(`${json.latitude}`, `${json.longitude}`)
            .setFooter({ text: 'Dweeber >> iss_position'});


        message.channel.send({ embeds: [issEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
