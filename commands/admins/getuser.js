const Discord = require('discord.js');

module.exports = {
    config: {
        name: "getuser",
        description: "get a user's username from user in this server",
        usage: " ",
        category: "admins",
        accessableby: "Administrators",
        aliases: ["user", "finduser", "checkuser"]
    },
    run: async (bot, message, args) => {
        const warningColor = '#ff0000';

        //messages
        message.delete()

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing ADMINISTRATOR permission (user)")
                .addField("required:", "ADMINISTRATOR permission", false)
                .setColor(warningColor);
            return message.channel.send(nopermsembed).then(msg => msg.delete({ timeout: 10000 }));
        }

        let users = bot.users;

        let searchTerm = args[0];

        if(!searchTerm) {
            const notermembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing target user")
                .addField("required:", "usernames", false)
                .setColor(warningColor)
            return message.channel.send(notermembed).then(msg => msg.delete({ timeout: 10000 }));
        }


        let userlist = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));

        await message.channel.send(userlist.map(u => u.tag));

    }
    }
