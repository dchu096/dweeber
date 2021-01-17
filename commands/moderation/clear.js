const Discord = require("discord.js");

module.exports = {
    config: {
        name: "clear",
        description: "clears a message",
        usage: "[amount]",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["clr"]
    },
    run: async (bot, message, args) => {

        const warningColor = '#ff0000';
        const okColor = '#00ff00';

        //messages

            message.delete().catch(O_o => {});



        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing MANAGE_MESSAGES permission (user)")
                .addField("required:", "MANAGE_MESSAGES permission", false)
                .setColor(warningColor);
            return message.channel.send(nopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        }

        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            let botnopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing MANAGE_MESSAGES permission (bot)")
                .addField("required:", "MANAGE_MESSAGES permission", false)
                .setColor(warningColor);
            return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        }

        if (!args[0]) {
            let nomsgembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing clear amount")
                .addField("required:", "messages amount", false)
                .setColor(warningColor)
            return message.channel.send(nomsgembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        }

        try {
            await message.channel.bulkDelete(args[0])
        } catch (e) {
            console.log(e); //err
        }
        let clearedEmbed = new Discord.MessageEmbed()
            .setTitle("✅Success")
            .setDescription(`Cleared ${args[0]} messages`)
            .setColor(okColor)
        message.channel.send(clearedEmbed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
    }
    }
