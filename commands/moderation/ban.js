const Discord = require("discord.js");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "^2ban [user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        let embedColor = '#FF0000' // color: orange, change the hex for different color

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
        let reason = args.slice(1).join(" ");

        // MESSAGES

        if (!banMember) {
            return message.channel.send("You did not select a user to ban");
        }

        if (message.author === banMember) {
            let sanctionyourselfembed = new Discord.RichEmbed()
                .setDescription(`You cannot ban yourself`)
                .setColor(embedColor);
            return message.channel.send(sanctionyourselfembed);

        }

        if (!reason) reason = "No reason given!"

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            let nopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "You do not have permission to ban members"
                )
                .setColor(embedColor);
            return message.channel.send(nopermsembed);
        }

        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            let botnopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "Missing `BAN_MEMBERS` permission for bot."
                )
                .setColor(embedColor);
            return message.channel.send(botnopermsembed);
        }

        message.delete() //delete the command msg

        let banembed = new Discord.RichEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been banned in ${message.guild.name}`)
            .addField('Banned by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        banMember.send(banembed).then(() =>
            message.guild.ban(banMember, {days: 1, reason: reason})).catch(err => console.log(err));

        let successfullyembed = new Discord.RichEmbed()
            .setDescription(`${banMember.user.tag} has been banned.`)
            .setColor(embedColor);

        message.channel.send(successfullyembed);
    }
}


