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
        const userMention = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
        const memberMention = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

        let embedColor = "#87CEEB"

        const rolesofmember = memberMention.roles.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')

        let userinfo = {};
        userinfo.bot = userMention.bot;
        userinfo.createdat = userMention.createdAt;
        userinfo.discrim = userMention.discriminator;
        userinfo.id = userMention.id;
        userinfo.online = userMention.presence.status
        userinfo.presen = userMention.presence.game;
        userinfo.tag = userMention.tag;
        userinfo.uname = userMention.username;
        userinfo.allroles = rolesofmember;
        userinfo.permission = userMention.permission

        userinfo.avatar = userMention.avatarURL;

        var InfoEmbed = new Discord.RichEmbed()
            .setTitle(`About ${userinfo.uname}`)
            .setThumbnail(userinfo.avatar)
            .setColor(embedColor)
            .setAuthor(userinfo.uname, userinfo.avatar)
            .addField("status", userinfo.online, false)
            .addField("Botuser",userinfo.bot, true)
            .addField("Username",userinfo.uname, true)
            .addField("Discriminator",userinfo.discrim, true)
            .addField("Created At",userinfo.createdat, true)
            .addField("Client ID",userinfo.id, true)
            .addField("Presence",userinfo.presen, true)
            .addField("Roles", userinfo.allroles, false)
            .addField("permissions", userinfo.permission, true)
            .setFooter(`command called by ${userinfo.tag}`)



        message.channel.send(InfoEmbed);
    }
}