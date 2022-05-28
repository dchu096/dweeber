const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const {Signale} = require('signale');

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
        const signale = new Signale();

        message.channel.send("Getting ping, please wait...").then(message => {
            let ping = message.createdTimestamp - message.createdTimestamp
            let pingEmbed = new MessageEmbed()
                .setColor(embedColor)
                .setTitle(`ping`)
                .setDescription(`Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
            message.edit({ embeds: [pingEmbed] })
        }).catch((err) => {
            signale.error(err)
        });
    }
}

