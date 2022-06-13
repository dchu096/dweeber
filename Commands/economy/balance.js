require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const eco = require("../../index.js");

module.exports = {
    name: "balance",
    description: "Show your balance.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to get the balance of",
            type: 'USER',
            required: false,
        },
    ],

	async run(client, interaction) {

        await interaction.deferReply();

        const target = interaction.options.getMember("user") || interaction.member; 

        const guild = interaction.guild

        try {

            let userBalance = await client.eco.fetchMoney(target.id,guild.id);
           
            const embed = new MessageEmbed()
            .setTitle(`Balance`)
            .addField(`User`, `${target.user.tag}`)
            .addField(`Balance`, `${userBalance} 💸` || `0 💸`)
            .setColor("RANDOM")
            .setThumbnail(target.displayAvatarURL)
        return interaction.followUp({ embeds: [embed] })
            

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

