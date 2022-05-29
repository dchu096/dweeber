require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { IpStackAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "ip",
        description: "Fetch Ip informations",
        usage: "./ip <IP>",
        category: "other",
        accessableby: "Members",
        aliases: ["iplookup"]
    },
    run: async (bot, message, args) => {

        if(!args[0]) {
            message.channel.send("No IP defined")
        }

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`http://api.ipstack.com/${args[0]}?access_key=${IpStackAPI}&format=1`).then(res => res.json()).then(json => {
            
            const colorEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`IP: ${json.ip}`)
            .setDescription(`IP info for ${json.ip}`)
            .addField(`IP:`, `${json.ip}`)
            .addField(`Type:`,`${json.type}`)
            .addField(`continent code:`,`${json.continent_code}`, true)
            .addField(`continent name`,`${json.continent_name}`, true)
            .addField(`country code`,`${json.country_code}`, true)
            .addField(`country name`,`${json.country_name}`, true)
            .addField(`region code`,`${json.region_code}`, true)
            .addField(`region name`,`${json.region_name}`, true)
            .addField(`City`,`${json.city}`, true)
            .addField(`Spoken Language`,`${json.languages.native}`, true)
            .addField(`Spoken Language Code`,`${json.languages.code}`, true)
            .addField(`Capital`,`${json.location.capital}`, true)
            .addField(`ZIP code`,`${json.zip}`, true)
            .addField(`Calling code`,`${json.calling_code}`, true)
            .addField(`Latitude`,`${json.latitude}`, true)
            .addField(`Longitude`,`${json.longitude}`, true)
            .setThumbnail(json.country_flag)
            .setFooter({ text: 'Dweeber >> IPlookup'});


        message.channel.send({ embeds: [colorEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
