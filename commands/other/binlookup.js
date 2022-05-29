require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { BinCheckerAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "binlookup",
        description: "Fetch bank informations",
        usage: "./bin <first_6_digit_of_card>",
        category: "other",
        accessableby: "Members",
        aliases: ["bin"]
    },
    run: async (bot, message, args) => {

        if(!args[0]) {
            message.channel.send("No IP defined")
        }

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`https://api.apilayer.com/bincheck/${args[0]}?apikey=${BinCheckerAPI}`).then(res => res.json()).then(json => {
            
            const binEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Bin: ${json.bin}`)
            .setDescription(`Bank info for ${json.bin}`)
            .addField(`Bank Name:`, `${json.bank_name}`)
            .addField(`Bank URL:`,`${json.url}`, true)
            .addField(`Country:`,`${json.country}`)
            .addField(`type`,`${json.type}`, true)
            .addField(`scheme`,`${json.scheme}`, true)
            .setFooter({ text: 'Dweeber >> Binlookup'});


        message.channel.send({ embeds: [binEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
