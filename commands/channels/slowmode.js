const Discord = require("discord.js");
const { Signale } = require('signale');

const logger = new Signale({ scope: 'Discord' });

module.exports = {
    config: {
        name: "slowmode",
        description: "Set a slowmode on channel",
        usage: "[channel]",
        category: "channels",
        accessableby: "Moderators",
    },

    run: async (message) => {
           const embedColor = '#87CEEB'; // color: skyblue

        await msg.channel.setRateLimitPerUser(time)

                let slowmodeEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
        .setDescription(`${successEmoji} Channel slowmode have been set to ${time}`)

    msg.reply(slowmodeEmbed)
    }
}
