const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class pauseCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pause the current music',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

            guildOnly: true,

        });
    }


    async run(message) {
        if (!message.member.voice.channel) return message.channel.send("You are not in a vc");

        if (!message.guild.me.voice.channel) return message.channel.send("Im not in a VC! please do 2$join to call me in!")

        if (message.member.voice.channel !== message.guild.me.voice.channel) return

        if (!message.client.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        if (message.client.player.getQueue(message).paused) return message.channel.send(`Why are you trying to pause a music which is already paused !`);

        const success = message.client.player.pause(message);

        if (success) message.channel.send(`The Song ${message.client.player.getQueue(message).playing.title} paused !`);
    }
};