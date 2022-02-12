const Discord = require('discord.js');

module.exports = {
    config: {
        name: "lock",
        description: "lockdown the channel",
        usage: "[channel]",
        category: "channels",
        accessableby: "Moderators",
    },

    run: async (message) => {

        
        
        const embedColor = '#87CEEB'; // color: skyblue

                const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

                //This is a very dangerous command to process! Nuke the channel
        
        let confirmEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(``)
        
        const {Confirmation} = require('discord-interface');

let text = 'Are you sure you want to nuke the channel? **This operation cannot be undone!** Please think carefully. Reply with "yes" to confirm. Operation expires after 10s'

let confirmation = Confirmation.create(message, {time: 10000, userID: message.author.id, text: text});

confirmation.on('confirmation', confirmed => {
    if (confirmed) {

        let confirmedEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(`${successEmoji} Thanks for confirming, the channel will be nuked in 3 seconds.`)

                        msg.reply(confirmedEmbed)
                        msg.channel.clone({
                            parent: `${msg.channel.parentID}`,
                            position: msg.channel.rawPosition
                        }).then(ch => {

                            let nukedEmbed = new Discord.MessageEmbed()
                            .setColor(embedColor)
                            .setDescription(`${successEmoji} Channel have been nuked`)
                            .setImage('https://i.gifer.com/6Ip.gif')

                            ch.send(nukedEmbed);
                        }).catch(() => {

                            msg.reply('${errorEmoji} An error occured!');
                        });

                        setTimeout(function () {
                            msg.channel.delete();
                        }, 3000);
        
            }
});
            }
}
