const { MessageEmbed } = require('discord.js');
const {Signale} = require('signale');
const signale = new Signale();


module.exports = {
    config: {
        name: "ping",
        description: "PONG! Displays the api & bot latency",
        usage: "./ping",
        category: "info",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        var embedColor = '#87CEEB' // color: skyblue

        message.channel.send("Getting ping, please wait...").then(message => {
            setTimeout(() => message.delete(), 5000)
            let oldate = new Date().getMilliseconds()
            let newtime = new Date().getMilliseconds() - oldate;
            if(newtime < 0) newtime *= -1;
            if(newtime > 10) newtime = Math.floor(newtime / 10);
            let pingEmbed = new MessageEmbed()
                .setColor(embedColor)
                .setTitle(`ping`)
                .setDescription(`Bot Latency: \`${Math.floor(bot.ws.ping + new Date().getMilliseconds() - oldate)}\`, Host Latency: \`${Math.floor(new Date().getMilliseconds() - oldate)}\` , API Latency: \`${Math.floor(bot.ws.ping)}\``)
                .setFooter({ text: 'Dweeber >> Ping'});
            message.channel.send({ embeds: [pingEmbed] })
        }).catch((err) => {
            signale.error(err)
        });
    }
}

