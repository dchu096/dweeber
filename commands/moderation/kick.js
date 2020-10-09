const Discord = require("discord.js");

module.exports= {
    config: {
        name: 'kick',
        description: 'kick a member from the guild',
        usage: "^2ban",
        category: 'moderation',
        accessableby: "Moderators",

},
    run: async(bot,message,args) => {
        let embedColor = '#FFa500' // color: orange, change the hex for different color

        let kicked = message.mentions.members.first() || message.guild.members.get(args[0]);
        let reason = args.slice(1).join(" ");

        // MESSAGES

        if (!kicked) {
           return message.channel.send("You did not select a user or give a reason");
        }

        if (message.author === kicked) {
            let sanctionyourselfembed = new Discord.RichEmbed()
                .setDescription(`You cannot kick yourself`)
                .setColor(embedColor);
            return message.channel.send(sanctionyourselfembed);

        }

        if (!reason) reason = "No reason given!"

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            let nopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "You do not have permission to kick members"
                )
                .setColor(embedColor);
            return message.channel.send(nopermsembed);
        }

        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
            let botnopermsembed = new Discord.RichEmbed()
                .setDescription(
                    "Missing `KICK_MEMBERS` permission for bot."
                )
                .setColor(embedColor);
            return message.channel.send(botnopermsembed);
        }

        let kickembed = new Discord.RichEmbed()
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been kicked in ${message.guild.name}`)
            .addField('Kicked by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        kicked.send(kickembed).then(() =>
        message.guild.member(kicked).kick(reason)).catch(err => console.log(err));

        let successfullyembed = new Discord.RichEmbed()
            .setDescription(`${kicked.user.tag} has been kicked.`)
            .setColor(embedColor);

        message.channel.send(successfullyembed);


    }
}