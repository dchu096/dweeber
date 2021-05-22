const Discord = require('discord.js');

module.exports = async (bot, message, query) => {
    
    const nresultsEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.error} - No results found on YouTube for ${query}`)

    message.channel.send(nresultsEmbed);
};