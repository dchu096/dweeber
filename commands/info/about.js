const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class aboutCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'about',
            aliases: ['abt'],
            group: 'info',
            memberName: 'about',
            description: 'About the current bot',
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

        const Embed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
            .setTitle("About Dweeber")
            .setAuthor(`Dweeber`, msg.client.user.displayAvatarURL())
            .addField("**About:**", `Dweeber is a multipurpose bot for your moderations, music, roles need!`, true)
            .addField("**Invite:**", "you can invite the bot here: https://discord.com/api/oauth2/authorize?client_id=737905203549831169&permissions=2683694807&scope=bot", true)
            .addField("**Library:**", "discord.js with commando")
            .addField("**Bot's webpage:**", `https://bot.memu.ml`, true)
            .setFooter("Bot code designed by dchu096, Logo designed by Seaweed Brain");
        await msg.channel.send(Embed) // Sends the embed


    }
}
