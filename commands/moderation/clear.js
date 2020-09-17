const { RichEmbed } = require("discord.js")
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "clear",
        description: "clears a message",
        usage: "^2clear <amount>",
        category: "moderation",
        accessableby: "moderator",
        aliases: ["clr"]
    },
    run: async (bot, message, args) => {
        var embedColor = '#87CEEB' // color: skyblue

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premssions to do that!");
        if(!args[0]) return message.channel.send("Please enter a number of messages to clear!");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`**Cleared ${args[0]} messages.**`).then(msg => msg.delete(3000));
        });


    }
    }
