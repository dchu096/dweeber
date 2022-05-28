const Discord = require("discord.js");

module.exports = {
    config: {
        name: "userinfo",
        description: "Pulls the userinfo of a member from the guild!",
        usage: "[@user/ID]",
        category: "info",
        accessableby: "Members",
        aliases: ["ui", "userrdesc"]
    },
    run: async (bot, message, args) => {
        const userMention = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        const memberMention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const statuses = {
            "online" : "🟢",
            "idle" : "🟠",
            "dnd" : "🔴",
            "offline" : "⚫️",
          }

        let embedColor = "#87CEEB"

        const rolesofmember = memberMention.roles.cache.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')

        let userinfo = {};
        userinfo.bot = userMention.bot;
        userinfo.createdat = userMention.createdAt;
        userinfo.discrim = userMention.discriminator;
        userinfo.id = userMention.id;
        userinfo.tag = userMention.tag;
        userinfo.uname = userMention.username;
        userinfo.allroles = rolesofmember;
        userinfo.permission = userMention.permission

        userinfo.avatar = userMention.avatarURL({ format: 'png', dynamic: true, size: 1024 });

        const InfoEmbed = new Discord.MessageEmbed()
            .setTitle(`About ${userinfo.uname}`)
            .setThumbnail(userinfo.avatar)
            .setColor(embedColor)
            .setAuthor(`${userinfo.uname}`, `${userinfo.avatar}`)
            .addField("status", `${statuses[memberMention.member.presence ? memberMention.presence.status : "offline"]} ${memberMention.presence ? memberMention.presence.status : "offline"}`, false)
            .addField("Botuser", userinfo.bot, true)
            .addField("Username", userinfo.uname, true)
            .addField("Discriminator", userinfo.discrim, true)
            .addField("Created At", userinfo.createdat, true)
            .addField("Client ID", userinfo.id, true)
            .addField("Roles", userinfo.allroles, false)
            .addField("permissions", userinfo.permission, true)
            .setFooter({ text: 'Dweeber >> UserInfo'});

        await message.channel.send({ embeds: [InfoEmbed] }).catch(O_o => {});
    }
}