const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class nickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'nick',
            group: 'moderation',
            memberName: 'nick',
            description: 'Set a nickname of a specific user',
            clientPermissions: [
                'MANAGE_NICKNAMES'
            ],
            userPermissions: [
                'MANAGE_NICKNAMES'
            ],

            args: [
                {
                    key: 'nMember',
                    prompt:
                        'Please mention the user you want to set nick with @ or provide his ID',
                    type: 'string'
                },

                {
                    key: 'unick',
                    prompt:
                        'Please provide a nickname',
                    type: 'string',
                }
            ],

            guildOnly: true,

        });
    }
    async run(msg, {nMember, unick}) {



        let nUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(nMember));

        if (!nUser) {
            return msg.channel.send("You need to provide a user")
        }

        // MESSAGES
        msg.delete()

        let prevName = nUser.user.username; //user's previous name before they get nicked

        try {
            await msg.guild.members.cache.get(nUser).setNickname(unick);
        } catch(e) {
            console.log(e)
        }


        await msg.channel.send(`${nUser} nick have been changed to ${unick}`).catch(O_o => {});

        //modlogs
        let doneembed = new Discord.MessageEmbed()
            .setTitle(`Moderation: Setnick`)
            .setDescription(`${nUser.user.tag} has been renamed by ${msg.author.tag} to ${unick}`)
        let sChannel = msg.guild.channels.cache.find(c => c.name === "shame-stream")
        sChannel.send(doneembed).catch(O_o => {});


    }
}