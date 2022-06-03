const { ownerid } = require("@root/botconfig.json");
const { MessageEmbed } = require('discord.js');
const {Signale} = require('signale');
const signale = new Signale();


module.exports = {
    config: {
        name: "reload",
        description: "reloads a bot command!",
        usage: "command",
        category: "owner",
        accessableby: "Bot Owner",
        aliases: ["r"]
    },
    run: async (bot, message, args) => {

        const nopermsembed = new MessageEmbed()
        .setColor('#BC4A2C')
        .setTitle('You do not have permission to use this command! [Required: Bot Owner]')
    
        if(message.author.id !== ownerid) return message.channel.send({ embeds: [nopermsembed] });

    if(!args[0]) return message.channel.send("No command defined!");

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`..//${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`..//${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(err) {
        signale.error(err)
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
    }

    const reloadEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Reload success`)
    .setDescription(`Reloaded: \`${args[0].toUpperCase()}\``)
    .setFooter({ text: 'Dweeber >> reload'})

    message.channel.send({ embeds: [reloadEmbed] })

    }
}