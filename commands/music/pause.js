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

            let alreadypausedEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(`${message.client.emotes.error} You cant pause a song that is already paused!`)

        if (message.client.player.getQueue(message).paused) return message.channel.send(alreadypausedEmbed);

        const success = message.client.player.pause(message);
        
        let pausedEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(`${message.client.emotes.success} The Song ${message.client.player.getQueue(message).playing.title} paused!`)

        if (success) message.channel.send(pausedEmbed);
    }
};