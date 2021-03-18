const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class unbanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            group: 'moderation',
            memberName: 'unban',
            description: 'unban a user',
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
                        'Please mention the user you want to unban with his ID',
                    type: 'integer'
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
    async run(msg, {bMember, reasoning}) {


        let bannedMember = await msg.client.users.fetch(bMember)

        if (!banMember)
            return msg.channel.send('You must provide a valid user');

        //Messages
        msg.delete()


        msg.guild.fetchBan(bannedMember).then((bansUser) => {

            if (!banMember)
                return msg.channel.send('You must provide a valid user');


            try {
                let unbanembed = new Discord.MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 1024
                    }))
                    .setTitle(`You've been unbanned in ${msg.guild.name}`)
                    .addField('unbanned by', msg.author.tag)
                    .addField('Reason', reasoning)
                    .setTimestamp();
                bannedMember.send(unbanembed).catch(O_o => {
                });

                msg.guild.members.unban(bannedMember, reasoning).then(msg.channel.send(`${banMember} have been unbanned.`)).catch(O_o => {
                });

                //modlogs
                let doneembed = new Discord.MessageEmbed()
                    .setTitle(`Moderation: Unban`)
                    .setDescription(`${bannedMember.tag} has been unbanned by ${msg.author.tag} because of ${reasoning}`)
                let sChannel = msg.guild.channels.find(c => c.name === "shame-stream")
                sChannel.send(doneembed).catch(O_o => {
                })
            } catch (e) {
                console.log(e)
            }
        })

    }
}


