module.exports = {
    config: {
        name: "say",
        description: "sends a message that was inputted to a channel",
        usage: "^2say",
        category: "owner",
        accessableby: "BOT owner",
        aliases: ["sy"]
    },
    run: async (bot, message, args) => {

    if(message.author.id !== "420839496263925767") return message.channel.send("Access Declined")
    
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }

    }
}