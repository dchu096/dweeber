const signale = require('signale');
const questions = require('./would-you-rather.json');

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "wouldyourather",
    description: "Would you rather question",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();

        const embedColor = 'RANDOM'; // color: skyblue


        try {

            var messagetext =  questions[Math.floor(Math.random() * questions.length)]
            var question = messagetext.split("Would you rather ")[1]
            var Option1 = question.split(" or ")[0]
            var Option2 = question.split(" or ")[1]

            const wyrembed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Would You Rather`)
            .setDescription(`Would you rather \n 🅰️ ${Option1} \n or \n :regional_indicator_b: ${Option2}`)
            interaction.followUp({ embeds: [wyrembed]});
        
        
        }   catch (err) {
                signale.error(err)

          } 

	}
};