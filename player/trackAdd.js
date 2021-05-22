const Discord = require('discord.js');

module.exports = async (bot, message, queue, track) => {
    
    const addqueueEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.music} - ${track.title} has been added to the queue`)

    message.channel.send(addqueueEmbed);
};