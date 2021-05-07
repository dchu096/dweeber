const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class joinCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Join the current VC!',
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

        if (!message.guild.me.voice.channel) {
            message.member.voice.channel.join().then(message.channel.send("Ok got in the VC."))
        }

        if (message.member.voice.channel !== message.guild.me.voice.channel) return
    }
};