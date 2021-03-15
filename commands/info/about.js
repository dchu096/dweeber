const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class aboutCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'about',
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

        const Embed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setTitle("About Memubot")
            .setAuthor(`Memubot`, msg.client.user.displayAvatarURL())

            .addField("**About:**", `Memubot is a fully featured functional bot including full moderation, channel moderations and even music commands!`, true)
            .addField("**Invite:**", "you can invite the bot here: https://discord.com/api/oauth2/authorize?client_id=737905203549831169&permissions=2683694807&scope=bot", true)
            .addField("**Library:**", "discord.js with commando")
            .addField("**Bot's webpage:**", `https://bot.memu.ml`, true)
            .setFooter("by dchu096#3732, made with time and effort");
        await msg.channel.send(Embed) // Sends the embed


    }
}
