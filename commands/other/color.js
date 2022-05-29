const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
module.exports = {
    config: {
        name: "color",
        description: "Fetch a color from hex",
        usage: " ",
        category: "other",
        accessableby: "Members",
        aliases: ["colors", "colour"]
    },
    run: async (bot, message, args) => {

        if(!args[0]) {
            message.channel.send("No color defined")
        }

        const signale = new Signale();

        await fetch(`https://api.popcat.xyz/color/${args[0].includes("#") ? args[0].split("#")[1] : args[0] }`).then(res => res.json()).then(json => {
            
            const colorEmbed = new Discord.MessageEmbed()
            .setColor(`${json.hex}`)
            .setTitle(`Color: ${json.name}`)
            .setDescription(`Color info for ${json.name}`)
            .addField(`Name`, `${json.name}`)
            .addField(`Hex code`,`${json.hex}`)
            .addField(`RGB`,`${json.rgb}`)
            .addField(`brightened`,`${json.brightened}`)
            .setThumbnail(json.color_image)
            .setFooter({ text: 'Dweeber >> Color'});


        message.channel.send({ embeds: [colorEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
