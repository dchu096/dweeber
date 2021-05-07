const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class clearqueueCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clearqueue',
            group: 'music',
            memberName: 'clearqueue',
            description: 'Clears the queue',
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
        
  const notinvcEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`You are not in a VC!`)
     
        if (!message.member.voice.channel) return message.channel.send(notinvcEmbed);

        const botnotinvcEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
         .setDescription(`Im not in a VC! please do \`2$join\` to call me in!`)

        if (!message.guild.me.voice.channel) return message.channel.send("botnotinvcEmbed")
        
        const nosongEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
         .setDescription(`there is no song that are playing!`)

        if (!message.client.player.getQueue(message)) return message.channel.send(nosongEmbed);
        
        const singlesongEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription(`This is the last song!`)

        if (message.client.player.getQueue(message).tracks.length <= 1) return message.channel.send(singlesongEmbed);

        message.client.player.clearQueue(message);
        
        const removedEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription(`The queue is now removed!`)

        message.channel.send(removedEmbed);
    }
}