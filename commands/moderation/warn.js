const Discord = require('discord.js');

module.exports = {
    config: {
        name: "warn",
        description: "warns a member from this guild",
        usage: "^2warn",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["wn"]
    },
    run: async (bot, message, args) => {
        var embedColor = '#FFFF00' // color: yellow, change the hex for different color

        var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Insufficient Permissions!')
            .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
            .setTimestamp();
        var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Missing Arguments!')
            .setDescription('Usage: ^2warn [User] [Reason]')
            .setTimestamp();
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
        let mentioned = message.mentions.members.first() || message.guild.members.get(args[0]); // Gets the user mentioned!
        if (!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
        let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        if (!reason) reason = "No reason given"; // Triggers if the user dosn't provide a reason for the warning

        var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been warned in ${message.guild.name}`)
            .addField('Warned by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        mentioned.send(warningEmbed); // DMs the user the above embed!
        var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle(`Warned ${mentioned.user.tag} successfully! [reason: ${reason}]`);
        message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed

        message.delete().catch(O_o=>{});
    }
}