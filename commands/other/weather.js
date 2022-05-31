require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { WeatherAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "weather",
        description: "Fetch Ip informations",
        usage: "<location>",
        category: "other",
        accessableby: "Members",
        aliases: ["iplookup"]
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB';
        const signale = new Signale();

        if(!args[0]) {
            message.channel.send("No location found in your message")
        }

        await fetch(`https://api.weatherapi.com/v1/current.json?key=${WeatherAPI}&q=${args[0]}&aqi=yes`).then(res => res.json()).then(json => {
            
            const colorEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Weather info: ${json.name}`)
            .setDescription(`Weather info for ${json.name}`)
            .addField(`Name`, `${json.name}`)
            .addField(`Region`,`${json.region}`)
            .addField(`Country`,`${json.country}`)
            .addField(`lat | lon`,`${json.lat} | ${json.lon}`)
            .addField(`Timezone`,`${json.tz_id}`, true)
            .addField(`Localtime (Epoch)`, `${json.localtime_epoch}`, true)
            .addField(`Localtime`, `${json.localtime}`, true)
            .addField(`Temperature C`, `${json.temp_c}°C`, true)
            .addField(`Temperature F`, `${json.temp_f}°F`, true)
            .setThumbnail(json.icon)
            .setFooter({ text: 'Dweeber >> Color'});


        message.channel.send({ embeds: [colorEmbed] }).catch((err) => {
            signale.error(err)

        });
        });
       

    }

}
