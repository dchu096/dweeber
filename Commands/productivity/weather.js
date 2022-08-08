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

            const weatherEmbed = new MessageEmbed()

            .setFooter({ text: 'Dweeber >> Weather'})


            
            await fetch(`https://api.weatherapi.com/v1/current.json?key=${WeatherAPI}&q=${locationinput}&aqi=yes`).then(res => res.json()).then(json => {
                
                weatherEmbed.setColor('RANDOM')
                weatherEmbed.setTitle(`Weather info: ${json.location.name}`)
                weatherEmbed.setDescription(`Weather info for ${json.location.name}`)
                weatherEmbed.addField(`Name`, `${json.location.name}`)
                weatherEmbed.addField(`Region`,`${json.location.region}` || `No region found`)
                weatherEmbed.addField(`Country`,`${json.location.country}`)
                weatherEmbed.addField(`lat | lon`,`${json.location.lat} | ${json.location.lon}`)
                weatherEmbed.addField(`Timezone`,`${json.location.tz_id}`, true)
                weatherEmbed.addField(`Localtime (Epoch)`, `${json.location.localtime_epoch}`, true)
                weatherEmbed.addField(`Localtime`, `${json.location.localtime}`, true)
                weatherEmbed.addField(`Temperature`, `${json.current.temp_c}°C | ${json.current.temp_f}°F`, true)
                weatherEmbed.addField(`Condition:`, `${json.current.condition.text}`, true)
                weatherEmbed.addField(`Wind (Kph) | (Mph)`, `${json.current.wind_kph} | ${json.current.wind_mph}`, true)
                weatherEmbed.addField(`Wind (Degrees)`, `${json.current.wind_degree}`, true)
                weatherEmbed.addField(`Wind (Direction)`, `${json.current.wind_dir}`, true)
                weatherEmbed.addField(`Pressure (MB) | (IN)`, `${json.current.pressure_mb} | ${json.current.pressure_in}`, true)
                weatherEmbed.addField(`Precip (MM) | (IN)`, `${json.current.precip_mm} | ${json.current.precip_in}`, true)
                weatherEmbed.addField(`Humidity`, `${json.current.humidity}`, true)
                weatherEmbed.addField(`Cloud`, `${json.current.cloud}`, true)
                weatherEmbed.addField(`Feelslike (C) | (F)`, `${json.current.feelslike_c} | ${json.current.feelslike_f}`, true)
                weatherEmbed.addField(`Visuability (KM) | (MI)`, `${json.current.vis_km} | ${json.current.vis_miles}`, true)
                weatherEmbed.addField(`UV`, `${json.current.uv}`, true)
                weatherEmbed.addField(`Gust (KPH) | (MPH)`, `${json.current.gust_kph} | ${json.current.gust_mph}`, true)
                weatherEmbed.addField(`Air quality (CO)`, `${json.current.air_quality.co}`, true)
                weatherEmbed.addField(`Air quality (O3)`, `${json.current.air_quality.o3}`, true)
                weatherEmbed.addField(`Air quality (NO2)`, `${json.current.air_quality.no2}`, true)
                weatherEmbed.addField(`Air quality (SO2)`, `${json.current.air_quality.so2}`, true)
                weatherEmbed.addField(`Air quality (PM25)`, `${json.current.air_quality.pm2_5}`, true)
                weatherEmbed.addField(`Air quality (PM10)`, `${json.current.air_quality.pm10}`, true)
                weatherEmbed.setThumbnail(`https:${json.current.condition.icon}`)
            });


                return interaction.followUp({ embeds: [weatherEmbed] });

                
    

            
        } catch (err) {
        interaction.followUp(`There is no weather info for ${locationinput}`);
        signale.fatal(err)
    }


}

};