const Discord = require('discord.js');

module.exports = async (bot, message, queue) => {
    
    const emptyEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.error} - Music stopped as all members have left the vc!`)

    message.channel.send(emptyEmbed);
};
