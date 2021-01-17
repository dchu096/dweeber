const Discord = require("discord.js");

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[user/ID] {reason}",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        let embedColor = '#00ff00' // color: green, change the hex for different color
        const warningColor = '#ff0000';
        const okColor = '#00ff00';
        let bannedMember = await bot.users.fetch(args[0])
        let reason = args.slice(1).join(' ')

        //Messages
        message.delete().catch(O_o => {
        });


        message.guild.fetchBan(bannedMember).then((bansUser) => {
            if (!bannedMember) {
                let nopersonembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing target user to set unban")
                    .addField("required:", "ID", false)
                    .setColor(warningColor);
                return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

            if (isNaN(args[0])) {
                let noidembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Target user must be an ID")
                    .addField("required:", "ID", false)
                    .setColor(warningColor);
                return message.channel.send(noidembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

            if (!reason) reason = "No reason given!"


            if (!message.member.permissions.has("BAN_MEMBERS")) {
                let nopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing BAN_MEMBERS permission (user)")
                    .addField("required:", "BAN_MEMBERS permission", false)
                    .setColor(warningColor);
                return message.channel.send(nopermsembed);
            }

            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                let botnopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing BAN_MEMBERS permission (bot)")
                    .addField("required:", "BAN_MEMBERS permission", false)
                    .setColor(warningColor);
                return message.channel.send(botnopermsembed);
            }

            try {
                let unbanembed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setAuthor(message.author.username, message.author.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 1024
                    }))
                    .setTitle(`You've been unbanned in ${message.guild.name}`)
                    .addField('unbanned by', message.author.tag)
                    .addField('Reason', reason)
                    .setTimestamp();
                bannedMember.send(unbanembed).then(() =>
                    message.guild.members.unban(bannedMember, reason))
            } catch (e) {
                console.log(e)
            }
            let successfullyembed = new Discord.MessageEmbed()
                .setTitle("✅Success")
                .setDescription(`${bannedMember} has been unbanned.`)
                .setColor(okColor);
            message.channel.send(successfullyembed);

            //modlogs
            let doneembed = new Discord.MessageEmbed()
                .setTitle(`Moderation: Unban`)
                .setColor(embedColor)
                .setDescription(`${bannedMember.tag} has been unbanned by ${message.author.tag} because of ${reason}`)
            let sChannel = message.guild.channels.find(c => c.name === "shame-stream")
            sChannel.send(doneembed)

        }).catch(error => {
            let notbannedEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription(("This person is not banned from this server!"))
                .setColor(warningColor);
            return message.channel.send(notbannedEmbed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});

        })
    }
}


