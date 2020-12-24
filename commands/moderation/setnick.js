const Discord = require("discord.js");

module.exports = {
    config: {
        name: "setnick",
        description: "Change someone's nickname",
        usage: "^2setnick [user] [nick-name]",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["setnickname"]
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("You dont have permission to use this command.");
        if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I don't have permission to change user nicknames!");

        let nUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!nUser) return message.channel.send("Please supply a user!");

        let prevName = nUser.user.username; //user's previous name before they get nicked

        if (nUser.id == bot.user.id) return;

        let nickname = args.join(" ").slice(22);
        if (!nickname) return message.channel.send("No nickname was given!");

        try {
            message.guild.members.get(nUser.id).setNickname(nickname);
        } catch(e) {
            console.log(e.message)
        }
        message.channel.send(`${prevName}'s nickname have been changed to ${nickname} successfully.`)
    }
}