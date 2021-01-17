const Discord = require("discord.js");

module.exports = {
    config: {
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: "[user] [reason]",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args) => {
        const embedColor = '#00ff00' // color: grey, change the hex for different color
        const mutedColor = '#808080';
        const warningColor = '#ff0000';
        const okColor = '#00ff00';
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        let reason = args.slice(2).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word


        // MESSAGES

        message.delete().catch(O_o => {});

        if (!mutee.roles.cache.find(r => r.name === 'Muted')) {

            if (!mutee) {
                let nopersonembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing target user to mute")
                    .addField("required:", "mentions/ID", false)
                    .setColor(warningColor);
                return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

            if (!reason) reason = "No reason given!"

            if (!message.member.permissions.has("MANAGE_ROLES")) {
                let nopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing MANAGE_ROLES permission (user)")
                    .addField("required:", "MANAGE_MESSAGES permission", false)
                    .setColor(warningColor);
                return message.channel.send(nopermsembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

                if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
                    let botnopermsembed = new Discord.MessageEmbed()
                        .setTitle("❌Error")
                        .setDescription("Missing MANAGE_ROLES permission (bot)")
                        .addField("required:", "MANAGE_ROLES permission", false)
                        .setColor(warningColor);
                    return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                    });
                }

                //add mute role
                try {
                    await mutee.roles.add(muterole);
                } catch (err) {
                    console.log(err)
                }
                //sends the user the muted embed
                let unmutedembed = new Discord.MessageEmbed()
                    .setColor(embedColor)
                    .setAuthor(message.author.username, message.author.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 1024
                    }))
                    .setTitle(`You've been muted in ${message.guild.name}`)
                    .addField('Muted by', message.author.tag)
                    .addField('Reason', reason)
                    .addField("duration", "permanent")
                    .setTimestamp();
                mutee.send(unmutedembed).catch(O_o => {
                });

                //successful embeds
                let successfullyembed = new Discord.MessageEmbed()
                    .setTitle(`✅Success`)
                    .setDescription(`${mutee.user.tag} has been muted.`)
                    .setColor(okColor);
                await message.channel.send(successfullyembed).catch(O_o => {
                });


                //modlogs
                let doneembed = new Discord.MessageEmbed()
                    .setTitle(`Moderation: Mute`)
                    .setColor(mutedColor)
                    .setDescription(`${mutee.user.tag} has been muted by ${message.author.tag} because of ${reason}`)
                let sChannel = message.guild.channels.cache.find(c => c.name === "shame-stream")
                sChannel.send(doneembed).catch(O_o => {
                });

            } else {
                let alreadymutedembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("This member is not muted!")
                    .setColor(warningColor);
                return message.channel.send(alreadymutedembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});}
        }
}