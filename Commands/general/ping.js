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
			.setColor('RANDOM')
			.setTitle(`🏓 Pong!`)
			.addField("**⏱ Roundtrip:**", `\`\`\`[ ${Math.round(Date.now() - now)} ms ]\`\`\``, true)
			.addField("**💓 API:**", `\`\`\`[ ${Math.round(client.ws.ping)} ms ]\`\`\``, true)
			.setFooter({ text: 'Dweeber >> Ping' });

		return await interaction.followUp({ embeds: [pingEmbed] });
	}
};