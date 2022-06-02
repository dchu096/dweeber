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
        aliases: ["weatherlookup"]
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB';
        const signale = new Signale();

        if(!args[0]) {
            message.channel.send("No location found in your message")
        }

        try {
        await fetch(`https://api.weatherapi.com/v1/current.json?key=${WeatherAPI}&q=${args[0]}&aqi=yes`).then(res => res.json()).then(json => {
            const weatherEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Weather info: ${json.location.name}`)
            .setDescription(`Weather info for ${json.location.name}`)
            .addField(`Name`, `${json.location.name}`)
            .addField(`Region`,`${json.location.region}` || `No region found`)
            .addField(`Country`,`${json.location.country}`)
            .addField(`lat | lon`,`${json.location.lat} | ${json.location.lon}`)
            .addField(`Timezone`,`${json.location.tz_id}`, true)
            .addField(`Localtime (Epoch)`, `${json.location.localtime_epoch}`, true)
            .addField(`Localtime`, `${json.location.localtime}`, true)
            .addField(`Temperature`, `${json.current.temp_c}°C | ${json.current.temp_f}°F`, true)
            .addField(`Condition:`, `${json.current.condition.text}`, true)
            .addField(`Wind (Kph) | (Mph)`, `${json.current.wind_kph} | ${json.current.wind_mph}`, true)
            .addField(`Wind (Degrees)`, `${json.current.wind_degree}`, true)
            .addField(`Wind (Direction)`, `${json.current.wind_dir}`, true)
            .addField(`Pressure (MB) | (IN)`, `${json.current.pressure_mb} | ${json.current.pressure_in}`, true)
            .addField(`Precip (MM) | (IN)`, `${json.current.precip_mm} | ${json.current.precip_in}`, true)
            .addField(`Humidity`, `${json.current.humidity}`, true)
            .addField(`Cloud`, `${json.current.cloud}`, true)
            .addField(`Feelslike (C) | (F)`, `${json.current.feelslike_c} | ${json.current.feelslike_f}`, true)
            .addField(`Visuability (KM) | (MI)`, `${json.current.vis_km} | ${json.current.vis_miles}`, true)
            .addField(`UV`, `${json.current.uv}`, true)
            .addField(`Gust (KPH) | (MPH)`, `${json.current.gust_kph} | ${json.current.gust_mph}`, true)
            .addField(`Air quality (CO)`, `${json.current.air_quality.co}`, true)
            .addField(`Air quality (O3)`, `${json.current.air_quality.o3}`, true)
            .addField(`Air quality (NO2)`, `${json.current.air_quality.no2}`, true)
            .addField(`Air quality (SO2)`, `${json.current.air_quality.so2}`, true)
            .addField(`Air quality (PM25)`, `${json.current.air_quality.pm2_5}`, true)
            .addField(`Air quality (PM10)`, `${json.current.air_quality.pm10}`, true)
            .setThumbnail(`https:${json.current.condition.icon}`)
            .setFooter({ text: 'Dweeber >> Weather'})
            message.channel.send({ embeds: [weatherEmbed] });
            })
            } catch(err) {
                signale.error(err)
                message.channel.send("Something went wrong. Please try again later")
            }    
           
        }
       

    }
