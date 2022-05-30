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

        if(!args[0]) {
            message.channel.send("No location defined")
        }

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`http://api.weatherstack.com/current?access_key=${WeatherAPI}&query=${args[0]}`).then(res => res.json()).then(json => {
            
            const weatherEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Weather info for: ${json.name}`)
            .setDescription(`Weather info for ${json.name}`)
            .addField(`Type:`, `${json.type}`)
            .addField(`Country:`,`${json.country}`)
            .addField(`Lat:`,`${json.lat}`, true)
            .addField(`Lon`,`${json.lon}`, true)
            .addField(`Observation time`,`${json.observation_time}`, true)
            .addField(`temperature`,`${json.temperature}`, true)
            .addField(`Weather code`,`${json.weather_code}`, true)
            .addField(`Weather description`,`${json.weather_descriptions}`, true)
            .addField(`Wind speed`,`${json.wind_speed}`, true)
            .addField(`Wind degree`,`${json.wind_degree}`, true)
            .addField(`Wind dir`,`${json.wind_dir}`, true)
            .addField(`Pressure`,`${json.pressure}`, true)
            .addField(`Precip`,`${json.precip}`, true)
            .addField(`Humidity`,`${json.humidity}`, true)
            .addField(`Cloudcover`,`${json.cloudcover}`, true)
            .addField(`Feelslike`,`${json.feelslike}`, true)
            .addField(`UV index`,`${json.uv_index}`, true)
            .addField(`Visibility`,`${json.visibility}`, true)
            .setThumbnail(json.weather_icons)
            .setFooter({ text: 'Dweeber >> IPlookup'});


        message.channel.send({ embeds: [weatherEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
