const { MessageEmbed, Permissions } = require("discord.js")
const {Signale} = require('signale');
const signale = new Signale();

module.exports = {
    config: {
        name: "clear",
        description: "clears a message",
        usage: "[amount]",
        category: "moderation",
        accessableby: "moderator",
        aliases: ["clr"]
    },
    run: async (bot, message, args) => {
        var embedColor = '#87CEEB' // color: skyblue

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have premssions to do that! [Required: MANAGE_MESSAGES]");

        if(!args[0]) return message.channel.send("No messages defined");



        message.delete()
        message.channel.bulkDelete(args[0]).then(() => {

            const clearedEmbed = new MessageEmbed()
	        .setColor(embedColor)
	        .setDescription(`Cleared ${args[0]} messages.`)
	        .setFooter({ text: 'Dweeber >> clear'})

            message.channel.send({ embeds: [clearedEmbed] }) .then(msg => {
                message.delete({ timeout: 30000 /*time unitl delete in milliseconds*/});
            })
        }).catch((err) => {
            signale.error(err)

        });


    }
    }




