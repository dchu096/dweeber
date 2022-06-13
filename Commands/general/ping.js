const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {
		const now = Date.now();
		await interaction.deferReply();

		const pingEmbed = new MessageEmbed()
			.setAuthor({
				name: `${client.user.username}'s Ping`,
				icon_url: client.user.displayAvatarURL({ dynamic: true, size: 2048 }),
			})
			.setColor('RANDOM')
			.setDescription(stripIndents`
            **⏱ Roundtrip:** ${Math.round(Date.now() - now)} ms
            **💓 API:** ${Math.round(client.ws.ping)} ms
            `);

		return await interaction.followUp({ embeds: [pingEmbed] });
	}
};