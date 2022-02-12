const Discord = require("discord.js");

module.exports = {
    config: {
        name: "slowmode",
        description: "Set a slowmode on channel",
        usage: "[channel]",
        category: "channels",
        accessableby: "Moderators",
    },

    run: async (message, args) => {
        
           const embedColor = '#87CEEB'; // color: skyblue

        let sChannel = message.channel;

        let time = args[0];
        
        await sChannel.setRateLimitPerUser(time)
        
                let slowmodeEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
        .setDescription(`${successEmoji} Channel slowmode have been set to ${time}`) 
            
    message.reply(slowmodeEmbed)
    }
}
