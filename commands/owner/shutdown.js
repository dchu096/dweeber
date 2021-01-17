module.exports = {
    config: {
        name: "shutdown",
        description: "shuts down the bot!",
        usage: "F#shutdown",
        category: "owner",
        accessableby: "Bot Owner",
        aliases: ["botstop"]
    },
    run: async (bot, message, args) => {
        let ownerid = "420839496263925767"
        if (message.author.id === ownerid) {
    try {
        await message.channel.send("Shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)}
        } else
            {
                let warningColor = '#FF0000' // color: red, change the hex for different color
                let deniedembed = new Discord.RichEmbed()
                    .setTitle(`❌Error`)
                    .setDescription(`This bot doesnt belong to you!`)
                    .addField("required:", "bot developers", false)
                    .setColor(warningColor)
                return message.reply(deniedembed).then(msg => msg.delete(10000)).then(() =>
                    console.log(`${message.author.username} have been trying to access command shutdown`));
            }
    }
}