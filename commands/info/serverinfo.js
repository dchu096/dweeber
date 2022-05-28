const Discord = require("discord.js");

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
            .addField("server ID", message.guild.id, true)
            .addField("Total | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
            .addField("Total | Text | Voice", `${message.guild.channels.cache.size} | ${message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size} | ${message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size}`, true)
            .addField("Verification Level", `${VerificationLevels[message.guild.verificationLevel]}`, true)
            .addField("Channels", `${message.guild.channels.cache.size}`, true)
            .addField("Roles", `${message.guild.roles.cache.size}`, true)
            .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setFooter({ text: 'Dweeber >> Serverinfo'});

        await message.channel.send({ embeds: [ServerInfoEmbed] });
    }
}