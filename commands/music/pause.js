const Discord = require("discord.js");

module.exports= {
  config: {
    name: 'pause',
    description: 'pause the current music',
    usage: " ",
    category: "music",
    accessableby: "Members",
  },


  run: async (client, message, args, config, queue) => {
    if (!message.member.voice.channel) return message.channel.send("You need to join a vc before you can access to this command")

    const serverQueue = queue.get(message.guild.id)
    if (!serverQueue) return message.channel.send("No song is in the queue")
    if (!serverQueue.playing) return message.channel.send("The player is already paused!")

    serverQueue.playing = false
    serverQueue.connection.dispatcher.pause(true)
    return message.channel.send("The player has been paused!")
  }
}
