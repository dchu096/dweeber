const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class loopCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            group: 'music',
            memberName: 'loop',
            aliases: ['repeat', 're'],
            description: 'Loop the current music',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

            args: [
                {
                    key: 'lsong',
                    prompt:
                        'Would you like to repeat the current song or queue?',
                    type: 'string',
                    oneOf: ['queue', 'song'],
                },
            ],

            guildOnly: true,

        });
    }


    async run(message, {lsong}) {
        
           const notinvcEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`You are not in a VC!`)
        if (!message.member.voice.channel) return message.channel.send(notinvcEmbed);
        
         const botnotinvcEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
         .setDescription(`Im not in a VC! please do \`2$join\` to call me in!`)

        if (!message.guild.me.voice.channel) return message.channel.send(botnotinvcEmbed)

        if (message.member.voice.channel !== message.guild.me.voice.channel) return

       const nosongEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
         .setDescription(`there is no song that are playing!`)

        if (!message.client.player.getQueue(message)) return message.channel.send(nosongEmbed);

        if (lsong.toLowerCase() === 'queue') {
            if (message.client.player.getQueue(message).loopMode) {
                message.client.player.setLoopMode(message, false);
                
                const loopqueuedisabled = new Discord.MessageEmbed()
                		.setColor('#0099ff')
         .setDescription(`Loop mode are now disabled for this queue!`)
                          
                return message.channel.send(loopqueuedisabled);
                
            } else {
                message.client.player.setLoopMode(message, true);
                
 				const loopqueueenabled = new Discord.MessageEmbed()
                		.setColor('#0099ff')
         .setDescription(`Loop mode are now enabled for this queue!`)
                
                return message.channel.send(loopqueueenabled);
            };
        } else {
            if (lsong.toLowerCase() === 'song') {
            if (message.client.player.getQueue(message).repeatMode) {
                message.client.player.setRepeatMode(message, false);
                
                const loopsongdisabled = new Discord.MessageEmbed()
                		.setColor('#0099ff')
         .setDescription(`Loop mode are now disabled for this song!`)
                
                return message.channel.send(loopsongdisabled);
            } else {
                message.client.player.setRepeatMode(message, true);
                
                const loopsongenabled = new Discord.MessageEmbed()
                		.setColor('#0099ff')
         .setDescription(`Loop mode are now enabled for this song!`)
                
                return message.channel.send(loopsongenabled);
            }
            };
        };
    }
};