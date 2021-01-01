const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    config: {
        name: "mute",
        description: "Mute a member in the server!",
        usage: "[user/ID] [duration] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        let embedColor = '#514f48' // color: grey, change the hex for different color
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        let muterole = message.guild.roles.find(r => r.name === "Muted")
        let reason = args.slice(2).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        let duration = ms(args[1])

        // MESSAGES

        //define muted user
        if (!mutee) {
            return message.channel.send("You did not select a user to mute");
        }

        //disallow muting self/set reason/permission

        if (!args[1])
            return message.channel.send('Please enter a length of time of 14 days or less (s/m/h/d)');

        if (!duration || duration > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
            return message.channel.send('You need to enter a time that is less then 14days');

        if (!reason) reason = "No reason given!"

        if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("You dont have permission to mute someone!");


        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send("no permission for the bot to mute someone!");

        if (mutee.roles.has(muterole))
            return message.channel.send('This member is already muted');

        message.delete() //delete the command msg

    //add mute role
        try {
            await mutee.addRole(muterole);
        } catch (err) {
            console.log(err)
        }
        //sends the user the muted embed
        let mutedembed = new Discord.RichEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been muted in ${message.guild.name}`)
            .addField('Muted by', message.author.tag)
            .addField('Reason', reason)
            .addField('duration', ms(duration))
            .setTimestamp();
        mutee.send(mutedembed).catch(err => console.log(err));

        //successful embeds
        let successfullyembed = new Discord.RichEmbed()
            .setDescription(`${mutee.user.tag} has been muted. [${ms(duration, { long: true })}]`)
            .setColor(embedColor);
        message.channel.send(successfullyembed);


        //modlogs
        let doneembed = new Discord.RichEmbed()
            .setTitle(`Moderation: Mute`)
            .setColor(embedColor)
            .setDescription(`${mutee.user.tag} has been muted by ${message.author.tag} for ${ms(duration, { long: true })} because of ${reason}`)
        let sChannel = message.guild.channels.find(c => c.name === "shame-stream")
        sChannel.send(doneembed)


        // Unmute member
        mutee.timeout = message.client.setTimeout(async () => {
            try {
                mutee.send("You have been unmuted")
                await mutee.removeRole(muterole);
                const unmuteEmbed = new Discord.RichEmbed()
                    .setDescription(`${mutee.user.tag} has been unmuted. [duration due]`)
                    .setColor(embedColor);
                message.channel.send(unmuteEmbed);
            } catch (err) {
                console.log(err)
            }
        }, duration);
    }
};
