const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "vote",
    description: "Vote for the bot",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        const VoteEmbed = new MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor('RANDOM')
            .setTitle("Vote for the bot")
            .setDescription('Like Dweeber and would like to continue to support for the bot? Vote for the bot here:')
            .addFields(
                { name: 'Top.gg', value: 'https://top.gg/bot/984042951107821648' },
                { name: 'discordbotlist', value: 'https://discordbotlist.com/bots/dweeber' },
                { name: 'Disclaimer', value: 'These links are not affiliated with Dweeber or any of its developers.' }
            )
            .setFooter({ text: 'Dweeber >> vote'});
            await interaction.reply({ embeds: [VoteEmbed] }); // Sends the embed

	}
};
