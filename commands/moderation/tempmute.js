const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const ms = require("ms");

module.exports = class tempmuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'tempmute',
            group: 'moderation',
            memberName: 'tempmute',
            description: 'mute a user for a specific time',
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
                },

                {
                    key: 'tduration',
                    prompt:
                    'Please provide a time',
                    type: 'integer',
                    default: '10m'
                }

            ],

            guildOnly: true,


        });
    }
    async run(msg, {mMember, reasoning, tduration}) {

        let mutee = msg.mentions.members.first() || msg.guild.members.cache.get(mMember);
        let muterole = msg.guild.roles.cache.find(r => r.name === "Muted")

        // MESSAGES

        msg.delete()

        if (!mutee.roles.cache.find(r => r.name === 'Muted')) {

            //disallow muting self/set reason/permission
            if (!tduration) {
                let apilimitembed = new Discord.MessageEmbed()
                    .setTitle("❌API limit")
                    .setDescription("required:", "Time must be less then 14 days")
                return msg.channel.send(apilimitembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }

            if (!tduration || tduration > 1209600000) { // Cap at 14 days, larger than 24.8 days causes integer overflow
                let apilimitembed2 = new Discord.MessageEmbed()
                    .setTitle("❌API limit")
                    .setDescription("required:", "Time must be less then 14 days")
                return msg.channel.send(apilimitembed2).then(msg => msg.delete({timeout: 10000})).catch(O_o => {
                });
            }


            //add mute role
            try {
                await mutee.roles.add(muterole);
            } catch (err) {
                console.log(err)
            }
            //sends the user the muted embed
            let mutedembed = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle(`You've been muted in ${msg.guild.name}`)
                .addField('Muted by', msg.author.tag)
                .addField('Reason', reasoning)
                .addField('duration', ms(tduration))
                .setTimestamp();
            mutee.send(mutedembed).catch(O_o => {
            });

            //successful embeds
            await msg.channel.send(`${mutee.user.tag} has been muted. [${ms(tduration, {long: false})}]`).catch(O_o => {});


            //modlogs
            let doneembed = new Discord.MessageEmbed()
                .setTitle(`Moderation: Mute`)
                .setDescription(`${mutee.user.tag} has been muted by ${msg.author.tag} for ${ms(tduration, {long: true})} because of ${reasoning}`)
            let sChannel = msg.guild.channels.cache.find(c => c.name === "shame-stream")
            sChannel.send(doneembed).catch(O_o => {});


            // Unmute member
            mutee.timeout = msg.client.setTimeout(async () => {
                try {
                    await mutee.send("You have been unmuted")
                    await mutee.roles.remove(muterole);
                    await msg.channel.send(`${mutee} have been unmuted [duration up]`);
                } catch (e) {
                    console.log(e)
                }
            }, tduration);
        } else {
            let alreadymutedembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This member is already muted")
            return msg.channel.send(alreadymutedembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }


    }
}