const Discord = require("discord.js");

module.exports = {
    config: {
        name: "about",
        description: "shows the bot info",
        usage: " ",
        category: "info",
        accessableby: "members",
    },
    run: async (bot, message, args) => {
        const embedColor = '#87CEEB'; // color: skyblue

        const Embed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle("About Memubot")
            .setAuthor(`Memubot`, bot.user.displayAvatarURL())

            .addField("**About:**", `Memubot is abot designed specifically for Memu server, mainly targeted at tech support uses but with moderation features to replace dyno's job and role command to replace carls job in memu server`, true)
            .addField("**Bot's webpage:**", `https://user096.online`, true)
            .setFooter("by dchu096#3732, made with time and effort");
        await message.channel.send(Embed) // Sends the embed


    }

}