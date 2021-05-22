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
        const embedColor = '#87CEEB'; // color: skyblue

        const notinvcEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(`${message.client.emotes.error} You are not in a VC!`)
            if (!message.member.voice.channel) return message.channel.send(notinvcEmbed);
    
     const botnotinvcEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
             .setDescription(`${message.client.emotes.error} Im not in a VC! please do \`dwbr join\` to call me in!`)
    
            if (!message.guild.me.voice.channel) return message.channel.send(botnotinvcEmbed)
    
            if (message.member.voice.channel !== message.guild.me.voice.channel) return
    
     const nosongEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
             .setDescription(`${message.client.emotes.error} There is no song that are playing!`)
    
            if (!message.client.player.getQueue(message)) return message.channel.send(nosongEmbed);

        message.client.player.setRepeatMode(message, false);
        
        const success = message.client.player.stop(message);
        
        const stoppedEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
             .setDescription(`${message.client.emotes.success} The music have been stopped!`)

        if (success) message.channel.send(stoppedEmbed);
    }
};