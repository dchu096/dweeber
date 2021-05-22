const Discord = require('discord.js');

module.exports = async (bot, message, queue, playlist) => {
    
    const paEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.music} - ${playlist.title} has been added to the queue. The queue now has **${playlist.tracks.length}** songs`)

    message.channel.send(paEmbed);
};