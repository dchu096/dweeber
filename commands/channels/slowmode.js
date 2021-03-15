const Commando = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class BanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'slowmode',
            group: 'channels',
            memberName: 'slowmode',
            description: 'Sets a slowmode of a channel',
            clientPermissions: [
                'MANAGE_CHANNELS'
            ],
            userPermissions: [
                'MANAGE_CHANNELS'
            ],

            guildOnly: true,

            args: [
                {
                    key: 'time',
                    prompt:
                        'Please say the time you would like to set the slowmode to in seconds',
                    type: 'integer'
                }
            ]


        });
    }
    async run(msg,  {time}) {

        await msg.channel.setRateLimitPerUser(time).then(msg.reply(`Channel slowmode have been set to ${time}`))
    }
}