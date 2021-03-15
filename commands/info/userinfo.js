const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class userinfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'info',
            memberName: 'userinfo',
            description: 'shows your information',
            clientPermissions: [
                'SEND_MESSAGES'
            ],
            userPermissions: [
                'SEND_MESSAGES'
            ],

        });
    }
    async run(msg, args) {


        const userMention = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]) || msg.author;
        const memberMention = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;

        let embedColor = "#87CEEB"

        const rolesofmember = memberMention.roles.cache.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')

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

        userinfo.avatar = userMention.avatarURL({ format: 'png', dynamic: true, size: 1024 });

        const InfoEmbed = new Discord.MessageEmbed()
            .setTitle(`About ${userinfo.uname}`)
            .setThumbnail(userinfo.avatar)
            .setColor(embedColor)
            .setAuthor(userinfo.uname, userinfo.avatar)
            .addField("status", userinfo.online, false)
            .addField("Botuser", userinfo.bot, true)
            .addField("Username", userinfo.uname, true)
            .addField("Discriminator", userinfo.discrim, true)
            .addField("Created At", userinfo.createdat, true)
            .addField("Client ID", userinfo.id, true)
            .addField("Presence", userinfo.presen, true)
            .addField("Roles", userinfo.allroles, false)

        await msg.channel.send(InfoEmbed).catch(O_o => {});

    }
}
