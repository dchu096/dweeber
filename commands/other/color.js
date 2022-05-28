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
        aliases: ["colors"]
    },
    run: async (bot, message, args) => {

        if(!args[0]) {
            message.channel.send("No color defined")
        }

        const embedColor = '#87CEEB'; // color: skyblue

        await fetch(`https://api.popcat.xyz/color/${args[0].includes("#") ? args[0].split("#")[1] : args[0] }`).then(res => res.json()).then(json => {
            
            const responseEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Color: ${json.name}`)
            .setDescription(`Color info for ${json.name}`)
            .addField(`Name`, `${json.name}`)
            .addField(`Hex code`,`${json.hex}`)
            .addField(`RGB`,`${json.rgb}`)
            .addField(`brightened`,`${json.brightened}`)
            .setImage(json.color_image)


        message.channel.send(responseEmbed).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
