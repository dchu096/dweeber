const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class searchCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'search',
            group: 'music',
            memberName: 'search',
            description: 'Search the song',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

            args: [
                {
                    key: 'msearch',
                    prompt:
                        'Which song would you like to search?',
                    type: 'string'
                },


            ],

        });
    }

    async run(message, {msearch}) {
        if (!message.member.voice.channel) return message.channel.send("You are not in a vc");

        if (!message.guild.me.voice.channel) return message.channel.send("Im not in a VC! please do 2$join to call me in!")

        if (message.member.voice.channel !== message.guild.me.voice.channel) return


        message.client.player.play(message, msearch);
    }
};