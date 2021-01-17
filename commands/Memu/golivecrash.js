const Discord = require("discord.js");

module.exports = {
    config: {
        name: "golivecrash",
        description: "Shows the reason why does go live on discord crashed Memu",
        usage: " ",
        category: "Memu",
        accessableby: "Memu Members",
        aliases: ["golive"]
    },
    run: async (bot, message, args) => {
        const channelID = '786692269478641714'
        const embedColor = '#87CEEB'
        const warningColor = '#ff0000';

        // MESSAGES

        if(message.channel.id === channelID) {

            const requirementsembed = new Discord.MessageEmbed()
                .setTitle("Discord go live crashed Memu")
                .setDescription("Shows the reason why does go live on discord crashed Memu")
                .setColor(embedColor)
                .addField("Why?", "Discord is hooking MEmu's swap buffers for the go-live function. However, MEmu swap buffers are being called in the sub-thread", false)
                .addField("What can you do", "Running MEmu as admin. (But you will lose the ability to turn the instance on from multi-memu), and upvote the post under this line!", false)
                .setFooter("upvote: https://support.discord.com/hc/en-us/community/posts/360071957451-MEmu-Play-Android-Emulator-Crashes-when-Going-Live-with-Discord")
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














