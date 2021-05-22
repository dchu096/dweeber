const Discord = require('discord.js');

module.exports = async (bot, message, queue) => {
    
    const disconnectEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.error} - Music stopped as i have been disconnected from the channel`)

    message.channel.send(disconnectEmbed);
};