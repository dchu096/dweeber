const Discord = require('discord.js');

module.exports = async (bot,message, query, tracks) => {
    
    const scancelEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`${message.client.emotes.error} Command Cancelled`)
            .setDescription(`You did not provide a valid response`)

    message.channel.send(scancelEmbed);
};