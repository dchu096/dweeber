const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class removeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            group: 'music',
            memberName: 'remove',
            description: 'remove the specific song',
            clientPermissions: [
                'SPEAK'
            ],
            userPermissions: [
                'CONNECT'
            ]
        });
    }

    async run(message) {

        if (message.author.bot || message.channel.type === "dm") return;
    }
}