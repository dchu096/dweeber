const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class leaveCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Leave the current VC!',
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
         .setDescription(`${message.client.emotes.error} Im not in a VC!`)
        
         const leftEmbed = new Discord.MessageEmbed()
	.setColor(embedColor)
	.setDescription(`${message.client.emotes.success} Left VC ${message.member.voice.channel.name}.`)
         
         message.channel.send(leftEmbed)

        if (message.guild.me.voice.channel) {
            message.member.voice.channel.leave()
        }

        if (message.member.voice.channel !== message.guild.me.voice.channel) return
    }
};