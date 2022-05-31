const { Permissions, MessageEmbed } = require('discord.js');

const {Signale} = require('signale');
const signale = new Signale();

module.exports= {
    config: {
        name: 'kick',
        description: 'kick a member from the guild',
        usage: "[user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",

},
    run: async(bot,message,args) => {
        let embedColor = '#FFa500' // color: orange, change the hex for different color

        let kicked = message.mentions.members.first() || message.guild.members.get(args[0]);
        let reason = args.slice(1).join(" ");

        // MESSAGES

        if (!kicked) {
           return message.channel.send("You did not select a user to kick");
        }

        if (message.author === kicked) {
            let sanctionyourselfembed = new MessageEmbed()
                .setDescription(`You cannot kick yourself`)
                .setColor("#BC4A2C");
            return message.channel.send({ embeds: [sanctionyourselfembed] });

        }

        if (!reason) reason = "No reason given!"

        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            let nopermsembed = new MessageEmbed()
                .setDescription("You do not have permission to process this command [Required: KICK_MEMBERS]")
                .setColor("#BC4A2C");
            return message.channel.send({ embeds: [nopermsembed] });
        }

        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
            let botnopermsembed = MessageEmbed()
                .setDescription(
                    "Missing `KICK_MEMBERS` permission for bot."
                )
                .setColor(embedColor);
            return message.channel.send({ embeds: [botnopermsembed] });
        }

        if (kicked.kickable === false) {
            let cantkickembed = new MessageEmbed()
                .setDescription(`I cannot kick this user`)
                .setColor("#BC4A2C");
            return message.channel.send({ embeds: [cantkickembed] });
        }

        message.delete() //delete the command msg

        let kickembed = new MessageEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been kicked in ${message.guild.name}`)
            .addField('Kicked by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        kicked.send({ embeds: [kickembed] }).then(() =>
        kicked.kick({reason: reason})).catch((err) => {
            signale.error(err)
        });

        let successfullyembed = new MessageEmbed()
            .setDescription(`${kicked.user.tag} has been kicked.`)
            .setColor(embedColor);
        message.channel.send({ embeds: [successfullyembed] });


    }
}