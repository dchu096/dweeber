const Discord = require('discord.js');

module.exports = {
    config: {
        name: "reload",
        description: "reloads a bot command!",
        usage: "!reload",
        category: "owner",
        accessableby: "Bot Owner",
        aliases: ["r"]
    },
    run: async (bot, message, args) => {
        let ownerid = "420839496263925767"
        if (message.author.id === ownerid) {
            //messages
            try {
                message.delete()
            } catch(e) {
                console.log(e); // [Error]
            }

            if (!args[0]) return message.channel.send("Please provide a command to reload!")

            let commandName = args[0].toLowerCase()

            try {
                delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
                bot.commands.delete(commandName)
                const pull = require(`./${commandName}.js`)
                bot.commands.set(commandName, pull)
            } catch (e) {
                return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
            }

            message.channel.send(`Command \`${args[0].toUpperCase()}\` reloaded!`)
        } else {
            let warningColor = '#FF0000' // color: red, change the hex for different color
            let deniedembed = new Discord.RichEmbed()
                .setTitle(`❌Error`)
                .setDescription(`This bot doesnt belong to you!`)
                .addField("required:", "bot developers", false)
                .setColor(warningColor)
            return message.reply(deniedembed).then(msg => msg.delete(10000)).then(() =>
                console.log(`${message.author.username} have been trying to access command reload`));
        }
    }
}