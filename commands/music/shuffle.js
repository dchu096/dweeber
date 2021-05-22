const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class shuffleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'shuffle',
            group: 'music',
            memberName: 'shuffle',
            description: 'Shuffle the current queue',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

        });
    }

    async run(client, message) {
        if (!message.member.voice.channel) return message.channel.send("You are not in a vc");

        if (!message.guild.me.voice.channel) return message.channel.send("Im not in a VC! please do 2$join to call me in!")

        if (message.member.voice.channel !== message.guild.me.voice.channel) return

        if (!message.client.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        const success = message.client.player.shuffle(message);

        if (success) message.channel.send(`Queue shuffled **${message.client.player.getQueue(message).tracks.length}** song(s) !`);
    }
};