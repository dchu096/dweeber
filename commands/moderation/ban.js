const { Permissions, MessageEmbed } = require('discord.js');

const {Signale} = require('signale');
const signale = new Signale();

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "[user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {


        try {
        let embedColor = '#FF0000' // color: orange, change the hex for different color

        let banned = message.mentions.members.first() || message.guild.members.get(args[0])
        let reason = args.slice(1).join(" ");

        // MESSAGES

        if (!banned) {
            return message.channel.send("You did not select a user to ban");
        }

        if (message.author === banned) {
            let sanctionyourselfembed = new MessageEmbed()
                .setDescription(`You cannot ban yourself`)
                .setColor("#BC4A2C");
            return message.channel.send({ embeds: [sanctionyourselfembed] });

        }

        if (!reason) reason = "No reason given!"

        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            let nopermsembed = new MessageEmbed()
                .setDescription(
                    "You do not have permission to process this command [Required: BAN_MEMBERS]"
                )
                .setColor("#BC4A2C");
            return message.channel.send({ embeds: [nopermsembed] });
        }

        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            let botnopermsembed = new MessageEmbed()
                .setDescription(
                    "Missing `BAN_MEMBERS` permission for bot."
                )
                .setColor("#BC4A2C");
            return message.channel.send({ embeds: [botnopermsembed] });
        }

        if (banned.bannable === false)  {
            let cantbanembed = new MessageEmbed()
                .setDescription(`I cannot ban this user`)
                .setColor("#BC4A2C");
            return message.channel.send({ embeds: [cantbanembed] });
        }

        message.delete() //delete the command msg

        let banembed = new MessageEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been banned in ${message.guild.name}`)
            .addField('Banned by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();

            banned.send({ embeds: [banembed] }).then(() =>
            banned.ban ({days: 1, reason: reason}))

        
        let successfullyembed = new MessageEmbed()
            .setDescription(`${banned.user.tag} has been banned.`)
            .setColor(embedColor);

        message.channel.send({ embeds: [successfullyembed] });

        } catch (err) {
            signale.error(err)
        }







    }
}


