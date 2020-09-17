const Discord = require('discord.js');

module.exports = {
    config: {
        name: "kick",
        description: "Kick a user from the guild!",
        usage: "^2kick <user/ID> [reason]",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["kick"]
    },
    run: async (bot, message, args) => {
        var embedColor = '#FFA500' // Change this to change the color of the embeds!

        var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Insufficient Permissions!')
            .setDescription('You need the `KICK_MEMBERS/ADMINISTRATORS` permission to use this command!')
            .setTimestamp();
        var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Missing Arguments!')
            .setDescription('Usage: ^2kick <User> [Reason] <> is a required argument, [] is a optional argument')
            .setTimestamp();
        if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return mssage.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]); // Gets the user mentioned!
        if (!kickMember) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
        let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        if (!reason) reason = "No reason given"; // Triggers if the user dosn't provide a reason for the warning
        if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(`Missing kick permission for this bot`)

        kickMember.send(kickEmbed).then(() =>
            kickMember.kick()).catch(err => console.log(err))

        var kickEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been kicked in ${message.guild.name}`)
            .addField('kicked by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        var kickSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle(`kicked ${message.member.user.tag} successfully! [reason: ${reason}]`);
        message.channel.send(kickSuccessfulEmbed); // Sends the warn successful embed


        let modlogembed = new RichEmbed()
            .setColor()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .addField("Moderation:", "kick")
            .addField("Mutee:", kickMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "command-log")
        sChannel.send(modlogembed)
    }
}
