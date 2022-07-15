const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Get the server information",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    run: async(client, interaction, args) => {

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

        let owner = await interaction.guild.fetchOwner()

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${interaction.guild.name}'s Information`)
        .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
        .addField('Server Name', `${interaction.guild.name}`, true)
        .addField(`Server ID:`, `${interaction.guild.id}`, true)
        .addField(`Server Owner:`, `${owner}`, true)
        .addField(`Server Created:`, `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>`, true)
        .addField("Verification Level", `${VerificationLevels[interaction.guild.verificationLevel]}`, true)
        .addField("Total | Humans | Bots", `${interaction.guild.members.cache.size} | ${interaction.guild.members.cache.filter(member => !member.user.bot).size} | ${interaction.guild.members.cache.filter(member => member.user.bot).size}`, true)
        .addField("Online | Offline", `${interaction.guild.members.cache.filter(member => member.presence && member.presence && member.presence.status != "offline").size} | ${interaction.guild.members.cache.filter(member => !member.presence || member.presence && member.presence.status == "offline").size}`, true)
        .addField("Total | Text | Voice", `${interaction.guild.channels.cache.size} | ${interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size} | ${interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size}`, true)
        .addField("Total Roles", `${interaction.guild.roles.cache.size}`, true)
        .addField(`Server Channels:`, `${interaction.guild.channels.cache.size}`)
        .addField("Server rules Channel", `${interaction.guild.rulesChannel ? `<#${interaction.guild.rulesChannelId}>`: "\`No Channel\`"}`, true)
        .addField("AFK Channel", `${interaction.guild.rulesChannel ? `<#${interaction.guild.afkChannelId}>`: "\`No Channel\`"}`, true)
        .setFooter({ text: 'Dweeber >> serverinfo'})

        interaction.reply({embeds: [embed]});

  
    }
}