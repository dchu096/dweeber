const Discord = require("discord.js");

module.exports = {
    config: {
        name: "say",
        description: "sends a message that was inputted to a channel",
        usage: "^2say",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["sy"]
    },
    run: async (bot, message, args) => {
        const warningColor = '#ff0000';
        const okColor = '#00ff00'
        let moderators = r => r.name === "Moderators";
        let mChannel = message.mentions.channels.first()
        let channel = message.channel

        //messages
        message.delete().catch(O_o=>{});

        if (!moderators) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing Moderators role")
                .addField("required:", "Moderators role", false)
                .setColor(warningColor);
            return message.channel.send(nopermsembed).then(msg => msg.delete({ timeout: 5000 })).catch(O_o=>{});
        }


        if (mChannel) {
            let argsresult = args.slice(1).join(" ")
            try {
                await mChannel.send(argsresult)
            } catch (e) {
                console.log(e); //err
            }

            let clearedEmbed = new Discord.MessageEmbed()
                .setTitle("✅Success")
                .setDescription(`messages have been sent`)
                .setColor(okColor)
            message.channel.send(clearedEmbed).then(msg => msg.delete({ timeout: 5000 })).catch(O_o=>{});

        } else {
            let argsresult1 = args.join(" ")
            try {
                 await message.channel.send(argsresult1)
            } catch (e) {
                console.log(e); //err
            }

            let clearedEmbed = new Discord.MessageEmbed()
                .setTitle("✅Success")
                .setDescription(`messages have been sent`)
                .setColor(okColor)
            message.channel.send(clearedEmbed).then(msg => msg.delete({ timeout: 5000 })).catch(O_o=>{});

            }
        }
}