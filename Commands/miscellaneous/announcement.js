const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "announcements",
    description: "From the developers, updating you with announcements.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        const AboutEmbed = new MessageEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor('RANDOM')
            .setTitle("Announcements")
            .setDescription('Latest announcement @ 25 AUG 2022')
            .setAuthor({ name: 'invaliduser', iconURL: 'https://cdn.discordapp.com/guilds/958317326585987112/users/658186843963260929/avatars/ceb079b0f78945e5c00b4b057d44a687.jpg?size=2048' })
            .addFields(
                { name: 'Rewriting music system', value: `\`\`\`Music system is getting a new upgrade! We now included more details then the usual old. "added song to queue". Hope it look better. Also fixed a lot of bugs related when you are not in channel and running commands will result in an error occured.\`\`\`` },
                { name: 'Giveaway commands done!', value: '\`\`\`The giveaways function are now completed! Please give us feedback in our support server.\`\`\`' },
                { name: 'Tickets', value: '\`\`\`Ticket function is currently still WIP but our team working really hard on it. Please bear with us.\`\`\`',  },
                { name: 'Bugs', value: '\`\`\`We know there are quite a lot of bugs in the bot currently but please bear with me so i can try to fix it asap. If you like to report the bug please join our support server! You can find it on dweeber.dev!\`\`\`', inline: true },
            )
            .setFooter({ text: 'Dweeber >> About'});
            await interaction.reply({ embeds: [AboutEmbed] }); // Sends the embed



	}
};