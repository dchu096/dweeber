const Discord = require("discord.js");

module.exports = {
    config: {
        name: "mute",
        description: "Mute a member in the dserver!",
        usage: "^2mute [user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        let embedColor = '#514f48' // color: grey, change the hex for different color
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        let muterole = message.guild.roles.find(r => r.name === "Muted")
        let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word

        var command = args[0];
        var mentioned = args[1];

        var days = parseInt(args[3]);
        var hours = parseInt(args[4]);
        var seconds = parseInt(args[5]);

        let mutedmsg = new Discord.RichEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been muted in ${message.guild.name}`)
            .addField('Muted by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();

        // MESSAGES

        if (!mutee) {
            return message.channel.send("You did not select a user to mute");
        }

        if (message.author === mutee) {
            let sanctionyourselfembed = new Discord.RichEmbed()
                .setDescription(`You cannot mute yourself`)
                .setColor(embedColor);
            return message.channel.send(sanctionyourselfembed);

        }

        if (!reason) reason = "No reason given!"

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            let nopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "You do not have permission to mute members"
                )
                .setColor(embedColor);
            return message.channel.send(nopermsembed);
        }

        if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
            let botnopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "Missing `MANAGE_ROLES` permission for bot."
                )
                .setColor(embedColor);
            return message.channel.send(botnopermsembed);
        }

        if (message.guild.roles.find(role => role.name)) {

            message.member.addRole(muterole);

            if (message.content.includes(`${days}d`)) {
                mutee.send(muteembed)(mutedmsg);
                setTimeout(() => {
                    member.removeRole(muterole);
                    usermsg.addField('Mute Time:',
                        `${hours} Seconds`);
                }, `${args[2]} * 86400`);
            }

            if (message.content.includes(`${hours}h`)) {
                mutee.send(muteembed)(mutedmsg);
                setTimeout(() => {
                    member.removeRole(muterole);
                    usermsg.addField('Mute Time:',
                        `${hours} Seconds`);
                }, `${args[3]} * 3600`);
            }

            if (message.content.includes(`${seconds}s`)) {
                mutee.send(muteembed)(mutedmsg);
                setTimeout(() => {
                    member.removeRole(muterole);
                    usermsg.addField('Mute Time:',
                        `${seconds} Seconds`);
                }, `${args[4]} * 1000`);
            }

            if (message.content === `${command} ${mentioned} ${input}`) {
                message.member.addRole(muterole);
                usermsg.addField('Muted for',
                    `${input}`);
                usermsg.addField('Mute Time:',
                    'Permenant');
                mutee.send(muteembed)(mutedmsg);
            }


            let successfullyembed = new Discord.RichEmbed()
                .setDescription(`${mutee.user.tag} has been muted.`)
                .setColor(embedColor);

            message.channel.send(successfullyembed);

            console.log('===========================');
            console.log(`Member Muted: ${mentioned}`);
            console.log(`Muted by: ${message.author.tag}`);
            console.log(`Reason: ${input}`);
            console.log('===========================');
        } else {

            message.channel.send('You do not have a `Muted` Role, This command won\'t work.');
        }

    }
}









