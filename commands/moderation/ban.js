const Discord = require("discord.js");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "[user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        const embedColor = '#FF0000'; // color: yellow, change the hex for different color
        const warningColor = '#ff0000';
        const okColor = '#00ff00';
        let banMember = message.mentions.members.first() || await bot.users.fetch(args[0])
        let reason = args.slice(1).join(" ");

        // MESSAGES

            message.delete().catch(O_o => {});

        message.guild.fetchBan(banMember).then((bansUser) => {
            let alreadybannedembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This user is already banned")
                .setColor(warningColor);
            return message.channel.send(alreadybannedembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        }).catch(error => {

            /* Code when the user isn't banned */

            if (!banMember) {
                let nopersonembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing target user to ban")
                    .addField("required:", "mentions/ID", false)
                    .setColor(warningColor);
                return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
                });
            }

            if (message.author === banMember) {
                let sanctionyourselfembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription(`You cannot ban yourself`)
                    .addField("required:", "mentions/ID", false)
                    .setColor(warningColor);
                return message.channel.send(sanctionyourselfembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
                });

            }

            if (!reason) reason = "No reason given!"

            if (!message.member.permissions.has("BAN_MEMBERS")) {
                let nopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing BAN_MEMBERS permission (user)")
                    .addField("required:", "BAN_MEMBERS permission", false)
                    .setColor(warningColor);
                return message.channel.send(nopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
                });
            }

            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                let botnopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing BAN_MEMBERS permission (bot)")
                    .addField("required:", "BAN_MEMBERS permission", false)
                    .setColor(warningColor);
                return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
                });
            }

            let banembed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setAuthor(message.author.username, message.author.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle(`You've been banned in ${message.guild.name}`)
                .addField('Banned by', message.author.tag)
                .addField('Reason', reason)
                .setTimestamp();
            banMember.send(banembed).then(() =>
                message.guild.members.ban(banMember, reason)).catch(O_o => {});

            let successfullyembed = new Discord.MessageEmbed()
                .setTitle("✅Success")
                .setDescription(`${banMember.tag} has been banned.`)
                .setColor(okColor);

            message.channel.send(successfullyembed).catch(O_o => {});

            //modlogs
            let doneembed = new Discord.MessageEmbed()
                .setTitle(`Moderation: Ban`)
                .setColor(embedColor)
                .setDescription(`${banMember.tag} has been banned by ${message.author.tag} because of ${reason}`)
            let sChannel = message.guild.channels.cache.find(c => c.name === "shame-stream")
            sChannel.send(doneembed).catch(O_o => {});






        })
    }
}


