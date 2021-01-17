const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    config: {
        name: "tempmute",
        description: "temporary Mute a member in the server!",
        usage: "[user/ID] [duration] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        const embedColor = '#514f48' // color: grey, change the hex for different color
        const warningColor = '#ff0000';
        const mutedColor = '#808080';
        const okColor = '#00ff00';
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        let reason = args.slice(2).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        let duration = ms(args[1])

        // MESSAGES

        message.delete().catch(O_o => {});



        if (!mutee.roles.cache.find(r => r.name === 'Muted')) {
            //define muted user
            if (!mutee) {
                let nopersonembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing target user to mute")
                    .addField("required:", "mentions/ID", false)
                    .setColor(warningColor);
                return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
            }

            //disallow muting self/set reason/permission
            if (!args[1]) {
                let apilimitembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("API limit")
                    .addField("required:", "Time must be less then 14 days", false)
                    .setColor(warningColor);
                return message.channel.send(apilimitembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

            if (!duration || duration > 1209600000) { // Cap at 14 days, larger than 24.8 days causes integer overflow
                let apilimitembed2 = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("API limit")
                    .addField("required:", "Time must be less then 14 days", false)
                    .setColor(warningColor);
                return message.channel.send(apilimitembed2).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
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
            let mutedembed = new Discord.MessageEmbed()
                .setColor(mutedColor)
                .setAuthor(message.author.username, message.author.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle(`You've been muted in ${message.guild.name}`)
                .addField('Muted by', message.author.tag)
                .addField('Reason', reason)
                .addField('duration', ms(duration))
                .setTimestamp();
            mutee.send(mutedembed).catch(O_o => {
            });

            //successful embeds
            let successfullyembed = new Discord.MessageEmbed()
                .setDescription(`${mutee.user.tag} has been muted. [${ms(duration, {long: true})}]`)
                .setColor(mutedColor);
            await message.channel.send(successfullyembed).catch(O_o => {});


            //modlogs
            let doneembed = new Discord.MessageEmbed()
                .setTitle(`Moderation: Mute`)
                .setColor(embedColor)
                .setDescription(`${mutee.user.tag} has been muted by ${message.author.tag} for ${ms(duration, {long: true})} because of ${reason}`)
            let sChannel = message.guild.channels.cache.find(c => c.name === "shame-stream")
            sChannel.send(doneembed).catch(O_o => {});


            // Unmute member
            mutee.timeout = message.client.setTimeout(async () => {
                try {
                    await mutee.send("You have been unmuted")
                    await mutee.roles.remove(muterole);
                    const unmuteEmbed = new Discord.MessageEmbed()
                        .setDescription(`${mutee.user.tag} has been unmuted. [duration due]`)
                        .setColor(okColor);
                    await message.channel.send(unmuteEmbed);
                } catch (e) {
                    console.log(e)
                }
            }, duration);
        } else {
            let alreadymutedembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This member is already muted")
                .setColor(warningColor);
            return message.channel.send(alreadymutedembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }
    }
};
