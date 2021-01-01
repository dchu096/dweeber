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
        var embedColor = '#87CEEB' // color: skyblue
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

        var Embed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle(`Your discord user ID is: \`${member.user.id}\`.`);
        message.channel.send(Embed); // Sends the embed


    }

}