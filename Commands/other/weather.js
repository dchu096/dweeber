require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { WeatherAPI } = require("@root/config.json");

module.exports = {
    name: "weather",
    description: "Look up the current weather of a location",
    options: [
        {
            name: "location",
            description: "The location to look up",
            type: 'STRING',
            required: true,
        },
    ],
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction, args) {

        await interaction.deferReply();

        const locationinput = interaction.options.getString('location');

        try {
            
            await fetch(`https://api.weatherapi.com/v1/current.json?key=${WeatherAPI}&q=${locationinput}&aqi=yes`).then(res => res.json()).then(json => {
                const weatherEmbed = new MessageEmbed()
                .setColor('RANDOM')
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
    
            return interaction.followUp({ embeds: [weatherEmbed] });
            });
        } catch (err) {
        interaction.followUp(`There is no weather info for ${locationinput}`);
        signale.fatal(err)
    }


}

};