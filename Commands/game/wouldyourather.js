const signale = require('signale');
const { WouldYouRather } = require('discord-gamecord')

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "wouldyourather",
    description: "Would you rather question",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    
	async run(client, interaction) {

        const embedColor = 'RANDOM'; // color: skyblue

        try {

          new WouldYouRather({
            message: interaction,
            slash_command: true,
            embed: {
              title: 'Would You Rather',
              color: '#5865F2',
            },
            thinkMessage: '**Thinking...**',
            buttons: { option1: 'Option 1', option2: 'Option 2' },
            othersMessage: 'You are not allowed to use buttons for this message!',
          }).startGame();

            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};