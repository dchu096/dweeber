const Discord = require("discord.js")
module.exports = {
    config: {
        name: "ping",
        description: "PONG! Displays the api & bot latency",
        usage: "^2ping",
        category: "other",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        var embedColor = '#87CEEB' // color: skyblue

        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let choices = ["My ping details"]
            let response = choices[Math.floor(Math.random() * choices.length)]

        var Embed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle("Ping")
            .addField(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)

            m.edit(Embed)
    })
  }
}