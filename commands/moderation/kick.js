const Discord = require("discord.js");

module.exports= {
    config: {
        name: 'kick',
        description: 'kick a member from the guild',
        usage: "[user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",

},
    run: async(bot,message,args) => {
        const embedColor = '#FFa500' // color: orange, change the hex for different color
        const warningColor = '#ff0000';
        const muteColor = '#808080';
        const okColor = '#00ff00';

        let kicked = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        // MESSAGES

        message.delete().catch(O_o => {});

        if(message.guild.member(kicked)) {

            if (!kicked) {
                let nopersonembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing target user to kick")
                    .addField("required:", "mentions/ID", false)
                    .setColor(warningColor);
                return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

            if (message.author === kicked) {
                let sanctionyourselfembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription(`You cannot kick yourself`)
                    .addField("required:", "mentions/ID", false)
                    .setColor(warningColor);
                return message.channel.send(sanctionyourselfembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });

            }

            if (!reason) reason = "No reason given!"

            if (!message.member.permissions.has("KICK_MEMBERS")) {
                let nopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing KICK_MEMBERS permission (user)")
                    .addField("required:", "KICK_MEMBERS permission", false)
                    .setColor(warningColor);
                return message.channel.send(nopermsembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                let botnopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing KICK_MEMBERS permission (bot)")
                    .addField("required:", "KICK_MEMBERS permission", false)
                    .setColor(warningColor);
                return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }


            let kickembed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setAuthor(message.author.username, message.author.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle(`You've been kicked in ${message.guild.name}`)
                .addField('Kicked by', message.author.tag)
                .addField('Reason', reason)
                .setTimestamp();
            kicked.send(kickembed).then(() =>
                message.guild.member(kicked).kick(reason)).catch(O_o => {
            });

            let successfullyembed = new Discord.MessageEmbed()
                .setTitle("✅Success")
                .setDescription(`${kicked.user.tag} has been kicked.`)
                .setColor(okColor);
            await message.channel.send(successfullyembed);

            //modlogs
            let doneembed = new Discord.RichEmbed()
                .setTitle(`Moderation: Kick`)
                .setColor(embedColor)
                .setDescription(`${kicked.user.tag} has been kicked by ${message.author.tag} because of ${reason}`)
            let sChannel = message.guild.channels.find(c => c.name === "shame-stream")
            sChannel.send(doneembed).catch(O_o => {
            });
        } else {
            let kickedEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This user is not in this server!")
                .setColor(warningColor)
        }


    }
}