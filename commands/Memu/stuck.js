const Discord = require('discord.js');

module.exports= {
    config: {
        name: "stuck",
        description: "Shows a guide when a user is stuck on starting",
        usage: "^2stuck",
        category: "Memu",
        accessableby: "members",
        aliases: ["stk"]
    },
    run: async (bot, message, args) => {
        const channelID = '786692269478641714'
        const embedColor = '#87CEEB'
        const warningColor = '#ff0000';



        if(message.channel.id === channelID) {

            const stuckEmbed = new Discord.MessageEmbed()
                .setTitle("FAQ: Why did MEMU stuck at 59/99%")
                .setDescription("solve 59/99% stuck issue")
                .setColor(embedColor)
                .addField("Reason:", "1.Windows OS crashes or power failure makes your MEmu disk image broken.\n" +
                    "2.Anti-virus software like AVAST blocks a certain file in MEmu by mistake\n" +
                    "3. Installation process is not fully completed due to the restricted environment or anti-virus software.\n" +
                    "4.The installation file is broken.", true)
                .addField("Solution:", "1.Create a new MEmu with Multi-MEmu\n" +
                "2.Disable anti-virus software and create a new MEmu with Multi-MEmu\n" +
                "3.Re-install as Admin or disable anti-virus software\n" +
                "4.Uninstall and reinstall MEmu then restart your computer")
                .setFooter("https://www.memuplay.com/blog/how-to-solve-start-failure.html")
            message.channel.send(stuckEmbed).catch(O_o => {});
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