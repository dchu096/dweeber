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

        await fetch(`https://api.weatherapi.com/v1/current.json?key=${WeatherAPI}&q=${args[0]}&aqi=yes`).then(res => res.json()).then(json => {
            const weatherEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Weather info: ${json.location.name}`)
            .setDescription(`Weather info for ${json.location.name}`)
            .addField(`Name`, `${json.location.name}`)
            .addField(`Region`,`${json.location.region}`)
            .addField(`Country`,`${json.location.country}`)
            .addField(`lat | lon`,`${json.location.lat} | ${json.location.lon}`)
            .addField(`Timezone`,`${json.location.tz_id}`, true)
            .addField(`Localtime (Epoch)`, `${json.location.localtime_epoch}`, true)
            .addField(`Localtime`, `${json.location.localtime}`, true)
            .addField(`Temperature C`, `${json.current.temp_c}°C`, true)
            .addField(`Temperature F`, `${json.current.temp_f}°F`, true)
            .addField(`Condition:`, `${json.current.condition.text}`, true)
            .addField(`Wind (Kph)`, `${json.current.wind_kph}`, true)
            .addField(`Wind (Mph)`, `${json.current.wind_mph}`, true)
            .addField(`Wind (Degrees)`, `${json.current.wind_degree}`, true)
            .addField(`Wind (Direction)`, `${json.current.wind_dir}`, true)
            .addField(`Pressure (MB)`, `${json.current.pressure_mb}`, true)
            .addField(`Pressure (IN)`, `${json.current.pressure_in}`, true)
            .addField(`Precip (MM)`, `${json.current.precip_mm}`, true)
            .addField(`Precip (IN)`, `${json.current.precip_in}`, true)
            .addField(`Humidity`, `${json.current.humidity}`, true)
            .addField(`Cloud`, `${json.current.cloud}`, true)
            .addField(`Feelslike (C)`, `${json.current.feelslike_c}`, true)
            .addField(`Feelslike (F)`, `${json.current.feelslike_f}`, true)
            .addField(`Visuability (KM)`, `${json.current.vis_km}`, true)
            .addField(`Visuability (MI)`, `${json.current.vis_miles}`, true)
            .addField(`UV`, `${json.current.uv}`, true)
            .addField(`Gust (MPH)`, `${json.current.gust_mph}`, true)
            .addField(`Gust (KPH)`, `${json.current.gust_kph}`, true)
            .addField(`Air quality (CO)`, `${json.current.air_quality.co}`, true)
            .addField(`Air quality (O3)`, `${json.current.air_quality.o3}`, true)
            .addField(`Air quality (NO2)`, `${json.current.air_quality.no2}`, true)
            .addField(`Air quality (SO2)`, `${json.current.air_quality.so2}`, true)
            .addField(`Air quality (PM25)`, `${json.current.air_quality.pm25}`, true)
            .addField(`Air quality (PM10)`, `${json.current.air_quality.pm10}`, true)
            .setThumbnail(`https:${json.current.condition.icon}`)
            .setFooter({ text: 'Dweeber >> weather'});

        message.channel.send({ embeds: [weatherEmbed] }).catch((err) => {
            signale.error(err)

        });
           
        });
       

    }

}
