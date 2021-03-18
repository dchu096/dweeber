const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
        name: "userwarnings",
        description: "shows the warnings of a user",
        usage: "[user/ID]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const embedColor = '#FFFF00'; // color: yellow, change the hex for different color

        // MESSAGES

        if(!warns[mentioned.id]) warns[mentioned.id] = {
            warns: 0
        };

        const warnings_Embed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`warnings of ${mentioned.user.tag}`)
            .addField(`server name:`, message.guild.name, false)
            .addField('Number of warnings:', warns[`${mentioned.id}, ${message.guild.id}`].warns, false)
        await message.channel.send(warnings_Embed);
    }
    }