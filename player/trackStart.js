const Discord = require('discord.js');

module.exports = async (bot, message, track) => {
    
    let YTEmoji = '<a:ag_yt:781395515526348801>'
    let scEmoji = '<:ag_soundcloud:845243449553059853>'
    
      if (message.content.includes('youtube.com')) { //if it contains an invite link
          
           const ytEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${YTEmoji} - Now playing ${track.title}`)

    message.channel.send(ytEmbed);
  } else if (message.content.includes('soundcloud.com')) { //if it contains an invite link
          
           const scEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${scEmoji} - Now playing ${track.title}`)

    message.channel.send(scEmbed);
    
   
} else {
     const songEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
    		.setTitle(`Playing in ${message.member.voice.channel.name}`)
            .setDescription(`${message.client.emotes.music} - Now playing ${track.title}`)

    message.channel.send(songEmbed);
}
};


