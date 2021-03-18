const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
        name: "warnings",
        description: "shows the warnings of a user",
        usage: "[user/ID]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, {author, channel, delete: delete1, guild, member, mentions}, args) => {
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let mentioned = mentions.members.first() || guild.members.cache.get(args[0]);
        const embedColor = '#FFFF00'; // color: yellow, change the hex for different color

        // MESSAGES

        if(!warns[mentioned.id]) warns[mentioned.id] = {
            warns: 0
        };

        const warningsembed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`warnings`)
            .addField('User:', `${mentioned.user.tag}`)
            .addField('Number of warnings:', warns[`${mentioned.id}, ${guild.id}`].warns)
        channel.send(warningsembed);
    }
    }