const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class getidCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'getid',
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

        const member = msg.member;

        // MESSAGES
        msg.delete()


        const Embed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setTitle(`${member.user.username} Discord user ID is: \`${member.user.id}\`.`);
        await msg.channel.send(Embed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {}); // Sends the embed


    }
}