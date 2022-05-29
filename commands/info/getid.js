const Discord = require("discord.js");

module.exports = {
    config: {
        name: "getid",
        description: "get a user ID",
        usage: " ",
        category: "info",
        accessableby: "members",
        aliases: ["id", "gid"]
    },
    run: async (bot, message, args) => {
        const embedColor = '#87CEEB';
        const member = message.mentions.members.first() || message.member;


        const IDEmbed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle(`ID for ${member.user.username}`)
            .setDescription(`\`${member.user.id}\``)
            .setFooter({ text: 'Dweeber >> getID'})
        await message.channel.send({ embeds: [IDEmbed] }).catch((err) => {
            signale.error(err)
        }); // Sends the embed


    }

}