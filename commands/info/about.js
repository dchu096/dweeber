const { MessageEmbed } = require('discord.js');

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

        const AboutEmbed = new MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle("About Dweeber")
            .setDescription('About the bot')
            .setAuthor({ name: 'Dweeber'})
            .addField("**About:**", `Dweeber is a multipurpose bot for your moderations, music, roles need!`, true)
            .addField("**Bot's webpage:**", `https://dweeber.dchu096.me`, true)
            .addField("**Source:**", `https://github.com/dchu096/dweeber`, true)
            .setFooter({ text: 'by invaliduser#9707, made with time and effort'});
            await message.channel.send({ embeds: [AboutEmbed] }); // Sends the embed


    }

}