const Discord = require('discord.js');
const { Signale } = require('signale');

const logger = new Signale({ scope: 'Discord' });

module.exports = {
    config: {
        name: "nuke",
        description: "nuke the channel",
        usage: "[channel]",
        category: "channels",
        accessableby: "Moderators",
    },

    run: async (message) => {

        let nChannel = message.mentions.channels.first() || message.channel;

        const embedColor = '#87CEEB'; // color: skyblue

        const {Confirmation} = require('discord-interface');

        let replyMessage = message.reply(`Are you sure you want to nuke the channel ${nChannel}? **This operation cannot be undone!** Please think carefully. Reply with "yes" to confirm. Operation expires after 10s`);

        let filter = message => message.author.id == message.author.id && message.content.toLowerCase() == 'yes';
        message.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
            if (!replyMessage.deleted) replyMessage.delete();
            if (!collected.first().deteled) collected.first().delete();

            confirmation.on('confirmation', confirmed => {
                if (confirmed) {

                    let confirmedEmbed = new Discord.MessageEmbed()
                        .setColor(embedColor)
                        .setDescription(`${message.client.emotes.success} Thanks for confirming, the channel will be nuked in 3 seconds.`)

                    message.reply(confirmedEmbed)
                    message.channel.clone({
                        parent: `${nChannel.parentID}`,
                        position: message.channel.rawPosition
                    }).then(channel => {

                        let nukedEmbed = new Discord.MessageEmbed()
                            .setColor(embedColor)
                            .setDescription(`${message.client.emotes.success} Channel have been nuked`)
                            .setImage('https://i.gifer.com/6Ip.gif')

                        channel.send(nukedEmbed)
                    }).catch((err) => {
                        message.reply(`${message.client.emotes.error} An error occured!`).then(() => {
                            console.log(err).then(logger.error(`An error occured in ${message.guild.name} using command nuke`))
                        });

                    });

                    setTimeout(function () {
                        message.channel.delete();
                    }, 3000);

                }
            });
        });
    }
}
