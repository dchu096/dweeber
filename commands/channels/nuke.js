const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class nukeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'nuke',
            group: 'channels',
            memberName: 'nuke',
            description: 'nuke a specific channel',
            clientPermissions: [
                'MANAGE_CHANNELS'
            ],
            userPermissions: [
                'MANAGE_CHANNELS'
            ]
        });
    }

    async run(msg) {

                //This is a very dangerous command to process! Nuke the channel

                await msg.reply('Are you sure you want to nuke the channel? **This operation cannot be undone!** Please think carefully. Reply with "yes" to confirm');

                msg.channel.awaitMessages(m => m.author.id === msg.author.id,
                    {max: 1, time: 30000}).then(collected => {
                    // only accept messages by the user who sent the command
                    // accept only 1 message, and return the promise after 30000ms = 30s

                    // first (and, in this case, only) message of the collection
                    if (collected.first().content.toLowerCase() === 'yes') {

                        msg.reply('confirmed, the channel will be nuked in 5 seconds.')
                        msg.channel.clone({
                            parent: `${msg.channel.parentID}`,
                            position: msg.channel.rawPosition
                        }).then(ch => {
                            ch.send('Channel have been nuked\n' + 'https://i.gifer.com/6Ip.gif');
                        })

                        setTimeout(function () {
                            msg.channel.delete();
                        }, 5000);


                    } else
                        msg.reply('Operation canceled.');
                })

            }
}