const Discord = require("discord.js");

module.exports = class BanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'slowmode',
            group: 'channels',
            memberName: 'slowmode',
            description: 'Sets a slowmode of a channel',
            clientPermissions: [
                'MANAGE_CHANNELS'
            ],
            userPermissions: [
                'MANAGE_CHANNELS'
            ],

            guildOnly: true,

            args: [
                {
                    key: 'time',
                    prompt:
                        'Please say the time you would like to set the slowmode to in seconds',
                    type: 'integer'
                }
            ]


        });
    }
    async run(msg,  {time}) {

           const embedColor = '#87CEEB'; // color: skyblue

                const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

        await msg.channel.setRateLimitPerUser(time)

                let slowmodeEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
        .setDescription(`${successEmoji} Channel slowmode have been set to ${time}`)

    msg.reply(slowmodeEmbed)
    }
}
