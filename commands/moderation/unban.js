const Discord = require("discord.js");

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[user/ID] {reason}",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        let embedColor = '#00ff00' // color: green, change the hex for different color
        let bannedMember = await bot.fetchUser(args[0])
        let reason = args.slice(1).join(' ')

        // MESSAGES
        if(!bannedMember) {
            return message.channel.send("You did not provide someone to unban");
        }

        if (isNaN(args[0])) {
            return message.channel.send("You need to provide an ID.");
        }

        if(!reason) reason = "No reason given!"

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            let nopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "You do not have permission to unban members"
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

    message.delete()

    try {
        let unbanembed = new Discord.RichEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been unbanned in ${message.guild.name}`)
            .addField('unbanned by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        bannedMember.send(unbanembed).then(() =>
        message.guild.unban(bannedMember, reason))
    } catch(e) {
        console.log(e.message)
    }
        let successfullyembed = new Discord.RichEmbed()
            .setDescription(`User has been unbanned.`)
            .setColor(embedColor);
        message.channel.send(successfullyembed);

        //modlogs
        let doneembed = new Discord.RichEmbed()
            .setTitle(`Moderation: Unban`)
            .setColor(embedColor)
            .setDescription(`${mutee.user.tag} has been unbanned by ${message.author.tag} because of ${reason}`)
        let sChannel = message.guild.channels.find(c => c.name === "shame-stream")
        sChannel.send(doneembed)


    }
}
