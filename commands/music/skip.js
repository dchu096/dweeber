const Discord = require("discord.js");

module.exports= {
  config: {
    name: 'queue',
    description: 'Resumes audio that was previously paused',
    usage: " ",
    category: "music",
    accessableby: "Members",
  },

run: async (client, message, args, config, queue) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("You are not in a voice channel!")

    const serverQueue = queue.get(message.guild.id)
    if (!serverQueue) return message.channel.send("There is nothing playing right now!")

    await message.channel.send("The player has been skipped!")
    return serverQueue.connection.dispatcher.end()
  }
}

