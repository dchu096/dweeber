const Discord = require("discord.js");

module.exports = {
    config: {
        name: "ask",
        description: "for the people who dont post their questions",
        usage: " ",
        category: "TQS",
        accessableby: "Technical Queries Slayer"
    },
    run: async (bot, message, args) => {
        const embedColor = '#87CEEB'
        const warningColor = '#ff0000';

        const role = message.guild.roles.cache.find(r => r.id ===  '762204928826933280')


        if (message.member.roles.cache.has(role.id)) {
            const askembed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle("A way to ask in server")
                .setDescription("Example of how to ask questions properly")
                .addField("Incorrect example\n" +
                    "why did my memu crash?\n" +
                    "why did my game blackscreen?", "This is very hard to troubleshoot", false)

                .addField("correct example\n" +
                    "Call of Duty crash when launching with Memu 7.3 OS windows10 64bit, i5-7400T, 12gb ram , intelHD 630 and directx\n" +
                    "Memu stuck at 99% after first installation from memu websites and with android 7.1, spec: i5-7400T, 12gb ram, intelHD630", "This would be easier in troubleshooting so we know what your system spec is and what error you have", false)
                .setFooter("learn to give your system spec in server so we all saves time to troubleshoot")
            return message.channel.send(askembed)
        } else {
            let nopermissionembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing TQS role")
                .addField("required:", "Technical Queries Slayer role", false)
                .setColor(warningColor)
            return message.channel.send(nopermissionembed).then(msg => msg.delete({timeout: 5000}))
        }
    }
    }