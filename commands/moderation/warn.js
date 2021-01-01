const Discord = require('discord.js');

module.exports = {
    config: {
        name: "warn",
        description: "warns a member from this guild",
        usage: "[user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        var embedColor = '#FFFF00' // color: yellow, change the hex for different color

        let mentioned = message.mentions.members.first() || message.guild.members.get(args[0]);
        let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word

        // MESSAGES

        if (!mentioned) {
            return message.channel.send("You did not select a user to warn");
        }


        if (!reason) reason = "No reason given!"

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            let nopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "You do not have permission to warn members"
                )
                .setColor(embedColor);
            return message.channel.send(nopermsembed);
        }

        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            let botnopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "Missing `MANAGE_MESSAGES` permission for bot."
                )
                .setColor(embedColor);
            return message.channel.send(botnopermsembed);
        }

        message.delete() //delete the command msg

        let warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been warned in ${message.guild.name}`)
            .addField('Warned by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        mentioned.send(warningEmbed); // DMs the user the above embed!

        var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle(`${mentioned.user.tag} has been warned`);
        message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed

        let doneembed = new Discord.RichEmbed()
            .setTitle(`Moderation: Warn`)
            .setColor(embedColor)
            .setDescription(`${mentioned.user.tag} has been warned by ${message.author.tag} because of ${reason}`)
        let sChannel = message.guild.channels.find(c => c.name === "shame-stream")
        sChannel.send(doneembed)
        
    }
}