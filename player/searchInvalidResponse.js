const Discord = require('discord.js');

module.exports = async (bot, message, query, tracks, content, collector) => {
    
     if (content === 'cancel') {
        collector.stop();
         
          const cancelledEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.success} - The selection has been **cancelled**`)

    return message.channel.send(cancelledEmbed);
     
     } else message.channel.send(`${message.client.emotes.error} - You must send a valid number between **1** and **${tracks.length}** !`);
};