const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "shrug",
        description: "post the shrug emoji",
        usage: "^2shrug",
        category: "other",
        accessableby: "Members",
        aliases: ["bruh",]
    },
    run: async (bot, message, args) => {
        message.channel.send("¯\\_\(ツ)\_\/¯");

        message.delete();

    }

}
