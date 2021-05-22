const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class getidCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'getid',
            aliases: ['id', 'checkid'],
            group: 'info',
            memberName: 'getid',
            description: 'Get the ID for yourself',
            clientPermissions: [
                'SEND_MESSAGES'
            ],
            userPermissions: [
                'SEND_MESSAGES'
            ],

        });
    }
    async run(msg) {
        
           const embedColor = '#87CEEB'; // color: skyblue
        
        const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

        const member = msg.member;
        
        msg.delete()


        const Embed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
            .setTitle(`Discord user ID for ${member.user.username} is: \`${member.user.id}\`.`);
        await msg.channel.send(Embed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {}); // Sends the embed


    }
}