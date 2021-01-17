const Discord = require("discord.js");

module.exports= {
  config: {
    name: 'nowplaying',
    description: 'Shows the current music',
    usage: " ",
    category: "music",
    accessableby: "Members",
    aliases: ["np"]
  },


  run: async (bot, message, args, config, queue) => {
    const serverQueue = queue.get(message.guild.id)
    if (!serverQueue) return message.channel.send("There is nothing playing right now!")

    return message.channel.send(`current song: **${serverQueue.songs[0].title}**`)
  }
}
