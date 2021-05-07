const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class stopCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stops the music',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

        });
    }

    async run(message) {
        if (!message.member.voice.channel) return message.channel.send("You are not in a vc");

        if (!message.guild.me.voice.channel) return message.channel.send("Im not in a VC! please do 2$join to call me in!")


        if (message.member.voice.channel !== message.guild.me.voice.channel) return

        if (!message.client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);

        message.client.player.setRepeatMode(message, false);
        const success = message.client.player.stop(message);

        if (success) message.channel.send(`Music **stopped** into this server !`);
    }
};