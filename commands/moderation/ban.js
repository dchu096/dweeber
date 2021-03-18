const Commando = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class BanCommand extends Commando.Command {
constructor(client) {
    super(client, {
        name: 'ban',
        group: 'moderation',
        memberName: 'ban',
        description: 'Bans a user from the guild',
        clientPermissions: [
            'BAN_MEMBERS'
        ],
        userPermissions: [
            'BAN_MEMBERS'
        ],

        args: [
            {
                key: 'bMember',
                prompt:
                    'Please mention the user you want to ban with @ or provide his ID',
                type: 'string'
            },

            {
                key: 'reasoning',
                prompt:
                'Please provide a reason',
                type: 'string',
                default: 'no reason provided!'
            }
        ],

        guildOnly: true,

    });
}
async run(msg,  {bMember, reasoning}) {
    let banMember = msg.mentions.users.first() || await msg.client.users.fetch(bMember)

    // MESSAGES

    if (!banMember)
        return msg.channel.send('You must provide a valid user');

    msg.delete()

    msg.guild.fetchBan(banMember).then((bansUser) => {

        return msg.channel.send('The defined user is already banned').then(msg => msg.delete({timeout: 5000}))
    }).catch(error => {

        /* Code when the user isn't banned */

        let banembed = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
            }))
            .setTitle(`You've been banned in ${msg.guild.name}`)
            .addField('Banned by', msg.author.tag)
            .addField('Reason', reasoning)
            .setTimestamp();
        banMember.send(banembed).catch(O_o => {});

        msg.guild.members.ban(banMember, {days: 7, reason: reasoning}).then(msg.channel.send(`${banMember} have been banned.`)).catch(O_o => {});

        //modlogs
        let doneembed = new Discord.MessageEmbed()
            .setTitle(`Moderation: Ban`)
            .setColor(embedColor)
            .setDescription(`${banMember.tag} has been banned by ${msg.author.tag} because of ${reasoning}`)
        let sChannel = msg.guild.channels.cache.find(c => c.name === "shame-stream")
        sChannel.send(doneembed).catch(O_o => {
        })

})
}
}


