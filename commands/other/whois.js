require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { WhoisAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "whois",
        description: "Look up details on a domain",
        usage: "<domain>",
        category: "other",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        if(!args[0]) {
            message.channel.send("No domain found in your message")
        }

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`https://api.apilayer.com/whois/check?domain=${args[0]}&apikey=${WhoisAPI}`).then(res => res.json()).then(json => {
            
            const whoisEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Registeration status for ${args[0]}`)
            .setDescription(`${json.result}`)
            .setFooter({ text: 'Dweeber >> Whois'});


        message.channel.send({ embeds: [whoisEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
