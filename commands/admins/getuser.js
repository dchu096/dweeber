const Discord = require('discord.js');

module.exports = {
    config: {
        name: "getuser",
        description: "get a user's username from user in this server",
        usage: "^2getuser",
        category: "admins",
        accessableby: "admins",
        aliases: ["getusr"]
    },
    run: async (bot, message, args) => {

        let users = bot.users;

        let searchTerm = args[0];
        if(!searchTerm) return message.channel.send("Please type a term to search!");

        let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));

        message.channel.send(matches.map(u => u.tag));

    }
    }
