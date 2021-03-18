const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
        name: "warn",
        description: "warns a member from this guild",
        usage: "[user/ID] [reason]",
        category: "moderation",
        accessableby: "Moderators",
    },
    run: async (bot, message, args) => {
        const embedColor = '#FFFF00'; // color: yellow, change the hex for different color
        const warningColor = '#ff0000';
        const muteColor = '#808080';
        const okColor = '#00ff00';

        let warnMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

        message.delete().catch(O_o => {});

        if(message.guild.member(warnMember)) {

            if (!warnMember) {
                let nopersonembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Warn user not defined")
                    .setColor(warningColor);
                return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
            }

            if (!reason) reason = "No reason given!"

            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
                let deniedembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("You do not have permission to warn members")
                    .setColor(warningColor);
                return message.channel.send(deniedembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
            }

            if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
                let botnopermsembed = new Discord.MessageEmbed()
                    .setTitle("❌Error")
                    .setDescription("Missing `MANAGE_MESSAGES` permission for bot.")
                    .setColor(warningColor);
                return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
            }

            if (!warns[`${warnMember.id}, ${message.guild.id}`]) warns[`${warnMember.id}, ${message.guild.id}`] = {
                warns: 0
            };

            warns[`${warnMember.id}, ${message.guild.id}`].warns++;

            fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
                if (err) throw err;
            });

            let warningEmbed = new Discord.MessageEmbed() // Creates the embed that's DM'ed to the user when their warned!
                .setColor(embedColor)
                .setAuthor(message.author.username, message.author.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle(`You've been warned in ${message.guild.name}`)
                .addField('Warned by', message.author.tag)
                .addField('Reason', reason)
                .addField('warnings:', warns[`${warnMember.id}, ${message.guild.id}`].warns)
                .setTimestamp();
            warnMember.send(warningEmbed); // DMs the user the above embed!

            const warnSuccessfulEmbed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
                .setColor(embedColor)
                .setTitle(`${warnMember.user.tag} has been warned`);
            await message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed

            let doneembed = new Discord.MessageEmbed()
                .setTitle(`Moderation: Warn`)
                .setColor(embedColor)
                .setDescription(`${warnMember.user.tag} has been warned by ${message.author.tag} because of ${reason}`)
            let sChannel = message.guild.channels.cache.find(c => c.name === "shame-stream")
            sChannel.send(doneembed).catch(O_o => {});


            if (warns[`${warnMember.id}, ${message.guild.id}`].warns === 3) {
                let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted')

                let mutetime = "1m";
                await message.guild.members.get(warnMember.id).roles.add(muteRole.id);
                let muteembed3i = new Discord.MessageEmbed()
                    .setColor(muteColor)
                    .setDescription(`${warnMember.user.tag} has been muted for ${mutetime} [3 infractions]`)
                message.channel.send(muteembed3i).then(warnMember.send(`You have been muted in ${message.guild.name} for ${mutetime} due to 3 infractions!`))

                setTimeout(function () {
                    message.guild.members.get(warnMember.id).roles.remove(muteRole.id);
                    let unmuteembed3i = new Discord.MessageEmbed()
                        .setColor(okColor)
                        .setDescription(`${warnMember.user.tag} has been unmuted [duration up]`)
                    message.channel.send(unmuteembed3i).then(warnMember.send(`You have been unmuted in ${message.guild.name}`))
                }, ms(mutetime))
            }

            if (warns[`${warnMember.id}, ${message.guild.id}`].warns === 4) {
                let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted')

                let mutetime = "1h";
                await message.guild.members.get(warnMember.id).roles.add(muteRole.id);
                let muteembed4i = new Discord.MessageEmbed()
                    .setColor(muteColor)
                    .setDescription(`${warnMember.user.tag} has been muted for ${mutetime} [3 infractions]`)
                message.channel.send(muteembed4i).then(warnMember.send(`You have been muted in ${message.guild.name} for ${mutetime} due to 4 infractions!`))

                setTimeout(function () {
                    message.guild.members.get(warnMember.id).roles.remove(muteRole.id)
                    let unmuteembed4i = new Discord.MessageEmbed()
                        .setColor(okColor)
                        .setDescription(`${warnMember.user.tag} has been unmuted [duration up]`)
                    message.channel.send(unmuteembed4i).then(warnMember.send(`You have been unmuted in ${message.guild.name}`))
                }, ms(mutetime))
            }

            if (warns[`${warnMember.id}, ${message.guild.id}`].warns === 5) {
                let muteRole = message.guild.roles.find(r => r.name === 'Muted')
                await message.guild.members.get(warnMember.id).roles.add(muteRole.id);
                let muteembed5i = new Discord.MessageEmbed()
                    .setColor(muteColor)
                    .setDescription(`${warnMember.user.tag} has been permanently muted [5 infractions]`)
                message.channel.send(muteembed5i).then(warnMember.send(`You have been permanently muted in ${message.guild.name} due to 5 infractions!`))
            }
        } else {
            let usernotfoundEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This member is not in this server!")
                .setColor(warningColor);
            return message.channel.send(usernotfoundEmbed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});}
        }
}