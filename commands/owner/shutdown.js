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

    if(message.author.id !== "420839496263925767") return message.channel.send("Access Denied! Only the bot owner can process.");

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


    }
}