const Discord = require("discord.js");

module.exports = {
    config: {
        name: "emulatordetection",
        description: "Shows the minimum requirements for memu",
        usage: " ",
        category: "Memu",
        accessableby: "Memu Members",
        aliases: ["emudetection", "gameban", "emuban", "playfair"]
    },
    run: async (bot, message, args) => {
        const channelID = '786692269478641714'
        const embedColor = '#87CEEB'
        const warningColor = '#ff0000';

        // MESSAGES

        if(message.channel.id === channelID) {

            const requirementsembed = new Discord.MessageEmbed()
                .setTitle("Emulator Detection")
                .setDescription("requirements to use Memu emulator")
                .setColor(embedColor)
                .addField("Why?", "Memu respect the game publisher and other mobile players for the split change between emulator and mobile,so  MEmu decide not to destroy the game balance by making itself standout as a emulator", false)
                .addField("What can you do", "Play the games as emulator and play fair, or play another games which allows emulator", false)
                .setFooter("https://www.memuplay.com/blog/is-memu-safe.html")
            await message.channel.send(requirementsembed).catch(O_o => {});
        } else {
            let wrongChannelEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Wrong channel")
                .addField("required:", "<#786692269478641714>", false)
                .setColor(warningColor)
            return message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }

    }
}