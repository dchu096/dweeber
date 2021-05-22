const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class clearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'moderation',
            memberName: 'clear',
            description: 'clear a specific message',
            clientPermissions: [
                'MANAGE_MESSAGES'
            ],
            userPermissions: [
                'MANAGE_MESSAGES'
            ],

            args: [
                {
                    key: 'clearmsg',
                    prompt:
                        'Please provide a number to clear',
                    type: 'integer',
                }

            ],

            guildOnly: true,

        });
    }
    async run(msg, {clearmsg}) {
        
         const embedColor = '#87CEEB'; // color: skyblue
        
        const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';


        //messages

       msg.delete().catch(O_o => {});

        try {
            await msg.channel.bulkDelete(clearmsg)
        } catch (e) {
            console.log(e); //err
        }
        let clearedEmbed = new Discord.MessageEmbed()
            .setTitle(`Success`)
            .setDescription(`${successEmoji} Cleared ${clearmsg} messages`)
            .setColor(embedColor)
        msg.channel.send(clearedEmbed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});


    }
}

