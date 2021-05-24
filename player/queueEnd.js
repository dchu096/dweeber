const Discord = require('discord.js');

module.exports = async (bot, message, queue) => {
    
    const stoppedEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.error} - As theres no more music queued, the music has now stopped!`)

    message.channel.send(stoppedEmbed);
};
