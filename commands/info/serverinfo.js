const Discord = require("discord.js");
const moment = require("moment")

module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: " ",
        category: "info",
        accessableby: "Members",
        aliases: ["server", "serverdesc"]
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB';

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days === 1 ? " day" : " days") + " ago";
        }

        let VerificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        const owner = await message.guild.fetchOwner();


        const ServerInfoEmbed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent
            .setColor(embedColor)
            .setTitle("Server Info")
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField(`Server Name:`, `${message.guild.name}`, true)
            .addField(`Server ID:`, `${message.guild.id}`, true)
            .addField(`Server Owner:`, `${owner.user.tag}`, true)
            .addField("Member Count:", `${message.guild.memberCount}`, true)
            .addField("Role Count:", `${message.guild.roles.cache.size}`, true)
            .addField("Verification Level", `${VerificationLevels[message.guild.verificationLevel]}`, true)
            .addField("Total | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
            .addField("Total | Text | Voice", `${message.guild.channels.cache.size} | ${message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size} | ${message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size}`, true)
            .addField("Online | Offline", `${message.guild.members.cache.filter(member => member.presence && member.presence && member.presence.status != "offline").size} | ${message.guild.members.cache.filter(member => !member.presence || member.presence && member.presence.status == "offline").size}`, true)
            .addField("Roles", `${message.guild.roles.cache.size}`, true)
            .addField("Creation Date", `<t:${parseInt(message.guild.createdTimestamp / 1000)}:R>`, true)
            .addField("Joined Date", `<t:${parseInt(message.member.joinedTimestamp / 1000)}:R>`, true)
            .addField("Rules Channel", `${message.guild.rulesChannel ? `<#${message.guild.rulesChannelId}>`: "\`No Channel\`"}`, true)
            .addField("AFK Channel", `${message.guild.rulesChannel ? `<#${message.guild.afkChannelId}>`: "\`No Channel\`"}`, true)



            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setFooter({ text: 'Dweeber >> Serverinfo'});

        await message.channel.send({ embeds: [ServerInfoEmbed] });
    }
}
