const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "about",
    description: "About the bot",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        const AboutEmbed = new MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor('RANDOM')
            .setTitle("About Dweeber")
            .setDescription('About the bot')
            .setAuthor({ name: 'Dweeber'})
            .addField("**About:**", `Dweeber is a multipurpose bot for your moderations, music, roles need!`, true)
            .addField("**Bot's webpage:**", `https://dweeber.dev`, true)
            .addField("**Source:**", `https://github.com/dchu096/dweeber`, true)
            .setFooter({ text: 'Dweeber >> About'});
            await interaction.reply({ embeds: [AboutEmbed] }); // Sends the embed



	}
};