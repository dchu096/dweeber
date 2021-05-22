const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class volumeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            group: 'music',
            memberName: 'volume',
            description: 'Adjust the volume',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],
            
             args: [
        {
          key: 'volume',
          default: '',
          type: 'integer',
          prompt: 'What is the volume you will like to set'
        }
      ]

        });
    }

    async run(message, {volume}) {
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

        if (!volume || isNaN(volume) || volume === 'Infinity') return message.channel.send(`Please enter a valid number !`);

        if (Math.round(parseInt(volume)) < 1 || Math.round(parseInt(volume)) > 100) return message.channel.send(` Please enter a valid number (between 1 and 100) !`);

        const success = message.client.player.setVolume(message, parseInt(volume));

        if (success) message.channel.send(`Volume set to **${parseInt(volume)}%** !`);
    }
};