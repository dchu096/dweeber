require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
module.exports = {
    config: {
        name: "time",
        description: "Fetch world time informations",
        usage: "<time_zone>",
        category: "other",
        accessableby: "Members",
        aliases: ["timezone"]
    },
    run: async (bot, message, args) => {

        if(!args[0]) {
            message.channel.send("No timezone defined")
        }

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`http://worldtimeapi.org/api/timezone/${args[0]}`).then(res => res.json()).then(json => {
            
            const colorEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Time for  : ${json.timezone}`)
            .setDescription(`Time for ${json.timezone}`)
            .addField(`Abbreviation:`, `${json.abbreviation}`)
            .addField(`Datetime:`,`${json.datetime}`)
            .addField(`Day Of Week:`,`${json.day_of_week}`, true)
            .addField(`Day of year:`,`${json.day_of_year}`, true)
            .addField(`DST:`,`${json.dst}`, true)
            .addField(`DST from:`,`${json.dst_from}`, true)
            .addField(`DST offset:`,`${json.dst_offset}`, true)
            .addField(`DST until:`,`${json.dst_until}`, true)
            .addField(`Raw offset:`,`${json.raw_offset}`, true)
            .addField(`Unix time:`,`${json.unixtime}`, true)
            .addField(`UTC datetime:`,`${json.utc_datetime}`, true)
            .addField(`UTC offset:`,`${json.utc_offset}`, true)
            .addField(`Week number:`,`${json.week_number}`, true)
            .setFooter({ text: 'Dweeber >> time'});


        message.channel.send({ embeds: [colorEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
