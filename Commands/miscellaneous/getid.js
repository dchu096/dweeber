const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "getid",
    description: "Get the ID for yourself or for a user",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to get the avatar of",
            type: 'USER',
            required: false,
        },
    ],
	async run(client, interaction) {

        const Target = interaction.member;

        await interaction.deferReply();

        try {

            const Target = interaction.options.getMember("user") || interaction.member; 

            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${Target.user.username}'s ID`)
            .setDescription(`Discord user ID for ${Target.user.username} is: \`${Target.user.id}\`.`)
            .setFooter("Dweeber >> getid")
    
            interaction.followUp({embeds: [embed]});
      


        } catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.error(err)
        }

        

	}
};