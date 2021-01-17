const Discord = require('discord.js');

module.exports = {
    config: {
        name: "virus",
        description: "Shows the memu blog on is memu safe",
        usage: " ",
        category: "Memu",
        accessableby: "Memu members",
        aliases: ["memuvirus"]
    },
    run: async (bot, message, args) => {

        const channelID = '786692269478641714'
        const embedColor = '#87CEEB'
        const warningColor = '#ff0000';



        if(message.channel.id === channelID) {

            const virusEmbed = new Discord.MessageEmbed()
                .setTitle("FAQ: Is MEMU Emulator a virus??")
                .setDescription("shows memu contains no virus")
                .setColor(embedColor)
                .addField("VirusTotal:", "https://www.virustotal.com/gui/file/a69008b35c12e004d46eb3cec28f4207bf7f7839e39df5280c7c1f44c4ffe874/detection", true)
                .addField("Result", "69/70 detected as safe.")
                .setFooter("https://www.memuplay.com/blog/is-memu-safe.html")
            message.channel.send(virusEmbed).catch(O_o => {});
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