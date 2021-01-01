const Discord = require("discord.js");

module.exports = {
    config: {
        name: "about",
        description: "shows the bot's info",
        usage: "^2about",
        category: "info",
        accessableby: "members",
        aliases: [""]
    },
    run: async (bot, message, args) => {
        var embedColor = '#87CEEB' // color: skyblue

        var Embed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle("About Memubot")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`Memubot Info`, message.guild.iconURL)

            .addField("**About:**", `Memubot is abot designed specifically for Memu server, mainly targeted at tech support uses but with moderation features to replace dyno's job and role command to replace carls job in memu server`, true)
            .addField("**Bot's webpage:**", `https://user096.online`, true)
            .setFooter("by dchu096#3732, made with time and effort")
        message.channel.send(Embed) // Sends the embed


    }

}