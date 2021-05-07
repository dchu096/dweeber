const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class checkvoiceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'checkvoice',
            group: 'music',
            memberName: 'checkvoice',
            description: 'check your current voice channel',
            clientPermissions: [
                'CONNECT'
            ],
            userPermissions: [
                'CONNECT'
            ]
        });
    }

    async run(message) {
        const embedColor = '#87CEEB'; // color: skyblue

        message.channel.send("Checking user voice Channel...").then(msg => {

            if (message.member.voice.channel) {

                let connectedembed = new Discord.MessageEmbed() //For discord v11 Change to new Discord.RichEmbed()
                    .setColor(embedColor)
                    .setTitle(`Current voice channel`)
                    .addField("name:", `${message.member.voice.channel.name}`, )
                msg.edit(connectedembed)
            } else {
                let notconnectedembed = new Discord.MessageEmbed() //For discord v11 Change to new Discord.RichEmbed()
                    .setColor(embedColor)
                    .setTitle(`Current voice channel`)
                    .addField("name:", `User is not connected to an vc`, )
                msg.edit(notconnectedembed)
            }
        });

    }
}