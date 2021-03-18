const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class muteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'mute a specific user',
            clientPermissions: [
                'MANAGE_ROLES'
            ],
            userPermissions: [
                'MANAGE_ROLES'
            ],


            args: [
                {
                    key: 'mMember',
                    prompt:
                        'Please mention the user you want to mute with @ or provide his ID',
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
    async run(msg, {mMember, reasoning}) {

        let mutee = msg.mentions.members.first() || msg.guild.members.cache.get(mMember);
        let muterole = msg.guild.roles.cache.find(r => r.name === "Muted")


        // MESSAGES

        msg.delete()

        if (!mutee.roles.cache.find(r => r.name === 'Muted')) {

            //add mute role
            try {
                await mutee.roles.add(muterole);
            } catch (err) {
                console.log(err)
            }
            //sends the user the muted embed
            let muteEmbed = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle(`You've been muted in ${msg.guild.name}`)
                .addField('Muted by', msg.author.tag)
                .addField('Reason', reasoning)
                .addField("duration", "permanent")
                .setTimestamp();
            mutee.send(muteEmbed).catch(O_o => {});

           msg.channel.send(`${mutee} have been muted`)


            //modlogs
            let doneembed = new Discord.MessageEmbed()
                .setTitle(`Moderation: Mute`)
                .setDescription(`${mutee.user.tag} has been muted by ${msg.author.tag} because of ${reasoning}`)
            let sChannel = msg.guild.channels.cache.find(c => c.name === "shame-stream")
            sChannel.send(doneembed).catch(O_o => {
            });

        } else {
            let alreadymutedembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This member is already muted!")
            return msg.channel.send(alreadymutedembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});}


    }
}
